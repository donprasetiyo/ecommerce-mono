-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "features" TEXT[],
ADD COLUMN     "includesUpcomingFeatures" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "note" TEXT NOT NULL DEFAULT ' ';
