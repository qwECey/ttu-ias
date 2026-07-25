import bcrypt from "bcryptjs";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums";

import { seedConfig } from "./data";

import {
  generateFullName,
  generateEmail,
  generatePhoneNumber,
  generateSupervisorLogin,
  generateDefaultPassword,
} from "./helpers";

export async function seedSupervisors(
  prisma: PrismaClient
) {
  console.log("👨‍🏫 Seeding supervisors...");

  for (
    let i = 1;
    i <= seedConfig.supervisors;
    i++
  ) {
    const fullName =
      generateFullName();

    const loginId =
      generateSupervisorLogin(i);

    const existingUser =
      await prisma.user.findUnique({
        where: {
          loginId,
        },
      });

    if (existingUser) {
      continue;
    }

    const password =
      generateDefaultPassword(
        loginId
      );

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const email =
      generateEmail(
        fullName,
        1000 + i
      );

    const phone =
      generatePhoneNumber();

    await prisma.$transaction(
      async (tx) => {
        const user =
          await tx.user.create({
            data: {
              fullName,
              loginId,
              email,
              password:
                hashedPassword,
              role: UserRole.SUPERVISOR,
              isActive: true,
              mustChangePassword: true,
            },
          });

        await tx.supervisor.create({
          data: {
            fullName,
            email,
            phone,
            userId: user.id,
          },
        });
      }
    );

    console.log(
      `✅ ${fullName} created`
    );
  }

  console.log(
    "🎉 Supervisors seeded successfully."
  );
}