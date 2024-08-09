import { Module } from "@nestjs/common";

import { CurrencyController } from "./currency.controller";
import { CurrencyRouter } from "./currency.router";
import { CurrencyService } from "./currency.service";
import { CurrencyRepository } from "./currency.repository";
import { PostgresClient } from "@repo/database";

@Module({
  imports: [],
  controllers: [],
  providers: [CurrencyRouter, CurrencyController, CurrencyService, CurrencyRepository, PostgresClient],
  exports: [CurrencyRouter],
})
export class CurrencyModule {}
