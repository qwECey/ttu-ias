import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import WeekForm from "./week-form";
import StatusCard from "@/components/ui/StatusCard";

export default async function WeekPage({
  params,
}: {
  params: Promise<{
    week: string;
  }>;
}) {
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
  const { week } =
    await params;

  const weekNumber =
    Number(week);

  if (
    Number.isNaN(weekNumber) ||
    weekNumber < 1 ||
    weekNumber > 16
  ) {
    notFound();
  }

  const entry =
    await prisma.logbookWeek.findUnique({
      where: {
        studentId_weekNumber: {
          studentId: student.id,
          weekNumber,
        },
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Week {weekNumber}
          </h1>

          <p className="mt-2 text-gray-500">
            Record your industrial attachment activities for this week.
          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow">

          <WeekForm
            weekNumber={weekNumber}
            entry={entry}
          />

        </div>

      </div>

    </main>
  );
}