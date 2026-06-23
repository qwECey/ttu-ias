import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import RemarksForm from "./remarks-form";

export default async function ReportPage({
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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h1 className="mb-6 text-3xl font-bold">
            {report.title}
          </h1>

          <div className="mb-6 space-y-2">

            <p>
              <strong>Student:</strong>{" "}
              {report.student.fullName}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {report.reportType}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {report.status}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(
                report.submittedAt
              ).toLocaleString()}
            </p>

            {report.periodNumber && (
              <p>
                <strong>Period:</strong>{" "}
                {report.periodNumber}
              </p>
            )}

          </div>

          <div className="rounded-xl border bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Report Content
            </h2>

            <div className="whitespace-pre-wrap">
              {report.content}
            </div>
          </div>

          {report.fileUrl && (
            <div className="mt-6">
              <a
                href={report.fileUrl}
                target="_blank"
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                View Attachment
              </a>
            </div>
          )}

          <RemarksForm
            reportId={report.id}
            initialRemarks={
                report.supervisorRemarks ?? ""
            }
            />

        </div>
      </div>
    </main>
  );
}