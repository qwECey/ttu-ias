import bcrypt from "bcryptjs";

export function generateTemporaryPassword() {
  const number =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `IAS${number}`;
}

export async function hashPassword(
  password: string
) {
  return bcrypt.hash(password, 10);
}