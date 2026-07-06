import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function SupervisorReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    studentId?: string;
  }>;
}) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="p-8">
        Unauthorized
      </div>
    );
  }

  const { studentId } =
    await searchParams;

  const supervisor =
    await prisma.supervisor.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        internships: {
          where: {
            status: "ACTIVE",
          },

          include: {
            student: {
              include: {
                reports: {
                  orderBy: {
                    submittedAt: "desc",
                  },
                },
              },
            },

            company: true,
          },
        },
      },
    });

  if (!supervisor) {
    return (
      <div className="p-8">
        Supervisor not found.
      </div>
    );
  }

  const filteredInternships =
    studentId
      ? supervisor.internships.filter(
          (internship) =>
            internship.student.id === studentId
        )
      : supervisor.internships;

  const reports =
    filteredInternships.flatMap(
      (internship) =>
        internship.student.reports.map(
          (report) => ({
            ...report,
            studentName:
              internship.student.fullName,
            studentId:
              internship.student.studentId,
          })
        )
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Student Reports
          </h1>

          <p className="mt-2 text-gray-500">
            Review reports submitted by your assigned students.
          </p>

          {studentId && (
            <p className="mt-4 font-semibold text-blue-600">
              Showing reports for one selected student.
            </p>
          )}

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Title
                </th>

                <th className="px-6 py-4 text-left">
                  Type
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Submitted
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map(
                (report) => (

                  <tr
                    key={report.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4">

                      <div className="font-semibold">
                        {report.studentName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {report.studentId}
                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {report.title}
                    </td>

                    <td className="px-6 py-4">
                      {report.reportType}
                    </td>

                    <td className="px-6 py-4">

                      {report.academicStatus === "APPROVED" ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          APPROVED
                        </span>

                      ) : report.academicStatus === "REJECTED" ? (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          REJECTED
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                          PENDING
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        report.submittedAt
                      ).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-4">

                      <Link
                        href={`/supervisor/reports/${report.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Review
                      </Link>

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