import { prisma } from "@/lib/prisma";
import ReportFilter from "./report-filter";

export default async function LiaisonReportsPage() {
  const reports =
    await prisma.report.findMany({
      include: {
        student: true,
      },

      orderBy: {
        submittedAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            All Reports
          </h1>

          <p className="mt-2 text-gray-500">
            View and filter reports submitted by all students.
          </p>

        </div>

        <ReportFilter
          reports={reports.map(
            (report) => ({
              id: report.id,
              title: report.title,
              reportType:
                report.reportType,
              academicStatus:
                report.academicStatus,
              industryStatus:
                report.industryStatus,
              submittedAt:
                report.submittedAt.toISOString(),
              studentName:
                report.student.fullName,
            })
          )}
        />

      </div>

    </main>
  );
}