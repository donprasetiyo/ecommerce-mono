import { createKafka } from "@repo/api";
import 'server-only'

export const kafka = await createKafka();