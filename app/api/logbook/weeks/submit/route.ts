import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

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

    const student =
      await prisma.student.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      weekNumber,
    } = await req.json();

    const existingWeek =
      await prisma.logbookWeek.findUnique({
        where: {
          studentId_weekNumber: {
            studentId: student.id,
            weekNumber,
          },
        },
      });

    if (!existingWeek) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Save your draft before submitting.",
        },
        {
          status: 400,
        }
      );
    }

    if (existingWeek.submitted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Week already submitted.",
        },
        {
          status: 400,
        }
      );
    }

    const week =
      await prisma.logbookWeek.update({
        where: {
          id: existingWeek.id,
        },
        data: {
          submitted: true,
        },
      });

    return NextResponse.json({
      success: true,
      week,
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