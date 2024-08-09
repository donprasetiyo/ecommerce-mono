-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "downgraded_to_plan_id" BIGINT,
ADD COLUMN     "upgraded_to_plan_id" BIGINT;
