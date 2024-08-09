import { z } from "zod";

export const paymentItemSchema = z.object({
  amount: z.number().nullish(),
  created_at: z.string().nullish(),
  name: z.string().nullish(),
  quantity: z.number().nullish(),
  unit_price: z.number().nullish(),
  vat_amount: z.string().nullish(),
  vat_percentage: z.string().nullish(),
});

export const invoiceSchema = z.object({
  invoice_id: z.string().nullish(),
  invoice_created_at: z.date().nullish(),
  invoice_currency_code: z.string().nullish(),
  invoice_customer_address_line_1: z.string().nullish(),
  invoice_customer_address_line_2: z.string().nullish(),
  invoice_customer_city: z.string().nullish(),
  invoice_customer_country: z.string().nullish(),
  invoice_customer_email: z.string().nullish(),
  invoice_customer_id: z.string().nullish(),
  invoice_customer_name: z.string().nullish(),
  invoice_customer_postal_code: z.string().nullish(),
  invoice_description: z.string().nullish(),
  invoice_due_date: z.date().nullish(),
  invoice_invoice_date: z.date().nullish(),
  invoice_paid_at: z.date().nullish(),
  invoice_status: z.string().nullish(),
  invoice_total: z.string().nullish(),
  invoice_date: z.date().nullish(),
  invoice_public_id: z.string().nullish(),
  invoice_payment_method: z.string().nullish(),
  invoice_payment_link: z.string().nullish(),
  invoiceitems: z.array(paymentItemSchema),
});

export const receiptSchema = z.object({
  receipt_id: z.string().nullish(),
  receipt_created_at: z.date().nullish(),
  receipt_currency_code: z.string().nullish(),
  receipt_customer_address_line_1: z.string().nullish(),
  receipt_customer_address_line_2: z.string().nullish(),
  receipt_customer_city: z.string().nullish(),
  receipt_customer_country: z.string().nullish(),
  receipt_customer_email: z.string().nullish(),
  receipt_customer_id: z.string().nullish(),
  receipt_customer_name: z.string().nullish(),
  receipt_customer_postal_code: z.string().nullish(),
  receipt_description: z.string().nullish(),
  receipt_paid_at: z.date().nullish(),
  receipt_total: z.string().nullish(),
  receipt_public_id: z.string().nullish(),
  receipt_invoice_number: z.string().nullish(),
  receipt_payment_method: z.string().nullish(),
  receipt_number: z.string().nullish(),
  receiptitems: z.array(paymentItemSchema),
});

export const billingHistoryMetaSchema = z.object({
  invoice_number: z.string().nullish(),
  invoiceitem_name: z.string().nullish(),
  transaction_status: z.string().nullish(),
  transaction_amount: z.string().nullish(),
  transaction_created_at: z.date().nullish(),
});

export const billingHistorySchema = billingHistoryMetaSchema
  .and(invoiceSchema)
  .and(receiptSchema);

export const billingHistoryArraySchema = z.array(billingHistorySchema);

export type BillingHistory = z.infer<typeof billingHistorySchema>;
export type InvoiceSchema = z.infer<typeof invoiceSchema>;
export type ReceiptSchema = z.infer<typeof receiptSchema>;
export type PaymentItemSchema = z.infer<typeof paymentItemSchema>;
