import { prisma } from "@/lib/prisma";
import PlacementForm from "@/components/placement/PlacementForm";

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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Placement Management
      </h1>

      <p className="mt-2 text-gray-600">
        Assign students to companies and
        track placements.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Assign Placement
        </h2>

        <PlacementForm
          students={students}
          companies={companies}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Placement History
        </h2>

        {placements.length === 0 ? (
          <p>No placements found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">
                    Student
                  </th>

                  <th className="px-4 py-3 text-left">
                    Company
                  </th>

                  <th className="px-4 py-3 text-left">
                    Assigned Date
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {placements.map(
                  (placement) => (
                    <tr
                      key={placement.id}
                      className="border-b"
                    >
                      <td className="px-4 py-3">
                        {
                          placement.student
                            .fullName
                        }
                      </td>

                      <td className="px-4 py-3">
                        {
                          placement.company
                            .companyName
                        }
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          placement.assignedAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3">
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
    </main>
  );
}