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
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">
          Placement Request Review
        </h1>

        <div className="space-y-3">

          <p>
            <strong>Student:</strong>{" "}
            {request.student.fullName}
          </p>

          <p>
            <strong>Company:</strong>{" "}
            {request.companyName}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {request.location}
          </p>

          <p>
            <strong>Contact Person:</strong>{" "}
            {request.contactPerson}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {request.contactPhone}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {request.contactEmail}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {request.status}
          </p>

        </div>

        <PlacementRequestActions
          requestId={request.id}
        />
      </div>
    </main>
  );
}