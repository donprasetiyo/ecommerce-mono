-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('NORMAL', 'UPGRADE');

-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "expires_at" TIMESTAMPTZ(6),
ADD COLUMN     "last_transaction" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "subscription_type" "SubscriptionType";

-- CreateTable
CREATE TABLE "ExpiredCredit" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "expired_amount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_date" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ExpiredCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpiredCredit_id_key" ON "ExpiredCredit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExpiredCredit_public_id_key" ON "ExpiredCredit"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExpiredCredit_user_id_key" ON "ExpiredCredit"("user_id");

-- CreateIndex
CREATE INDEX "ExpiredCredit_user_id_idx" ON "ExpiredCredit"("user_id");

-- AddForeignKey
ALTER TABLE "ExpiredCredit" ADD CONSTRAINT "ExpiredCredit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
