import { z } from "zod";

export const CreateCurrencySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

export type CreateCurrency = z.infer<typeof CreateCurrencySchema>;
