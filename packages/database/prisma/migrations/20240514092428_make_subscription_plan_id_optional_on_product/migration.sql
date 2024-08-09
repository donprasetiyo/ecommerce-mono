-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subscription_plan_id_fkey";

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "subscription_plan_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
