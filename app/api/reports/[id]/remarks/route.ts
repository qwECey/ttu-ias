import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
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

    const supervisor =
      await prisma.supervisor.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (!supervisor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supervisor not found.",
        },
        {
          status: 404,
        }
      );
    }

    const { remarks } =
      await req.json();

    const { id } =
      await params;

    const report =
      await prisma.report.findUnique({
        where: {
          id,
        },
        include: {
          student: true,
        },
      });

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Report not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      report.student.supervisorId !==
      supervisor.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not allowed to edit remarks for this report.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      report.academicStatus !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Remarks can only be edited while the report is pending.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedReport =
      await prisma.report.update({
        where: {
          id,
        },
        data: {
          academicRemarks:
            remarks,
        },
      });

    return NextResponse.json({
      success: true,
      report: updatedReport,
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