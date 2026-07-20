import { getServerSession } from "next-auth";

import AssessmentResultsTable from "@/components/results/AssessmentResultsTable";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getAssessmentDisplayScore } from "@/lib/scoring";

export default async function AdminResultsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const internships =
    await prisma.internship.findMany({
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

      orderBy: {
        updatedAt: "desc",
      },
    });

  const rows = internships.flatMap(
    (internship) =>
      internship.assessments.map(
        (assessment) => {
          const result =
            getAssessmentDisplayScore(
              assessment
            );

          return {
            id: assessment.id,

            studentName:
              internship.student.fullName,

            companyName:
              internship.company
                ?.companyName ??
              "Not Assigned",

            score: result.score,

            maximum: result.maximum,

            completed:
              result.completed,

            actionHref:
              assessment.assessmentTemplate
                .name ===
              "Academic Supervisor Assessment"
                ? `/supervisor/assessments/${internship.student.id}`
                : `/industry-supervisor/assessments/${internship.student.id}`,
          };
        }
      )
  );

  return (
    <main className="mx-auto max-w-6xl p-8">

      <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Assessment Results
        </h1>

        <p className="mt-3 text-slate-300">
          View all internship assessment
          results across the system.
        </p>

      </div>

      <AssessmentResultsTable
        title="All Assessment Results"
        rows={rows}
      />

    </main>
  );
}