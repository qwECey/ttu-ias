// import bcrypt from "bcryptjs";

// import { PrismaClient } from "../lib/generated/prisma/client";
// import { UserRole } from "../lib/generated/prisma/enums";

// const prisma = new PrismaClient();

// async function main() {
//   const password = await bcrypt.hash(
//     "password123",
//     10
//   );

//   await prisma.user.create({
//     data: {
//       loginId: "ADMIN001",
//       email: "admin@ttu.edu.gh",
//       password,
//       role: UserRole.ADMIN,
//     },
//   });

//   await prisma.user.create({
//     data: {
//       loginId: "LIA001",
//       email: "liaison@ttu.edu.gh",
//       password,
//       role: UserRole.LIAISON,
//     },
//   });

//   await prisma.user.create({
//     data: {
//       loginId: "SUP001",
//       email: "supervisor@ttu.edu.gh",
//       password,
//       role: UserRole.SUPERVISOR,
//     },
//   });

//   console.log(
//     "✅ Seed completed successfully."
//   );
// }

// main()
//   .catch((error) => {
//     console.error(error);

//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });