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

  console.log("Logged in company:", company?.id);
console.log(
  "Internships found:",
  company?.internships.length
);

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

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left">
                  Supervisor
                </th>

                <th className="px-6 py-4 text-left">
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

                    <td className="px-6 py-4 font-semibold">
                      {internship.student.fullName}
                    </td>

                    <td className="px-6 py-4">
                      {internship.student.studentId}
                    </td>

                    <td className="px-6 py-4">

                      {internship.industrySupervisor
                        ? internship.industrySupervisor.fullName
                        : "Not Assigned"}

                    </td>

                    <td className="px-6 py-4">

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