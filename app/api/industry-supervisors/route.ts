import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function POST(
  req: NextRequest
) {
  try {
    const {
      fullName,
      email,
      phone,
      companyId,
    } = await req.json();

    const count =
      await prisma.industrySupervisor.count();

    const loginId =
      `IND${String(count + 1).padStart(3, "0")}`;

    const password =
      "password123";

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const existingUser =
        await prisma.user.findFirst({
            where: {
            OR: [
                { email },
                { loginId },
            ],
            },
        });

        if (existingUser) {
        return NextResponse.json(
            {
            success: false,
            message:
                "User already exists",
            },
            {
            status: 400,
            }
        );
    }

    const user =
      await prisma.user.create({
        data: {
          loginId,
          email,
          password: hashedPassword,
          role: UserRole.INDUSTRY_SUPERVISOR,
        },
      });

    const supervisor =
      await prisma.industrySupervisor.create({
        data: {
          userId: user.id,
          fullName,
          email,
          phone,
          companyId,
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
      },
      {
        status: 500,
      }
    );
  }
}