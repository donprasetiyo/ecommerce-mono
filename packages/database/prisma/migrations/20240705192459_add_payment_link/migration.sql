-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "payment_link" TEXT NOT NULL DEFAULT 'https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=BA-4SF49719YK3527132';
