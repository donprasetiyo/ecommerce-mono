-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "cancelled_at" DROP NOT NULL,
ALTER COLUMN "downgraded_at" DROP NOT NULL,
ALTER COLUMN "downgraded_plan_id" DROP NOT NULL,
ALTER COLUMN "renewed_at" DROP NOT NULL,
ALTER COLUMN "upgraded_at" DROP NOT NULL,
ALTER COLUMN "upgraded_plan_id" DROP NOT NULL;
