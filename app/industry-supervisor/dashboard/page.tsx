import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustrySupervisorDashboard() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.id) {
    return (
      <div className="p-8">
        Unauthorized
      </div>
    );
  }

  const supervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        students: {
          include: {
            reports: {
              orderBy: {
                submittedAt: "desc",
              },
            },
          },
        },
      },
    });

  if (!supervisor) {
    return (
      <div className="p-8">
        Industry Supervisor profile not found.
      </div>
    );
  }

  const pendingReports =
    supervisor.students.flatMap(
      (student) =>
        student.reports
          .filter(
            (report) =>
              report.status ===
              "PENDING"
          )
          .map((report) => ({
            report,
            student,
          }))
    );

  return (
    <main className="p-8">
      {/* Hero */}
      <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome,
          {" "}
          {supervisor.fullName}
        </h1>

        <p className="mt-2 text-slate-300">
          Manage assigned students and review reports.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Assigned Students
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {supervisor.students.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending Reports
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {pendingReports.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Reviewed Reports
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {
              supervisor.students.flatMap(
                (s) => s.reports
              ).filter(
                (r) =>
                  r.status !==
                  "PENDING"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Assigned Students */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Assigned Students
        </h2>

        {supervisor.students.length ===
        0 ? (
          <p>
            No students assigned.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {supervisor.students.map(
              (student) => (
                <div
                  key={student.id}
                  className="rounded-xl border p-4"
                >
                  <h3 className="font-semibold">
                    {
                      student.fullName
                    }
                  </h3>

                  <p className="text-sm text-gray-500">
                    {
                      student.studentId
                    }
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Pending Reports */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Pending Reports
        </h2>

        {pendingReports.length ===
        0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            No pending reports.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReports.map(
              ({
                report,
                student,
              }) => (
                <div
                  key={report.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
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
                      Type:
                    </strong>{" "}
                    {
                      report.reportType
                    }
                  </p>

                  <p>
                    <strong>
                      Submitted:
                    </strong>{" "}
                    {new Date(
                      report.submittedAt
                    ).toLocaleDateString()}
                  </p>

                  <a
                    href={`/industry-supervisor/reports/${report.id}`}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    Review Report
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}