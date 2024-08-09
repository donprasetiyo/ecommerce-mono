/*
  Warnings:

  - You are about to drop the `PaypalPurchaseUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaypalCapture" DROP CONSTRAINT "PaypalCapture_purchase_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "PaypalPurchaseUnit" DROP CONSTRAINT "PaypalPurchaseUnit_order_id_fkey";

-- AlterTable
ALTER TABLE "PaypalCapture" ADD COLUMN     "paypal_response_id" BIGINT;

-- DropTable
DROP TABLE "PaypalPurchaseUnit";

-- AddForeignKey
ALTER TABLE "PaypalCapture" ADD CONSTRAINT "PaypalCapture_paypal_response_id_fkey" FOREIGN KEY ("paypal_response_id") REFERENCES "PaypalResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
