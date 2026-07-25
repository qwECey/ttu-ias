import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function POST(
  req: NextRequest
) {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const company =
      await prisma.company.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      fullName,
      email,
      phone,
    } = await req.json();

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
            "Email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    let loginId = "";

      while (true) {
        const randomNumber =
          Math.floor(
            100 + Math.random() * 900
          );

        loginId = `IS${randomNumber}`;

        const existing =
          await prisma.user.findUnique({
            where: {
              loginId,
            },
          });

        if (!existing) {
          break;
        }
      }

    const password =
      "password123";

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await prisma.user.create({
        data: {
          fullName,
          loginId,
          email,
          password: hashedPassword,
          role: UserRole.INDUSTRY_SUPERVISOR,
        },
      });

    await prisma.industrySupervisor.create({
      data: {
        userId: user.id,
        companyId: company.id,
        fullName,
        email,
        phone,
      },
    });

    return NextResponse.json({
      success: true,

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
      },
      {
        status: 500,
      }
    );
  }
}