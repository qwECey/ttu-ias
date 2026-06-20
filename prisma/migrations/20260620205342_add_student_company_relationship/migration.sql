-- AlterTable
ALTER TABLE "students" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
