-- AlterTable
ALTER TABLE "students" ADD COLUMN     "industrySupervisorId" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_industrySupervisorId_fkey" FOREIGN KEY ("industrySupervisorId") REFERENCES "industry_supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
