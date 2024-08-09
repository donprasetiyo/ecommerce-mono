/*
  Warnings:

  - Made the column `price` on table `ProductPrice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_user_id_fkey";

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "ProductPrice" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
