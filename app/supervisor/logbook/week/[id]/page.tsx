import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function SupervisorWeekPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const week =
    await prisma.logbookWeek.findUnique({
      where: {
        id,
      },

      include: {
        student: true,
      },
    });

  if (!week) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="mb-6 text-3xl font-bold">
            Week {week.weekNumber}
          </h1>

          <p>
            <strong>Student:</strong>{" "}
            {week.student.fullName}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {week.department}
          </p>

          <hr className="my-6" />

          <div className="space-y-4">

            <div>
              <h2 className="font-bold">
                Monday
              </h2>

              <p>{week.monday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Tuesday
              </h2>

              <p>{week.tuesday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Wednesday
              </h2>

              <p>{week.wednesday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Thursday
              </h2>

              <p>{week.thursday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Friday
              </h2>

              <p>{week.friday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Saturday
              </h2>

              <p>{week.saturday}</p>
            </div>

            <div>
              <h2 className="font-bold">
                Sunday
              </h2>

              <p>{week.sunday}</p>
            </div>

          </div>

          <hr className="my-6" />

          <div>

            <h2 className="mb-2 text-xl font-bold">
              Student Remarks
            </h2>

            <p>
              {week.studentRemarks ||
                "No remarks"}
            </p>

          </div>

          <hr className="my-6" />

          <div>

            <h2 className="mb-2 text-xl font-bold">
              Industry Supervisor Remarks
            </h2>

            <p>
              {week.supervisorRemarks ||
                "No remarks"}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}