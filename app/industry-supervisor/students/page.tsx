import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustryStudentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const supervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },

      include: {
        company: true,

        internships: {
          where: {
            status: "ACTIVE",
          },

          include: {
            student: true,
            company: true,
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
    return <div>Industry Supervisor not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">
            Assigned Students
          </h1>

          <p className="mt-2 text-gray-500">
            Students under your supervision.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="px-6 py-4 text-left">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Programme
                </th>

                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Placement Status
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {supervisor.internships.map((internship) => (

                <tr
                  key={internship.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {internship.student.studentId}
                  </td>

                  <td className="px-6 py-4">
                    {internship.student.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {internship.student.programme}
                  </td>

                  <td className="px-6 py-4">
                    {internship.company?.companyName ??
                      "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">

                    {internship.placementStatus === "PLACED" ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        PLACED
                      </span>

                    ) : (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        UNPLACED
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4">

                    <Link
                      href={`/industry-supervisor/reports?studentId=${internship.student.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      View Reports
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