export const UserStatus = {
    ACTIVE: "ACTIVE",
    DELETED: "DELETED"
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export const InvoiceStatus = {
    UNPAID: "UNPAID",
    PAID: "PAID",
    DRAFT: "DRAFT"
} as const;
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export const TransactionStatus = {
    PENDING: "PENDING",
    PAID: "PAID"
} as const;
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export const PaymentMethod = {
    PayPal: "PayPal"
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
