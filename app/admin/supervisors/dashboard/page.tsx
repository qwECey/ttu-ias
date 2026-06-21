import { prisma } from "@/lib/prisma";

export default async function SupervisorDashboard() {
  const supervisors =
    await prisma.supervisor.findMany({
      include: {
        students: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Supervisor Dashboard
      </h1>

      <div className="space-y-8">
        {supervisors.map(
          (supervisor) => (
            <div
              key={supervisor.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-2xl font-semibold">
                {supervisor.fullName}
              </h2>

              <p className="mb-4 text-gray-600">
                {supervisor.email}
              </p>

              <div className="mb-4">
                <span className="font-medium">
                  Students Assigned:
                </span>{" "}
                {
                  supervisor.students
                    .length
                }
              </div>

              {supervisor.students
                .length === 0 ? (
                <p className="text-gray-500">
                  No students assigned.
                </p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">
                        Student
                      </th>

                      <th className="px-4 py-3 text-left">
                        Company
                      </th>

                      <th className="px-4 py-3 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {supervisor.students.map(
                      (
                        student
                      ) => (
                        <tr
                          key={
                            student.id
                          }
                          className="border-b"
                        >
                          <td className="px-4 py-3">
                            {
                              student.fullName
                            }
                          </td>

                          <td className="px-4 py-3">
                            {student
                              .company
                              ?.companyName ??
                              "Not Assigned"}
                          </td>

                          <td className="px-4 py-3">
                            {
                              student.placementStatus
                            }
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}