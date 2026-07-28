import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const { remarks } =
      await req.json();

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
          message: "Placement request not found.",
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

    await prisma.placementRequest.update({
      where: {
        id,
      },
      data: {
        status: "REJECTED",
        liaisonRemarks: remarks?.trim() || null,
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