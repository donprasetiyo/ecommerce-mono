/// <reference types="lucia" />

import { User } from "@repo/database";

declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = User;
  type DatabaseSessionAttributes = {};
}
