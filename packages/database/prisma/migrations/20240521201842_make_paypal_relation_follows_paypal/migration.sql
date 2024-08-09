/*
  Warnings:

  - You are about to drop the column `paypal_response_id` on the `PaypalCapture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaypalCapture" DROP CONSTRAINT "PaypalCapture_paypal_response_id_fkey";

-- AlterTable
ALTER TABLE "PaypalCapture" DROP COLUMN "paypal_response_id",
ADD COLUMN     "order_id" TEXT;

-- AddForeignKey
ALTER TABLE "PaypalCapture" ADD CONSTRAINT "PaypalCapture_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "PaypalResponse"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;
