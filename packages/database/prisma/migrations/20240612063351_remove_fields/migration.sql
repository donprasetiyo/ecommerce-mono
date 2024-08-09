/*
  Warnings:

  - You are about to drop the column `input_token_price` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `output_token_price` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `total_token_price` on the `GenerationMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerationMetadata" DROP COLUMN "input_token_price",
DROP COLUMN "output_token_price",
DROP COLUMN "total_token_price";
