import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default async function StudentsPage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

//   const students = await prisma.student.findMany({
//     orderBy: {
//       fullName: "asc",
//     },
//   });
    const students = await prisma.student.findMany();

    console.log("Students:", students);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar
          email={session.user.email ?? ""}
        />

        <main className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Student Management
              </h1>

              <p className="mt-1 text-gray-600">
                Manage all registered students
              </p>
            </div>

            <Link
              href="/admin/students/new"
              className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              + Add Student
            </Link>
          </div>

          <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Students
            </h2>

            <p className="mt-2 text-4xl font-bold text-yellow-600">
              {students.length}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                Student Records
              </h2>
            </div>

            {students.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No students have been registered yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Student ID
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Full Name
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Department
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Programme
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Level
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-t transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          {student.studentId}
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {student.fullName}
                        </td>

                        <td className="px-6 py-4">
                          {student.department}
                        </td>

                        <td className="px-6 py-4">
                          {student.programme}
                        </td>

                        <td className="px-6 py-4">
                          {student.level}
                        </td>

                        <td className="px-6 py-4">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}