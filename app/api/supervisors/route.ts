import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const {
      fullName,
      email,
      phone,
    } = await req.json();

    console.log(Object.keys(prisma));

    const existing =
      await prisma.supervisor.findUnique(
        {
          where: {
            email,
          },
        }
      );

    if (existing) {
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

    const supervisor =
      await prisma.supervisor.create({
        data: {
          fullName,
          email,
          phone,
        },
      });

    return NextResponse.json({
      success: true,
      supervisor,
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