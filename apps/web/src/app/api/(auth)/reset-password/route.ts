import { NextResponse } from "next/server";
import {
  emailValidation,
  ResetPasswordRequestSchema,
  resetPasswordRequestSchema,
} from "@web/app/(public)/(auth)/schema";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";

import { sendResetPasswordEmail } from "../send-email/sendEmail";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestRegular();

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
    const verificationLink = `${process.env.WEB_BASE_URL}/reset-password/${verificationToken}`;

    await sendResetPasswordEmail(user.email, verificationLink, user.username);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
