import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatCard from "@/components/admin/StatCard";

export default async function AdminPage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar
          email={session.user.email ?? ""}
        />

        <main className="p-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Students"
              value="0"
            />

            <StatCard
              title="Companies"
              value="0"
            />

            <StatCard
              title="Supervisors"
              value="0"
            />

            <StatCard
              title="Placements"
              value="0"
            />
          </div>

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">
              Welcome to TTU IAS
            </h2>

            <p className="mt-3 text-gray-600">
              The administrative dashboard
              is now connected to the
              authentication system.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}