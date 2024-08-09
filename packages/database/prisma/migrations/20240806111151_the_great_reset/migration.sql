-- CreateEnum
CREATE TYPE "WaitingListStatus" AS ENUM ('PENDING', 'CONTACTED', 'CONFIRMED');

-- CreateTable
CREATE TABLE "WaitingListUser" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "status" "WaitingListStatus" NOT NULL,

    CONSTRAINT "WaitingListUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitingListUser_id_key" ON "WaitingListUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WaitingListUser_email_key" ON "WaitingListUser"("email");
