import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      reportType,
      periodNumber,
      content,
    } = await req.json();

    const student =
      await prisma.student.findFirst();

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

    console.log(Object.keys(prisma));

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