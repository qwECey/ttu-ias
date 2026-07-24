import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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

        internships: {
          where: {
            status: "ACTIVE",
          },

          include: {
            logbookWeeks: true,
            assessments: true,
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
              report.industryStatus ===
              "PENDING"
          )
          .map((report) => ({
            report,
            student,
          }))
    );
  
  const pendingLogbooks =
    supervisor.internships.flatMap(
      (internship) =>
        internship.logbookWeeks
    ).filter(
      (week) =>
        week.submitted &&
        !week.certified
    );

  const pendingAssessments =
    supervisor.internships.filter(
      (internship) =>
        internship.assessments.some(
          (assessment) =>
            !assessment.completed
        )
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
      <div className="mb-8 grid gap-6 md:grid-cols-4">

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
            Pending Logbooks
          </p>

          <h2 className="mt-2 text-4xl font-bold text-orange-600">
            {pendingLogbooks.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending Assessments
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {pendingAssessments.length}
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

                  <Link
                    href={`/industry-supervisor/reports/${report.id}`}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Review Report
                  </Link>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}