-- AlterTable
ALTER TABLE "students" ADD COLUMN     "supervisorId" TEXT;

-- CreateTable
CREATE TABLE "supervisors" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "supervisors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_email_key" ON "supervisors"("email");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
