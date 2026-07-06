import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LiaisonStudentsPage() {
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

        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-8 shadow">

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
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Register Student
            </Link>

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Programme
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
                    {student.studentId}
                  </td>

                  <td className="px-6 py-4">
                    {student.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {student.programme}
                  </td>

                  <td className="px-6 py-4">
                    {student.company?.companyName ?? "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    {student.supervisor?.fullName ?? "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    {student.industrySupervisor?.fullName ?? "Not Assigned"}
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