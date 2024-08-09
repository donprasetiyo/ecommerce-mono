import { Injectable } from '@nestjs/common';
import { PostgresClient } from '@repo/database';
import { DB, WaitingListUser } from '@repo/shared-types';
import { TRPCError } from '@repo/trpc';
import { Insertable, Kysely, Selectable } from 'kysely';

@Injectable()
export class WaitlistRepository {
  private postgresClient: PostgresClient;
  private postgres: Kysely<DB>;

  constructor(postgresClient: PostgresClient) {
    this.postgresClient = postgresClient;
    this.postgres = this.postgresClient.db;
  }

  async getAll(): Promise<Selectable<WaitingListUser>[]> {
    const currencies = await this.postgres.selectFrom('WaitingListUser').selectAll().execute();
    return currencies;
  }

  async add(newWaitListUser: Insertable<WaitingListUser>): Promise<Selectable<WaitingListUser>> {
    const existingUser = await this.postgres.selectFrom('WaitingListUser')
    .where('WaitingListUser.email', '=', newWaitListUser.email)
    .select(['WaitingListUser.email'])
    .executeTakeFirst();

    if (existingUser){
      throw new TRPCError({ code: "CONFLICT" });
    }


    const newWaitlist = await this.postgres.insertInto('WaitingListUser')
      .values({
       ...newWaitListUser
      })
      .returningAll()
      .executeTakeFirstOrThrow();
    return newWaitlist;
  }
}