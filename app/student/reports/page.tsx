import { prisma } from "@/lib/prisma";
import ReportForm from "./report-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

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
    <main className="p-8">
      <h1 className="mb-2 text-3xl font-bold">
        Submit Attachment Report
      </h1>

      <p className="mb-8 text-gray-600">
        Submit weekly summaries,
        monthly summaries, and final
        attachment reports.
      </p>

      <ReportForm />

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Submitted Reports
        </h2>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">
                  Title
                </th>

                <th className="px-4 py-3 text-left">
                  Type
                </th>

                <th className="px-4 py-3 text-left">
                  Period
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-left">
                  Submitted
                </th>

                <th className="px-4 py-3 text-left">
                Remarks
              </th>
              </tr>
            </thead>

            <tbody>
              {reports.map(
                (report) => (
                  <tr
                    key={report.id}
                    className="border-b"
                  >
                    <td className="px-4 py-3">
                      {report.title}
                    </td>

                    <td className="px-4 py-3">
                      {
                        report.reportType
                      }
                    </td>

                    <td className="px-4 py-3">
                      {report.periodNumber ??
                        "-"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={
                          report.status === "APPROVED"
                            ? "rounded bg-green-100 px-2 py-1 text-green-700"
                            : report.status === "REJECTED"
                            ? "rounded bg-red-100 px-2 py-1 text-red-700"
                            : "rounded bg-yellow-100 px-2 py-1 text-yellow-700"
                        }
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(
                        report.submittedAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      {report.supervisorRemarks ?? "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}