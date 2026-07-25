import { PrismaClient } from "@/lib/generated/prisma/client";

export async function seedLogbooks(
  prisma: PrismaClient
) {
  console.log("📖 Seeding logbooks...");

  const internships =
    await prisma.internship.findMany({
      include: {
        student: true,
      },
    });

  for (const internship of internships) {
    for (
      let week = 1;
      week <= internship.durationWeeks;
      week++
    ) {
      const submitted =
        week <= 12;

      const certified =
        week <= 10;

      const existingWeek =
        await prisma.logbookWeek.findFirst({
          where: {
            studentId: internship.studentId,
            weekNumber: week,
          },
        });

      if (existingWeek) {
        continue;
      }

      await prisma.logbookWeek.create({
        data: {
          studentId:
            internship.studentId,

          internshipId:
            internship.id,

          weekNumber: week,

          department:
            internship.student.department,

          monday:
            "Observed laboratory procedures and equipment handling.",

          tuesday:
            "Participated in sample collection and documentation.",

          wednesday:
            "Performed routine laboratory investigations under supervision.",

          thursday:
            "Assisted with quality control procedures and equipment maintenance.",

          friday:
            "Reviewed laboratory safety protocols and participated in reporting.",

          saturday: null,

          sunday: null,

          studentRemarks:
            "Completed assigned tasks successfully and gained practical experience.",

          submitted,

          certified,

          supervisorRemarks:
            certified
              ? "Good progress. Keep it up."
              : null,

          certifiedAt:
            certified
              ? new Date()
              : null,
        },
      });
    }
  }

  console.log(
    "🎉 Logbooks seeded successfully."
  );
}