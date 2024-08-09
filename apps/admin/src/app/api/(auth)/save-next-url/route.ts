import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const next = body.next;
  cookies().set("next", next, { secure: true });

  return new Response(null, {
    status: 200,
  });
};
