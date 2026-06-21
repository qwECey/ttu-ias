import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { remarks } =
      await req.json();

    const { id } =
      await params;

    const report =
      await prisma.report.update({
        where: {
          id,
        },
        data: {
          status: "REJECTED",
          supervisorRemarks:
            remarks || null,
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