import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function CompanyIndustrySupervisorsPage() {
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
        industrySupervisors: {
          include: {
            students: true,
          },
          orderBy: {
            fullName: "asc",
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

        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-8 shadow">

          <div>

            <h1 className="text-3xl font-bold">
              Industry Supervisors
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your company`s supervisors.
            </p>

          </div>

          <Link
            href="/company/industry-supervisors/new"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Register Supervisor
          </Link>

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Students
                </th>

              </tr>

            </thead>

            <tbody>

              {company.industrySupervisors.map(
                (supervisor) => (

                  <tr
                    key={supervisor.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {supervisor.fullName}
                    </td>

                    <td className="px-6 py-4">
                      {supervisor.email}
                    </td>

                    <td className="px-6 py-4">
                      {supervisor.phone}
                    </td>

                    <td className="px-6 py-4">
                      {supervisor.students.length}
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