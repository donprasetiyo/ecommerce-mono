import { Module } from "@nestjs/common";
import { AppContextFactory } from "app.context";

import { CurrencyModule, GreetingModule, PostModule } from "@repo/features";

import { AppRouterFactory } from "./app.router";

@Module({
  imports: [GreetingModule, PostModule, CurrencyModule],
  controllers: [],
  providers: [AppRouterFactory, AppContextFactory],
  exports: [AppRouterFactory, AppContextFactory],
})
export class AppModule {}
