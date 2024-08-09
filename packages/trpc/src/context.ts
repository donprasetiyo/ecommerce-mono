import type { Logger } from "@repo/logging";
import { LoggerFactory } from "@repo/logging";
import {Session as LuciaSession, User as LuciaUser} from '@repo/auth'

/**
 * CONTEXT:
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

const logger: Logger = LoggerFactory.getLogger("trpc");

export interface Session extends LuciaSession{}
export interface User extends LuciaUser{}

interface CreateInnerContextOptions {
  session: Session | null;
  user: User | null;
  source: string;
}

export const createInnerContext = (opts?: CreateInnerContextOptions) => {
  const source = opts?.source ?? "unknown";
  const session = opts?.session ?? "unkown";
  logger.info("tRPC Request from source: ", source);
   logger.info("tRPC Request session: ", session);

  return {
    session: opts?.session,
    user: opts?.user
  };
};

export type Context = ReturnType<typeof createInnerContext>;
