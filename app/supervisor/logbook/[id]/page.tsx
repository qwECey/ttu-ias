import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function SupervisorLogbookDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id: internshipId } =
    await params;

  const internship =
    await prisma.internship.findUnique({
      where: {
        id: internshipId,
      },

      include: {
        company: true,
        student: true,
        logbookWeeks: true,
      },
    });

  if (!internship) {
    notFound();
  }

  const weeks =
    Array.from(
      {
        length:
          internship.durationWeeks,
      },
      (_, index) => {
        const weekNumber =
          index + 1;

        const entry =
          internship.logbookWeeks.find(
            (week) =>
              week.weekNumber ===
              weekNumber
          );

        return {
          weekNumber,
          entry,
        };
      }
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            {internship.student.fullName}
          </h1>

          <p className="mt-2 text-gray-500">
            {internship.company?.companyName}
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {weeks.map(
            ({
              weekNumber,
              entry,
            }) => {

              let badge =
                "Not Started";

              let badgeClass =
                "bg-gray-100 text-gray-700";

              if (
                entry?.submitted &&
                entry?.certified
              ) {
                badge =
                  "Certified";

                badgeClass =
                  "bg-green-100 text-green-700";
              } else if (
                entry?.submitted
              ) {
                badge =
                  "Submitted";

                badgeClass =
                  "bg-yellow-100 text-yellow-700";
              } else if (
                entry
              ) {
                badge =
                  "Draft";

                badgeClass =
                  "bg-blue-100 text-blue-700";
              }

              return (
                <Link
                  key={weekNumber}
                  href={
                    entry
                        ? `/supervisor/logbook/week/${entry.id}`
                        : "#"
                    }
                  className={`rounded-3xl bg-white p-6 shadow transition ${
                    entry
                        ? "hover:-translate-y-1 hover:shadow-lg"
                        : "cursor-not-allowed opacity-60"
                    }`}
                >

                  <h2 className="text-xl font-bold">
                    Week {weekNumber}
                  </h2>

                  <div
                    className={`mt-4 inline-block rounded-full px-3 py-1 text-sm ${badgeClass}`}
                  >
                    {badge}
                  </div>

                </Link>
              );
            }
          )}

        </div>

      </div>

    </main>
  );
}