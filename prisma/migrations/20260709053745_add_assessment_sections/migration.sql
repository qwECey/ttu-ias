-- CreateTable
CREATE TABLE "assessment_sections" (
    "id" TEXT NOT NULL,
    "assessmentTemplateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessment_sections_assessmentTemplateId_sortOrder_key" ON "assessment_sections"("assessmentTemplateId", "sortOrder");

-- AddForeignKey
ALTER TABLE "assessment_sections" ADD CONSTRAINT "assessment_sections_assessmentTemplateId_fkey" FOREIGN KEY ("assessmentTemplateId") REFERENCES "assessment_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
