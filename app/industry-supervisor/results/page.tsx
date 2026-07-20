import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import AssessmentResultsTable from "@/components/results/AssessmentResultsTable";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getAssessmentDisplayScore } from "@/lib/scoring";

export default async function IndustrySupervisorResultsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const industrySupervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!industrySupervisor) {
    notFound();
  }

  const internships =
    await prisma.internship.findMany({
      where: {
        industrySupervisorId:
          industrySupervisor.id,
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

      orderBy: {
        updatedAt: "desc",
      },
    });

  const rows = internships.map(
    (internship) => {

      const assessment =
        internship.assessments.find(
          (assessment) =>
            assessment.assessmentTemplate
              .name ===
            "Industry Supervisor Assessment"
        );

      if (!assessment) {
        return {
          id: internship.id,
          studentName:
            internship.student.fullName,
          companyName:
            internship.company
              ?.companyName ??
            "Not Assigned",
          score: null,
          maximum: 100,
          completed: false,
          actionHref: `/industry-supervisor/assessments/${internship.student.id}`,
        };
      }

      const result =
        getAssessmentDisplayScore(
          assessment
        );

      return {
        id: internship.id,
        studentName:
          internship.student.fullName,
        companyName:
          internship.company
            ?.companyName ??
          "Not Assigned",
        score: result.score,
        maximum: result.maximum,
        completed: result.completed,
        actionHref: `/industry-supervisor/assessments/${internship.student.id}`,
      };
    }
  );

  return (
    <main className="mx-auto max-w-6xl p-8">

      <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Assessment Results
        </h1>

        <p className="mt-3 text-slate-300">
          View assessment results for your assigned students.
        </p>

      </div>

      <AssessmentResultsTable
        title="Industry Supervisor Assessments"
        rows={rows}
      />

    </main>
  );
}