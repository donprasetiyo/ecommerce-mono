/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "transaction_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_transaction_id_key" ON "Subscription"("transaction_id");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
