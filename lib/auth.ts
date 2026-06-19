import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function validateUser(
  loginId: string,
  password: string
) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { loginId },
        { email: loginId },
      ],
    },
  });

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return null;
  }

  return user;
}