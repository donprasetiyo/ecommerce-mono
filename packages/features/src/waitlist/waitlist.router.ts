import { Injectable } from "@nestjs/common";
import { createRouter, protectedProcedure, publicProcedure } from "@repo/trpc";
import { WaitlistController } from "./waitlist.controller";
import {  CreateWaitlistUser, CreateWaitlistUserSchema} from "@repo/validators";

@Injectable()
export class WaitlistRouter {
    constructor(private readonly waitlistController: WaitlistController) { }

    create() {
        return createRouter({
            waitlist: {
                all: protectedProcedure.query(({ }) => {
                    return this.waitlistController.getAll();
                }),
                add: publicProcedure
                    .input(CreateWaitlistUserSchema)
                    .mutation(({ input }) => {
                        const { email, status} = input;
                        return this.waitlistController.add({
                            email,status
                        });
                    })
            },
        });
    }
}
