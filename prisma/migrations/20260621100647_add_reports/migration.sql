-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "activities" TEXT NOT NULL,
    "challenges" TEXT,
    "lessonsLearned" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
