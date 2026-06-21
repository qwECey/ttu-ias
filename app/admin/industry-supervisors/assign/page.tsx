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
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Assign Industry Supervisors
      </h1>

      <AssignIndustrySupervisorForm
        students={students}
        supervisors={supervisors}
      />
    </main>
  );
}