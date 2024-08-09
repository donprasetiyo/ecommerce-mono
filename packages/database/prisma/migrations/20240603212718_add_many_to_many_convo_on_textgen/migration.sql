-- CreateTable
CREATE TABLE "ConversationsOnTextGenerations" (
    "text_generation_id" BIGINT NOT NULL,
    "conversation_id" BIGINT NOT NULL,

    CONSTRAINT "ConversationsOnTextGenerations_pkey" PRIMARY KEY ("text_generation_id","conversation_id")
);

-- AddForeignKey
ALTER TABLE "ConversationsOnTextGenerations" ADD CONSTRAINT "ConversationsOnTextGenerations_text_generation_id_fkey" FOREIGN KEY ("text_generation_id") REFERENCES "TextGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationsOnTextGenerations" ADD CONSTRAINT "ConversationsOnTextGenerations_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
