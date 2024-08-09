import { z } from "zod";

export const emailValidation = z
  .string()
  .min(1, { message: "Email is required" })
  .email("Invalid email address");
export const usernameValidation = z
  .string()
  .min(2, {
    message: "Username must be at least 2 characters.",
  })
  .max(31, { message: "Username is too long." });
export const passwordValidation = z
  .string()
  .min(12, { message: "Password must be at least 12 characters" });
export const confirmPasswordValidation = z
  .string()
  .min(12, { message: "Password must be at least 12 characters" });

export const registerSchema = z
  .object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const emailVerificationCodeSchema = z.object({
  code: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1),
  ),
});

export type EmailVerificationCodeSchema = z.infer<
  typeof emailVerificationCodeSchema
>;

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, {
    message: "Username or email can't be empty",
  }),
  password: z.string().min(1, {
    message: "Password can't be empty",
  }),
  lastSentVerificationCode: z.date().nullish(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const tokenValidation = z
  .string()
  .min(8, { message: "Token length is less than 8." });

export const resetPasswordRequestSchema = z.object({
  usernameOrEmail: z.string().min(1, {
    message: "Username or email can't be empty",
  }),
  lastSentVerificationCode: z.date().nullish(),
});

export type ResetPasswordRequestSchema = z.infer<
  typeof resetPasswordRequestSchema
>;

export const resetPasswordSchema = z
  .object({
    token: tokenValidation.nullish(),
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
