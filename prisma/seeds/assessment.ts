import type { PrismaClient } from "../../lib/generated/prisma/client";

const assessmentTemplates = [
  {
    name: "Industry Supervisor Assessment",
    version: 1,
    description: "Official TTU Industry Supervisor Assessment Form",

    sections: [
      {
        name: "Specific Skills",
        criteria: [
          {
            name: "Ability to understand issues",
            maximumScore: 5,
          },
          {
            name: "Ability to use his/her hands",
            maximumScore: 5,
          },
          {
            name: "Ability to give judgment",
            maximumScore: 5,
          },
          {
            name: "Creativity",
            maximumScore: 5,
          },
        ],
      },

      {
        name: "General Employability Skills",
        criteria: [
          {
            name: "Ability to complete work on schedule",
            maximumScore: 5,
          },
          {
            name: "Ability to follow instruction carefully",
            maximumScore: 5,
          },
          {
            name: "Ability to take initiative",
            maximumScore: 5,
          },
          {
            name: "Ability to work with little supervision",
            maximumScore: 5,
          },
          {
            name: "Ability to work with other staff",
            maximumScore: 5,
          },
          {
            name: "Adherence to organization's rules and regulations",
            maximumScore: 5,
          },
          {
            name: "Adherence to organization's safety rules and regulations",
            maximumScore: 5,
          },
          {
            name: "Resourcefulness",
            maximumScore: 5,
          },
        ],
      },

      {
        name: "Attitude to Work",
        criteria: [
          {
            name: "Adherence to work",
            maximumScore: 5,
          },
          {
            name: "Punctuality",
            maximumScore: 5,
          },
          {
            name: "Desire to work",
            maximumScore: 5,
          },
          {
            name: "Willingness to accept new ideas and suggestions",
            maximumScore: 5,
          },
        ],
      },

      {
        name: "Human Relationship",
        criteria: [
          {
            name: "Relationship with subordinates",
            maximumScore: 5,
          },
          {
            name: "Relationship with colleagues",
            maximumScore: 5,
          },
          {
            name: "Relationship with superiors",
            maximumScore: 5,
          },
          {
            name: "Emotional stability",
            maximumScore: 5,
          },
        ],
      },
    ],
  },

  // Academic Supervisor Assessment
  // will be added here next.
  {
    name: "Academic Supervisor Assessment",
    version: 1,
    description:
      "Official TTU School-Based Supervisor Assessment Form",

    sections: [
      {
        name: "Industrial Attachment",
        criteria: [
          {
            name: "Week student began industrial attachment",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Completion of Log Book",
        criteria: [
          {
            name: "Filling of student's information",
            maximumScore: 4,
          },
          {
            name: "Filling of organization profile",
            maximumScore: 4,
          },
          {
            name: "Filling of daily log book up to date",
            maximumScore: 4,
          },
          {
            name: "Filling of log book up to date by supervisor",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Placement",
        criteria: [
          {
            name: "Relationship with course of study",
            maximumScore: 4,
          },
          {
            name: "Relevance of organization to programme of study",
            maximumScore: 4,
          },
          {
            name: "Skills, Competencies & Knowledge acquired",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Attitude to Work",
        criteria: [
          {
            name: "Punctuality",
            maximumScore: 4,
          },
          {
            name: "Regularity",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Communication",
        criteria: [
          {
            name: "Written ability",
            maximumScore: 4,
          },
          {
            name: "Verbal and non-verbal",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Appearance",
        criteria: [
          {
            name: "Headgear / Hair-do",
            maximumScore: 4,
          },
          {
            name: "Footwear",
            maximumScore: 4,
          },
          {
            name: "Attire",
            maximumScore: 4,
          },
        ],
      },

      {
        name: "Interpersonal Relationship & Team Work",
        criteria: [
          {
            name: "Superior",
            maximumScore: 4,
          },
          {
            name: "Colleagues",
            maximumScore: 4,
          },
          {
            name: "Subordinates",
            maximumScore: 4,
          },
          {
            name: "Clientele",
            maximumScore: 4,
          },
        ],
      },
    ],
  }
];

export async function seedAssessments(
  prisma: PrismaClient
) {
  console.log("🌱 Seeding assessment templates...");

  for (const templateData of assessmentTemplates) {
    const template =
      await prisma.assessmentTemplate.upsert({
        where: {
          name_version: {
            name: templateData.name,
            version: templateData.version,
          },
        },

        update: {
          description: templateData.description,
        },

        create: {
          name: templateData.name,
          version: templateData.version,
          description: templateData.description,
        },
      });

    for (
      let sectionIndex = 0;
      sectionIndex < templateData.sections.length;
      sectionIndex++
    ) {
      const section =
        templateData.sections[sectionIndex];

      const createdSection =
        await prisma.assessmentSection.upsert({
          where: {
            assessmentTemplateId_sortOrder: {
              assessmentTemplateId: template.id,
              sortOrder: sectionIndex + 1,
            },
          },

          update: {
            name: section.name,
          },

          create: {
            assessmentTemplateId: template.id,
            name: section.name,
            sortOrder: sectionIndex + 1,
          },
        });

      for (
        let criterionIndex = 0;
        criterionIndex < section.criteria.length;
        criterionIndex++
      ) {
        const criterion =
          section.criteria[criterionIndex];

        await prisma.assessmentCriterion.upsert({
          where: {
            assessmentSectionId_sortOrder: {
              assessmentSectionId:
                createdSection.id,

              sortOrder:
                criterionIndex + 1,
            },
          },

          update: {
            name: criterion.name,
            maximumScore:
              criterion.maximumScore,
          },

          create: {
            assessmentSectionId:
              createdSection.id,

            name: criterion.name,

            maximumScore:
              criterion.maximumScore,

            sortOrder:
              criterionIndex + 1,
          },
        });
      }
    }

    console.log(
      `✅ Seeded: ${templateData.name}`
    );
  }

  console.log(
    "🎉 Assessment templates seeded successfully."
  );
}