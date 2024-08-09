-- AlterTable
ALTER TABLE "TextGeneration" ADD COLUMN     "edit_conversation_index" INTEGER,
ADD COLUMN     "edit_mark" TEXT,
ADD COLUMN     "regenerate_conversation_index" INTEGER,
ADD COLUMN     "regenerate_mark" TEXT;
