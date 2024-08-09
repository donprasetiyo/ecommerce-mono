/*
  Warnings:

  - The `model_source` column on the `GenerationMetadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GenerationMetadata" DROP COLUMN "model_source",
ADD COLUMN     "model_source" TEXT NOT NULL DEFAULT '';
