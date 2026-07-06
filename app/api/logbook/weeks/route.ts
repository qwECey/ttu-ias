import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
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
          message: "Student not found.",
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

    const {
      weekNumber,
      department,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      studentRemarks,
    } = await req.json();

    const week =
      await prisma.logbookWeek.upsert({
        where: {
          studentId_weekNumber: {
            studentId: student.id,
            weekNumber,
          },
        },

        update: {
          department,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          studentRemarks,
        },

        create: {
          studentId: student.id,
          internshipId: internship.id,

          weekNumber,
          department,

          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,

          studentRemarks,
        },
      });

    return NextResponse.json({
      success: true,
      week,
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