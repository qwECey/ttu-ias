import Link from "next/link";

import { prisma } from "@/lib/prisma";

import StudentFilter from "./student-filter";

export default async function StudentsPage() {
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

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg flex-1">

            <h1 className="text-4xl font-bold">
              Student Management
            </h1>

            <p className="mt-2 text-blue-100">
              Manage registered students and placements.
            </p>

          </div>

          <Link
            href="/admin/students/new"
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            + Register Student
          </Link>

        </div>

        <StudentFilter
          students={students.map((student) => {
            const internship =
              student.internships[0];

            return {
              id: student.id,

              studentId:
                student.studentId,

              fullName:
                student.fullName,

              department:
                student.department,

              programme:
                student.programme,

              level:
                student.level,

              placementStatus:
                internship?.placementStatus ??
                "UNPLACED",

              companyName:
                internship?.company?.companyName ??
                "Not Assigned",

              supervisorName:
                internship?.supervisor?.fullName ??
                "Not Assigned",
            };
          })}
        />

      </div>

    </main>
  );
}