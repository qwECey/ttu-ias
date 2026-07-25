"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function createInitialAdmin(
  formData: FormData
) {
  const fullName =
    formData.get("fullName")
      ?.toString()
      .trim() ?? "";

  const loginId =
    formData.get("loginId")
        ?.toString()
        .trim()
        .toLowerCase() ?? "";

  const email =
    formData.get("email")
        ?.toString()
        .trim()
        .toLowerCase() ?? "";

  const password =
    formData.get("password")
      ?.toString() ?? "";

  const confirmPassword =
    formData
      .get("confirmPassword")
      ?.toString() ?? "";

  if (
    !fullName ||
    !loginId ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return {
      success: false,
      message:
        "All fields are required.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message:
        "Passwords do not match.",
    };
  }

  const existingAdmin =
    await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

  if (existingAdmin) {
    return {
      success: false,
      message:
        "An administrator already exists.",
    };
  }

  const duplicate =
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

  if (duplicate) {
    return {
      success: false,
      message:
        "Login ID or email already exists.",
    };
  }

  const hashedPassword =
    await hashPassword(
      password
    );

  await prisma.user.create({
    data: {
      fullName,
      loginId,
      email,
      password: hashedPassword,

      role: "ADMIN",

      isActive: true,

      mustChangePassword: false,
    },
  });

  return {
    success: true,
  };
}