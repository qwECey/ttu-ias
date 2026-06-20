import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      studentId,
      fullName,
      email,
      phone,
      department,
      programme,
      level,
    } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        loginId: studentId,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Student already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      studentId,
      10
    );

    const user = await prisma.user.create({
      data: {
        loginId: studentId,
        email,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        studentId,
        fullName,
        email,
        phone,
        department,
        programme,
        level: Number(level),
      },
    });

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}