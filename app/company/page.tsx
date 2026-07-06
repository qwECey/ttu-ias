import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function CompanyDashboard() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  console.log("SESSION USER ID:", session.user.id);

  const company =
    await prisma.company.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        students: true,
        industrySupervisors: true,
      },
    });

  console.log("COMPANY:", company);

  if (!company) {
    return (
      <div className="p-8">
        Company not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}

        <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            {company.companyName}
          </h1>

          <p className="mt-2 text-slate-300">
            Company Dashboard
          </p>

        </div>

        {/* Statistics */}

        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <DashboardCard
            title="Students"
            value={company.students.length}
          />

          <DashboardCard
            title="Industry Supervisors"
            value={
              company.industrySupervisors.length
            }
          />

          <DashboardCard
            title="Location"
            value={company.location}
          />

        </div>

        {/* Company Information */}

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Company Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <InfoRow
              label="Company"
              value={company.companyName}
            />

            <InfoRow
              label="Location"
              value={company.location}
            />

            <InfoRow
              label="Contact Person"
              value={company.contactPerson}
            />

            <InfoRow
              label="Phone"
              value={company.contactPhone}
            />

            <InfoRow
              label="Email"
              value={
                company.contactEmail ??
                "N/A"
              }
            />

          </div>

        </div>

        {/* Quick Actions */}

        <div>

          <h2 className="mb-4 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-4">

            <ActionCard
              href="/company/profile"
              title="Company Profile"
              description="View company profile"
            />

            <ActionCard
              href="/company/students"
              title="Students"
              description="View assigned students"
            />

            <ActionCard
              href="/company/industry-supervisors"
              title="Industry Supervisors"
              description="Manage supervisors"
            />

            <ActionCard
              href="/company/reports"
              title="Reports"
              description="Review student reports"
            />

          </div>

        </div>

      </div>

    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
    >

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

    </a>
  );
}