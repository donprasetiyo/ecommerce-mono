/*
  Warnings:

  - The values [CREDIT_PURCHASE,SUBSCRIPTION_PAYMENT] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `generation_url` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `input_url` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `output_url` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `tool_id` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `next_billing_date` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Moderation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[number]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[currency_code]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plan_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renewed_subscription_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[upgraded_plan_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[downgraded_plan_id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,starts_at,ends_at]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generation_metadata_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currency_code` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cancelled_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downgraded_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downgraded_plan_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ends_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renewed_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upgraded_at` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upgraded_plan_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('FINISHED', 'INTERRUPTED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "ModelSource" AS ENUM ('OPENAI', 'REPLICATE');

-- CreateEnum
CREATE TYPE "SubcriptionStatus" AS ENUM ('INACTIVE', 'ACTIVE', 'CANCELED');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('ADD', 'SUBTRACT');
ALTER TABLE "Transaction" ALTER COLUMN "transaction_type" TYPE "TransactionType_new" USING ("transaction_type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_tool_id_fkey";

-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Moderation" DROP CONSTRAINT "Moderation_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "Moderation" DROP CONSTRAINT "Moderation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_user_id_fkey";

-- DropIndex
DROP INDEX "Generation_tool_id_idx";

-- DropIndex
DROP INDEX "Generation_user_id_idx";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "generation_url",
DROP COLUMN "input_url",
DROP COLUMN "output_url",
DROP COLUMN "status",
DROP COLUMN "tool_id",
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "currency_code" VARCHAR(3) NOT NULL,
ADD COLUMN     "customer_address_line_1" TEXT,
ADD COLUMN     "customer_address_line_2" TEXT,
ADD COLUMN     "customer_city" TEXT,
ADD COLUMN     "customer_country" TEXT,
ADD COLUMN     "customer_email" TEXT,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT,
ADD COLUMN     "customer_postal_code" TEXT,
ADD COLUMN     "number" BIGINT NOT NULL,
ADD COLUMN     "total" DECIMAL(15,2) NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "customer_address_line_1" TEXT,
ADD COLUMN     "customer_address_line_2" TEXT,
ADD COLUMN     "customer_city" TEXT,
ADD COLUMN     "customer_country" TEXT,
ADD COLUMN     "customer_email" TEXT,
ADD COLUMN     "customer_name" TEXT,
ADD COLUMN     "customer_postal_code" TEXT,
ADD COLUMN     "total" DECIMAL(15,2) NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expires_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "next_billing_date",
DROP COLUMN "plan",
ADD COLUMN     "cancelled_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "downgraded_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "downgraded_plan_id" BIGINT NOT NULL,
ADD COLUMN     "ends_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "invoice_id" BIGINT NOT NULL,
ADD COLUMN     "plan_id" BIGINT NOT NULL,
ADD COLUMN     "renewed_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "renewed_subscription_id" BIGINT,
ADD COLUMN     "starts_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "upgraded_at" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "upgraded_plan_id" BIGINT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SubcriptionStatus" NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "generation_metadata_id" BIGINT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord_email" TEXT,
ADD COLUMN     "discord_global_name" TEXT,
ADD COLUMN     "discord_locale" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- DropTable
DROP TABLE "Moderation";

-- DropTable
DROP TABLE "Tool";

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "Currency" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" VARCHAR(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subscription_plan_id" BIGINT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_date" TIMESTAMPTZ(6) NOT NULL,
    "to_date" TIMESTAMPTZ(6) NOT NULL,
    "price" DECIMAL(15,2),
    "currency_code" VARCHAR(3) NOT NULL,
    "product_id" BIGINT NOT NULL,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "billing_interval" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextOutput" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "status" "GenerationStatus" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "content" TEXT NOT NULL,
    "text_input_id" BIGINT NOT NULL,
    "text_generation_id" BIGINT NOT NULL,

    CONSTRAINT "TextOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextInput" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "content" TEXT NOT NULL,
    "text_generation_id" BIGINT NOT NULL,

    CONSTRAINT "TextInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextGeneration" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "status" "GenerationStatus" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "generation_id" BIGINT NOT NULL,
    "conversation_id" BIGINT,

    CONSTRAINT "TextGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenerationMetadata" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "generation_id" BIGINT NOT NULL,
    "model_name" TEXT NOT NULL,
    "model_source" "ModelSource" NOT NULL,

    CONSTRAINT "GenerationMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenAIResponse" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "response_choices_finish_reason" TEXT NOT NULL,
    "response_choices_index" INTEGER NOT NULL,
    "response_choices_message_content" TEXT NOT NULL,
    "response_choices_message_role" TEXT NOT NULL,
    "response_choices_logprops" TEXT NOT NULL,
    "response_created" BIGINT NOT NULL,
    "response_id" TEXT NOT NULL,
    "response_model" TEXT NOT NULL,
    "response_object" TEXT NOT NULL,
    "response_usage_completion_tokens" INTEGER NOT NULL,
    "response_usage_prompt_tokens" INTEGER NOT NULL,
    "response_usage_total_tokens" INTEGER NOT NULL,
    "generation_metadata_id" BIGINT,

    CONSTRAINT "OpenAIResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplicateResponse" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "prediction_official_model_name" TEXT NOT NULL,
    "prediction_id" TEXT NOT NULL,
    "prediction_status" TEXT NOT NULL,
    "prediction_hardware" TEXT NOT NULL,
    "prediction_created" TIMESTAMPTZ(6) NOT NULL,
    "prediction_input_prompt" TEXT NOT NULL,
    "prediction_input_template" TEXT NOT NULL,
    "prediction_logs" TEXT NOT NULL,
    "prediction_metrics_total_time" DECIMAL(65,30) NOT NULL,
    "prediction_metrics_input_token_count" INTEGER NOT NULL,
    "prediction_metrics_tokens_per_second" DECIMAL(65,30) NOT NULL,
    "prediction_metrics_output_token_count" INTEGER NOT NULL,
    "prediction_metrics_predict_time" DECIMAL(65,30) NOT NULL,
    "generation_metadata_id" BIGINT,

    CONSTRAINT "ReplicateResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiptItem" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(15,2) NOT NULL,
    "total" DECIMAL(15,2) NOT NULL,
    "receipt_id" BIGINT,

    CONSTRAINT "ReceiptItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(15,2) NOT NULL,
    "total" DECIMAL(15,2) NOT NULL,
    "product_id" BIGINT NOT NULL,
    "invoice_id" BIGINT NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_public_id_key" ON "Currency"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_public_id_key" ON "Product"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_subscription_plan_id_key" ON "Product"("subscription_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_id_key" ON "ProductPrice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_public_id_key" ON "ProductPrice"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_currency_code_key" ON "ProductPrice"("currency_code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_product_id_key" ON "ProductPrice"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_product_id_currency_code_from_date_to_date_key" ON "ProductPrice"("product_id", "currency_code", "from_date", "to_date");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_id_key" ON "SubscriptionPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_public_id_key" ON "SubscriptionPlan"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextOutput_id_key" ON "TextOutput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TextOutput_public_id_key" ON "TextOutput"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextOutput_text_input_id_key" ON "TextOutput"("text_input_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextOutput_text_generation_id_key" ON "TextOutput"("text_generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextInput_id_key" ON "TextInput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TextInput_public_id_key" ON "TextInput"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextInput_text_generation_id_key" ON "TextInput"("text_generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextGeneration_id_key" ON "TextGeneration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TextGeneration_public_id_key" ON "TextGeneration"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "TextGeneration_generation_id_key" ON "TextGeneration"("generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationMetadata_id_key" ON "GenerationMetadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationMetadata_public_id_key" ON "GenerationMetadata"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationMetadata_generation_id_key" ON "GenerationMetadata"("generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "OpenAIResponse_id_key" ON "OpenAIResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OpenAIResponse_public_id_key" ON "OpenAIResponse"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "OpenAIResponse_generation_metadata_id_key" ON "OpenAIResponse"("generation_metadata_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReplicateResponse_id_key" ON "ReplicateResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReplicateResponse_public_id_key" ON "ReplicateResponse"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReplicateResponse_generation_metadata_id_key" ON "ReplicateResponse"("generation_metadata_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptItem_id_key" ON "ReceiptItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptItem_public_id_key" ON "ReceiptItem"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceItem_id_key" ON "InvoiceItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceItem_public_id_key" ON "InvoiceItem"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceItem_product_id_key" ON "InvoiceItem"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceItem_invoice_id_key" ON "InvoiceItem"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_currency_code_key" ON "Invoice"("currency_code");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_plan_id_key" ON "Subscription"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_invoice_id_key" ON "Subscription"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_renewed_subscription_id_key" ON "Subscription"("renewed_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_upgraded_plan_id_key" ON "Subscription"("upgraded_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_downgraded_plan_id_key" ON "Subscription"("downgraded_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_starts_at_ends_at_key" ON "Subscription"("user_id", "starts_at", "ends_at");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_generation_metadata_id_key" ON "Transaction"("generation_metadata_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_renewed_subscription_id_fkey" FOREIGN KEY ("renewed_subscription_id") REFERENCES "Subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_upgraded_plan_id_fkey" FOREIGN KEY ("upgraded_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_downgraded_plan_id_fkey" FOREIGN KEY ("downgraded_plan_id") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextOutput" ADD CONSTRAINT "TextOutput_text_input_id_fkey" FOREIGN KEY ("text_input_id") REFERENCES "TextInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextOutput" ADD CONSTRAINT "TextOutput_text_generation_id_fkey" FOREIGN KEY ("text_generation_id") REFERENCES "TextGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextInput" ADD CONSTRAINT "TextInput_text_generation_id_fkey" FOREIGN KEY ("text_generation_id") REFERENCES "TextGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextGeneration" ADD CONSTRAINT "TextGeneration_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextGeneration" ADD CONSTRAINT "TextGeneration_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenerationMetadata" ADD CONSTRAINT "GenerationMetadata_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenAIResponse" ADD CONSTRAINT "OpenAIResponse_generation_metadata_id_fkey" FOREIGN KEY ("generation_metadata_id") REFERENCES "GenerationMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplicateResponse" ADD CONSTRAINT "ReplicateResponse_generation_metadata_id_fkey" FOREIGN KEY ("generation_metadata_id") REFERENCES "GenerationMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_generation_metadata_id_fkey" FOREIGN KEY ("generation_metadata_id") REFERENCES "GenerationMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptItem" ADD CONSTRAINT "ReceiptItem_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
