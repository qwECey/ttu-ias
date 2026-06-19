import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.create({
    data: {
      loginId: "ADMIN001",
      email: "admin@ttu.edu.gh",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created:");
  console.log(admin);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });