import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SupervisorStudentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="p-8">Unauthorized</div>;
  }

  const supervisor = await prisma.supervisor.findUnique({
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
      },
    },
  });

  if (!supervisor) {
    return <div className="p-8">Supervisor not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">
            My Students
          </h1>

          <p className="mt-2 text-gray-500">
            Students assigned to you.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Student ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Programme</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Reports</th>
                <th className="px-6 py-4 text-left">Placement</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {supervisor.internships.map(
                (internship) => (
                  <tr
                    key={internship.id}
                    className="border-t"
                  >
                    <td className="px-6 py-4">
                      {internship.student.studentId}
                    </td>

                    <td className="px-6 py-4 font-medium">
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
                      {
                        internship.student.reports
                          .length
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        internship.placementStatus
                      }
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/supervisor/reports?studentId=${internship.student.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View Reports
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