export const UserStatus = {
    ACTIVE: "ACTIVE",
    DELETED: "DELETED"
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export const GenerationStatus = {
    FINISHED: "FINISHED",
    INTERRUPTED: "INTERRUPTED"
} as const;
export type GenerationStatus = (typeof GenerationStatus)[keyof typeof GenerationStatus];
export const AIModelPricingBasedOn = {
    TOKEN: "TOKEN",
    TIME: "TIME"
} as const;
export type AIModelPricingBasedOn = (typeof AIModelPricingBasedOn)[keyof typeof AIModelPricingBasedOn];
export const SubscriptionType = {
    NORMAL: "NORMAL",
    UPGRADE: "UPGRADE"
} as const;
export type SubscriptionType = (typeof SubscriptionType)[keyof typeof SubscriptionType];
export const SubcriptionStatus = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    CANCELED: "CANCELED",
    UPGRADED: "UPGRADED"
} as const;
export type SubcriptionStatus = (typeof SubcriptionStatus)[keyof typeof SubcriptionStatus];
export const InvoiceStatus = {
    UNPAID: "UNPAID",
    PAID: "PAID",
    DRAFT: "DRAFT"
} as const;
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export const TransactionType = {
    TOPUP: "TOPUP",
    SPEND: "SPEND",
    SUBSCRIBE: "SUBSCRIBE"
} as const;
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export const TransactionStatus = {
    PENDING: "PENDING",
    PAID: "PAID"
} as const;
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export const PaymentMethod = {
    PayPal: "PayPal"
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export const WaitingListStatus = {
    PENDING: "PENDING",
    CONTACTED: "CONTACTED",
    CONFIRMED: "CONFIRMED"
} as const;
export type WaitingListStatus = (typeof WaitingListStatus)[keyof typeof WaitingListStatus];
