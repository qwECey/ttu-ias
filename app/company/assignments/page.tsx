import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function CompanyAssignmentsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const company =
    await prisma.company.findUnique({
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
            industrySupervisor: true,
          },
          orderBy: {
            student: {
              fullName: "asc",
            },
          },
        },
      },
    });

  if (!company) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-semibold">
            Company Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            We couldn`t find your company
            profile.
          </p>
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
            Student Assignments
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Assign students to their
            industry supervisors.
          </p>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">

          {company.internships.length === 0 ? (
            <div className="p-10 text-center">

              <h2 className="text-lg font-semibold text-gray-700">
                No Active Students
              </h2>

              <p className="mt-2 text-gray-500">
                Students assigned to your
                company will appear here.
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
                    Student ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Industry Supervisor
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {company.internships.map(
                  (internship) => (
                    <tr
                      key={internship.id}
                      className="hover:bg-gray-50 transition-colors"
                    >

                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {internship.student.fullName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {internship.student.studentId}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {internship.industrySupervisor
                          ? internship.industrySupervisor.fullName
                          : (
                            <span className="text-gray-500">
                              Not Assigned
                            </span>
                          )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">

                        <Link
                          href={`/company/assignments/${internship.id}`}
                          className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          {internship.industrySupervisor
                            ? "Change"
                            : "Assign"}
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