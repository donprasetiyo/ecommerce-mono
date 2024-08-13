import { Injectable } from "@nestjs/common";
import { CurrencyRouter, GreetingRouter, PostRouter } from "@repo/features";
import { mergeRouters } from "@repo/trpc";

@Injectable()
export class AppRouterFactory {
  constructor(
    private readonly greetingRouter: GreetingRouter,
    private readonly postRouter: PostRouter,
    private readonly currencyRouter: CurrencyRouter
  ) { }

  create() {
    return mergeRouters(
      this.greetingRouter.create(),
      this.postRouter.create(),
      this.currencyRouter.create()
    );
  }
}

export type AppRouter = ReturnType<AppRouterFactory["create"]>;