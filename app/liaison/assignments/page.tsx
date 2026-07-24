import { prisma } from "@/lib/prisma";

export default async function AssignmentsPage() {
  const students =
    await prisma.student.findMany({
      include: {
        internships: {
          where: {
            status: "ACTIVE",
          },

          include: {
            company: true,
            supervisor: true,
            industrySupervisor: true,
          },
        },
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

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[1200px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Student
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Company
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Academic Supervisor
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Industry Supervisor
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Placement
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => {

                const internship =
                  student.internships[0];

                return (

                  <tr
                    key={student.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 whitespace-nowrap">

                      <div className="font-semibold">
                        {student.fullName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {student.studentId}
                      </div>

                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {internship?.company?.companyName ??
                        "Not Assigned"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {internship?.supervisor?.fullName ??
                        "Not Assigned"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {internship?.industrySupervisor?.fullName ??
                        "Not Assigned"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">

                      {internship?.placementStatus ===
                      "PLACED" ? (

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

                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}