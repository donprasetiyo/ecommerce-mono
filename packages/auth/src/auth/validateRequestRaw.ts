import { CookieAttributes } from "lucia";
import { Session, User } from "lucia";
import { lucia } from "./lucia";

export const validateRequestRaw = async (getCookies: (cookieName: any) => string | null, setCookies?: (cookieName: string, value: string, attributes: CookieAttributes) => void, setSerializedCookie?: (cookieName: string, serializedCookie: string) => void): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
	const sessionId = getCookies(lucia.sessionCookieName) ?? null;

	if (!sessionId) {
		return {
			user: null,
			session: null
		};
	}

	const result = await lucia.validateSession(sessionId);

	// next.js throws when you attempt to set cookie when rendering page
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			if (setCookies) setCookies(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			if (setSerializedCookie) setSerializedCookie(sessionCookie.name, lucia.createSessionCookie(result.session.id).serialize());
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			const sessionCookieSerialized = sessionCookie.serialize()
			if (setCookies) setCookies(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			if (setSerializedCookie && sessionCookie) setSerializedCookie(sessionCookie.name, sessionCookieSerialized);
		}
	} catch { }

	return result;
}