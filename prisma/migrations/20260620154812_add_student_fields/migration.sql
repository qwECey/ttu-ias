-- AlterTable
ALTER TABLE "students" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "placementStatus" TEXT NOT NULL DEFAULT 'UNPLACED';
