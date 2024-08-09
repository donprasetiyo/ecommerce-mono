-- AlterTable
ALTER TABLE "AIModel" ADD COLUMN     "label" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "public_name" TEXT NOT NULL DEFAULT '';
