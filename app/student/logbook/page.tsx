import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import { getOrCreateActiveInternship } from "@/lib/internship";

export default async function StudentLogbookPage() {
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

  const internship =
    await getOrCreateActiveInternship(
      student.id,
      {
        level: student.level,
      }
    );

  const currentInternship =
    await prisma.internship.findUnique({
      where: {
        id: internship.id,
      },

      include: {
        logbookWeeks: true,
      },
    });

  if (!currentInternship) {
    return (
      <div>
        Internship not found.
      </div>
    );
  }

  const weeks =
    Array.from(
      {
        length:
          currentInternship.durationWeeks,
      },
      (_, index) => {
        const weekNumber =
          index + 1;

        const entry =
          currentInternship.logbookWeeks.find(
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
            Digital Logbook
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your weekly industrial attachment activities.
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
                  href={`/student/logbook/${weekNumber}`}
                  className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <h2 className="text-xl font-bold">
                    Week {weekNumber}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Daily activity record
                  </p>

                  <div
                    className={`mt-5 inline-block rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}
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