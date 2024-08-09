import { Injectable } from "@nestjs/common";

import { createRouter, protectedProcedure } from "@repo/trpc";

import { CreateAIModelSchema } from "@repo/validators";
import { AIModelController } from "./ai-model.controller";

@Injectable()
export class AIModelRouter {
    constructor(private readonly aiModelController: AIModelController) { }

    create() {
        return createRouter({
            aiModel: {
                all: protectedProcedure.query(({ }) => {
                    return this.aiModelController.getAll();
                }),
                add: protectedProcedure
                    .input(CreateAIModelSchema)
                    .mutation(({ input }) => {
                        const { icon,
                            name,
                            label,
                            price_based_on,
                            public_name,
                            source} = input;
                        return this.aiModelController.add(
                            icon,
                            name,
                            label,
                            price_based_on,
                            public_name,
                            source,
                        );
                    })
            },
        });
    }
}
