/*
  Warnings:

  - You are about to drop the column `paypalCapturedOrderId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `PaypalCapturedOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paypal_response_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PaypalPaymentSource" DROP CONSTRAINT "PaypalPaymentSource_order_id_fkey";

-- DropForeignKey
ALTER TABLE "PaypalPurchaseUnit" DROP CONSTRAINT "PaypalPurchaseUnit_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paypalCapturedOrderId_fkey";

-- DropIndex
DROP INDEX "Transaction_paypalCapturedOrderId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paypalCapturedOrderId",
ADD COLUMN     "paypal_response_id" BIGINT;

-- DropTable
DROP TABLE "PaypalCapturedOrder";

-- CreateTable
CREATE TABLE "PaypalResponse" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payer_id" TEXT NOT NULL,
    "payer_email" TEXT NOT NULL,
    "payer_given_name" TEXT NOT NULL,
    "payer_surname" TEXT NOT NULL,
    "payer_country" TEXT NOT NULL,

    CONSTRAINT "PaypalResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaypalResponse_id_key" ON "PaypalResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalResponse_public_id_key" ON "PaypalResponse"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalResponse_order_id_key" ON "PaypalResponse"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_paypal_response_id_key" ON "Transaction"("paypal_response_id");

-- AddForeignKey
ALTER TABLE "PaypalPaymentSource" ADD CONSTRAINT "PaypalPaymentSource_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalResponse"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalPurchaseUnit" ADD CONSTRAINT "PaypalPurchaseUnit_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalResponse"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paypal_response_id_fkey" FOREIGN KEY ("paypal_response_id") REFERENCES "PaypalResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
