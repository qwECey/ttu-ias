import Link from "next/link";
import { prisma } from "@/lib/prisma";

import SupervisorFilter from "./supervisor-filter";

export default async function SupervisorsPage() {
  const supervisors =
    await prisma.supervisor.findMany({
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
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
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          + Create Supervisor
        </Link>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
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
            Active Supervisors
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {supervisors.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Student Allocations
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            -
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
    </main>
  );
}