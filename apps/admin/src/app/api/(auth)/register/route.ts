import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LoginResponse } from "@admin/app/(public)/(auth)/login/types";
import {
  RegisterSchema,
  registerSchema,
} from "@admin/app/(public)/(auth)/schema";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

import { lucia } from "@repo/auth";
import { postgresClient } from "@repo/database";
import { AuthError, BadRequestError, handleError } from "@repo/lib";
import { kafka } from "@admin/kafka/producer";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestAdmin();

  try {
    const registerStart = performance.now();

    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();

    const data: RegisterSchema = {
      email: body.email,
      username: body.username,
      password: body.password,
      confirmPassword: body.confirmPassword,
    };

    const parsedData = registerSchema.parse(data);

    const passwordHash = await hash(parsedData.password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long

    const newUser = await postgresClient.createNewUser(
      userId,
      parsedData.username,
      passwordHash,
      parsedData.email,
    );
    if (!newUser) {
      throw new AuthError("FAILED_TO_CREATE_NEW_USER");
    }

    const verificationCode =
      await postgresClient.generateEmailVerificationCode(userId);
    if (!verificationCode) {
      throw new AuthError("USER_CREATED_BUT_EMAIL_VERIFY_FAILED");
    }

    const sendemailStart = performance.now();

    const sentCode = await kafka.sendEmailVerificationCode({
      toAddress: parsedData.email,
      code: verificationCode.code,
      username: newUser.username,
    });
    if (!sentCode) {
      throw new AuthError("USER_CREATED_BUT_EMAIL_VERIFY_FAILED");
    }

    const sendemailfinish = performance.now();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    console.log(
      `register took ${registerStart - sendemailStart} milliseconds.`,
    );
    console.log(
      `sendemail took ${sendemailStart - sendemailfinish} milliseconds.`,
    );

    const returnedloginData: LoginResponse = {
      lastSentVerificationCode: undefined,
      email_verified: true,
      resendToken: "",
      success: true,
    };

    return NextResponse.json(returnedloginData, { status: 201 });
  } catch (error) {
    const { status, message } = handleError(error, "register");
    return NextResponse.json({ error: message }, { status: status });
  }
}
