/*
  Warnings:

  - You are about to alter the column `balance` on the `Credit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `expired_amount` on the `ExpiredCredit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `total` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `unit_price` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `amount` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `vat_amount` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `vat_percentage` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `price` on the `ProductPrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `total` on the `Receipt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `unit_price` on the `ReceiptItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `amount` on the `ReceiptItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `vat_amount` on the `ReceiptItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `vat_percentage` on the `ReceiptItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(15,8)`.

*/
-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "ExpiredCredit" ALTER COLUMN "expired_amount" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "total" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "InvoiceItem" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "vat_amount" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "vat_percentage" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "ProductPrice" ALTER COLUMN "price" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "total" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "ReceiptItem" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "vat_amount" SET DATA TYPE DECIMAL(15,8),
ALTER COLUMN "vat_percentage" SET DATA TYPE DECIMAL(15,8);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(15,8);
