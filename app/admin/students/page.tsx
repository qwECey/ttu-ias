import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function StudentsPage() {
  const students =
    await prisma.student.findMany({
      include: {
        company: true,
        supervisor: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Student Management
        </h1>

        <Link
          href="/admin/students/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Create Student
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left">
                Student ID
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Department
              </th>

              <th className="px-4 py-3 text-left">
                Programme
              </th>

              <th className="px-4 py-3 text-left">
                Level
              </th>

              <th className="px-4 py-3 text-left">
                Placement Status
              </th>

              <th className="px-4 py-3 text-left">
                Company
              </th>

              <th className="px-4 py-3 text-left">
                Supervisor
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-500"
                >
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {student.studentId}
                  </td>

                  <td className="px-4 py-3">
                    {student.fullName}
                  </td>

                  <td className="px-4 py-3">
                    {student.department}
                  </td>

                  <td className="px-4 py-3">
                    {student.programme}
                  </td>

                  <td className="px-4 py-3">
                    {student.level}
                  </td>

                  <td className="px-4 py-3">
                    {student.placementStatus}
                  </td>

                  <td className="px-4 py-3">
                    {student.company
                      ?.companyName ??
                      "Not Assigned"}
                  </td>

                  <td className="px-4 py-3">
                    {student.supervisor
                      ?.fullName ??
                      "Not Assigned"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}