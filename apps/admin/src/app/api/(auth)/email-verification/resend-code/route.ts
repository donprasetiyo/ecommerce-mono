import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LoginResponse } from "@admin/app/(public)/(auth)/login/types";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import { lucia } from "@repo/auth";
import { emailConfiguration } from "@repo/business-config";
import { postgresClient } from "@repo/database";
import {
  AuthError,
  BadRequestError,
  handleError,
  isWithinLastHours,
} from "@repo/lib";
import { kafka } from "@admin/kafka/producer";

export async function POST(request: Request) {
  const { session: existingSession, user } = await validateRequestAdmin();

  try {
    if (!existingSession || !user) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();

    const resendToken = body.resendToken;
    const resendTokenCookie = cookies().get("resend_token");

    console.log("body", resendToken, resendTokenCookie);

    if (
      !resendTokenCookie ||
      resendTokenCookie.value.trim() === "" ||
      resendTokenCookie.value !== resendToken ||
      resendToken.trim() === "" ||
      !resendToken
    ) {
      await lucia.invalidateSession(existingSession.id);
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      throw new AuthError("RESEND_FAILED_MUST_RELOGIN");
    }

    const lastSentVerificationCode =
      await postgresClient.getLastVerificationCodeSent(user.id);

    if (lastSentVerificationCode) {
      const isWithin6Hours = isWithinLastHours(
        lastSentVerificationCode.created_at,
        emailConfiguration.requestNewEmailDelayInHour,
      );

      const returnedloginData: Pick<
        LoginResponse,
        "email_verified" | "lastSentVerificationCode" | "success"
      > = {
        lastSentVerificationCode: lastSentVerificationCode
          ? lastSentVerificationCode.created_at
          : undefined,
        email_verified: false,
        success: false,
      };

      if (isWithin6Hours) {
        return NextResponse.json(returnedloginData, { status: 201 });
      }
    }

    const verificationCode = await postgresClient.generateEmailVerificationCode(
      user.id,
    );
    if (!verificationCode) {
      throw new AuthError("USER_CREATED_BUT_EMAIL_VERIFY_FAILED");
    }
    const sentCode = await kafka.sendEmailVerificationCode({
      toAddress: verificationCode.email,
      code: verificationCode.code,
      username: user.username,
    });

    if (!sentCode) {
      throw new AuthError("USER_CREATED_BUT_EMAIL_VERIFY_FAILED");
    }

    const returnedloginData: Pick<
      LoginResponse,
      "email_verified" | "lastSentVerificationCode" | "success"
    > = {
      lastSentVerificationCode: verificationCode.created_at,
      email_verified: false,
      success: true,
    };

    return NextResponse.json(returnedloginData, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
