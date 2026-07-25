import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/dashboard");
  }

  const studentCount =
    await prisma.student.count();

  const companyCount =
    await prisma.company.count();

  const placementCount =
    await prisma.placement.count();

  const supervisorCount =
    await prisma.supervisor.count();

  const industrySupervisorCount =
    await prisma.industrySupervisor.count();

  const pendingRequests =
    await prisma.placementRequest.count({
      where: {
        status: "PENDING",
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            TTU Industrial Attachment System
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Manage students, companies,
            supervisors, placements and
            attachment reports from one
            central dashboard.
          </p>

          <div className="mt-6">

            <Link
              href="/admin/placement-requests"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Review Placement Requests
            </Link>

          </div>

        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            title="Students"
            value={studentCount}
          />

          <StatCard
            title="Companies"
            value={companyCount}
          />

          <StatCard
            title="Placements"
            value={placementCount}
          />

          <StatCard
            title="Academic Supervisors"
            value={supervisorCount}
          />

          <StatCard
            title="Industry Supervisors"
            value={industrySupervisorCount}
          />

        </div>

        {/* Bottom Cards */}
        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Pending Requests
            </h2>

            <p className="mt-4 text-5xl font-bold text-yellow-600">
              {pendingRequests}
            </p>

            <p className="mt-2 text-gray-500">
              Placement requests awaiting review.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                href="/admin/students"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Manage Students
              </Link>

              <Link
                href="/admin/companies"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Manage Companies
              </Link>

              <Link
                href="/admin/placements"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Manage Placements
              </Link>

              <Link
                href="/admin/supervisors/assign"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Assign Academic Supervisors
              </Link>

              <Link
                href="/admin/users"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Manage Users
              </Link>

              <Link
                href="/admin/reports"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Reports
              </Link>

              <Link
                href="/admin/results"
                className="rounded-xl border p-3 hover:bg-gray-50"
              >
                Results
              </Link>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              System Status
            </h2>

            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between">
                <span>Students</span>
                <span className="font-semibold">
                  {studentCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Companies</span>
                <span className="font-semibold">
                  {companyCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Placements</span>
                <span className="font-semibold">
                  {placementCount}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}