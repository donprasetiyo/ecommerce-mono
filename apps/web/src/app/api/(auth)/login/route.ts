import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "@node-rs/argon2";
import { LoginResponse } from "@web/app/(public)/(auth)/login/types";
import { LoginSchema, loginSchema } from "@web/app/(public)/(auth)/schema";
import { nanoid } from "nanoid";

import { lucia } from "@repo/auth";
import { emailConfiguration } from "@repo/business-config";
import { postgresClient } from "@repo/database";
import {
  AuthError,
  BadRequestError,
  handleError,
  isWithinLastHours,
} from "@repo/lib";

import { validateRequestRegular } from "~/src/auth/validateRequestRegular";
import { sendEmailVerificationCode } from "../send-email/sendEmail";

export const POST = async (request: NextRequest) => {
  const { session: existingSession } = await validateRequestRegular();

  try {
    if (existingSession) {
      throw new BadRequestError("UNAUTHORIZED");
    }

    const body = await request.json();

    const loginData: LoginSchema = {
      password: body.password,
      usernameOrEmail: body.usernameOrEmail,
    };

    const parsedLoginData = loginSchema.parse(loginData);

    const usernameOrEmail = parsedLoginData.usernameOrEmail;

    const password = parsedLoginData.password;

    const user =
      await postgresClient.getUserByUsernameOrEmailForLogin(usernameOrEmail);

    if (!user) {
      throw new AuthError("INVALID_LOGIN_CREDENTIAL");
    }

    let validPassword = false;

    try {
      validPassword = await verify(user.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
    } catch (error) {
      validPassword = false;
    }

    if (!validPassword) {
      throw new AuthError("INVALID_LOGIN_CREDENTIAL");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    if (!user.email_verified) {
      const lastSentVerificationCode =
        await postgresClient.getLastVerificationCodeSent(user.id);

      const resendToken = nanoid();

      if (lastSentVerificationCode) {
        const isWithin6Hours = isWithinLastHours(
          lastSentVerificationCode.created_at,
          emailConfiguration.requestNewEmailDelayInHour,
        );

        const returnedloginData: LoginResponse = {
          lastSentVerificationCode: lastSentVerificationCode
            ? lastSentVerificationCode.created_at
            : undefined,
          email_verified: false,
          resendToken: resendToken,
          success: true,
        };

        if (isWithin6Hours) {
          return NextResponse.json(returnedloginData, {
            headers: {
              "Set-Cookie": sessionCookie.serialize(),
            },
            status: 200,
          });
        }
      }

      const verificationCode =
        await postgresClient.generateEmailVerificationCode(user.id);
      if (!verificationCode) {
        throw new AuthError("USER_LOGGED_IN_BUT_EMAIL_VERIFY_FAILED");
      }

      const sentCode = await sendEmailVerificationCode(
        user.email,
        verificationCode.code,
        user.username,
      );
      if (!sentCode) {
        throw new AuthError("USER_LOGGED_IN_BUT_EMAIL_VERIFY_FAILED");
      }

      const returnedloginData: LoginResponse = {
        lastSentVerificationCode: verificationCode.created_at,
        email_verified: false,
        resendToken: resendToken,
        success: true,
      };


      cookies().set("resend_token", resendToken);

      return NextResponse.json(returnedloginData, {
        headers: {
          "Set-Cookie": sessionCookie.serialize(),
        },
        status: 200,
      });
    }

    const returnedloginData: LoginResponse = {
      lastSentVerificationCode: undefined,
      email_verified: true,
      resendToken: "",
      success: true,
    };

    return NextResponse.json(returnedloginData, {
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
      },
      status: 200,
    });
  } catch (error) {
    const { status, message } = handleError(error, "email verification");
    return NextResponse.json({ error: message }, { status: status });
  }
};
