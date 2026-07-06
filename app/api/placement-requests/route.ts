import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

import { getOrCreateActiveInternship } from "@/lib/internship";

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

    const internship =
      await getOrCreateActiveInternship(
        student.id,
        {
          level: student.level,
        }
      );

      const existingRequest =
        await prisma.placementRequest.findFirst({
          where: {
            internshipId: internship.id,
            status: "PENDING",
          },
        });

      if (existingRequest) {
        return NextResponse.json(
          {
            success: false,
            message:
              "You already have a pending placement request.",
          },
          {
            status: 400,
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

    const usingExisting =
      Boolean(existingCompanyId);

    const usingNew =
      Boolean(
        companyName?.trim()
      );

    if (
      usingExisting &&
      usingNew
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Choose an existing company OR register a new one.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !usingExisting &&
      !usingNew
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select a company or register a new one.",
        },
        {
          status: 400,
        }
      );
    }

    // Existing company selected
    if (usingExisting) {
      const company =
        await prisma.company.findUnique({
          where: {
            id: existingCompanyId,
          },
        });

      if (!company) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Selected company does not exist.",
          },
          {
            status: 404,
          }
        );
      }

      await prisma.placementRequest.create({
        data: {
          studentId: student.id,
          internshipId: internship.id,

          companyId: company.id,

          companyName: company.companyName,
          location: company.location,
          contactPerson: company.contactPerson,
          contactPhone: company.contactPhone,
          contactEmail: company.contactEmail,

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
        internshipId: internship.id,

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