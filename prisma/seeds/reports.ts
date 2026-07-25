import { PrismaClient } from "@/lib/generated/prisma/client";
import { ReportStatus, ReportType } from "@/lib/generated/prisma/enums";

export async function seedReports(
  prisma: PrismaClient
) {
  console.log("📝 Seeding reports...");

  const students =
    await prisma.student.findMany();

  for (
    let i = 0;
    i < students.length;
    i++
  ) {
    const student =
      students[i];

    const reportTypes = [
      {
        type: ReportType.WEEKLY,
        period: 1,
      },
      {
        type: ReportType.MONTHLY,
        period: 1,
      },
      {
        type: ReportType.FINAL,
        period: null,
      },
    ];

    for (const report of reportTypes) {
      let academicStatus: ReportStatus =
  ReportStatus.PENDING;

    let industryStatus: ReportStatus =
    ReportStatus.PENDING;

      if (i % 5 === 0) {
        academicStatus =
          ReportStatus.APPROVED;

        industryStatus =
          ReportStatus.APPROVED;
      } else if (i % 7 === 0) {
        academicStatus =
          ReportStatus.REJECTED;

        industryStatus =
          ReportStatus.PENDING;
      }

      await prisma.report.create({
        data: {
          studentId:
            student.id,

          title:
            report.type ===
            ReportType.WEEKLY
              ? "Weekly Internship Report"
              : report.type ===
                ReportType.MONTHLY
              ? "Monthly Internship Report"
              : "Final Internship Report",

          reportType:
            report.type,

          periodNumber:
            report.period,

          content:
            "This report was generated automatically for demonstration purposes. It represents a student's internship activities and progress.",

          academicStatus,

          industryStatus,

          academicRemarks:
            academicStatus ===
            ReportStatus.APPROVED
              ? "Well done."
              : academicStatus ===
                ReportStatus.REJECTED
              ? "Please revise and resubmit."
              : null,

          industryRemarks:
            industryStatus ===
            ReportStatus.APPROVED
              ? "Excellent performance."
              : null,
        },
      });
    }

    if ((i + 1) % 20 === 0) {
      console.log(
        `✅ Reports created for ${i + 1} students...`
      );
    }
  }

  console.log(
    "🎉 Reports seeded successfully."
  );
}