import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function AdminAssessmentView({
  params,
}: PageProps) {
  const { studentId } = await params;

  const internship =
    await prisma.internship.findFirst({
      where: {
        studentId,
      },

      include: {
        student: true,
        company: true,

        assessments: {
          include: {
            scores: true,

            assessmentTemplate: {
              include: {
                sections: {
                  include: {
                    criteria: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!internship) {
    notFound();
  }

  const academicAssessment =
    internship.assessments.find(
      (assessment) =>
        assessment.assessmentTemplate.name ===
        "Academic Supervisor Assessment"
    );

  const industryAssessment =
    internship.assessments.find(
      (assessment) =>
        assessment.assessmentTemplate.name ===
        "Industry Supervisor Assessment"
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Assessment Results
          </h1>

          <p className="mt-2 text-slate-300">
            Administrator Read-Only View
          </p>

          <div className="mt-6">

            <p className="text-xl font-semibold">
              {internship.student.fullName}
            </p>

            <p className="text-slate-300 break-words">
              {internship.company?.companyName ??
                "No Company Assigned"}
            </p>

          </div>

        </div>

        {/* Academic Assessment */}
        {academicAssessment ? (
          <div className="mb-10 overflow-hidden rounded-3xl bg-white shadow">

            <div className="bg-blue-600 px-6 py-6 text-white sm:px-8">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    🎓 Academic Supervisor Assessment
                  </h2>

                  <p className="mt-1 text-blue-100">
                    Read-only assessment submitted by the Academic Supervisor.
                  </p>

                </div>

                <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur lg:text-right">

                  <p className="text-sm text-blue-100">
                    Total Score
                  </p>

                  <p className="text-3xl font-bold">

                    {academicAssessment.scores.reduce(
                      (sum, score) =>
                        sum + Number(score.score),
                      0
                    )}

                    {" / "}

                    {academicAssessment.assessmentTemplate.sections.reduce(
                      (sectionTotal, section) =>
                        sectionTotal +
                        section.criteria.reduce(
                          (criterionTotal, criterion) =>
                            criterionTotal +
                            Number(criterion.maximumScore),
                          0
                        ),
                      0
                    )}

                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-6 p-6 sm:p-8">

              {academicAssessment.assessmentTemplate.sections.map(
                (section) => (

                  <div key={section.id}>

                    <h3 className="mb-3 text-lg font-semibold">
                      {section.name}
                    </h3>

                    <div className="overflow-hidden rounded-xl border">

                      {section.criteria.map((criterion) => {

                        const score =
                          academicAssessment.scores.find(
                            (s) =>
                              s.assessmentCriterionId ===
                              criterion.id
                          );

                        return (
                          <div
                            key={criterion.id}
                            className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0"
                          >

                            <span className="break-words">
                              {criterion.name}
                            </span>

                            <span className="whitespace-nowrap font-semibold">
                              {Number(score?.score ?? 0)}
                              {" / "}
                              {Number(criterion.maximumScore)}
                            </span>

                          </div>
                        );
                      })}

                    </div>

                  </div>

                )
              )}

              <div className="rounded-xl bg-slate-100 p-5">

                <h3 className="mb-2 font-semibold">
                  General Remarks
                </h3>

                <p className="break-words">
                  {academicAssessment.generalRemarks ??
                    "No remarks provided."}
                </p>

              </div>

            </div>

          </div>
        ) : (
          <div className="mb-8 rounded-3xl bg-white p-8 shadow">

            <p className="text-gray-500">
              Academic assessment has not been completed.
            </p>

          </div>
        )}

        {/* Industry Assessment */}
        {industryAssessment ? (
          <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="bg-green-600 px-6 py-6 text-white sm:px-8">

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    🏢 Industry Supervisor Assessment
                  </h2>

                  <p className="mt-1 text-green-100">
                    Read-only assessment submitted by the Industry Supervisor.
                  </p>

                </div>

                <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur lg:text-right">

                  <p className="text-sm text-green-100">
                    Total Score
                  </p>

                  <p className="text-3xl font-bold">

                    {industryAssessment.scores.reduce(
                      (sum, score) =>
                        sum + Number(score.score),
                      0
                    )}

                    {" / "}

                    {industryAssessment.assessmentTemplate.sections.reduce(
                      (sectionTotal, section) =>
                        sectionTotal +
                        section.criteria.reduce(
                          (criterionTotal, criterion) =>
                            criterionTotal +
                            Number(criterion.maximumScore),
                          0
                        ),
                      0
                    )}

                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-6 p-6 sm:p-8">

              {industryAssessment.assessmentTemplate.sections.map(
                (section) => (

                  <div key={section.id}>

                    <h3 className="mb-3 text-lg font-semibold">
                      {section.name}
                    </h3>

                    <div className="overflow-hidden rounded-xl border">

                      {section.criteria.map((criterion) => {

                        const score =
                          industryAssessment.scores.find(
                            (s) =>
                              s.assessmentCriterionId ===
                              criterion.id
                          );

                        return (
                          <div
                            key={criterion.id}
                            className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0"
                          >

                            <span className="break-words">
                              {criterion.name}
                            </span>

                            <span className="whitespace-nowrap font-semibold">
                              {Number(score?.score ?? 0)}
                              {" / "}
                              {Number(criterion.maximumScore)}
                            </span>

                          </div>
                        );
                      })}

                    </div>

                  </div>

                )
              )}

              <div className="rounded-xl bg-slate-100 p-5">

                <h3 className="mb-2 font-semibold">
                  General Remarks
                </h3>

                <p className="break-words">
                  {industryAssessment.generalRemarks ??
                    "No remarks provided."}
                </p>

              </div>

            </div>

          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow">

            <p className="text-gray-500">
              Industry assessment has not been completed.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}