import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: NextRequest) {
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

    const {
      title,
      reportType,
      periodNumber,
      content,
    } = await req.json();

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
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      reportType !== "FINAL" &&
      !periodNumber
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Period number is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingReport =
      await prisma.report.findFirst({
        where: {
          studentId: student.id,
          reportType,
          periodNumber,
        },
      });

    if (existingReport) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Report already submitted for this period",
        },
        {
          status: 400,
        }
      );
    }

    const report =
      await prisma.report.create({
        data: {
          studentId: student.id,
          title,
          reportType,
          periodNumber,
          content,
        },
      });

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error(
      "REPORT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}