import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      loginId: string;
      role: string;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    loginId: string;
    role: string;
    mustChangePassword: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    loginId: string;
    role: string;
    mustChangePassword: boolean;
  }
}