-- CreateTable
CREATE TABLE "industry_supervisors" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "industry_supervisors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "industry_supervisors_email_key" ON "industry_supervisors"("email");

-- AddForeignKey
ALTER TABLE "industry_supervisors" ADD CONSTRAINT "industry_supervisors_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
