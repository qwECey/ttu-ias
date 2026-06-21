/*
  Warnings:

  - You are about to drop the column `activities` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `challenges` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `lessonsLearned` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `weekNumber` on the `reports` table. All the data in the column will be lost.
  - Added the required column `content` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportType` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('WEEKLY', 'MONTHLY', 'FINAL');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "activities",
DROP COLUMN "challenges",
DROP COLUMN "lessonsLearned",
DROP COLUMN "weekNumber",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "reportType" "ReportType" NOT NULL,
ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "supervisorRemarks" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
