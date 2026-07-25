import bcrypt from "bcryptjs";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function seedUsers(
  prisma: PrismaClient
) {
  console.log("👤 Seeding users...");

  const password = await bcrypt.hash(
    "Password@123",
    10
  );

  // Administrator
  await prisma.user.upsert({
    where: {
      loginId: "ADMIN001",
    },
    update: {},
    create: {
      fullName:
        "System Administrator",
      loginId: "ADMIN001",
      email:
        "admin@ttu.edu.gh",
      password,
      role: UserRole.ADMIN,
      isActive: true,
      mustChangePassword: false,
    },
  });

  // Liaison Officer 1
  await prisma.user.upsert({
    where: {
      loginId: "LIA001",
    },
    update: {},
    create: {
      fullName:
        "Liaison Officer One",
      loginId: "LIA001",
      email:
        "liaison1@ttu.edu.gh",
      password,
      role: UserRole.LIAISON,
      isActive: true,
      mustChangePassword: false,
    },
  });

  // Liaison Officer 2
  await prisma.user.upsert({
    where: {
      loginId: "LIA002",
    },
    update: {},
    create: {
      fullName:
        "Liaison Officer Two",
      loginId: "LIA002",
      email:
        "liaison2@ttu.edu.gh",
      password,
      role: UserRole.LIAISON,
      isActive: true,
      mustChangePassword: false,
    },
  });

  console.log(
    "✅ Users seeded successfully."
  );
}