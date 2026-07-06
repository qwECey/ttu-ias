import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustrySupervisorProfile() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="p-8">Unauthorized</div>;
  }

  const supervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        company: true,
        students: true,
      },
    });

  if (!supervisor) {
    return <div className="p-8">Industry Supervisor not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">
            Industry Supervisor Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Your account information.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Full Name
              </h3>

              <p className="mt-2 text-lg">
                {supervisor.fullName}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Email
              </h3>

              <p className="mt-2 text-lg">
                {supervisor.email}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Phone
              </h3>

              <p className="mt-2 text-lg">
                {supervisor.phone ?? "Not Available"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Company
              </h3>

              <p className="mt-2 text-lg">
                {supervisor.company.companyName}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Assigned Students
              </h3>

              <p className="mt-2 text-lg">
                {supervisor.students.length}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}