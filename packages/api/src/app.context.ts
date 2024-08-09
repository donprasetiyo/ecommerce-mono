import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { FastifyRequest } from "fastify";
import { Injectable } from "@nestjs/common";

import type { Logger } from "@repo/logging";
import { LoggerFactory } from "@repo/logging";
import { createInnerContext } from "@repo/trpc";
import { validateRequestRaw } from "@repo/auth";

@Injectable()
export class AppContextFactory {
  private readonly logger: Logger =
    LoggerFactory.getLogger("AppContextFactory");

  create() {
    return async ({ req, res }: CreateFastifyContextOptions) => {
      const source = this.getSource(req);

      // Authentication Logic:
      // - Get JWT access token from `req` object, validate and then populate session if valid.

      const { session, user } = await validateRequestRaw(
        (cookieName) => {
          const cookieObject = req.headers.cookie;
          const cookie = cookieObject ? cookieObject[cookieName] : null;
          return cookie ? cookie : null
        },
        undefined,
        (cookieName,value) => {
          return res.header('set-cookie', value)
        }
      );

      return createInnerContext({
        session: session,
        user: user,
        source,
      });
    };
  }

  getSource(req: FastifyRequest): string {
    const source = req.headers["x-trpc-source"];

    if (!source) {
      return "unknown";
    } else if (typeof source === "string") {
      return source;
    } else if (source.length > 0) {
      return source[0] ?? "unknown";
    } else {
      return "unknown";
    }
  }
}
