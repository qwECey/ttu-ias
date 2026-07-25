import bcrypt from "bcryptjs";
import { PrismaClient } from "@/lib/generated/prisma/client";

import { seedConfig } from "./data";

import {
  generateFullName,
  generateEmail,
  generatePhoneNumber,
  generateStudentId,
  randomDepartment,
  randomProgramme,
  randomLevel,
} from "./helpers";

export async function seedStudents(
  prisma: PrismaClient
) {
  console.log("🎓 Seeding students...");

  for (
    let i = 1;
    i <= seedConfig.students;
    i++
  ) {
    const fullName =
      generateFullName();

    const studentId =
      generateStudentId(i);

    const email =
      generateEmail(
        fullName,
        i
      );

    const phone =
      generatePhoneNumber();

    const department =
      randomDepartment();

    const programme =
      randomProgramme();

    const level =
      randomLevel();

    const password =
      await bcrypt.hash(
        studentId,
        10
      );
    
    const existingStudent =
      await prisma.student.findUnique({
        where: {
          studentId,
        },
      });

    if (existingStudent) {
      continue;
    }

    await prisma.$transaction(
      async (tx) => {
        const user =
          await tx.user.create({
            data: {
              fullName,
              loginId:
                studentId,
              email,
              password,
              role: "STUDENT",
              isActive: true,
              mustChangePassword: true,
            },
          });

        await tx.student.create({
          data: {
            userId: user.id,
            studentId,
            fullName,
            email,
            phone,
            department,
            programme,
            level,
            placementStatus:
              "UNPLACED",
          },
        });
      }
    );

    if (i % 20 === 0) {
      console.log(
        `✅ ${i} students created...`
      );
    }
  }

  console.log(
    "🎉 Student seeding completed."
  );
}