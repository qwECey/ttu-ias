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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Students"
              value={studentCount.toString()}
            />

            <StatCard
              title="Companies"
              value={companyCount.toString()}
            />

            <StatCard
              title="Supervisors"
              value="0"
            />

            <StatCard
              title="Placements"
              value={placementCount.toString()}
            />
          </div>

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">
              Welcome to TTU IAS
            </h2>

            <p className="mt-3 text-gray-600">
              System overview and
              administrative controls.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}