import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { createRouter, publicProcedure, TRPCError } from "@repo/trpc";

import { GreetingController } from "./greeting.controller";

@Injectable()
export class GreetingRouter {
  constructor(private readonly greetingController: GreetingController) {}

  create() {
    return createRouter({
      greeting: {
        hello: publicProcedure
          .input(
            z.object({
              name: z.string().optional(),
            }),
          )
          .query(({ input }) => {
            try {
              const { name } = input;
              return this.greetingController.greet(name);
            } catch (error) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
              });
            }
          }),
      },
    });
  }
}
