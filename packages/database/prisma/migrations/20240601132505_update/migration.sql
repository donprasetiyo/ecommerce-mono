-- CreateEnum
CREATE TYPE "AIModelPricingBasedOn" AS ENUM ('TOKEN', 'TIME');

-- AlterTable
ALTER TABLE "GenerationMetadata" ADD COLUMN     "model_fee" DECIMAL(15,8),
ADD COLUMN     "model_net" DECIMAL(15,8),
ADD COLUMN     "model_price" DECIMAL(15,8),
ADD COLUMN     "model_revenue" DECIMAL(15,8),
ALTER COLUMN "model_source" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AIModel" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "price_based_on" "AIModelPricingBasedOn" NOT NULL,

    CONSTRAINT "AIModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIModelPrice" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "from_date" TIMESTAMPTZ(6) NOT NULL,
    "to_date" TIMESTAMPTZ(6) NOT NULL,
    "price" DECIMAL(15,8) NOT NULL,
    "fee" DECIMAL(15,8) NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "model_id" BIGINT NOT NULL,

    CONSTRAINT "AIModelPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIModel_id_key" ON "AIModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AIModel_public_id_key" ON "AIModel"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "AIModel_name_key" ON "AIModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AIModelPrice_id_key" ON "AIModelPrice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AIModelPrice_public_id_key" ON "AIModelPrice"("public_id");

-- AddForeignKey
ALTER TABLE "AIModelPrice" ADD CONSTRAINT "AIModelPrice_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AIModelPrice" ADD CONSTRAINT "AIModelPrice_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "AIModel"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
