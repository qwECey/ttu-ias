import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) {
          return false;
        }

        const pathname =
          req.nextUrl.pathname;

        if (
          pathname.startsWith("/student")
        ) {
          return (
            token.role === "STUDENT"
          );
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

        if (
          pathname.startsWith("/liaison")
        ) {
          return (
            token.role ===
              "LIAISON" ||
            token.role === "ADMIN"
          );
        }

        if (
          pathname.startsWith("/admin")
        ) {
          return (
            token.role === "ADMIN"
          );
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/student/:path*",
    "/industry-supervisor/:path*",
    "/liaison/:path*",
    "/admin/:path*",
  ],
};