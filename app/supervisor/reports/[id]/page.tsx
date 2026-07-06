import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RemarksForm from "./remarks-form";

export default async function ReportDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const report = await prisma.report.findUnique({
    where: {
      id,
    },
    include: {
      student: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!report) {
    notFound();
  }

  // keep the rest of your code exactly the same...

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            {report.title}
          </h1>

          <p className="mt-2 text-gray-500">
            {report.reportType}
          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Student Information
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Name:</strong>{" "}
              {report.student.fullName}
            </p>

            <p>
              <strong>Student ID:</strong>{" "}
              {report.student.studentId}
            </p>

            <p>
              <strong>Programme:</strong>{" "}
              {report.student.programme}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {report.student.company?.companyName ?? "Not Assigned"}
            </p>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-xl font-semibold">
            Report Details
          </h2>

          <div className="space-y-3">

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
              ).toLocaleDateString("en-GB")}
            </p>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Report Content
          </h2>

          <div className="whitespace-pre-wrap rounded-xl border p-6">
            {report.content}
          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          {report.academicStatus === "PENDING" ? (

            <RemarksForm
              reportId={report.id}
              initialRemarks={
                report.academicRemarks ?? ""
              }
            />

          ) : (

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">

              <h2 className="text-lg font-semibold text-green-700">
                Review Completed
              </h2>

              <p className="mt-2 text-gray-700">
                This report has already been{" "}
                <strong>
                  {report.academicStatus}
                </strong>.
              </p>

            </div>

          )}

        </div>

      </div>
    </main>
  );
}