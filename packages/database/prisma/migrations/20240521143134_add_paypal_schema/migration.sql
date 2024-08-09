/*
  Warnings:

  - A unique constraint covering the columns `[paypalCapturedOrderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paypalCapturedOrderId" BIGINT;

-- CreateTable
CREATE TABLE "PaypalCapturedOrder" (
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

    CONSTRAINT "PaypalCapturedOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalPaymentSource" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "source_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_status" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,

    CONSTRAINT "PaypalPaymentSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalPurchaseUnit" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "unit_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "PaypalPurchaseUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalCapture" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "capture_id" TEXT NOT NULL,
    "purchase_unit_id" TEXT NOT NULL,
    "amount_value" DECIMAL(65,30) NOT NULL,
    "amount_currency_code" TEXT NOT NULL,
    "capture_status" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL,
    "update_time" TIMESTAMP(3) NOT NULL,
    "final_capture" BOOLEAN NOT NULL,
    "seller_protection_status" TEXT NOT NULL,
    "seller_protection_dispute_categories" TEXT[],
    "seller_receivable_net_amount_value" DECIMAL(65,30) NOT NULL,
    "seller_receivable_net_amount_currency_code" TEXT NOT NULL,
    "seller_receivable_paypal_fee_value" DECIMAL(65,30) NOT NULL,
    "seller_receivable_paypal_fee_currency_code" TEXT NOT NULL,
    "seller_receivable_gross_amount_value" DECIMAL(65,30) NOT NULL,
    "seller_receivable_gross_amount_currency_code" TEXT NOT NULL,

    CONSTRAINT "PaypalCapture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapturedOrder_id_key" ON "PaypalCapturedOrder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapturedOrder_public_id_key" ON "PaypalCapturedOrder"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapturedOrder_order_id_key" ON "PaypalCapturedOrder"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPaymentSource_id_key" ON "PaypalPaymentSource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPaymentSource_public_id_key" ON "PaypalPaymentSource"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPaymentSource_order_id_key" ON "PaypalPaymentSource"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPurchaseUnit_id_key" ON "PaypalPurchaseUnit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPurchaseUnit_public_id_key" ON "PaypalPurchaseUnit"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalPurchaseUnit_unit_id_key" ON "PaypalPurchaseUnit"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapture_id_key" ON "PaypalCapture"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapture_public_id_key" ON "PaypalCapture"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalCapture_capture_id_key" ON "PaypalCapture"("capture_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_paypalCapturedOrderId_key" ON "Transaction"("paypalCapturedOrderId");

-- AddForeignKey
ALTER TABLE "PaypalPaymentSource" ADD CONSTRAINT "PaypalPaymentSource_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalCapturedOrder"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalPurchaseUnit" ADD CONSTRAINT "PaypalPurchaseUnit_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalCapturedOrder"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalCapture" ADD CONSTRAINT "PaypalCapture_purchase_unit_id_fkey" FOREIGN KEY ("purchase_unit_id") REFERENCES "PaypalPurchaseUnit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paypalCapturedOrderId_fkey" FOREIGN KEY ("paypalCapturedOrderId") REFERENCES "PaypalCapturedOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
