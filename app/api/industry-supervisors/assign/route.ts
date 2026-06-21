import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const {
      studentId,
      supervisorId,
    } = await req.json();

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        industrySupervisorId:
          supervisorId,
      },
    });

    return NextResponse.json({
      success: true,
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