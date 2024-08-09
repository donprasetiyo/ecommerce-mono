/*
  Warnings:

  - Made the column `invoice_id` on table `InvoiceItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InvoiceItem" ALTER COLUMN "invoice_id" SET NOT NULL;
