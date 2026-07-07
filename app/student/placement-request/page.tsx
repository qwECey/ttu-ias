import { prisma } from "@/lib/prisma";
import PlacementRequestForm from "./placement-request-form";
import { getOrCreateActiveInternship } from "@/lib/internship";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function PlacementRequestPage() {
  const session =
  await getServerSession(authOptions);

if (!session?.user?.id) {
  return <div>Unauthorized</div>;
}

const student =
  await prisma.student.findUnique({
    where: {
      userId: session.user.id,
    },
  });

if (!student) {
  return <div>Student not found.</div>;
}

// const internship =
  await getOrCreateActiveInternship(
    student.id,
    {
      level: student.level,
    }
  );

// console.log(
//   "Active Internship:",
//   internship.id
// );

const existingRequest =
  await prisma.placementRequest.findFirst({
    where: {
      studentId: student.id,
      status: "PENDING",
    },
  });

if (existingRequest) {
  return (
    <main className="p-8">
      <div className="rounded-3xl bg-yellow-50 p-8 shadow">

        <h1 className="text-2xl font-bold text-yellow-700">
          Placement Request Pending
        </h1>

        <p className="mt-4 text-gray-700">
          You already have a placement request awaiting approval from the Liaison Officer.
        </p>

      </div>
    </main>
  );
}
  
  const companies =
    await prisma.company.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Placement Request
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <PlacementRequestForm
          companies={companies}
        />
      </div>
    </main>
  );
}