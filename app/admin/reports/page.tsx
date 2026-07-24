import { prisma } from "@/lib/prisma";
import ReportFilter from "./report-filter";

export default async function AdminReportsPage() {
  const reports =
    await prisma.report.findMany({
      include: {
        student: true,
      },

      orderBy: {
        submittedAt: "desc",
      },
    });

  const totalReports =
    reports.length;

  const pendingReports =
    reports.filter(
      (report) =>
        report.academicStatus === "PENDING" ||
        report.industryStatus === "PENDING"
    ).length;

  const approvedReports =
    reports.filter(
      (report) =>
        report.academicStatus === "APPROVED" &&
        report.industryStatus === "APPROVED"
    ).length;

  const rejectedReports =
    reports.filter(
      (report) =>
        report.academicStatus === "REJECTED" ||
        report.industryStatus === "REJECTED"
    ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-purple-600 to-purple-800 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Student Reports
          </h1>

          <p className="mt-3 text-purple-100">
            Monitor student submissions and approvals.
          </p>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Reports
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {totalReports}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-600">
              {pendingReports}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Approved
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {approvedReports}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <h2 className="mt-2 text-4xl font-bold text-red-600">
              {rejectedReports}
            </h2>

          </div>

        </div>

        {/* Reports */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <ReportFilter
            reports={reports.map(
              (report) => ({
                ...report,
                submittedAt:
                  report.submittedAt.toISOString(),
              })
            )}
          />

        </div>

      </div>

    </main>
  );
}