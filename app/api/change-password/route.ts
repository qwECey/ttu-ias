import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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

  const {
    currentPassword,
    newPassword,
  } = await req.json();

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found.",
      },
      {
        status: 404,
      }
    );
  }

  const validPassword =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!validPassword) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Current password is incorrect.",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      mustChangePassword: false,
    },
  });

  return NextResponse.json({
    success: true,
  });
}