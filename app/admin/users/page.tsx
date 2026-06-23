import { prisma } from "@/lib/prisma";
import UserFilter from "./user-filter";

export default async function UsersPage() {
  const users =
    await prisma.user.findMany({
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
    <main className="p-8">
      <div className="mb-8 rounded-3xl bg-linear-to-r from-slate-700 to-slate-900 p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            User Management
          </h1>

          <p className="mt-2 text-slate-200">
            Manage system users and account activity.
          </p>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-3">

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

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <UserFilter users={users} />
      </div>
    </main>
  );
}