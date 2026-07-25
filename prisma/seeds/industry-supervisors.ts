import bcrypt from "bcryptjs";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums";

import { seedConfig } from "./data";

import {
  generateFullName,
  generateEmail,
  generatePhoneNumber,
  generateIndustrySupervisorLogin,
  generateDefaultPassword,
} from "./helpers";

export async function seedIndustrySupervisors(
  prisma: PrismaClient
) {
  console.log(
    "🏭 Seeding industry supervisors..."
  );

  const companies =
    await prisma.company.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

  if (companies.length === 0) {
    throw new Error(
      "No companies found. Seed companies first."
    );
  }

  for (
    let i = 1;
    i <= seedConfig.industrySupervisors;
    i++
  ) {
    const fullName =
      generateFullName();

    const loginId =
      generateIndustrySupervisorLogin(
        i
      );

    const existingUser =
      await prisma.user.findUnique({
        where: {
          loginId,
        },
      });

    if (existingUser) {
      console.log(
        `⏭️ ${loginId} already exists. Skipping...`
      );

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
        2000 + i
      );

    const phone =
      generatePhoneNumber();

    const company =
      companies[
        (i - 1) %
          companies.length
      ];

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
              role:
                UserRole.INDUSTRY_SUPERVISOR,
              isActive: true,
              mustChangePassword: true,
            },
          });

        await tx.industrySupervisor.create({
          data: {
            fullName,
            email,
            phone,
            userId: user.id,
            companyId:
              company.id,
          },
        });
      }
    );

    console.log(
      `✅ ${fullName} assigned to ${company.companyName}`
    );
  }

  console.log(
    "🎉 Industry supervisors seeded successfully."
  );
}