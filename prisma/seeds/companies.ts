import bcrypt from "bcryptjs";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { UserRole } from "@/lib/generated/prisma/enums";

import {
  companyNames,
  locations,
  seedConfig,
} from "./data";

import {
  generateCompanyLogin,
  generateDefaultPassword,
} from "./helpers";

export async function seedCompanies(
  prisma: PrismaClient
) {
  console.log("🏢 Seeding companies...");

  for (
    let i = 1;
    i <= seedConfig.companies;
    i++
  ) {
    const companyName =
      companyNames[i - 1];

    const location =
      locations[
        (i - 1) % locations.length
      ];

    const loginId =
      generateCompanyLogin(i);

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
      `${companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")}@company.com`;

    await prisma.$transaction(
      async (tx) => {
        const user =
          await tx.user.create({
            data: {
              fullName:
                companyName,
              loginId,
              email,
              password:
                hashedPassword,
              role: UserRole.COMPANY,
              isActive: true,
              mustChangePassword: true,
            },
          });

        await tx.company.create({
          data: {
            userId: user.id,
            companyName,
            location,
            contactPerson:
              "Human Resource Manager",
            contactPhone:
              `024${String(
                1000000 + i
              )}`,
            contactEmail:
              email,
            approved: true,
          },
        });
      }
    );

    console.log(
      `✅ ${companyName} created`
    );
  }

  console.log(
    "🎉 Company seeding completed."
  );
}