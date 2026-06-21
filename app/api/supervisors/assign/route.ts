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

    const studentId =
      formData.get(
        "studentId"
      ) as string;

    const supervisorId =
      formData.get(
        "supervisorId"
      ) as string;

    await prisma.student.update({
      where: {
        id: studentId,
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