import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { postgresClient } from "@repo/database";

export async function POST(request: Request) {
  const { session: existingSession } = await validateRequestAdmin();

  try {
    if (existingSession) {
      return NextResponse.json({ success: false }, { status: 201 });
    }

    const body = await request.json();
    const reset_token: string | undefined = body.reset_token;

    if (!reset_token || (reset_token && reset_token.trim() === "")) {
      return NextResponse.json({ success: false }, { status: 201 });
    }

    const token = await postgresClient.getResetPasswordToken(reset_token);

    if (!token) {
      return NextResponse.json({ success: false }, { status: 201 });
    }

    cookies().set("reset_token", reset_token);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 201 });
  }
}
