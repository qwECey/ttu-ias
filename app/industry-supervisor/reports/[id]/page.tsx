import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReviewActions from "./review-actions";

export default async function ReviewReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const report =
    await prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
      },
    });

  if (!report) {
    notFound();
  }

  return (
    <main className="p-8">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold">
          {report.title}
        </h1>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Student:</strong>{" "}
            {report.student.fullName}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {report.reportType}
          </p>

          <p>
            <strong>Industry Status:</strong>{" "}
            {report.industryStatus}
          </p>

          <p>
            <strong>Academic Status:</strong>{" "}
            {report.academicStatus}
          </p>

          <p>
            <strong>Industry Remarks:</strong>{" "}
            {report.industryRemarks || "No remarks"}
          </p>

          <p>
            <strong>Academic Remarks:</strong>{" "}
            {report.academicRemarks || "No remarks"}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {new Date(
              report.submittedAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg border p-4 mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            Report Content
          </h2>

          <p className="whitespace-pre-wrap">
            {report.content}
          </p>
        </div>

        {report.industryStatus === "PENDING" ? (
          <ReviewActions
            reportId={report.id}
            initialRemarks={report.industryRemarks ?? ""}
          />
        ) : (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-lg font-semibold text-green-700">
              Review Completed
            </h2>

            <p className="mt-2 text-gray-700">
              This report has already been{" "}
              <strong>{report.industryStatus}</strong>.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}