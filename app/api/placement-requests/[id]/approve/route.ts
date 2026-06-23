import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const request =
  await prisma.placementRequest.findUnique({
    where: {
      id,
    },
  });

if (!request) {
  return NextResponse.json(
    {
      success: false,
      message: "Request not found",
    },
    {
      status: 404,
    }
  );
}

if (request.status === "APPROVED") {
  return NextResponse.json(
    {
      success: false,
      message:
        "Request already approved",
    },
    {
      status: 400,
    }
  );
}

    const companyCount =
      await prisma.company.count();

    const loginId =
      `COM${String(companyCount + 1).padStart(3, "0")}`;

    const password = "password123";

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          loginId,
          email: request.contactEmail,
          password: hashedPassword,
          role: UserRole.COMPANY,
        },
      });

    const company =
      await prisma.company.create({
        data: {
          userId: user.id,
          companyName: request.companyName,
          location: request.location,
          contactPerson: request.contactPerson,
          contactPhone: request.contactPhone,
          contactEmail: request.contactEmail,
          approved: true,
        },
      });

    await prisma.student.update({
      where: {
        id: request.studentId,
      },
      data: {
        companyId: company.id,
        placementStatus: "PLACED",
      },
    });

    await prisma.placement.create({
      data: {
        studentId: request.studentId,
        companyId: company.id,
      },
    });

    await prisma.placementRequest.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
      },
    });

    return NextResponse.json({
      success: true,
      credentials: {
        loginId,
        password,
      },
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