import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          Welcome {session.user.email}
        </p>

        <p className="mt-2 text-gray-500">
          Role: {session.user.role}
        </p>

        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}