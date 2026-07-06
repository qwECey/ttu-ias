import { prisma } from "@/lib/prisma";

export async function getOrCreateActiveInternship(
  studentId: string,
  options?: {
    academicYear?: string;
    semester?: number;
    level?: number;
    durationWeeks?: number;
  }
) {
  const internship =
    await prisma.internship.findFirst({
      where: {
        studentId,
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  if (internship) {
    return internship;
  }

  return prisma.internship.create({
    data: {
      studentId,

      academicYear:
        options?.academicYear ??
        "2026/2027",

      semester:
        options?.semester ?? 2,

      level:
        options?.level ?? 100,

      durationWeeks:
        options?.durationWeeks ?? 16,
    },
  });
}