import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

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
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    const {
      existingCompanyId,
      companyName,
      location,
      contactPerson,
      contactPhone,
      contactEmail,
    } = await req.json();

    // Existing company selected
    if (existingCompanyId) {
      await prisma.placementRequest.create({
        data: {
          studentId: student.id,
          companyName: "EXISTING COMPANY",
          location: "",
          contactPerson: "",
          contactPhone: "",
          contactEmail: "",
          status: "PENDING",
        },
      });

      return NextResponse.json({
        success: true,
      });
    }

    // New company submitted
    await prisma.placementRequest.create({
      data: {
        studentId: student.id,
        companyName,
        location,
        contactPerson,
        contactPhone,
        contactEmail,
        status: "PENDING",
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