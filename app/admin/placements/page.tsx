import { prisma } from "@/lib/prisma";
import PlacementForm from "@/components/placement/PlacementForm";

export const dynamic = "force-dynamic";

export default async function PlacementsPage() {
  const students =
    await prisma.student.findMany({
      orderBy: {
        fullName: "asc",
      },
    });

  const companies =
    await prisma.company.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

  const placements =
    await prisma.placement.findMany({
      include: {
        student: true,
        company: true,
      },

      orderBy: {
        assignedAt: "desc",
      },
    });

  const totalPlacements =
    await prisma.placement.count();

  const totalStudents =
    students.length;

  const totalCompanies =
    companies.length;

  const placementRate =
    totalStudents === 0
      ? 0
      : Math.round(
          (totalPlacements /
            totalStudents) *
            100
        );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-green-600 to-green-800 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Placement Management
          </h1>

          <p className="mt-2 text-green-100">
            Assign students and manage attachment placements.
          </p>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Placements
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {totalPlacements}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Students
            </p>

            <h2 className="mt-2 text-4xl font-bold text-blue-600">
              {totalStudents}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Companies
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-600">
              {totalCompanies}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Placement Rate
            </p>

            <h2 className="mt-2 text-4xl font-bold text-purple-600">
              {placementRate}%
            </h2>

          </div>

        </div>

        {/* Assignment Form */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Assign Placement
          </h2>

          <PlacementForm
            students={students}
            companies={companies}
          />

        </div>

        {/* Placement History */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Placement History
          </h2>

          {placements.length === 0 ? (

            <div className="rounded-xl bg-gray-50 p-10 text-center">

              <p className="text-gray-500">
                No placements found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto rounded-2xl">

              <table className="min-w-[900px] w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Student
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Company
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Assigned Date
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {placements.map(
                    (placement) => (

                      <tr
                        key={placement.id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="px-4 py-4 font-medium whitespace-nowrap">
                          {placement.student.fullName}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {placement.company.companyName}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {new Date(
                            placement.assignedAt
                          ).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">

                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            PLACED
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}