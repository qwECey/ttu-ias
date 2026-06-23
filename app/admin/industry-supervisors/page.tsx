import { prisma } from "@/lib/prisma";
import IndustrySupervisorForm from "./supervisor-form";
import SupervisorFilter from "./supervisor-filter";

export default async function IndustrySupervisorsPage() {
  const supervisors =
    await prisma.industrySupervisor.findMany({
      include: {
        company: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  const companies =
    await prisma.company.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Industry Supervisors
        </h1>

        <p className="mt-2 text-gray-600">
          Manage company supervisors and
          monitor assigned personnel.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Industry Supervisors
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {supervisors.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Companies
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {companies.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Assignments
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {supervisors.length}
          </h2>
        </div>
      </div>

      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Create Industry Supervisor
        </h2>

        <IndustrySupervisorForm
          companies={companies}
        />
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Existing Industry Supervisors
        </h2>

        <SupervisorFilter
          supervisors={supervisors.map(
            (supervisor) => ({
              id: supervisor.id,
              fullName:
                supervisor.fullName,
              email:
                supervisor.email,
              companyName:
                supervisor.company
                  .companyName,
            })
          )}
        />
      </div>
    </main>
  );
}