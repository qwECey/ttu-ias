import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function CompanyProfilePage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const company =
    await prisma.company.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!company) {
    return (
      <div className="p-8">
        Company not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Company Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View your company`s account information.
          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="grid gap-6 md:grid-cols-2">

            <ProfileItem
              label="Company Name"
              value={company.companyName}
            />

            <ProfileItem
              label="Location"
              value={company.location}
            />

            <ProfileItem
              label="Contact Person"
              value={company.contactPerson}
            />

            <ProfileItem
              label="Phone"
              value={company.contactPhone}
            />

            <ProfileItem
              label="Email"
              value={
                company.contactEmail ??
                "N/A"
              }
            />

            <ProfileItem
              label="Status"
              value={
                company.approved
                  ? "Approved"
                  : "Pending Approval"
              }
            />

          </div>

        </div>

      </div>

    </main>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-semibold text-slate-900">
        {value}
      </p>

    </div>
  );
}