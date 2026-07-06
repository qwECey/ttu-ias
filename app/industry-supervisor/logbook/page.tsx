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
      <div>
        Industry Supervisor not found.
      </div>
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
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Weekly Logbooks
          </h1>

          <p className="mt-2 text-gray-500">
            Review submitted weekly logbooks.
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Week
                </th>

                <th className="px-6 py-4 text-left">
                  Submitted
                </th>

                <th className="px-6 py-4 text-left">
                  Certified
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {weeks.map((week) => (

                <tr
                  key={week.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <div className="font-semibold">
                      {week.student.fullName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {week.student.studentId}
                    </div>

                  </td>

                  <td className="px-6 py-4">
                    Week {week.weekNumber}
                  </td>

                  <td className="px-6 py-4">
                    ✅
                  </td>

                  <td className="px-6 py-4">

                    {week.certified ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Certified
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        Pending
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-4">

                    <Link
                      href={`/industry-supervisor/logbook/${week.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Review
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}