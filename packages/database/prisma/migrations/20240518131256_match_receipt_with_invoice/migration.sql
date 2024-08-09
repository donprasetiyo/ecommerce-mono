/*
  Warnings:

  - You are about to drop the column `total` on the `ReceiptItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `ReceiptItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receipt_id]` on the table `ReceiptItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receipt_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currency_code` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid_at` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `ReceiptItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ReceiptItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `receipt_id` on table `ReceiptItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ReceiptItem" DROP CONSTRAINT "ReceiptItem_receipt_id_fkey";

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "currency_code" VARCHAR(3) NOT NULL,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "ReceiptItem" DROP COLUMN "total",
ADD COLUMN     "amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "product_id" BIGINT NOT NULL,
ADD COLUMN     "vat_amount" DECIMAL(15,2),
ADD COLUMN     "vat_percentage" DECIMAL(15,2),
ALTER COLUMN "receipt_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "receipt_id" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptItem_product_id_key" ON "ReceiptItem"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptItem_receipt_id_key" ON "ReceiptItem"("receipt_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_receipt_id_key" ON "Subscription"("receipt_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReceiptItem" ADD CONSTRAINT "ReceiptItem_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReceiptItem" ADD CONSTRAINT "ReceiptItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
