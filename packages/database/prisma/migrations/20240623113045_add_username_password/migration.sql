/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password_hash" TEXT NOT NULL DEFAULT '34933d73e2e79c6b46fc7b24137ec69ff31c31d204c792f18d9a3e4c7fea9bda',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'walter';

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
