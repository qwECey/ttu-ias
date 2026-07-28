import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustryLogbookPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const supervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        internships: {
          where: {
            status: "ACTIVE",
          },
          include: {
            student: true,
            logbookWeeks: {
              where: {
                submitted: true,
              },
              orderBy: {
                weekNumber: "asc",
              },
            },
          },
        },
      },
    });

  if (!supervisor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">
            Industry Supervisor Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            Unable to locate your profile.
          </p>
        </div>
      </main>
    );
  }

  const weeks =
    supervisor.internships.flatMap(
      (internship) =>
        internship.logbookWeeks.map(
          (week) => ({
            ...week,
            student:
              internship.student,
          })
        )
    );

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            Weekly Logbooks
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Review submitted student logbooks.
          </p>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">

          {weeks.length === 0 ? (

            <div className="p-10 text-center">

              <h2 className="text-lg font-semibold text-gray-700">
                No Submitted Logbooks
              </h2>

              <p className="mt-2 text-gray-500">
                Submitted weekly logbooks
                will appear here.
              </p>

            </div>

          ) : (

            <table className="min-w-[900px] w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Week
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Submitted
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {weeks.map((week) => (

                  <tr
                    key={week.id}
                    className="transition-colors hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 whitespace-nowrap">

                      <div className="font-medium">
                        {week.student.fullName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {week.student.studentId}
                      </div>

                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      Week {week.weekNumber}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      ✅ Submitted
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">

                      {week.certified ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Certified
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">

                      <Link
                        href={`/industry-supervisor/logbook/${week.id}`}
                        className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Review
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </main>
  );
}