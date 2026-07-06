-- DropForeignKey
ALTER TABLE "placement_requests" DROP CONSTRAINT "placement_requests_companyId_fkey";

-- AlterTable
ALTER TABLE "placement_requests" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "placement_requests" ADD CONSTRAINT "placement_requests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
