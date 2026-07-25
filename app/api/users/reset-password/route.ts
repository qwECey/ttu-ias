import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  generateTemporaryPassword,
  hashPassword,
} from "@/lib/password";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { userId } =
      await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const temporaryPassword =
      generateTemporaryPassword();

    const hashedPassword =
      await hashPassword(
        temporaryPassword
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password:
          hashedPassword,
        mustChangePassword: true,
      },
    });

    return NextResponse.json({
        success: true,
        loginId: user.loginId,
        temporaryPassword,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server error.",
      },
      {
        status: 500,
      }
    );
  }
}