import { cache } from "react";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import {
  createAppRouter,
  createCallerFactory,
  createInnerContext,
} from "@repo/api";

/**
 * This wraps the `createInnerContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const { session, user } = await validateRequestAdmin();

  return createInnerContext({
    session: session,
    user: user,
    source: "rsc",
  });
});

const appRouter = await createAppRouter();
const createCaller = createCallerFactory(appRouter);

export const api = createCaller(createContext);
