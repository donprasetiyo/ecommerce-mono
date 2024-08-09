-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "payment_method" TEXT;

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "payment_method" TEXT;
