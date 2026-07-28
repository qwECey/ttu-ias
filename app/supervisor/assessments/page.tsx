import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function IndustryAssessmentsPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="p-8">
        Unauthorized
      </div>
    );
  }

  const supervisor =
    await prisma.supervisor.findUnique({
        where: {
        userId: session.user.id,
        },

        include: {
        internships: {
            where: {
            status: "ACTIVE",
            },

            include: {
            student: true,
            assessments: true,
            },

            orderBy: {
            student: {
                fullName: "asc",
            },
            },
        },
        },
    });

    if (!supervisor) {
    return (
        <div className="p-8">
        Supervisor not found.
        </div>
    );
    }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
            Student Assessments
        </h1>

        <p className="mt-2 text-gray-500">
            Complete assessments for your assigned students.
        </p>
        </div>

        {supervisor.internships.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow">
            <p className="text-gray-500">
            No students have been assigned to you yet.
            </p>
        </div>
        ) : (
        <div className="overflow-x-auto rounded-3xl bg-white shadow">

            {/* table */}
            <table className="min-w-[850px] w-full">

                <thead className="bg-gray-50">

                <tr>

                    <th className="px-6 py-4 text-left">
                    Student
                    </th>

                    <th className="px-6 py-4 text-left">
                    Student ID
                    </th>

                    <th className="px-6 py-4 text-left">
                    Status
                    </th>

                    <th className="px-6 py-4 text-left">
                    Action
                    </th>

                </tr>

                </thead>

                <tbody className="divide-y divide-gray-200">

                {supervisor.internships.map(
                    (internship) => {

                    const completed =
                        internship.assessments.some(
                        (assessment) =>
                            assessment.completed
                        );

                    return (
                        <tr key={internship.id}>

                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                            {internship.student.fullName}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                            {internship.student.studentId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">

                            {completed ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                Completed
                            </span>
                            ) : (
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                Pending
                            </span>
                            )}

                        </td>

                        <td className="px-6 py-4">

                            <Link
                            href={`/supervisor/assessments/${internship.student.id}`}
                            className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                            {completed
                                ? "View Assessment"
                                : "Start Assessment"}
                            </Link>

                        </td>

                        </tr>
                    );
                    }
                )}

                </tbody>

            </table>

        </div>
      )}

    </div>

    </main>
  );
}