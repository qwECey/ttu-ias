import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { studentId, companyId } =
      await req.json();

    const existingPlacement =
      await prisma.placement.findFirst({
        where: {
          studentId,
        },
      });

    if (existingPlacement) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student already has a placement",
        },
        {
          status: 400,
        }
      );
    }
    
      const placement =
      await prisma.placement.create({
        data: {
          studentId,
          companyId,
        },
      });

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        placementStatus: "PLACED",
        companyId,
      },
    });

    return NextResponse.json({
      success: true,
      placement,
    });
  } catch (error) {
    console.error(
      "PLACEMENT ERROR:",
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