import { NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";

export async function GET() {
  const user = await validateUser(
    "ADMIN001",
    "Admin@123"
  );

  return NextResponse.json({
    success: !!user,
    loginId: user?.loginId,
    role: user?.role,
  });
}