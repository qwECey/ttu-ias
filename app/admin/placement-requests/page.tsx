import { prisma } from "@/lib/prisma";

export default async function PlacementRequestsPage() {
  const requests =
    await prisma.placementRequest.findMany({
      include: {
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Placement Requests
      </h1>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left">
                Student
              </th>

              <th className="px-4 py-3 text-left">
                Company
              </th>

              <th className="px-4 py-3 text-left">
                Contact Person
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b"
              >
                <td className="px-4 py-3">
                  {request.student.fullName}
                </td>

                <td className="px-4 py-3">
                  {request.companyName}
                </td>

                <td className="px-4 py-3">
                  {request.contactPerson}
                </td>

                <td className="px-4 py-3">
                  {request.status}
                </td>

                <td className="px-4 py-3">
                  <a
                    href={`/admin/placement-requests/${request.id}`}
                    className="rounded bg-blue-600 px-3 py-2 text-white"
                  >
                    Review
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}