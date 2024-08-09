/*
  Warnings:

  - Added the required column `transaction_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transaction_status" "TransactionStatus" NOT NULL;
