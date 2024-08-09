/*
  Warnings:

  - The `payment_method` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_method` column on the `Receipt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PayPal');

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod";

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod";
