import { prisma } from "@/lib/prisma";

export default async function AssignmentsPage() {
  const students = await prisma.student.findMany({
    include: {
      company: true,
      supervisor: true,
      industrySupervisor: true,
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
            Student Assignments
          </h1>

          <p className="mt-2 text-gray-500">
            View current student placement assignments.
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
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Academic Supervisor
                </th>

                <th className="px-6 py-4 text-left">
                  Industry Supervisor
                </th>

                <th className="px-6 py-4 text-left">
                  Placement
                </th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <div className="font-semibold">
                      {student.fullName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {student.studentId}
                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {student.company?.companyName ??
                      "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    {student.supervisor?.fullName ??
                      "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    {student.industrySupervisor?.fullName ??
                      "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">

                    {student.placementStatus === "PLACED" ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        PLACED
                      </span>

                    ) : (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        UNPLACED
                      </span>

                    )}

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