/*
  Warnings:

  - You are about to drop the column `model_fee` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `model_net` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `model_price` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `model_revenue` on the `GenerationMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerationMetadata" DROP COLUMN "model_fee",
DROP COLUMN "model_net",
DROP COLUMN "model_price",
DROP COLUMN "model_revenue",
ADD COLUMN     "currency_code" VARCHAR(3) NOT NULL DEFAULT 'USD',
ADD COLUMN     "fee_pertransaction" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "input" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "input_pertoken_price" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "input_token" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "input_token_price" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "net" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "output" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "output_pertoken_price" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "output_token" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "output_token_price" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "revenue" DECIMAL(15,8) NOT NULL DEFAULT 0,
ADD COLUMN     "total_token" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_token_price" DECIMAL(15,8) NOT NULL DEFAULT 0;
