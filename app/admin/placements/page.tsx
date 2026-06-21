import { prisma } from "@/lib/prisma";

export default async function PlacementsPage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
    },
    orderBy: {
      fullName: "asc",
    },
  });

  const companies = await prisma.company.findMany({
    orderBy: {
      companyName: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Placement Management
      </h1>

      <p className="mt-2 text-gray-600">
        Student placement system.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Students
        </h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">
                  Name
                </th>
                <th className="py-3 text-left">
                  Student ID
                </th>
                <th className="py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {student.fullName}
                  </td>

                  <td className="py-3">
                    {student.studentId}
                  </td>

                  <td className="py-3">
                    {student.placementStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Companies
        </h2>

        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">
                  Company
                </th>

                <th className="py-3 text-left">
                  Location
                </th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {company.companyName}
                  </td>

                  <td className="py-3">
                    {company.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}