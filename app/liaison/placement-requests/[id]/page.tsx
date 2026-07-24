import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReviewActions from "./review-actions";

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
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="mb-8 text-3xl font-bold">
            Placement Request Review
          </h1>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Student
              </p>

              <p className="mt-1 font-medium">
                {request.student.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Student ID
              </p>

              <p className="mt-1">
                {request.student.studentId}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Company
              </p>

              <p className="mt-1">
                {request.companyName}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Location
              </p>

              <p className="mt-1">
                {request.location}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Contact Person
              </p>

              <p className="mt-1">
                {request.contactPerson}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Phone
              </p>

              <p className="mt-1">
                {request.contactPhone}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Email
              </p>

              <p className="mt-1 break-all">
                {request.contactEmail}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Status
              </p>

              <p className="mt-1">
                {request.status}
              </p>
            </div>

          </div>

          <div className="mt-10 border-t pt-8">

            <ReviewActions
              requestId={request.id}
            />

          </div>

        </div>

      </div>

    </main>
  );
}