import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { validateUser } from "@/lib/auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        loginId: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.loginId || !credentials?.password) {
          return null;
        }

        const user = await validateUser(
          credentials.loginId,
          credentials.password
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          loginId: user.loginId,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.loginId = user.loginId;
      token.role = user.role;
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.loginId = token.loginId;
    session.user.role = token.role;

    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};