import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
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
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            {report.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review the student`s submitted report.
          </p>

        </div>

        {/* Report Information */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Report Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">

            <Info
              label="Student"
              value={report.student.fullName}
            />

            <Info
              label="Type"
              value={report.reportType}
            />

            <Info
              label="Industry Status"
              value={report.industryStatus}
            />

            <Info
              label="Academic Status"
              value={report.academicStatus}
            />

            <Info
              label="Industry Remarks"
              value={
                report.industryRemarks ??
                "No remarks"
              }
            />

            <Info
              label="Academic Remarks"
              value={
                report.academicRemarks ??
                "No remarks"
              }
            />

            <Info
              label="Submitted"
              value={new Date(
                report.submittedAt
              ).toLocaleDateString()}
            />

          </div>

        </div>

        {/* Report */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Report Content
          </h2>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

            <p className="whitespace-pre-wrap text-gray-700">
              {report.content}
            </p>

          </div>

        </div>

        {/* Review */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          {report.industryStatus ===
          "PENDING" ? (
            <ReviewActions
              reportId={report.id}
              initialRemarks={
                report.industryRemarks ??
                ""
              }
            />
          ) : (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <h2 className="text-lg font-semibold text-green-700">
                Review Completed
              </h2>

              <p className="mt-2 text-gray-700">
                This report has already
                been{" "}
                <strong>
                  {report.industryStatus}
                </strong>
                .
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-sm font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-gray-800">
        {value}
      </p>

    </div>
  );
}