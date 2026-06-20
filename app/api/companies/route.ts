import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      companyName,
      location,
      contactPerson,
      contactPhone,
    } = await req.json();

    const companyCount =
      await prisma.company.count();

    const loginId = `COMP${String(
      companyCount + 1
    ).padStart(3, "0")}`;

    const hashedPassword =
      await bcrypt.hash(loginId, 10);

    const user = await prisma.user.create({
      data: {
        loginId,
        password: hashedPassword,
        role: "COMPANY",
      },
    });

    const company =
      await prisma.company.create({
        data: {
          userId: user.id,
          companyName,
          location,
          contactPerson,
          contactPhone,
        },
      });

    return NextResponse.json({
      success: true,
      company,
      loginId,
    });
  } catch (error) {
    console.error(
      "CREATE COMPANY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}