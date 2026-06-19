import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { loginId, password } = await req.json();

    const user = await validateUser(
      loginId,
      password
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      loginId: user.loginId,
      role: user.role,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}