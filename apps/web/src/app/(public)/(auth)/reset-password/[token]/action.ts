"use server";

import { cookies } from "next/headers";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { postgresClient } from "@repo/database";

export async function checkToken(reset_token: string) {
  const { session: existingSession } = await validateRequestRegular();

  if (existingSession) {
    return undefined;
  }

  if (!reset_token || (reset_token && reset_token.trim() === "")) {
    return undefined;
  }

  const token = await postgresClient.getResetPasswordToken(reset_token);

  if (!token) {
    return undefined;
  }

  const fiveMinutes = 5 * 60 * 1000;

  cookies().set("reset_token", reset_token, {
    expires: Date.now() + fiveMinutes,
  });

  return undefined;
}
