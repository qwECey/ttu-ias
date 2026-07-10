import { prisma } from "@/lib/prisma";

export async function getAssessmentTemplate(
  name: string,
  version = 1
) {
  return prisma.assessmentTemplate.findFirst({
    where: {
      name,
      version,
      isActive: true,
    },

    include: {
      sections: {
        where: {
          isActive: true,
        },

        orderBy: {
          sortOrder: "asc",
        },

        include: {
          criteria: {
            where: {
              isActive: true,
            },

            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      },
    },
  });
}

export async function getOrCreateInternshipAssessment(
  internshipId: string,
  assessmentTemplateId: string
) {
  return prisma.internshipAssessment.upsert({
    where: {
      internshipId_assessmentTemplateId: {
        internshipId,
        assessmentTemplateId,
      },
    },

    update: {},

    create: {
      internshipId,
      assessmentTemplateId,
    },
  });
}

export async function saveAssessmentScore(
  internshipAssessmentId: string,
  assessmentCriterionId: string,
  score: number
) {
  return prisma.assessmentScore.upsert({
    where: {
      internshipAssessmentId_assessmentCriterionId: {
        internshipAssessmentId,
        assessmentCriterionId,
      },
    },

    update: {
      score,
    },

    create: {
      internshipAssessmentId,
      assessmentCriterionId,
      score,
    },
  });
}

export async function getAssessmentScores(
  internshipId: string,
  assessmentTemplateId: string
) {
  return prisma.internshipAssessment.findUnique({
    where: {
      internshipId_assessmentTemplateId: {
        internshipId,
        assessmentTemplateId,
      },
    },

    include: {
      scores: true,
    },
  });
}                                                                                                                                                             