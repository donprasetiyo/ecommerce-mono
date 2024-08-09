import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { createRouter, protectedProcedure, publicProcedure, TRPCError } from "@repo/trpc";

import { CurrencyController } from "./currency.controller";
import { CreateCurrencySchema } from "@repo/validators";

@Injectable()
export class CurrencyRouter {
    constructor(private readonly currencyController: CurrencyController) { }

    create() {
        return createRouter({
            currency: {
                all: protectedProcedure.query(({ }) => {
                    return this.currencyController.getAll();
                }),

                create: protectedProcedure
                    .input(CreateCurrencySchema)
                    .mutation(({ input }) => {
                        return this.currencyController.create(input.code, input.name);
                    })

            },
        });
    }
}
