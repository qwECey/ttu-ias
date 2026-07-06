-- CreateTable
CREATE TABLE "logbook_weeks" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "department" TEXT,
    "monday" TEXT,
    "tuesday" TEXT,
    "wednesday" TEXT,
    "thursday" TEXT,
    "friday" TEXT,
    "saturday" TEXT,
    "sunday" TEXT,
    "studentRemarks" TEXT,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "certified" BOOLEAN NOT NULL DEFAULT false,
    "supervisorRemarks" TEXT,
    "certifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logbook_weeks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logbook_weeks_studentId_weekNumber_key" ON "logbook_weeks"("studentId", "weekNumber");

-- AddForeignKey
ALTER TABLE "logbook_weeks" ADD CONSTRAINT "logbook_weeks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
