-- AlterTable
ALTER TABLE "internships" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "industrySupervisorId" TEXT,
ADD COLUMN     "placementStatus" TEXT NOT NULL DEFAULT 'UNPLACED',
ADD COLUMN     "supervisorId" TEXT;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_industrySupervisorId_fkey" FOREIGN KEY ("industrySupervisorId") REFERENCES "industry_supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
