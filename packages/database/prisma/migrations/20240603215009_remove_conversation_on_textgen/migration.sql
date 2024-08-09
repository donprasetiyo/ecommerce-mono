/*
  Warnings:

  - You are about to drop the column `conversation_id` on the `TextGeneration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TextGeneration" DROP CONSTRAINT "TextGeneration_conversation_id_fkey";

-- AlterTable
ALTER TABLE "TextGeneration" DROP COLUMN "conversation_id";
