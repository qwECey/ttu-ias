import AssignmentForm from "./student-assignment-form";

import { prisma } from "@/lib/prisma";

export default async function AssignStudentPage({
  params,
}: {
  params: Promise<{
    studentId: string;
  }>;
}) {
  const { studentId } =
    await params;

  const internshipId = studentId;

  const internship =
    await prisma.internship.findUnique({
      where: {
        id: internshipId,
      },
      include: {
        student: true,

        company: {
          include: {
            industrySupervisors: {
              orderBy: {
                fullName: "asc",
              },
            },
          },
        },

        industrySupervisor: true,
      },
    });

  if (!internship) {
    return (
      <div className="p-8">
        Student not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-3xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="mb-2 text-3xl font-bold">
            Assign Industry Supervisor
          </h1>

          <div className="mb-8 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Student
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {internship.student.fullName}
            </p>

            <p className="text-slate-500">
              {internship.student.studentId}
            </p>
          </div>

          <AssignmentForm
            internshipId={internship.id}
            currentSupervisorId={
              internship.industrySupervisorId
            }
            supervisors={
              internship.company
                ?.industrySupervisors ?? []
            }
          />

        </div>

      </div>

    </main>
  );
}