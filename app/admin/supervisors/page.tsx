import Link from "next/link";
import { prisma } from "@/lib/prisma";

import SupervisorFilter from "./supervisor-filter";

export const dynamic = "force-dynamic";

export default async function SupervisorsPage() {
  const supervisors =
    await prisma.supervisor.findMany({
      include: {
        internships: {
          where: {
            status: "ACTIVE",
          },
        },
      },

      orderBy: {
        fullName: "asc",
      },
    });

  const assignedSupervisors =
    supervisors.filter(
      (supervisor) =>
        supervisor.internships.length > 0
    ).length;

  const totalAllocations =
    supervisors.reduce(
      (total, supervisor) =>
        total +
        supervisor.internships.length,
      0
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Academic Supervisors
            </h1>

            <p className="mt-2 text-gray-600">
              Manage academic supervisors.
            </p>

          </div>

          <Link
            href="/admin/supervisors/new"
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            + Register Supervisor
          </Link>

        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Supervisors
            </p>

            <h2 className="mt-2 text-4xl font-bold text-blue-600">
              {supervisors.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Assigned Supervisors
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {assignedSupervisors}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Student Allocations
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-600">
              {totalAllocations}
            </h2>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold">
            Supervisor Directory
          </h2>

          <SupervisorFilter
            supervisors={supervisors}
          />

        </div>

      </div>

    </main>
  );
}