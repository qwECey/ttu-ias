import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest
) {
  try {
    const {
      userId,
      isActive,
    } = await req.json();

    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive:
            !isActive,
        },
      });

    return NextResponse.json(
      user
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to update user",
      },
      {
        status: 500,
      }
    );
  }
}