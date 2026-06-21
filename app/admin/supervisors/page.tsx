import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SupervisorsPage() {
  const supervisors =
    await prisma.supervisor.findMany({
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Supervisors
        </h1>

        <Link
          href="/admin/supervisors/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Create Supervisor
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {supervisors.length === 0 ? (
          <p>No supervisors found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">
                  Name
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Phone
                </th>
              </tr>
            </thead>

            <tbody>
              {supervisors.map(
                (supervisor) => (
                  <tr
                    key={supervisor.id}
                    className="border-b"
                  >
                    <td className="px-4 py-3">
                      {supervisor.fullName}
                    </td>

                    <td className="px-4 py-3">
                      {supervisor.email}
                    </td>

                    <td className="px-4 py-3">
                      {supervisor.phone}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}