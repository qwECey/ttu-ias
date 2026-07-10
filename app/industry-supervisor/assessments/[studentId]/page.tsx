import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import {
  getAssessmentTemplate,
  getAssessmentScores,
} from "@/lib/assessments";

import AssessmentForm from "./AssessmentForm";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function IndustryAssessmentPage({
  params,
}: PageProps) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const { studentId } = await params;

  const industrySupervisor =
    await prisma.industrySupervisor.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!industrySupervisor) {
    return <div>Industry Supervisor not found.</div>;
  }

  const internship =
    await prisma.internship.findFirst({
      where: {
        studentId,
        status: "ACTIVE",
        industrySupervisorId:
          industrySupervisor.id,
      },

      include: {
        student: true,
        company: true,
      },
    });

  if (!internship) {
    notFound();
  }

  const template =
    await getAssessmentTemplate(
      "Industry Supervisor Assessment"
    );

  const assessment =
  await getAssessmentScores(
    internship.id,
    template!.id
  );

  const serializedTemplate = {
    ...template!,
    sections: template!.sections.map((section) => ({
      ...section,
      criteria: section.criteria.map((criterion) => ({
        ...criterion,
        maximumScore: Number(
          criterion.maximumScore
        ),
        score:
          assessment?.scores.find(
            (s) =>
              s.assessmentCriterionId ===
              criterion.id
          )?.score !== undefined
            ? Number(
                assessment.scores.find(
                  (s) =>
                    s.assessmentCriterionId ===
                    criterion.id
                )!.score
              )
            : null,
      })),
    })),
  };

  if (!template) {
    return (
      <div className="p-8">
        Assessment template not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

          <h1 className="text-3xl font-bold">
            Industry Supervisor Assessment
          </h1>

          <p className="mt-3 text-slate-300">
            {internship.student.fullName}
          </p>

          <p className="text-slate-300">
            {internship.company?.companyName}
          </p>

        </div>

        <AssessmentForm
          internshipId={internship.id}
          template={serializedTemplate}
        />

      </div>

    </main>
  );
}