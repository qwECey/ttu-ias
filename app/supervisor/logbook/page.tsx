import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function SupervisorLogbookPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
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
            student: true,
            company: true,
            logbookWeeks: true,
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
      <div className="p-8">
        Supervisor not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Student Logbooks
          </h1>

          <p className="mt-2 text-gray-500">
            Review students`` weekly logbooks.
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
                  Company
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

              {supervisor.internships.map(
                (internship) => {

                  const submitted =
                    internship.logbookWeeks.filter(
                      (week) =>
                        week.submitted
                    ).length;

                  const certified =
                    internship.logbookWeeks.filter(
                      (week) =>
                        week.certified
                    ).length;

                  return (

                    <tr
                      key={internship.id}
                      className="border-t"
                    >

                      <td className="px-6 py-4">
                        {internship.student.fullName}
                      </td>

                      <td className="px-6 py-4">
                        {internship.company?.companyName ??
                          "Not Assigned"}
                      </td>

                      <td className="px-6 py-4">
                        {submitted} / {internship.durationWeeks}
                      </td>

                      <td className="px-6 py-4">
                        {certified}
                      </td>

                      <td className="px-6 py-4">

                        <Link
                          href={`/supervisor/logbook/${internship.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          View Logbook
                        </Link>

                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}