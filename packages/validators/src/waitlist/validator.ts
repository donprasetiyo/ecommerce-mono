import { z } from "zod";

export const CreateWaitlistUserSchema = z.object({
  email: z.string().min(1),
  status: z.union([z.literal('PENDING'), z.literal('CONTACTED'), z.literal('CONFIRMED')])
});

export type CreateWaitlistUser = z.infer<typeof CreateWaitlistUserSchema>;
