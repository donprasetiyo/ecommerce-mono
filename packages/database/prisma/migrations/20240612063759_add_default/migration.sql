-- AlterTable
ALTER TABLE "GenerationMetadata" ADD COLUMN     "input_usage" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "output_usage" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "total_usage" DECIMAL(15,8) NOT NULL DEFAULT 0;
