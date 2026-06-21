import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustrySupervisorDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
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

  const pendingReports = supervisor.students.flatMap(
    (student) =>
      student.reports
        .filter(
          (report) =>
            report.status === "PENDING"
        )
        .map((report) => ({
          report,
          student,
        }))
  );

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Welcome, {supervisor.fullName}
      </h1>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Assigned Students
        </h2>

        {supervisor.students.length === 0 ? (
          <p>No students assigned.</p>
        ) : (
          <ul className="space-y-2">
            {supervisor.students.map(
              (student) => (
                <li
                  key={student.id}
                  className="rounded-lg border p-3"
                >
                  {student.fullName}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold">
        Pending Reports
      </h2>

      {pendingReports.length === 0 ? (
        <div className="rounded-xl bg-white p-6 shadow">
          No pending reports.
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReports.map(
            ({ report, student }) => (
              <div
                key={report.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <p>
                  <strong>
                    Student:
                  </strong>{" "}
                  {student.fullName}
                </p>

                <p>
                  <strong>
                    Title:
                  </strong>{" "}
                  {report.title}
                </p>

                <p>
                  <strong>
                    Type:
                  </strong>{" "}
                  {report.reportType}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {report.status}
                </p>

                <p>
                  <strong>
                    Submitted:
                  </strong>{" "}
                  {new Date(
                    report.submittedAt
                  ).toLocaleDateString()}
                </p>

                <div className="mt-4 flex gap-3">
                  <a
                    href={`/industry-supervisor/reports/${report.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                    Review Report
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}