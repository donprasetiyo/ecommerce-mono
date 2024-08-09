/*
  Warnings:

  - You are about to drop the column `net` on the `GenerationMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `GenerationMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerationMetadata" DROP COLUMN "net",
DROP COLUMN "revenue";
