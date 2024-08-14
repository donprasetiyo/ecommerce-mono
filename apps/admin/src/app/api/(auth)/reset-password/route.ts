import {
  ResetPasswordRequestSchema,
  resetPasswordRequestSchema
} from "@admin/app/(public)/(auth)/schema";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { NextResponse } from "next/server";

import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";
import { kafka } from "@admin/kafka/producer";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestAdmin();

  try {
    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();
    const data: ResetPasswordRequestSchema = {
      usernameOrEmail: body.usernameOrEmail,
    };
    const parsedData = resetPasswordRequestSchema.parse(data);

    const user = await postgresClient.ensureUserExistByUsernameOrEmail(
      parsedData.usernameOrEmail,
    );
    if (!user) {
      throw new AuthError("INVALID_EMAIL");
    }

    const verificationToken = await postgresClient.createPasswordResetToken(
      user.id,
    );
    const verificationLink = `${process.env.ADMIN_BASE_URL}/reset-password/${verificationToken}`;

    await kafka.sendEmailVerificationCode({
      toAddress: user.email,
      code: verificationLink,
      username: user.username
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
