import { PrismaClient } from "@/lib/generated/prisma/client";

export async function seedPlacements(
  prisma: PrismaClient
) {
  console.log("📍 Seeding placements...");

  const internships =
    await prisma.internship.findMany({
      where: {
        companyId: {
          not: null,
        },
      },
    });

  for (const internship of internships) {
    const existing =
      await prisma.placement.findFirst({
        where: {
          studentId:
            internship.studentId,
        },
      });

    if (existing) {
      continue;
    }

    await prisma.placement.create({
      data: {
        studentId:
          internship.studentId,

        companyId:
          internship.companyId!,
      },
    });
  }

  console.log(
    "🎉 Placements seeded successfully."
  );
}