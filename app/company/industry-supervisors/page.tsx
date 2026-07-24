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

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Industry Supervisors
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your company&apos;s supervisors.
            </p>

          </div>

          <Link
            href="/company/industry-supervisors/new"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            Register Supervisor
          </Link>

        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[900px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Email
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
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

                    <td className="px-6 py-4 font-semibold whitespace-nowrap">
                      {supervisor.fullName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {supervisor.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {supervisor.phone}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
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