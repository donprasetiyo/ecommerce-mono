import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { tokenValidation } from "@web/app/(public)/(auth)/schema";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

import { lucia } from "@repo/auth";
import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";

export async function POST(
  request: Request,
  { params }: { params: { token: string } },
) {
  const { session: existingSession } = await validateRequestRegular();

  try {
    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();
    const password = tokenValidation.parse(body.password);

    const verificationToken = params.token;

    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(verificationToken)),
    );

    const token =
      await postgresClient.deleteResetPasswordTokenIfExist(tokenHash);

    if (!token || !isWithinExpirationDate(token.expires_at)) {
      throw new AuthError("INVALID_RESET_PASSWORD_TOKEN");
    }

    await lucia.invalidateUserSessions(token.user_id);
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    await postgresClient.changePassword(passwordHash, token.user_id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
        "Referrer-Policy": "strict-origin",
      },
    });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
