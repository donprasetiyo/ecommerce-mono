
import { postgresClient } from "@repo/database";
import { Session as DBSession, User as DBUser } from "@repo/shared-types";
import { Lucia, User as LuciaGeneratedUser, Session as LuciaGeneratedSession } from "lucia";

export const lucia = new Lucia(postgresClient.adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			discord_user_id: attributes.discord_user_id,
			discord_username: attributes.discord_username,
			discord_avatar_id: attributes.discord_avatar_id,
			currency_code: attributes.currency_code as unknown as string,
			email_verified: attributes.email_verified,
			email: attributes.email,
			role_name: attributes.role_name
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DBUser;
		DatabaseSessionAttributes: DBSession | {};
	}
}

export type User = LuciaGeneratedUser;
export type Session = LuciaGeneratedSession;

interface DatabaseSessionAttributes {
	discord_user_id: number;
	discord_username: string;
	discord_avatar_id: string;
}

