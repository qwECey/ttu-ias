import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const {
      remarks,
    } = await req.json();

    const report =
      await prisma.report.update({
        where: {
          id,
        },

        data: {
          supervisorRemarks:
            remarks,
        },
      });

    return NextResponse.json({
      success: true,
      report,
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