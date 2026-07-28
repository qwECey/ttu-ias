import { prisma } from "@/lib/prisma";
import UserFilter from "./user-filter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users =
    await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        loginId: true,
        email: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) => user.isActive
    ).length;

  const inactiveUsers =
    users.filter(
      (user) => !user.isActive
    ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 rounded-3xl bg-linear-to-r from-slate-700 to-slate-900 p-6 text-white shadow-lg sm:p-8">
            <h1 className="text-3xl font-bold sm:text-4xl">
              User Management
            </h1>

            <p className="mt-2 text-slate-200">
              Manage system users and account activity.
            </p>
          </div>

          <Link
            href="/admin/users/new"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700 lg:w-auto"
          >
            + Create User
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalUsers}
            </h2>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Active Users
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {activeUsers}
            </h2>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Inactive Users
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {inactiveUsers}
            </h2>

          </div>

        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <UserFilter users={users} />

        </div>

      </div>

    </main>
  );
}