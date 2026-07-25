import { prisma } from "../lib/prisma";

import { seedUsers } from "./seeds/users";
import { seedStudents } from "./seeds/students";
import { seedAssessments } from "./seeds/assessments";

async function main() {
  console.log("🌱 Starting database seed...");

  await seedUsers(prisma);

  await seedStudents(prisma);

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