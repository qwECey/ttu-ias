/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `industry_supervisors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `industry_supervisors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'INDUSTRY_SUPERVISOR';

-- AlterTable
ALTER TABLE "industry_supervisors" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "industry_supervisors_userId_key" ON "industry_supervisors"("userId");

-- AddForeignKey
ALTER TABLE "industry_supervisors" ADD CONSTRAINT "industry_supervisors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
