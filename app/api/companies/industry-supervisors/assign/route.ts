import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

export async function PATCH(
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

    const company =
      await prisma.company.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    const {
      internshipId,
      supervisorId,
    } = await req.json();

    const internship =
      await prisma.internship.findUnique({
        where: {
          id: internshipId,
        },
      });

    if (!internship) {
      return NextResponse.json(
        {
          success: false,
          message: "Internship not found",
        },
        {
          status: 404,
        }
      );
    }

    if (internship.companyId !== company.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Internship does not belong to your company.",
        },
        {
          status: 403,
        }
      );
    }

    const supervisor =
      await prisma.industrySupervisor.findUnique({
        where: {
          id: supervisorId,
        },
      });

    if (!supervisor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supervisor not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      supervisor.companyId !== company.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supervisor does not belong to your company.",
        },
        {
          status: 403,
        }
      );
    }

    await prisma.internship.update({
      where: {
        id: internshipId,
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