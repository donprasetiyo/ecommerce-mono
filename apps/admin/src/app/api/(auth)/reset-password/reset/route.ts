import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@admin/app/(public)/(auth)/schema";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { hash, verify } from "@node-rs/argon2";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestAdmin();

  try {
    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const reset_token = cookies().get("reset_token");

    if (!reset_token) {
      throw new AuthError("RESET_PASSWORD_EXPIRED_SESSION");
    }

    const body = await request.json();
    const data: ResetPasswordSchema = {
      token: body.token,
      password: body.password,
      confirmPassword: body.confirmPassword,
    };
    const parsedData = resetPasswordSchema.parse(data);

    if (!parsedData.token) {
      throw new AuthError("RESET_PASSWORD_GENERIC");
    }

    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(parsedData.token)),
    );

    const userByToken =
      await postgresClient.getUserByResetPasswordTokenHash(tokenHash);

    if (!userByToken) {
      throw new AuthError("RESET_PASSWORD_TOKEN_INVALID");
    }

    let isDifferent = false;

    try {
      const result = await verify(
        userByToken.password_hash,
        parsedData.password,
        {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        },
      );

      if (result === false) {
        isDifferent = true;
      }
    } catch {}

    if (!isDifferent) {
      throw new AuthError("RESET_PASSWORD_MUST_NEW");
    }

    const newPasswordHash = await hash(parsedData.password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const user = await postgresClient.resetPassword(
      newPasswordHash,
      userByToken.id,
    );
    if (!user) {
      throw new AuthError("RESET_PASSWORD_GENERIC");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
