import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

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
        students: {
          include: {
            reports: {
              orderBy: {
                submittedAt:
                  "desc",
              },
            },
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
    supervisor.students.length;

  const totalReports =
    supervisor.students.reduce(
      (total, student) =>
        total +
        student.reports
          .length,
      0
    );

  const pendingReports =
    supervisor.students.flatMap(
      (student) =>
        student.reports
    ).filter(
      (report) =>
        report.status ===
        "PENDING"
    ).length;

  const approvedReports =
    supervisor.students.flatMap(
      (student) =>
        student.reports
    ).filter(
      (report) =>
        report.status ===
        "APPROVED"
    ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-3xl font-bold">
          Welcome,{" "}
          {supervisor.fullName}
        </h1>

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
                {supervisor.students.map(
                  (student) => (
                    <tr
                      key={
                        student.id
                      }
                      className="border-t"
                    >
                      <td className="px-6 py-4">
                        {
                          student.studentId
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          student.fullName
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          student.programme
                        }
                      </td>

                      <td className="px-6 py-4">
                        {student.companyId ??
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

          <div className="space-y-4">
            {supervisor.students.flatMap(
              (student) =>
                student.reports.map(
                  (report) => (
                    <div
                      key={
                        report.id
                      }
                      className="rounded-xl bg-white p-4 shadow-sm"
                    >
                      <p>
                        <strong>
                          Student:
                        </strong>{" "}
                        {
                          student.fullName
                        }
                      </p>

                      <p>
                        <strong>
                          Title:
                        </strong>{" "}
                        {
                          report.title
                        }
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {
                          report.status
                        }
                      </p>

                      <Link
                        href={`/supervisor/reports/${report.id}`}
                        className="mt-3 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View Report
                      </Link>
                    </div>
                  )
                )
            )}
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