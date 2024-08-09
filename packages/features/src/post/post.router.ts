import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { createRouter, protectedProcedure, publicProcedure } from "@repo/trpc";
import { CreatePostSchema } from "@repo/validators";

import { PostController } from "./post.controller";

@Injectable()
export class PostRouter {
  constructor(private readonly postController: PostController) {}

  create() {
    return createRouter({
      post: {
        // eslint-disable-next-line no-empty-pattern
        all: publicProcedure.query(({}) => {
          return this.postController.getAll();
        }),

        byId: publicProcedure
          .input(z.object({ id: z.number() }))
          .query(({ input }) => {
            const id = input.id;
            return this.postController.getById(id);
          }),

        create: publicProcedure
          .input(CreatePostSchema)
          .mutation(({ input }) => {
            return this.postController.create(input);
          }),

        delete: protectedProcedure.input(z.number()).mutation(({ input, ctx }) => {
          return this.postController.deleteById(input, ctx.user);
        }),
      },
    });
  }
}
