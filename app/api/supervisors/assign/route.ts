import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const formData =
      await req.formData();

    const internshipId =
      formData.get(
        "internshipId"
      ) as string;

    const supervisorId =
      formData.get(
        "supervisorId"
      ) as string;

    await prisma.internship.update({
      where: {
        id: internshipId,
      },
      data: {
        supervisorId,
      },
    });

    return NextResponse.redirect(
      new URL(
        "/admin/students",
        req.url
      )
    );
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