/*
  Warnings:

  - The values [TOPUP,SPEND] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `expires_at` on the `Credit` table. All the data in the column will be lost.
  - You are about to drop the column `last_transaction` on the `Credit` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `ExpiredCredit` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('ADD', 'SUBTRACT', 'SUBSCRIBE_NORMAL', 'SUBSCRIBE_UPGRADE');
ALTER TABLE "Transaction" ALTER COLUMN "transaction_type" TYPE "TransactionType_new" USING ("transaction_type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ExpiredCredit" DROP CONSTRAINT "ExpiredCredit_user_id_fkey";

-- AlterTable
ALTER TABLE "Credit" DROP COLUMN "expires_at",
DROP COLUMN "last_transaction";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "subscription_type";

-- DropTable
DROP TABLE "ExpiredCredit";

-- DropEnum
DROP TYPE "SubscriptionType";
