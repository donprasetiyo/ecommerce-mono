import { ConfigManagerSecrets, emailConfiguration } from '@repo/business-config';
import { InferResult, Kysely, OrderByExpression, PostgresDialect, SelectQueryBuilder, sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { Pool } from 'pg';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import { DB, User } from '@repo/shared-types';
import { TimeSpan, generateIdFromEntropySize } from 'lucia';
import { createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString, sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import {nanoid} from 'nanoid'

interface PageResult<O> {
    results: O
    total: number
}

export class PostgresClient {
    private readonly HOST: string;
    private readonly USERNAME: string;
    private readonly PASSWORD: string;
    private readonly DATABASE: string;
    private readonly PORT: number;

    public readonly db: Kysely<DB>;
    private readonly dialect: PostgresDialect;
    public readonly poolPromise: Pool;
    public readonly adapter: NodePostgresAdapter;

    constructor(HOST: string, USERNAME: string, PASSWORD: string, DATABASE: string, PORT: number) {
        this.HOST = HOST;
        this.USERNAME = USERNAME;
        this.PASSWORD = PASSWORD;
        this.DATABASE = DATABASE;
        this.PORT = PORT;

        this.poolPromise = new Pool({
            connectionString: process.env.IS_PROD && process.env.IS_PROD.toString() === 'TRUE' && process.env.NODE_ENV === "production" ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL,
            host: this.HOST,
            user: this.USERNAME,
            password: this.PASSWORD,
            database: this.DATABASE,
            port: this.PORT,
            ssl: false,
            max: 10,
        });

        this.dialect = new PostgresDialect({
            pool: this.poolPromise
        });


        this.db = new Kysely<DB>({
            dialect: this.dialect
        });

        this.adapter = new NodePostgresAdapter(this.poolPromise, {
            user: "User",
            session: "Session",
        });
    }

    public async createNewUser(userId: string, username: string, passwordHash: string, email: string) {
        const defaultUSDCurrency = await this.db.selectFrom('Currency')
            .where('Currency.code', '=', 'USD')
            .select(['Currency.code'])
            .executeTakeFirst();

        if (!defaultUSDCurrency) {
            await this.db.insertInto('Currency')
            .values({
                code: 'USD',
                name: 'United States dollar',
                public_id: nanoid()
            })
            .executeTakeFirstOrThrow()
        }
                const defaultRole = await this.db.selectFrom('Role')
            .where('Role.name', '=', 'regular')
            .select(['Role.name'])
            .executeTakeFirst();

        if (!defaultRole) {
            await this.db.insertInto('Role')
            .values({
                description: 'Regular web user',
                name: 'regular'
            })
            .executeTakeFirstOrThrow()
        }
        const user = await this.db.insertInto('User').values({
            id: userId,
            username: username,
            password_hash: passwordHash,
            email: email,
            email_verified: false,
            currency_code: 'USD',
            role_name: 'regular'
        })
            .returning(['User.username', 'User.email'])
            .executeTakeFirst();

        return user
    }


    public async getAccount(userId: string) {

        const user = await this.db.selectFrom('User')
            .selectAll()
            .where('id', '=', userId)
            .executeTakeFirst();

        return user;
    }

    public async getBillingHistory(userId: string, offset: number, limit: number, sortBy: string) {
        const start = performance.now()
        const query = this.db.selectFrom('Transaction as transaction')
            .leftJoin('Invoice as invoice', 'invoice.transaction_id', 'transaction.id')
            .leftJoin('Receipt as receipt', 'receipt.transaction_id', 'transaction.id')
            .leftJoin('InvoiceItem', 'InvoiceItem.invoice_id', 'invoice.id')
            .leftJoin('ReceiptItem', 'ReceiptItem.receipt_id', 'receipt.id')
            .where('user_id', '=', userId)
            .select((eb) => [
                jsonArrayFrom(
                    eb.selectFrom('InvoiceItem')
                        .select([
                            'InvoiceItem.amount', 'InvoiceItem.created_at', 'InvoiceItem.name', 'InvoiceItem.quantity', 'InvoiceItem.unit_price', 'InvoiceItem.vat_amount', 'InvoiceItem.vat_percentage'])
                        .whereRef('InvoiceItem.invoice_id', '=', 'invoice.id')
                ).as('invoiceitems')
            ])
            .select((eb) => [
                jsonArrayFrom(
                    eb.selectFrom('ReceiptItem')
                        .select([
                            'ReceiptItem.amount', 'ReceiptItem.created_at', 'ReceiptItem.name', 'ReceiptItem.quantity', 'ReceiptItem.unit_price', 'ReceiptItem.vat_amount', 'ReceiptItem.vat_percentage'
                        ])
                        .whereRef('ReceiptItem.receipt_id', '=', 'receipt.id')
                ).as('receiptitems')
            ])
            .select(
                [
                    'transaction.amount as transaction_amount', 'transaction.created_at as transaction_created_at', 'transaction.transaction_status', 'transaction.id as transaction_id', 'transaction.updated_at as transaction_updated_at',

                    'invoice.id as invoice_id', 'invoice.created_at as invoice_created_at', 'invoice.number as invoice_number',
                    'invoice.currency_code as invoice_currency_code', 'invoice.customer_address_line_1 as invoice_customer_address_line_1', 'invoice.customer_address_line_2 as invoice_customer_address_line_2', 'invoice.customer_city as invoice_customer_city', 'invoice.customer_country as invoice_customer_country', 'invoice.customer_email as invoice_customer_email', 'invoice.customer_id as invoice_customer_id', 'invoice.customer_name as invoice_customer_name', 'invoice.customer_postal_code as invoice_customer_postal_code', 'invoice.description as invoice_description', 'invoice.due_date as invoice_due_date', 'invoice.invoice_date as invoice_invoice_date', 'invoice.paid_at as invoice_paid_at', 'invoice.status as invoice_status', 'invoice.total as invoice_total', 'invoice.invoice_date as invoice_date', 'invoice.public_id as invoice_public_id', 'invoice.payment_method as invoice_payment_method', 'invoice.payment_link as invoice_payment_link',

                    'receipt.id as receipt_id', 'receipt.created_at as receipt_created_at',
                    'receipt.currency_code as receipt_currency_code', 'receipt.customer_address_line_1 as receipt_customer_address_line_1', 'receipt.customer_address_line_2 as receipt_customer_address_line_2', 'receipt.customer_city as receipt_customer_city', 'receipt.customer_country as receipt_customer_country', 'receipt.customer_email as receipt_customer_email', 'receipt.customer_id as receipt_customer_id', 'receipt.customer_name as receipt_customer_name', 'receipt.customer_postal_code as receipt_customer_postal_code', 'receipt.description as receipt_description', 'receipt.paid_at as receipt_paid_at', 'receipt.total as receipt_total', 'receipt.public_id as receipt_public_id', 'invoice.number as receipt_invoice_number', 'receipt.payment_method as receipt_payment_method', 'receipt.number as receipt_number',
                ]
            );

        const result: PageResult<InferResult<typeof query>> = await this.getPage<InferResult<typeof query>, any>(query, offset, limit, sortBy as any);
        const end = performance.now();

        console.log('billing takes ', (end - start) / 1000, 'seconds')


        return result;
    }

    private async getPage<T, O>(qb: SelectQueryBuilder<any, any, O>, offset: number, limit: number, orderBy: OrderByExpression<T, any, 0>): Promise<PageResult<O[]>> {
        const [res, total] = await Promise.all([
            qb.offset(offset).limit(limit).orderBy(orderBy).execute(),
            qb.clearSelect().select(eb => [eb.fn.countAll<number>().as('count')]).executeTakeFirstOrThrow(),
        ]);

        return {
            results: res,
            total: total.count,
        }
    }

    public async generateEmailVerificationCode(userId: string) {
        const createdUser = await this.db.selectFrom('User')
            .where('User.id', '=', userId)
            .select(['email'])
            .executeTakeFirstOrThrow();

        await this.db.deleteFrom('EmailVerificationCode')
            .where('EmailVerificationCode.user_id', '=', userId)
            .executeTakeFirst();

        const code = generateRandomString(8, alphabet("0-9"));

        const codeCreated = await this.db.insertInto('EmailVerificationCode')
            .values({
                user_id: userId,
                email: createdUser.email,
                code: code,
                expires_at: sql<Date>`CURRENT_TIMESTAMP::timestamp with time zone + INTERVAL '1' DAY` as any,
            })
            .returning(['EmailVerificationCode.code', 'EmailVerificationCode.email', 'EmailVerificationCode.created_at'])
            .executeTakeFirst();

        return codeCreated;
    }

    public async verifyUserAccount(userId: string) {
        await this.db.updateTable('User')
            .where('User.id', '=', userId)
            .set({
                email_verified: true
            })
            .executeTakeFirstOrThrow();
    }

    public async verifyVerificationCode(user: Pick<User, 'id' | 'email'>, code: string): Promise<boolean> {
        const trx = await this.db.transaction().execute(async (trx) => {
            const databaseCode = await trx.selectFrom('EmailVerificationCode')
                .where('EmailVerificationCode.user_id', '=', user.id)
                .select(['EmailVerificationCode.code', 'EmailVerificationCode.id', 'EmailVerificationCode.email', 'EmailVerificationCode.expires_at'])
                .executeTakeFirstOrThrow();

            if (databaseCode.code !== code) {
                return false
            }

            await trx.deleteFrom('EmailVerificationCode')
                .where('EmailVerificationCode.id', '=', databaseCode.id)
                .executeTakeFirstOrThrow();

            if (!isWithinExpirationDate(databaseCode.expires_at)) {
                return false;
            }
            if (databaseCode.email !== user.email) {
                return false;
            }
            return true;
        });
        return trx;
    }

    public async createPasswordResetToken(userId: string): Promise<string> {
        await this.db.deleteFrom('PasswordResetToken')
            .where('PasswordResetToken.user_id', '=', userId)
            .executeTakeFirst();

        const tokenId = generateIdFromEntropySize(25); // 40 character
        const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

        await this.db.insertInto('PasswordResetToken')
            .values({
                token_hash: tokenHash,
                user_id: userId,
                expires_at: createDate(new TimeSpan(emailConfiguration.resetPasswordLinkExpiration, "h"))
            })
            .executeTakeFirstOrThrow();

        return tokenId;
    }

    public async ensureUserExistByUsernameOrEmail(emailOrUsername: string) {
        const userByEmail = await this.db.selectFrom('User')
            .where('User.email', '=', emailOrUsername)
            .select(['User.email', 'User.id', 'User.username'])
            .executeTakeFirst();

        if (userByEmail) {
            return userByEmail
        }

        const userByUsername = await this.db.selectFrom('User')
            .where('User.username', '=', emailOrUsername)
            .select(['User.email', 'User.id', 'User.username'])
            .executeTakeFirst();

        return userByUsername
    }

    public async deleteResetPasswordTokenIfExist(tokenHash: string) {
        const token = await this.db.selectFrom('PasswordResetToken')
            .where('PasswordResetToken.token_hash', '=', tokenHash)
            .select(['PasswordResetToken.token_hash', 'PasswordResetToken.expires_at', 'PasswordResetToken.user_id'])
            .executeTakeFirst();

        if (token) {
            await this.db.deleteFrom('PasswordResetToken')
                .where('PasswordResetToken.token_hash', '=', tokenHash)
                .executeTakeFirstOrThrow();

            return token;
        }

        return token;
    }

    public async changePassword(passwordHash: string, userId: string) {
        await this.db.updateTable('User')
            .where('User.id', '=', userId)
            .set({
                password_hash: passwordHash
            })
            .executeTakeFirstOrThrow();
    }

    public async getUserByUsernameOrEmailForLogin(usernameOrEmail: string) {
        const userByEmail = await this.db.selectFrom('User')
            .where('User.email', '=', usernameOrEmail)
            .select(['User.password_hash', 'User.id', 'User.email_verified', 'User.email', 'User.username'])
            .executeTakeFirst();

        if (userByEmail) {
            return userByEmail;
        }

        const userByUsername = await this.db.selectFrom('User')
            .where('User.username', '=', usernameOrEmail)
            .select(['User.password_hash', 'User.id', 'User.email_verified', 'User.email', 'User.username'])
            .executeTakeFirst();

        if (userByUsername) {
            return userByUsername;
        }

        return undefined;
    }

    public async getLastVerificationCodeSent(userId: string) {
        const time = await this.db.selectFrom('EmailVerificationCode')
            .where('EmailVerificationCode.user_id', '=', userId)
            .select(['EmailVerificationCode.created_at', 'EmailVerificationCode.code'])
            .executeTakeFirst();

        return time;
    }

    public async getResetPasswordToken(token: string) {
        const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
        const existingToken = await this.db.selectFrom('PasswordResetToken')
            .where('PasswordResetToken.token_hash', '=', tokenHash)
            .select(['PasswordResetToken.expires_at'])
            .executeTakeFirst();

        if (!existingToken || !isWithinExpirationDate(existingToken.expires_at)) {
            return undefined;
        }

        return existingToken;
    }

    public async getUserByResetPasswordTokenHash(tokenHash: string) {
        const userId = await this.db.selectFrom('PasswordResetToken')
            .where('PasswordResetToken.token_hash', '=', tokenHash)
            .select(['PasswordResetToken.user_id'])
            .executeTakeFirst();

        if (!userId) {
            return undefined;
        }

        const user = await this.db.selectFrom('User')
            .where('User.id', '=', userId.user_id)
            .select(['User.id', 'User.password_hash'])
            .executeTakeFirst();

        return user;
    }

    public async resetPassword(newPasswordHash: string, userId: string) {
        await this.db.deleteFrom('PasswordResetToken')
            .where('PasswordResetToken.user_id', '=', userId)
            .executeTakeFirst();

        const updatedUser = await this.db.updateTable('User')
            .where('User.id', '=', userId)
            .set({
                password_hash: newPasswordHash
            })
            .returning(['User.id'])
            .executeTakeFirst();

        return updatedUser;
    }

}

export const postgresClient = new PostgresClient(
    ConfigManagerSecrets.PG_HOST,
    ConfigManagerSecrets.PG_USERNAME,
    ConfigManagerSecrets.PG_PASSWORD,
    ConfigManagerSecrets.PG_NAME,
    ConfigManagerSecrets.PG_PORT
);

