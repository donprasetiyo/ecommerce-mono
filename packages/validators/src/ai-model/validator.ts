import { z } from "zod";

export const CreateAIModelSchema = z.object({
  name: z.string(),
  source: z.string(),
  public_name: z.string(),
  label: z.string(),
  price_based_on: z.union([z.literal('TIME'), z.literal('TOKEN')]),
  icon: z.string(),
});

export type CreateAIModel = z.infer<typeof CreateAIModelSchema>;
