import { prisma } from "@/lib/prisma";
import PlacementRequestForm from "./placement-request-form";
import { getOrCreateActiveInternship } from "@/lib/internship";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import StatusCard from "@/components/ui/StatusCard";
import PageHeader from "@/components/ui/PageHeader";

export default async function PlacementRequestPage() {
  const session =
  await getServerSession(authOptions);

if (!session?.user?.id) {
  return (
    <main className="p-8">
      <StatusCard
        variant="error"
        title="Unauthorized"
        message="Please sign in to continue."
      />
    </main>
  );
}
const student =
  await prisma.student.findUnique({
    where: {
      userId: session.user.id,
    },
  });

if (!student) {
  return (
    <main className="p-8">
      <StatusCard
        variant="warning"
        title="Student Not Found"
        message="We couldn't find your student record. Please contact the Liaison Office."
      />
    </main>
  );
}

const internship =
  await getOrCreateActiveInternship(
    student.id,
    {
      level: student.level,
    }
  );

  if (
  internship.placementStatus ===
  "PLACED"
) {
  return (
    <main className="p-8">

      <div className="rounded-3xl bg-green-50 p-8 shadow">

        <h1 className="text-2xl font-bold text-green-700">
          Placement Approved
        </h1>

        <p className="mt-4 text-gray-700">
          Your placement has already been
          approved.

          You cannot submit another
          placement request for this
          internship.
        </p>

      </div>

    </main>
  );
}

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

      <PageHeader
        title="Placement Request"
        description="Choose an approved company or submit your own company for verification."
      />

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <PlacementRequestForm
          companies={companies}
        />
      </div>

    </main>
  );
}