import { Injectable } from "@nestjs/common";
import * as sharedTypes from '@repo/shared-types' //DO NOT REMOVE: https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189

import { AIModelRouter, CurrencyRouter, GreetingRouter, PostRouter, WaitlistRouter } from "@repo/features";
import { mergeRouters } from "@repo/trpc";

@Injectable()
export class AppRouterFactory {
  constructor(
    private readonly greetingRouter: GreetingRouter,
    private readonly postRouter: PostRouter,
    private readonly currencyRouter: CurrencyRouter,
    private readonly aiModelRouter: AIModelRouter,
    private readonly waitingListRouter: WaitlistRouter
  ) { }

  create() {
    return mergeRouters(
      this.greetingRouter.create(),
      this.postRouter.create(),
      this.currencyRouter.create(),
      this.aiModelRouter.create(),
      this.waitingListRouter.create()
    );
  }
}

export type AppRouter = ReturnType<AppRouterFactory["create"]>;

export interface AIModelExported extends sharedTypes.AIModel{}