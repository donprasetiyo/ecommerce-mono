import { Injectable } from '@nestjs/common';
import { PostgresClient } from '@repo/database';
import { AIModel, DB } from '@repo/shared-types';
import { Kysely, Selectable } from 'kysely';
import {nanoid} from 'nanoid'

@Injectable()
export class AIModelRepository {
  private postgresClient: PostgresClient;
  private postgres: Kysely<DB>;

  constructor(postgresClient: PostgresClient) {
    this.postgresClient = postgresClient;
    this.postgres = this.postgresClient.db;
  }

  async getAll(): Promise<Selectable<AIModel>[]> {
    const currencies = await this.postgres.selectFrom('AIModel').selectAll().execute();
    return currencies;
  }

  async add(icon: string, name: string, label: string, price_based_on: 'TIME' | 'TOKEN', public_name: string, source: string): Promise<Selectable<AIModel>> {
    const newAIModel = await this.postgres.insertInto('AIModel')
      .values({
        public_id: nanoid(),
        icon: icon,
        name: name,
        label: label,
        price_based_on: price_based_on,
        public_name: public_name,
        source: source
      })
      .returningAll()
      .executeTakeFirstOrThrow();
    return newAIModel;
  }
}