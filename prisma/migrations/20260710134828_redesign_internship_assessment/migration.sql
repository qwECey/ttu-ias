/*
  Warnings:

  - You are about to drop the column `evaluatedAt` on the `internship_assessments` table. All the data in the column will be lost.
  - You are about to drop the column `evaluatorRemarks` on the `internship_assessments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `internship_assessments` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `internship_assessments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assessment_criteria" ALTER COLUMN "maximumScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "internship_assessments" DROP COLUMN "evaluatedAt",
DROP COLUMN "evaluatorRemarks",
DROP COLUMN "status",
DROP COLUMN "submittedAt",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "generalRemarks" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "assessment_scores" (
    "id" TEXT NOT NULL,
    "internshipAssessmentId" TEXT NOT NULL,
    "assessmentCriterionId" TEXT NOT NULL,
    "score" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessment_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assessment_scores_internshipAssessmentId_idx" ON "assessment_scores"("internshipAssessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_scores_internshipAssessmentId_assessmentCriterio_key" ON "assessment_scores"("internshipAssessmentId", "assessmentCriterionId");

-- CreateIndex
CREATE INDEX "assessment_criteria_assessmentSectionId_idx" ON "assessment_criteria"("assessmentSectionId");

-- CreateIndex
CREATE INDEX "internship_assessments_internshipId_idx" ON "internship_assessments"("internshipId");

-- AddForeignKey
ALTER TABLE "assessment_scores" ADD CONSTRAINT "assessment_scores_internshipAssessmentId_fkey" FOREIGN KEY ("internshipAssessmentId") REFERENCES "internship_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_scores" ADD CONSTRAINT "assessment_scores_assessmentCriterionId_fkey" FOREIGN KEY ("assessmentCriterionId") REFERENCES "assessment_criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
