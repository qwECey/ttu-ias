import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const { remarks } = await req.json();

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

    const internship =
      request.internshipId
        ? await prisma.internship.findUnique({
            where: {
              id: request.internshipId,
            },
          })
        : null;

    if (!internship) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (request.status !== "PENDING") {
      return NextResponse.json(
        {
          success: false,
          message: "This request has already been reviewed.",
        },
        {
          status: 400,
        }
      );
    }

    let company;

      if (request.companyId) {
        // Student selected an existing company
        company = await prisma.company.findUnique({
          where: {
            id: request.companyId,
          },
        });

        if (!company) {
          return NextResponse.json(
            {
              success: false,
              message: "Selected company not found.",
            },
            {
              status: 404,
            }
          );
        }
      } else {
        // Student registered a new company

        if (!request.contactEmail) {
          return NextResponse.json(
            {
              success: false,
              message: "Placement request has no contact email.",
            },
            {
              status: 400,
            }
          );
        }

        const companyCount =
          await prisma.company.count();

        const loginId =
          `COMP${String(companyCount + 1).padStart(3, "0")}`;

        const password = "password123";

        const hashedPassword =
          await bcrypt.hash(password, 10);

        const user =
          await prisma.user.create({
            data: {
              fullName: request.contactPerson,
              loginId,
              email: request.contactEmail,
              password: hashedPassword,
              role: UserRole.COMPANY,
              mustChangePassword: true,
            },
          });

        company =
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
    }

    await prisma.internship.update({
      where: {
        id: internship.id,
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
        liaisonRemarks: remarks,
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