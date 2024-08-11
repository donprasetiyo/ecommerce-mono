import { Insertable, Selectable, Updateable } from "kysely";
import { DB } from "./types";

export type SelectableDB = {
  [K in keyof DB]: Selectable<DB[K]>;
};
export type InsertableDB = {
  [K in keyof DB]: Insertable<DB[K]>;
};
export type UpdateableDB = {
  [K in keyof DB]: Updateable<DB[K]>;
};