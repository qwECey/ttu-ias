import {
  NextRequest,
  NextResponse,
} from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function POST(
  req: NextRequest
) {
  try {
    const {
      fullName,
      email,
      phone,
    } = await req.json();

    const existingSupervisor =
      await prisma.supervisor.findUnique({
        where: {
          email,
        },
      });

    if (existingSupervisor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supervisor already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A user with this email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const supervisorCount =
      await prisma.supervisor.count();

    const loginId =
      `SUP${String(
        supervisorCount + 1
      ).padStart(3, "0")}`;

    const password = loginId;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          loginId,
          email,
          password: hashedPassword,
          role: UserRole.SUPERVISOR,
          mustChangePassword: true,
        },
      });

    const supervisor =
      await prisma.supervisor.create({
        data: {
          fullName,
          email,
          phone,
          userId: user.id,
        },
      });

    return NextResponse.json({
      success: true,
      supervisor,
      credentials: {
        loginId,
        password,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}