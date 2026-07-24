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
      <div className="p-8">
        Company not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Student Assignments
          </h1>

          <p className="mt-2 text-gray-500">
            Assign students to Industry Supervisors.
          </p>

        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[900px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Student
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Supervisor
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {company.internships.map(
                (internship) => (

                  <tr
                    key={internship.student.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {internship.student.fullName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {internship.student.studentId}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {internship.industrySupervisor
                        ? internship.industrySupervisor.fullName
                        : "Not Assigned"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">

                      <Link
                        href={`/company/assignments/${internship.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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

        </div>

      </div>

    </main>
  );
}