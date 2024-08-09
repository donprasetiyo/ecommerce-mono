-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'SUBSCRIBE';

-- DropIndex
DROP INDEX "Invoice_currency_code_key";
