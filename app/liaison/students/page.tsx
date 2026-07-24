import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LiaisonStudentsPage() {
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

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Students
            </h1>

            <p className="mt-2 text-gray-500">
              View all registered students and their placement status.
            </p>

          </div>

          <Link
            href="/liaison/students/new"
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            + Register Student
          </Link>

        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[1400px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Programme
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
                      {student.studentId}
                    </td>

                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {student.fullName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.programme}
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
                      {internship?.industrySupervisor
                        ?.fullName ?? "Not Assigned"}
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