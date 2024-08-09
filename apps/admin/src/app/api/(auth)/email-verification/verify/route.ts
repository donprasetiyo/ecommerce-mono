import { NextResponse } from "next/server";
import {
  EmailVerificationCodeSchema,
  emailVerificationCodeSchema,
} from "@admin/app/(public)/(auth)/schema";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import { lucia } from "@repo/auth";
import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";

export async function POST(request: Request) {
  const { session: existingSession, user } = await validateRequestAdmin();

  try {
    if (!existingSession || !user) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();
    const codeObject: EmailVerificationCodeSchema = {
      code: body.code.toString(),
    };
    const parsedCode = emailVerificationCodeSchema.parse(codeObject);

    const validCode = await postgresClient.verifyVerificationCode(
      user,
      parsedCode.code.toString(),
    );
    if (!validCode) {
      throw new AuthError("INVALID_VERIFICATION_CODE");
    }

    await lucia.invalidateUserSessions(user.id);

    await postgresClient.verifyUserAccount(user.id);

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return NextResponse.json(
      { status: "success" },
      {
        headers: {
          "Set-Cookie": sessionCookie.serialize(),
        },
        status: 200,
      },
    );

  } catch (error) {
    const { status, message } = handleError(error, "email verification");
    return NextResponse.json({ error: message }, { status: status });
  }
}
