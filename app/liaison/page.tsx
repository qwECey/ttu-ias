import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LiaisonPage() {
  const totalStudents =
    await prisma.student.count();

  const placedStudents =
    await prisma.student.count({
      where: {
        placementStatus: "PLACED",
      },
    });

  const unplacedStudents =
    await prisma.student.count({
      where: {
        placementStatus: "UNPLACED",
      },
    });

  const totalCompanies =
    await prisma.company.count();

  const totalIndustrySupervisors =
    await prisma.industrySupervisor.count();

  const pendingPlacementRequests =
    await prisma.placementRequest.count({
      where: {
        status: "PENDING",
      },
    });

  const pendingReports =
    await prisma.report.count({
      where: {
        NOT: {
          OR: [
            {
              academicStatus: "REJECTED",
            },
            {
              industryStatus: "REJECTED",
            },
          ],
        },

        OR: [
          {
            academicStatus: "PENDING",
          },
          {
            industryStatus: "PENDING",
          },
        ],
      },
    });

  const approvedReports =
    await prisma.report.count({
      where: {
        academicStatus: "APPROVED",
        industryStatus: "APPROVED",
      },
    });

  const rejectedReports =
    await prisma.report.count({
      where: {
        OR: [
          {
            academicStatus: "REJECTED",
          },
          {
            industryStatus: "REJECTED",
          },
        ]
      },
    });

  const totalReports =
    pendingReports +
    approvedReports +
    rejectedReports;

  const approvalRate =
    totalReports === 0
      ? 0
      : Math.round(
          (approvedReports /
            totalReports) *
            100
        );

  const rejectionRate =
    totalReports === 0
      ? 0
      : Math.round(
          (rejectedReports /
            totalReports) *
            100
        );

  const pendingRate =
    totalReports === 0
      ? 0
      : Math.round(
          (pendingReports /
            totalReports) *
            100
        );

  const placementRate =
    totalStudents === 0
      ? 0
      : Math.round(
          (placedStudents /
            totalStudents) *
            100
        );

  const recentReports =
    await prisma.report.findMany({
      take: 10,

      orderBy: {
        submittedAt: "desc",
      },

      include: {
        student: true,
      },
    });

    function getOverallStatus(report: {
      academicStatus: string;
      industryStatus: string;
    }) {
      if (
        report.academicStatus === "REJECTED" ||
        report.industryStatus === "REJECTED"
      ) {
        return "REJECTED";
      }

      if (
        report.academicStatus === "APPROVED" &&
        report.industryStatus === "APPROVED"
      ) {
        return "APPROVED";
      }

      return "PENDING";
    }

    const recentPlacements =
      await prisma.placement.findMany({
        take: 10,
        orderBy: {
          assignedAt: "desc",
        },
        include: {
          student: true,
          company: true,
        },
      });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-3xl font-bold">
          Liaison Officer Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-4">

          <DashboardCard
            title="Students"
            value={totalStudents}
          />

          <DashboardCard
            title="Placed Students"
            value={placedStudents}
          />

          <DashboardCard
            title="Unplaced Students"
            value={unplacedStudents}
          />

          <DashboardCard
            title="Companies"
            value={totalCompanies}
          />

          <DashboardCard
            title="Industry Supervisors"
            value={totalIndustrySupervisors}
          />

          <DashboardCard
            title="Placement Requests"
            value={pendingPlacementRequests}
          />

          <DashboardCard
            title="Pending Reports"
            value={pendingReports}
          />

          <DashboardCard
            title="Approved Reports"
            value={approvedReports}
          />

          <DashboardCard
            title="Rejected Reports"
            value={rejectedReports}
          />

        </div>
      </div>
      <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-4">

            <a
              href="/liaison/students"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Students
              </h3>

              <p className="mt-2 text-gray-600">
                Manage students
              </p>
            </a>

            <a
              href="/liaison/companies"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Companies
              </h3>

              <p className="mt-2 text-gray-600">
                View companies
              </p>
            </a>

            <Link
              href="/liaison/placement-requests"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Placement Requests
              </h3>

              <p className="mt-2 text-gray-600">
                Review student placement requests
              </p>
            </Link>

            <a
              href="/liaison/industry-supervisors"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Industry Supervisors
              </h3>

              <p className="mt-2 text-gray-600">
                Manage supervisors
              </p>
            </a>

            <a
              href="/liaison/assignments"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Assign Students
              </h3>

              <p className="mt-2 text-gray-600">
                Assign supervisors
              </p>
            </a>

          </div>
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              Recent Reports
            </h2>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left">
                      Title
                    </th>

                    <th className="px-6 py-4 text-left">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left">
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentReports.map(
                    (report) => (
                      <tr
                        key={report.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {report.student.fullName}
                        </td>

                        <td className="px-6 py-4">
                          {report.title}
                        </td>

                        <td className="px-6 py-4">
                          {report.reportType}
                        </td>

                        <td className="px-6 py-4">
                            {getOverallStatus(report) === "APPROVED" ? (
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                APPROVED
                              </span>
                            ) : getOverallStatus(report) === "REJECTED" ? (
                              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                                REJECTED
                              </span>
                            ) : (
                              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                PENDING
                              </span>
                            )}
                          </td>

                        <td className="px-6 py-4">
                          {new Date(
                            report.submittedAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              Recent Placements
            </h2>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left">
                      Company
                    </th>

                    <th className="px-6 py-4 text-left">
                      Assigned
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentPlacements.map(
                    (placement) => (
                      <tr
                        key={placement.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {placement.student.fullName}
                        </td>

                        <td className="px-6 py-4">
                          {placement.company.companyName}
                        </td>

                        <td className="px-6 py-4">
                          {new Date(
                            placement.assignedAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              Analytics
            </h2>

            <div className="grid gap-6 md:grid-cols-4">

              <DashboardCard
                title="Approval Rate"
                value={`${approvalRate}%`}
              />

              <DashboardCard
                title="Rejection Rate"
                value={`${rejectionRate}%`}
              />

              <DashboardCard
                title="Pending Rate"
                value={`${pendingRate}%`}
              />

              <DashboardCard
                title="Placement Rate"
                value={`${placementRate}%`}
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
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}