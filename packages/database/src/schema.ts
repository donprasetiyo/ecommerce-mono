import { z } from "zod";
import { SubscriptionType } from "@repo/shared-types";

export const subscriptionTypeSchema = z.nativeEnum(SubscriptionType);