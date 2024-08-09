/*
  Warnings:

  - Added the required column `fee_pertransaction` to the `AIModelPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIModelPrice" ADD COLUMN     "fee_pertransaction" DECIMAL(15,8) NOT NULL;
