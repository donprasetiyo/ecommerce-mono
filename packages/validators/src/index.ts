import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;


export * from './currency/validator'
export * from './ai-model/validator'
export * from './waitlist/validator'