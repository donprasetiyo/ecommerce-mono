"use server";

import { cookies } from "next/headers";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import { postgresClient } from "@repo/database";

export async function checkToken(reset_token: string) {
  const { session: existingSession } = await validateRequestAdmin();

  if (existingSession) {
    return undefined;
  }

  if (!reset_token || (reset_token && reset_token.trim() === "")) {
    return undefined;
  }

  const token = await postgresClient.getResetPasswordToken(reset_token);

  console.log("checking token inside action", token);

  if (!token) {
    return undefined;
  }

  const fiveMinutes = 5 * 60 * 1000;

  cookies().set("reset_token", reset_token, {
    expires: Date.now() + fiveMinutes,
  });

  return undefined;
}
