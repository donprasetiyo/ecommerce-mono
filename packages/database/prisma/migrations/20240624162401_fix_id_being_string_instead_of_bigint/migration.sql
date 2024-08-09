/*
  Warnings:

  - The primary key for the `EmailVerificationCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EmailVerificationCode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EmailVerificationCode" DROP CONSTRAINT "EmailVerificationCode_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "EmailVerificationCode_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationCode_id_key" ON "EmailVerificationCode"("id");
