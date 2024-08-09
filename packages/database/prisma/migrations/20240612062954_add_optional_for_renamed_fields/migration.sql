-- AlterTable
ALTER TABLE "GenerationMetadata" ALTER COLUMN "input_token_price" DROP NOT NULL,
ALTER COLUMN "output_token_price" DROP NOT NULL,
ALTER COLUMN "total_token_price" DROP NOT NULL;
