-- CreateTable
CREATE TABLE "internship_assessments" (
    "id" TEXT NOT NULL,
    "internshipId" TEXT NOT NULL,
    "assessmentTemplateId" TEXT NOT NULL,
    "status" "AssessmentStatus" NOT NULL DEFAULT 'DRAFT',
    "evaluatorRemarks" TEXT,
    "evaluatedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internship_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "internship_assessments_internshipId_assessmentTemplateId_key" ON "internship_assessments"("internshipId", "assessmentTemplateId");

-- AddForeignKey
ALTER TABLE "internship_assessments" ADD CONSTRAINT "internship_assessments_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "internships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internship_assessments" ADD CONSTRAINT "internship_assessments_assessmentTemplateId_fkey" FOREIGN KEY ("assessmentTemplateId") REFERENCES "assessment_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
