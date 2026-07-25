import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import SetupForm from "./setup-form";

export default async function InitialSetupPage() {
  const admin =
    await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

  if (admin) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold">
            Initial Administrator Setup
          </h1>

          <p className="mt-3 text-gray-500">
            Create the first administrator
            account for the TTU Internship &
            Attachment System.
          </p>

        </div>

        <SetupForm />

      </div>
    </main>
  );
}