import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Image from "next/image";

export default async function StudentPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main className="p-8">
        <div className="rounded-3xl bg-white p-6 shadow-md">
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
        <div className="rounded-3xl bg-white p-6 shadow-md">
          Student not found
        </div>
      </main>
    );
  }

  // const statusColor =
  //   student.placementStatus === "PLACED"
  //     ? "bg-green-100 text-green-700"
  //     : "bg-yellow-100 text-yellow-700";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Welcome Card */}
        <div
            className="relative overflow-hidden rounded-3xl shadow-lg"
          >

            <div className="absolute inset-0">
                <Image
                  src="/images/ttu_campus.jpg"
                  alt="TTU Campus"
                  fill
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
                {student.fullName}
              </h2>

              <p className="mt-3 text-lg text-gray-200">
                Student ID: {student.studentId}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">

                  <div className="inline-flex rounded-full bg-white/20 px-5 py-2 backdrop-blur-sm">
                    <span className="font-semibold">
                      Placement Status:
                    </span>

                    <span className="ml-2">
                      {student.placementStatus}
                    </span>
                  </div>

                  {student.placementStatus !== "PLACED" && (
                    <a
                      href="/student/placement-request"
                      className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white shadow hover:bg-yellow-600"
                    >
                      Request Placement
                    </a>
                  )}

                  <a
                    href="/student/reports"
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
                  >
                    Submit Report
                  </a>

                </div>

            </div>
          </div>

          <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
              </h2>

              <p className="text-gray-500">
                Manage your placement, reports and supervisors.
              </p>
          </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Academic Info */}
          <div className="rounded-3xl bg-white p-6 shadow-md">
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

              <p>
                <strong>Contact Person:</strong>{" "}
                {student.company?.contactPerson ??
                  "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {student.company?.contactPhone ??
                  "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {student.company?.contactEmail ??
                  "N/A"}
              </p>

            </div>

          {/* Reports */}
          <div className="rounded-3xl bg-white p-6 shadow-md">
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
        <div className="rounded-3xl bg-white p-6 shadow-md">
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
        <div className="rounded-3xl bg-white p-6 shadow-md">
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