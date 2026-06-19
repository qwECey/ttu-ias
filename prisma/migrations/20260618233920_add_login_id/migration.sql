/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loginId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "loginId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_loginId_key" ON "users"("loginId");
