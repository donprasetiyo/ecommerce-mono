/*
  Warnings:

  - You are about to drop the column `messages` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_user_id_fkey";

-- DropIndex
DROP INDEX "Conversation_user_id_idx";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "messages",
DROP COLUMN "title",
DROP COLUMN "user_id";
