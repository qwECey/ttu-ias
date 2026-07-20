import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import {
  getAssessment,
  getAssessmentTemplate,
} from "@/lib/assessments";
import { prisma } from "@/lib/prisma";
import StatusCard from "@/components/ui/StatusCard";

import AssessmentForm from "./AssessmentForm";
import PageHeader from "@/components/ui/PageHeader";

type PageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function AcademicAssessmentPage({
  params,
}: PageProps) {
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

  const { studentId } = await params;

  const supervisor =
    await prisma.supervisor.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!supervisor) {
    return (
      <main className="p-8">
        <StatusCard
          variant="warning"
          title="Supervisor Not Found"
          message="Your academic supervisor profile could not be found."
        />
      </main>
    );
  }
  const internship =
    await prisma.internship.findFirst({
      where: {
        studentId,
        status: "ACTIVE",
        supervisorId: supervisor.id,
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
      "Academic Supervisor Assessment"
    );

  if (!template) {
    return (
      <main className="p-8">
        <StatusCard
          variant="warning"
          title="Assessment Template Missing"
          message="The assessment template could not be found. Please contact the system administrator."
        />
      </main>
    );
  }

  const assessment =
    await getAssessment(
      internship.id,
      template.id
    );

  const serializedTemplate = {
    ...template,
    sections: template.sections.map(
      (section) => ({
        ...section,
        criteria: section.criteria.map(
          (criterion) => ({
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
                    assessment!.scores.find(
                      (s) =>
                        s.assessmentCriterionId ===
                        criterion.id
                    )!.score
                  )
                : null,
          })
        ),
      })
    ),
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">

        <PageHeader
          title="Academic Supervisor Assessment"
          dark
        >
          <p className="text-lg font-semibold">
            {internship.student.fullName}
          </p>

          <p className="text-slate-300">
            {internship.company?.companyName ??
              "No Company Assigned"}
          </p>
        </PageHeader>

        <AssessmentForm
            internshipId={internship.id}
            template={serializedTemplate}
            completed={
                assessment?.completed ??
                false
            }
        />

      </div>
    </main>
  );
}