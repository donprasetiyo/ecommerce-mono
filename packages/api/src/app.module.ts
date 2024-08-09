import { Module } from "@nestjs/common";
import { AppContextFactory } from "app.context";

import { AIModelModule, CurrencyModule, GreetingModule, PostModule, WaitlistModule } from "@repo/features";

import { AppRouterFactory } from "./app.router";

@Module({
  imports: [GreetingModule, PostModule, CurrencyModule, AIModelModule, WaitlistModule],
  controllers: [],
  providers: [AppRouterFactory, AppContextFactory],
  exports: [AppRouterFactory, AppContextFactory],
})
export class AppModule {}
