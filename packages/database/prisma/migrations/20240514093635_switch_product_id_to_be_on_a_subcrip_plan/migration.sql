/*
  Warnings:

  - You are about to drop the column `subscription_plan_id` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `SubscriptionPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subscription_plan_id_fkey";

-- DropIndex
DROP INDEX "Product_subscription_plan_id_key";

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subscription_plan_id";

-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "product_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_product_id_key" ON "SubscriptionPlan"("product_id");

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
