-- DropForeignKey
ALTER TABLE "PaypalPaymentSource" DROP CONSTRAINT "PaypalPaymentSource_order_id_fkey";

-- AlterTable
ALTER TABLE "PaypalPaymentSource" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PaypalPaymentSource" ADD CONSTRAINT "PaypalPaymentSource_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalResponse"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;
