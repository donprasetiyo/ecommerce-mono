import { cache } from "react";
import { cookies } from "next/headers";

import { validateRequestRaw } from "@repo/auth";

export const validateRequestAdmin = cache(async () =>
  validateRequestRaw(
    (cookieName) => {
      const cookie = cookies().get(cookieName);
      return cookie ? cookie.value : null;
    },
    (cookieName, value, attributes) => {
      return cookies().set(cookieName, value, attributes);
    },
  ),
);
