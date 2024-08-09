import { Injectable } from '@nestjs/common';
import { PostgresClient } from '@repo/database';
import { Kysely, Selectable } from 'kysely';
import {Currency, DB} from '@repo/shared-types';
import {nanoid} from 'nanoid'

@Injectable()
export class CurrencyRepository {
  private postgresClient: PostgresClient;
  private postgres: Kysely<DB>;

  constructor(postgresClient: PostgresClient) {
    this.postgresClient = postgresClient;
    this.postgres = this.postgresClient.db;
  }

  async getAll(): Promise<Selectable<Currency>[]> {
    const currencies = await this.postgres.selectFrom('Currency').selectAll().execute();
    return currencies;
  }

  async create(code: string, name: string): Promise<Selectable<Currency>> {
    const newCurrency = await this.postgres.insertInto('Currency')
    .values({
        code: code,
        name: name,
        public_id: nanoid()
    })
    .returningAll()
    .executeTakeFirstOrThrow();
    return newCurrency;
  }
}