import { prisma } from "@/lib/prisma";
import ReportForm from "./report-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import ReportFilter from "./report-filter";

export default async function ReportsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const student =
    await prisma.student.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!student) {
    return <div>Student not found</div>;
  }

  const reports =
    await prisma.report.findMany({
      where: {
        studentId: student.id,
      },

      orderBy: {
        submittedAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Attachment Reports
          </h1>

          <p className="mt-3 text-blue-100">
            Submit weekly, monthly and final
            attachment reports and track
            supervisor feedback.
          </p>

        </div>

        {/* Report Form */}
        <div className="rounded-3xl bg-white p-8 shadow-md">

            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Submit New Report
            </h2>

            <div className="mx-auto max-w-3xl">
              <ReportForm />
            </div>

        </div>

        {/* Submitted Reports */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">

          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Submitted Reports
          </h2>

          {reports.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center">

              <h3 className="text-lg font-semibold text-gray-700">
                No Reports Submitted
              </h3>

              <p className="mt-2 text-gray-500">
                Your submitted reports will
                appear here.
              </p>

            </div>
          ) : (
            <ReportFilter
              reports={reports.map(
                (report) => ({
                  ...report,
                  submittedAt:
                    report.submittedAt.toISOString(),
                })
              )}
            />
          )}

        </div>

      </div>
    </main>
  );
}