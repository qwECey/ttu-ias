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

        <h1 className="mb-6 text-3xl font-bold">
          All Reports
        </h1>

        <ReportFilter
            reports={reports.map(
                (report) => ({
                id: report.id,
                title: report.title,
                reportType:
                    report.reportType,
                status: report.status,
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