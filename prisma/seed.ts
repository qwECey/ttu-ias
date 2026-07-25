import { prisma } from "../lib/prisma";

import { seedUsers } from "./seeds/users";
import { seedStudents } from "./seeds/students";
import { seedAssessments } from "./seeds/assessments";
import { seedCompanies } from "./seeds/companies";
import { seedSupervisors } from "./seeds/supervisors";
import { seedIndustrySupervisors } from "./seeds/industry-supervisors";
import { seedInternships } from "./seeds/internships";
import { seedPlacements } from "./seeds/placements";
import { seedReports } from "./seeds/reports";
import { seedLogbooks } from "./seeds/logbooks";

async function main() {
  console.log("🌱 Starting database seed...");

  await seedUsers(prisma);

  await seedStudents(prisma);

  await seedCompanies(prisma);

  await seedSupervisors(prisma);

  await seedIndustrySupervisors(prisma);

  await seedInternships(prisma);

  await seedPlacements(prisma);

  await seedReports(prisma);

  await seedLogbooks(prisma);
  
  await seedAssessments(prisma);

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });