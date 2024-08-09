/*
  Warnings:

  - You are about to drop the column `downgraded_plan_id` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `upgraded_plan_id` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_downgraded_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_upgraded_plan_id_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "downgraded_plan_id",
DROP COLUMN "upgraded_plan_id";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_downgraded_to_plan_id_fkey" FOREIGN KEY ("downgraded_to_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_upgraded_to_plan_id_fkey" FOREIGN KEY ("upgraded_to_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
