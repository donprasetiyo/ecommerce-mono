/*
  Warnings:

  - Added the required column `input_pertoken_price` to the `AIModelPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output_pertoken_price` to the `AIModelPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIModelPrice" ADD COLUMN     "input_pertoken_price" DECIMAL(15,8) NOT NULL,
ADD COLUMN     "output_pertoken_price" DECIMAL(15,8) NOT NULL;
