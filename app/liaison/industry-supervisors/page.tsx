import { prisma } from "@/lib/prisma";

export default async function LiaisonIndustrySupervisorsPage() {
  const supervisors =
    await prisma.industrySupervisor.findMany({
      include: {
        company: true,
        students: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">
            Industry Supervisors
          </h1>

          <p className="mt-2 text-gray-500">
            View all registered industry supervisors.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Assigned Students
                </th>
              </tr>
            </thead>

            <tbody>

              {supervisors.map((supervisor) => (

                <tr
                  key={supervisor.id}
                  className="border-t"
                >

                  <td className="px-6 py-4 font-semibold">
                    {supervisor.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {supervisor.company.companyName}
                  </td>

                  <td className="px-6 py-4">
                    {supervisor.email}
                  </td>

                  <td className="px-6 py-4">
                    {supervisor.phone ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    {supervisor.students.length}
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