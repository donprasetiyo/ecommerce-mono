-- AlterTable
ALTER TABLE "GenerationMetadata" ALTER COLUMN "input_usage" DROP DEFAULT,
ALTER COLUMN "output_usage" DROP DEFAULT,
ALTER COLUMN "total_usage" DROP DEFAULT;
