import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (
      token?.mustChangePassword &&
      pathname !== "/change-password"
    ) {
      return NextResponse.redirect(
        new URL("/change-password", req.url)
      );
    }

    if (
      !token?.mustChangePassword &&
      pathname === "/change-password"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) {
          return false;
        }

        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("/student")) {
          return token.role === "STUDENT";
        }

        if (
          pathname.startsWith(
            "/industry-supervisor"
          )
        ) {
          return (
            token.role ===
            "INDUSTRY_SUPERVISOR"
          );
        }

        if (pathname.startsWith("/company")) {
          return token.role === "COMPANY";
        }

        if (
          pathname.startsWith("/supervisor")
        ) {
          return token.role === "SUPERVISOR";
        }

        if (pathname.startsWith("/liaison")) {
          return (
            token.role === "LIAISON" ||
            token.role === "ADMIN"
          );
        }

        if (pathname.startsWith("/admin")) {
          return token.role === "ADMIN";
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/student/:path*",
    "/company/:path*",
    "/supervisor/:path*",
    "/industry-supervisor/:path*",
    "/liaison/:path*",
    "/admin/:path*",
    "/change-password",
  ],
};