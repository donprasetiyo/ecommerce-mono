/*
  Warnings:

  - A unique constraint covering the columns `[paypal_subscription_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "paypal_subscription_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paypal_subscription_id_key" ON "Subscription"("paypal_subscription_id");
