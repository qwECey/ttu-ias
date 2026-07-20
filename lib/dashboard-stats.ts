import { prisma } from "@/lib/prisma";

export async function getLandingPageStats() {
  const [
    students,
    companies,
    supervisors,
    industrySupervisors,
    internships,
  ] = await Promise.all([
    prisma.student.count(),

    prisma.company.count(),

    prisma.supervisor.count(),

    prisma.industrySupervisor.count(),

    prisma.internship.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    students,

    companies,

    supervisors:
      supervisors +
      industrySupervisors,

    activeInternships:
      internships,
  };
}