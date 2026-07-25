import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash(
    "Admin@123",
    10
  );

  // Administrator
  await prisma.user.upsert({
    where: {
      loginId: "ADMIN001",
    },
    update: {},
    create: {
      fullName: "System Administrator",
      loginId: "ADMIN001",
      email: "admin@ttu.edu.gh",
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
      mustChangePassword: false,
    },
  });

  // Liaison Officer
  await prisma.user.upsert({
    where: {
      loginId: "LIA001",
    },
    update: {},
    create: {
      fullName: "Liaison Officer",
      loginId: "LIA001",
      email: "liaison@ttu.edu.gh",
      password: hashedPassword,
      role: "LIAISON",
      isActive: true,
      mustChangePassword: false,
    },
  });

  // Academic Supervisor
  await prisma.user.upsert({
    where: {
      loginId: "SUP001",
    },
    update: {},
    create: {
      fullName: "Academic Supervisor",
      loginId: "SUP001",
      email: "supervisor@ttu.edu.gh",
      password: hashedPassword,
      role: "SUPERVISOR",
      isActive: true,
      mustChangePassword: false,
    },
  });

  console.log("=================================");
  console.log("Bootstrap completed successfully");
  console.log("=================================");
  console.log("ADMIN001  / Admin@123");
  console.log("LIA001    / Admin@123");
  console.log("SUP001    / Admin@123");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });