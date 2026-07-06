import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function SupervisorPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.id) {
    return (
      <div>
        Unauthorized
      </div>
    );
  }

  const supervisor =
    await prisma.supervisor.findUnique({
      where: {
        userId:
          session.user.id,
      },

      include: {
  internships: {
    where: {
      status: "ACTIVE",
    },

        include: {
          student: {
            include: {
              reports: {
                orderBy: {
                  submittedAt: "desc",
                },
              },
            },
          },

          company: true,
        },
      },
    },
   });

  if (!supervisor) {
    return (
      <div className="p-8">
        Supervisor profile
        not found
      </div>
    );
  }

  const totalStudents =
    supervisor.internships.length;

  const totalReports =
    supervisor.internships.reduce(
      (total, internship) =>
        total +
        internship.student.reports.length,
      0
    );

  const pendingReports =
    supervisor.internships
      .flatMap(
        (internship) =>
          internship.student.reports
      )
      .filter(
        (report) =>
          report.academicStatus ===
          "PENDING"
      ).length;

  const approvedReports =
    supervisor.internships
      .flatMap(
        (internship) =>
          internship.student.reports
      )
      .filter(
        (report) =>
          report.academicStatus ===
          "APPROVED"
      ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="relative mb-8 overflow-hidden rounded-3xl shadow-lg">

          <div className="absolute inset-0">
            <Image
              src="/images/ttu_campus.jpg"
              alt="TTU Campus"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 p-10 text-white">

            <h1 className="text-4xl font-bold">
              Welcome Back,
            </h1>

            <h2 className="mt-2 text-3xl font-semibold">
              {supervisor.fullName}
            </h2>

            <p className="mt-3 text-lg text-gray-200">
              Academic Supervisor Dashboard
            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-4">

          <DashboardCard
            title="Students"
            value={
              totalStudents
            }
          />

          <DashboardCard
            title="Reports"
            value={
              totalReports
            }
          />

          <DashboardCard
            title="Pending"
            value={
              pendingReports
            }
          />

          <DashboardCard
            title="Approved"
            value={
              approvedReports
            }
          />

        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <Link
              href="/supervisor/reports"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Review Reports
              </h3>

              <p className="mt-2 text-gray-600">
                Approve or reject reports.
              </p>
            </Link>

            <Link
              href="/supervisor/students"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                My Students
              </h3>

              <p className="mt-2 text-gray-600">
                View assigned students.
              </p>
            </Link>

            <Link
              href="/supervisor/profile"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Profile
              </h3>

              <p className="mt-2 text-gray-600">
                Update your information.
              </p>
            </Link>

            <Link
              href="/supervisor/logbook"
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Review Logbooks
              </h3>

              <p className="mt-2 text-gray-600">
                View and monitor students` weekly logbooks.
              </p>
            </Link>

          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Supervised Students
          </h2>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Student ID
                  </th>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Programme
                  </th>

                  <th className="px-6 py-4 text-left">
                    Company
                  </th>
                </tr>
              </thead>

              <tbody>
                {supervisor.internships.map(
                  (internship) => (
                    <tr
                      key={
                        internship.id
                      }
                      className="border-t"
                    >
                      <td className="px-6 py-4">
                        {
                          internship.student.studentId
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          internship.student.fullName
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          internship.student.programme
                        }
                      </td>

                      <td className="px-6 py-4">
                        {internship.company?.companyName ??
                          "Not Assigned"}
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
            Recent Reports
          </h2>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Student</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {supervisor.internships.flatMap((internship) =>
                  internship.student.reports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-t"
                    >
                      <td className="px-6 py-4">
                        {internship.student.fullName}
                      </td>

                      <td className="px-6 py-4">
                        {report.title}
                      </td>

                      <td className="px-6 py-4">
                        {report.reportType}
                      </td>

                      <td className="px-6 py-4">
                        {report.academicStatus === "APPROVED" ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            APPROVED
                          </span>
                        ) : report.academicStatus === "REJECTED" ? (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                            REJECTED
                          </span>
                        ) : (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                            PENDING
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/supervisor/reports/${report.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
  value:
    | string
    | number;
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