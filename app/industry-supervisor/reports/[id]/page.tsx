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
            <strong>Status:</strong>{" "}
            {report.status}
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

        <ReviewActions
            reportId={report.id}
        />
      </div>
    </main>
  );
}