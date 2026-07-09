-- CreateTable
CREATE TABLE "assessment_criteria" (
    "id" TEXT NOT NULL,
    "assessmentSectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "maximumScore" DECIMAL(5,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessment_criteria_assessmentSectionId_sortOrder_key" ON "assessment_criteria"("assessmentSectionId", "sortOrder");

-- AddForeignKey
ALTER TABLE "assessment_criteria" ADD CONSTRAINT "assessment_criteria_assessmentSectionId_fkey" FOREIGN KEY ("assessmentSectionId") REFERENCES "assessment_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
