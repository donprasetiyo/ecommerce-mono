/*
  Warnings:

  - You are about to drop the column `purchase_unit_id` on the `PaypalCapture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaypalCapture" DROP COLUMN "purchase_unit_id";
