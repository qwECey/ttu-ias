import { prisma } from "@/lib/prisma";
import AssignIndustrySupervisorForm from "./assign-form";

export default async function AssignIndustrySupervisorPage() {
  const students =
    await prisma.student.findMany({
      include: {
        industrySupervisor: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  const supervisors =
    await prisma.industrySupervisor.findMany({
      include: {
        company: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  const assignedStudents =
    students.filter(
      (student) =>
        student.industrySupervisor
    ).length;

  const unassignedStudents =
    students.length -
    assignedStudents;

  return (
    <main className="p-8">
      <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Industry Supervisor Assignment
        </h1>

        <p className="mt-2 text-slate-300">
          Assign students to their
          industry supervisors and
          monitor placement coverage.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Students
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {students.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Assigned
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {assignedStudents}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Unassigned
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-600">
            {unassignedStudents}
          </h2>
        </div>
      </div>

      <AssignIndustrySupervisorForm
        students={students}
        supervisors={supervisors}
      />
    </main>
  );
}