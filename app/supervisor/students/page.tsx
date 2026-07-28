import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function SupervisorStudentsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          Unauthorized
        </div>
      </main>
    );
  }

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
            company: true,

            student: {
              include: {
                reports: true,
              },
            },
          },

          orderBy: {
            student: {
              fullName: "asc",
            },
          },
        },
      },
    });

  if (!supervisor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          Supervisor not found.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            My Students
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Students currently assigned to you.
          </p>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">

          {supervisor.internships.length === 0 ? (

            <div className="p-10 text-center">

              <h2 className="text-lg font-semibold text-gray-700">
                No Students Assigned
              </h2>

              <p className="mt-2 text-gray-500">
                Students assigned to you will
                appear here.
              </p>

            </div>

          ) : (

            <table className="min-w-[1100px] w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Student ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Programme
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Reports
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Placement
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {supervisor.internships.map(
                  (internship) => (

                    <tr
                      key={internship.id}
                      className="transition-colors hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 whitespace-nowrap">
                        {internship.student.studentId}
                      </td>

                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {internship.student.fullName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {internship.student.programme}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {internship.company?.companyName ??
                          "Not Assigned"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {internship.student.reports.length}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">

                        {internship.placementStatus ===
                        "PLACED" ? (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            PLACED
                          </span>

                        ) : (

                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            {internship.placementStatus}
                          </span>

                        )}

                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">

                        <Link
                          href={`/supervisor/assessments/${internship.student.id}`}
                          className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Assess
                        </Link>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </main>
  );
}