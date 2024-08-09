/*
  Warnings:

  - You are about to drop the column `total` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `due_date` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_date` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Made the column `customer_email` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customer_name` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('UNPAID', 'PAID');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "due_date" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "invoice_date" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMPTZ(6),
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
ALTER COLUMN "customer_email" SET NOT NULL,
ALTER COLUMN "customer_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "total",
ADD COLUMN     "amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "vat_amount" DECIMAL(15,2),
ADD COLUMN     "vat_percentage" DECIMAL(15,2);
