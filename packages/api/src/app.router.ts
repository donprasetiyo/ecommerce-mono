import { Injectable } from "@nestjs/common";
import * as sharedTypes from '@repo/shared-types' //DO NOT REMOVE: https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189

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