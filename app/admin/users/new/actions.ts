"use server";

import { prisma } from "@/lib/prisma";
import {
  generateTemporaryPassword,
  hashPassword,
} from "@/lib/password";

export async function createUser(
  formData: FormData
) {
  const fullName =
  formData.get("fullName")
    ?.toString()
    .trim() ?? "";

  const loginId =
    formData.get("loginId")
      ?.toString()
      .trim() ?? "";

  const email =
    formData.get("email")
      ?.toString()
      .trim() ?? "";

  const role =
    formData.get("role")
      ?.toString()
      .trim() ?? "";

  if (
    !fullName ||
    !loginId ||
    !email ||
    !role
  ) {
    return {
      success: false,
      message:
        "All fields are required.",
    };
  }

  const existingUser =
    await prisma.user.findFirst({
      where: {
        OR: [
          {
            loginId,
          },
          {
            email,
          },
        ],
      },
    });

  if (existingUser) {
    return {
      success: false,
      message:
        "Login ID or email already exists.",
    };
  }

  const temporaryPassword =
    generateTemporaryPassword();

  const hashedPassword =
    await hashPassword(
      temporaryPassword
    );

  await prisma.user.create({
    data: {
      fullName,
      loginId,
      email,
      password:
        hashedPassword,
      role: role as
        | "ADMIN"
        | "LIAISON",
      isActive: true,
      mustChangePassword: true,
    },
  });

  return {
    success: true,
    loginId,
    temporaryPassword,
  };
}