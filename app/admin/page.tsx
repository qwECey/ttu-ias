import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatCard from "@/components/admin/StatCard";

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
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar
          email={
            session.user.email ?? ""
          }
        />

        <main className="p-8">
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
                <a
                  href="/admin/placement-requests"
                  className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Review Placement Requests
                </a>
              </div>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
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

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Pending Requests
                </h2>

                <p className="mt-4 text-5xl font-bold text-yellow-600">
                  {pendingRequests}
                </p>

                <p className="mt-2 text-gray-500">
                  Placement requests awaiting
                  review.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Quick Actions
                </h2>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="/admin/students"
                    className="rounded-xl border p-3 hover:bg-gray-50"
                  >
                    Manage Students
                  </a>

                  <a
                    href="/admin/companies"
                    className="rounded-xl border p-3 hover:bg-gray-50"
                  >
                    Manage Companies
                  </a>

                  <a
                    href="/admin/placements"
                    className="rounded-xl border p-3 hover:bg-gray-50"
                  >
                    Manage Placements
                  </a>
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
          </main>
      </div>
    </div>
  );
}