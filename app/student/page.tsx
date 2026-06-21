import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function StudentPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main className="p-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          Unauthorized
        </div>
      </main>
    );
  }

  const student =
    await prisma.student.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        company: true,
        supervisor: true,
        industrySupervisor: true,
      },
    });

  if (!student) {
    return (
      <main className="p-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          Student not found
        </div>
      </main>
    );
  }

  const statusColor =
    student.placementStatus === "PLACED"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Welcome Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">
            Welcome, {student.fullName}
          </h1>

          <p className="mt-2 text-gray-600">
            Student ID: {student.studentId}
          </p>

          <div className="mt-4">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
            >
              {student.placementStatus}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Academic Info */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Academic Information
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Department:</strong>{" "}
                {student.department}
              </p>

              <p>
                <strong>Programme:</strong>{" "}
                {student.programme}
              </p>

              <p>
                <strong>Level:</strong>{" "}
                {student.level}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {student.email ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Placement Information
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Company:</strong>{" "}
                {student.company?.companyName ??
                  "Not Assigned"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {student.company?.location ??
                  "N/A"}
              </p>
            </div>
          </div>

          {/* Reports */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Reports
            </h2>

            <p className="mb-4 text-gray-600">
              Submit weekly, monthly and final
              attachment reports and track
              supervisor feedback.
            </p>

            <a
              href="/student/reports"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Open Reports
            </a>
          </div>
        </div>

        {/* Academic Supervisor */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Academic Supervisor
          </h2>

          {student.supervisor ? (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {student.supervisor.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {student.supervisor.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {student.supervisor.phone ??
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              No supervisor assigned.
            </p>
          )}
        </div>

        {/* Industry Supervisor */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Industry Supervisor
          </h2>

          {student.industrySupervisor ? (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {student.industrySupervisor.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {student.industrySupervisor.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {student.industrySupervisor.phone ??
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              No industry supervisor assigned.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}