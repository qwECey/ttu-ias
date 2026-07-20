import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getAssessmentDisplayScore } from "@/lib/scoring";

import StatusCard from "@/components/ui/StatusCard";
import PageHeader from "@/components/ui/PageHeader";

export default async function ResultsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
  return (
    <main className="p-8">
      <StatusCard
        variant="error"
        title="Unauthorized"
        message="Please sign in to continue."
      />
    </main>
  );
}
  const student =
    await prisma.student.findUnique({
      where: {
        userId: session.user.id,
      },

      include: {
        internships: {
          include: {
            company: true,

            assessments: {
              include: {
                assessmentTemplate: {
                  include: {
                    sections: {
                      include: {
                        criteria: true,
                      },
                    },
                  },
                },

                scores: true,
              },
            },
          },
        },
      },
    });

  if (!student) {
    return (
      <main className="p-8">
        <StatusCard
          variant="warning"
          title="Student Not Found"
          message="We couldn't find your student record. Please contact the Liaison Office."
        />
      </main>
    );
  }

  const internship =
    student.internships.find(
      (internship) =>
        internship.status === "ACTIVE"
    );

  if (!internship) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <PageHeader
          title="Internship Assessment Results"
          description="No active internship found."
          dark
        >
          <div className="border-t border-slate-700 pt-6">
            <p className="text-lg font-semibold">
              {student.fullName}
            </p>

            <p className="text-slate-300">
              No Company Assigned
            </p>
          </div>
        </PageHeader>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">

      <div className="mb-10 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Internship Assessment Results
        </h1>

        <p className="mt-3 text-slate-300">
          Official assessment marks awarded by your supervisors.
        </p>

        <div className="mt-6 border-t border-slate-700 pt-6">

          <p className="text-lg font-semibold">
            {student.fullName}
          </p>

          <p className="text-slate-300">
            {internship.company?.companyName ??
              "No Company Assigned"}
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {internship.assessments.map(
          (assessment) => {

            const result =
                getAssessmentDisplayScore(
                    assessment
            );

            return (
              <section
                key={assessment.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold text-slate-900">
                    {
                      assessment
                        .assessmentTemplate
                        .name
                    }
                  </h2>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      assessment.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {assessment.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                </div>

                <div className="mt-8">

                  <p className="text-sm uppercase tracking-wide text-slate-500">
                    Official Assessment Score
                  </p>

                  {assessment.completed ? (

                    <p className="mt-2 text-5xl font-bold text-blue-700">

                      {result.score}

                      <span className="text-2xl text-slate-500">
                        {" / "}
                        {result.maximum}
                      </span>

                    </p>

                  ) : (

                    <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                      <p className="text-lg font-semibold text-yellow-700">
                        ⏳ Awaiting Supervisor Assessment
                      </p>

                      <p className="mt-1 text-sm text-yellow-600">
                        Your supervisor has not yet completed this assessment.
                        Your official score will appear here once the assessment has been submitted.
                      </p>

                    </div>

                  )}

                </div>

                {assessment.generalRemarks && (

                  <div className="mt-8 border-t border-slate-200 pt-6">

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Supervisor`s Remark
                    </h3>

                    <p className="mt-3 text-lg leading-7 text-slate-700">
                      {assessment.generalRemarks}
                    </p>

                  </div>

                )}

              </section>
            );
          }
        )}

      </div>

    </main>
  );
}