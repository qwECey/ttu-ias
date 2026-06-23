import Link from "next/link";

import { prisma } from "@/lib/prisma";

import StudentFilter from "./student-filter";

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
        <div className="mb-8 rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
            <h1 className="text-4xl font-bold">
              Student Management
            </h1>

            <p className="mt-2 text-blue-100">
              Manage registered students and placements.
            </p>
        </div>

        <Link
          href="/admin/students/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Create Student
        </Link>
      </div>

      <StudentFilter
          students={students.map(
            (student) => ({
              id: student.id,
              studentId:
                student.studentId,
              fullName:
                student.fullName,
              department:
                student.department,
              programme:
                student.programme,
              level: student.level,
              placementStatus:
                student.placementStatus,
              companyName:
                student.company
                  ?.companyName ??
                "Not Assigned",
              supervisorName:
                student.supervisor
                  ?.fullName ??
                "Not Assigned",
            })
          )}
        />
    </main>
  );
}