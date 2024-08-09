-- AlterTable
ALTER TABLE "OpenAIResponse" ALTER COLUMN "response_choices_finish_reason" DROP NOT NULL,
ALTER COLUMN "response_choices_message_role" DROP NOT NULL,
ALTER COLUMN "response_choices_logprops" DROP NOT NULL,
ALTER COLUMN "response_usage_completion_tokens" DROP NOT NULL,
ALTER COLUMN "response_usage_prompt_tokens" DROP NOT NULL,
ALTER COLUMN "response_usage_total_tokens" DROP NOT NULL;
