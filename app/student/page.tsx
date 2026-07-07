import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Image from "next/image";
import { getOrCreateActiveInternship } from "@/lib/internship";
// import { Link } from "lucide-react";
import Link from "next/link";

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

  const internship =
    await getOrCreateActiveInternship(
      student.id,
      {
        level: student.level,
      }
    );

  const currentInternship =
    await prisma.internship.findUnique({
      where: {
        id: internship.id,
      },
      include: {
        company: true,
        supervisor: true,
        industrySupervisor: true,
      },
    });

  if (!currentInternship) {
    return (
      <main className="p-8">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          Internship not found.
        </div>
      </main>
    );
  }

  const placementRequest =
    await prisma.placementRequest.findFirst({
      where: {
        studentId: student.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const reports =
    await prisma.report.findMany({
      where: {
        studentId: student.id,
      },
    });
  
  const totalReports = reports.length;

  const approvedReports = reports.filter(
    (r) =>
      r.industryStatus === "APPROVED" &&
      r.academicStatus === "APPROVED"
  ).length;

  const rejectedReports = reports.filter(
    (r) =>
      r.industryStatus === "REJECTED" ||
      r.academicStatus === "REJECTED"
  ).length;

  const pendingReports =
    reports.length -
    approvedReports -
    rejectedReports; 

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
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                      {currentInternship.placementStatus}
                    </span>
                  </div>

                  {currentInternship.placementStatus === "PLACED" ? null : placementRequest?.status === "PENDING" ? (
                    <div className="rounded-xl bg-yellow-100 px-5 py-3 font-semibold text-yellow-700">
                      Placement Request Pending
                    </div>
                  ) : placementRequest?.status === "APPROVED" ? (
                    <div className="rounded-xl bg-green-100 px-5 py-3 font-semibold text-green-700">
                      Placement Approved
                    </div>
                  ) : (
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

        {/* Placement Request Status */}
        {placementRequest && (
          <div className="rounded-3xl bg-white p-6 shadow-md">

            <h2 className="mb-4 text-xl font-semibold">
              Placement Request Status
            </h2>

            <p>
              <strong>Status:</strong>{" "}
              {placementRequest.status}
            </p>

            {placementRequest.status === "REJECTED" && (
              <div className="mt-3 rounded-xl bg-red-50 p-4 text-red-700">
                <strong>Remarks:</strong>{" "}
                {placementRequest.liaisonRemarks ||
                  "No remarks provided"}
              </div>
            )}

            {placementRequest.status === "APPROVED" && (
              <div className="mt-3 rounded-xl bg-green-50 p-4 text-green-700">
                Your placement has been approved.
              </div>
            )}

            {placementRequest.status === "PENDING" && (
              <div className="mt-3 rounded-xl bg-yellow-50 p-4 text-yellow-700">
                Your request is under review.
              </div>
            )}

          </div>
        )}

        {/* Internship Journey */}

        <div className="rounded-3xl bg-white p-6 shadow-md">

          <h2 className="mb-6 text-xl font-semibold">
            Your Internship Journey
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b pb-3">

              <div>
                <h3 className="font-semibold">
                  1. Student Registration
                </h3>

                <p className="text-sm text-gray-500">
                  Your internship account has been created.
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                ✓ Completed
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-3">

              <div>

                <h3 className="font-semibold">
                  2. Placement Request
                </h3>

                <p className="text-sm text-gray-500">

                  {placementRequest
                    ? "Placement request submitted."
                    : "Choose a company to begin your attachment."}

                </p>

              </div>

              {placementRequest ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ Completed
                </span>

              ) : (

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  Pending
                </span>

              )}

            </div>

            <div className="flex items-center justify-between border-b pb-3">

              <div>

                <h3 className="font-semibold">
                  3. Placement Approval
                </h3>

                <p className="text-sm text-gray-500">

                  {currentInternship.placementStatus === "PLACED"
                    ? "Your placement has been approved."
                    : "Awaiting approval from the Liaison Office."}

                </p>

              </div>

              {currentInternship.placementStatus === "PLACED" ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ Approved
                </span>

              ) : (

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  Waiting
                </span>

              )}

            </div>

            <div className="flex items-center justify-between border-b pb-3">

              <div>

                <h3 className="font-semibold">
                  4. Academic Supervisor
                </h3>

                <p className="text-sm text-gray-500">

                  {currentInternship.supervisor
                    ? currentInternship.supervisor.fullName
                    : "Supervisor not yet assigned."}

                </p>

              </div>

              {currentInternship.supervisor ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ Assigned
                </span>

              ) : (

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  Waiting
                </span>

              )}

            </div>

            <div className="flex items-center justify-between border-b pb-3">

              <div>

                <h3 className="font-semibold">
                  5. Industry Supervisor
                </h3>

                <p className="text-sm text-gray-500">

                  {currentInternship.industrySupervisor
                    ? currentInternship.industrySupervisor.fullName
                    : "Waiting for company assignment."}

                </p>

              </div>

              {currentInternship.industrySupervisor ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ Assigned
                </span>

              ) : (

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  Waiting
                </span>

              )}

            </div>

            <div className="flex items-center justify-between border-b pb-3">

              <div>

                <h3 className="font-semibold">
                  6. Report Submission
                </h3>

                <p className="text-sm text-gray-500">

                  {totalReports > 0
                    ? `${totalReports} report(s) submitted`
                    : "No reports submitted yet."}

                </p>

              </div>

              {totalReports > 0 ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  In Progress
                </span>

              ) : (

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  Waiting
                </span>

              )}

            </div>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  7. Final Assessment
                </h3>

                <p className="text-sm text-gray-500">
                  Assessment will be available after your internship is completed.
                </p>

              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                Locked
              </span>

            </div>

          </div>

        </div>

        {/* Digital Logbook */}

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <h2 className="mb-4 text-xl font-semibold">
              Digital Logbook
            </h2>

            <p className="mb-4 text-gray-600">
              Record your weekly internship
              activities and track supervisor
              certification.
            </p>

            <Link
              href="/student/logbook"
              className="inline-block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Open Logbook
            </Link>

          </div>

        {/* Report Statistics */}
        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-500">
              Total Reports
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              {totalReports}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-500">
              Approved
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {approvedReports}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h3 className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingReports}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <h3 className="mt-2 text-3xl font-bold text-red-600">
              {rejectedReports}
            </h3>
          </div>

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
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Company Information
            </h2>

            {currentInternship.company ? (

              <div className="space-y-3">

                <p>
                  <strong>Company:</strong>{" "}
                  {currentInternship.company.companyName}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {currentInternship.company.location}
                </p>

                <p>
                  <strong>Contact Person:</strong>{" "}
                  {currentInternship.company.contactPerson}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {currentInternship.company.contactPhone}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {currentInternship.company.contactEmail ?? "N/A"}
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                <p className="text-gray-600">
                  You haven`t been assigned to a company yet.
                </p>

                <p className="text-sm text-gray-500">
                  Browse approved companies or submit your own company for verification to begin your internship placement.
                </p>

                <a
                  href="/student/placement-request"
                  className="inline-block rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-white hover:bg-yellow-600"
                >
                  Browse Companies
                </a>

              </div>

            )}
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

          {currentInternship.supervisor ? (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {currentInternship.supervisor.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {currentInternship.supervisor.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {currentInternship.supervisor.phone ??
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              An Academic Supervisor will be assigned after your placement has been approved.
            </p>
          )}
        </div>

        {/* Industry Supervisor */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            Industry Supervisor
          </h2>

          {currentInternship.industrySupervisor ? (
            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {currentInternship.industrySupervisor.fullName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {currentInternship.industrySupervisor.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {currentInternship.industrySupervisor.phone ??
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              Your company will assign an Industry Supervisor after your placement has been confirmed.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}