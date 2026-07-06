/*
  Warnings:

  - The `status` column on the `placement_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `approvedAt` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorRemarks` on the `reports` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlacementRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "placement_requests" DROP COLUMN "status",
ADD COLUMN     "status" "PlacementRequestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "approvedAt",
DROP COLUMN "status",
DROP COLUMN "supervisorRemarks",
ADD COLUMN     "academicRemarks" TEXT,
ADD COLUMN     "academicReviewedAt" TIMESTAMP(3),
ADD COLUMN     "academicStatus" "ReportStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "industryRemarks" TEXT,
ADD COLUMN     "industryReviewedAt" TIMESTAMP(3),
ADD COLUMN     "industryStatus" "ReportStatus" NOT NULL DEFAULT 'PENDING';
