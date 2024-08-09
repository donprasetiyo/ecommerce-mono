'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequestRaw } from "@repo/auth";

export async function logout(pathname?: string): Promise<any> {
	"use server";
	const { session } = await validateRequestRaw(
		(cookieName) => {
			const cookie = cookies().get(cookieName);
			return cookie ? cookie.value : null
		},
		(cookieName, value, attributes) => {
			return cookies().set(cookieName, value, attributes);
		}
	);
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	if (pathname) {
		return redirect(`/login?next=${pathname}`);
	}
	return null;
}

interface ActionResult {
	error: string | null;
}