/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `supervisors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "supervisors" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_userId_key" ON "supervisors"("userId");

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
