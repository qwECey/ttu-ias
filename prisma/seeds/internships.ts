import { PrismaClient } from "@/lib/generated/prisma/client";

export async function seedInternships(
  prisma: PrismaClient
) {
  console.log("🎯 Seeding internships...");

  const students =
    await prisma.student.findMany();

  const companies =
    await prisma.company.findMany();

  const supervisors =
    await prisma.supervisor.findMany();

  const industrySupervisors =
    await prisma.industrySupervisor.findMany();

  if (
    !students.length ||
    !companies.length ||
    !supervisors.length ||
    !industrySupervisors.length
  ) {
    throw new Error(
      "Missing prerequisite data. Seed students, companies and supervisors first."
    );
  }

  for (
    let i = 0;
    i < students.length;
    i++
  ) {
    const student = students[i];

    const company =
      companies[
        i % companies.length
      ];

    const supervisor =
      supervisors[
        i % supervisors.length
      ];

    const industrySupervisor =
      industrySupervisors.find(
        (item) =>
          item.companyId === company.id
      ) ??
      industrySupervisors[
        i %
          industrySupervisors.length
      ];

    await prisma.$transaction(
      async (tx) => {
        await tx.internship.create({
          data: {
            studentId: student.id,

            companyId: company.id,

            supervisorId:
              supervisor.id,

            industrySupervisorId:
              industrySupervisor.id,

            academicYear:
              "2025/2026",

            level:
              student.level,

            semester: 2,

            durationWeeks: 16,

            placementStatus:
              "PLACED",

            status: "ACTIVE",
          },
        });

        await tx.student.update({
          where: {
            id: student.id,
          },
          data: {
            companyId:
              company.id,

            supervisorId:
              supervisor.id,

            industrySupervisorId:
              industrySupervisor.id,

            placementStatus:
              "PLACED",
          },
        });
      }
    );

    if ((i + 1) % 20 === 0) {
      console.log(
        `✅ ${i + 1} internships created...`
      );
    }
  }

  console.log(
    "🎉 Internship seeding completed."
  );
}