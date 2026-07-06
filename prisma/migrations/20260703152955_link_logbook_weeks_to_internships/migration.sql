-- AlterTable
ALTER TABLE "logbook_weeks" ADD COLUMN     "internshipId" TEXT;

-- AddForeignKey
ALTER TABLE "logbook_weeks" ADD CONSTRAINT "logbook_weeks_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "internships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
