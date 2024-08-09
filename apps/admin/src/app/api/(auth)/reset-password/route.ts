import {
  ResetPasswordRequestSchema,
  resetPasswordRequestSchema
} from "@admin/app/(public)/(auth)/schema";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { NextResponse } from "next/server";

import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";

import { sendResetPasswordEmail } from "../send-email/sendEmail";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestAdmin();

  try {
    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    try {
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

      await sendResetPasswordEmail(user.email, verificationLink, user.username);
    } catch (error) {
      console.log("reset password error", error);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
