import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PlacementRequestActions from "./placement-request-actions";

export default async function PlacementRequestReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const request =
    await prisma.placementRequest.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
      },
    });

  if (!request) {
    notFound();
  }

  return (
    <main className="p-8">
      {/* Hero */}
      <div className="mb-8 rounded-3xl bg-linear-to-r from-yellow-500 to-yellow-700 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Placement Request Review
        </h1>

        <p className="mt-2 text-yellow-100">
          Review and approve student placement requests.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Student Details */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Student Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="font-semibold">
                {request.student.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Student ID
              </p>

              <p className="font-semibold">
                {request.student.studentId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Programme
              </p>

              <p className="font-semibold">
                {request.student.programme}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Department
              </p>

              <p className="font-semibold">
                {request.student.department}
              </p>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">
            Company Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Company Name
              </p>

              <p className="font-semibold">
                {request.companyName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold">
                {request.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Contact Person
              </p>

              <p className="font-semibold">
                {request.contactPerson}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Contact Phone
              </p>

              <p className="font-semibold">
                {request.contactPhone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Contact Email
              </p>

              <p className="font-semibold">
                {request.contactEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Request Status
              </p>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  request.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : request.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {request.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          Request Actions
        </h2>

        <PlacementRequestActions
          requestId={request.id}
        />
      </div>
    </main>
  );
}