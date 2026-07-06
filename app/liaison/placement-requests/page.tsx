import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PlacementRequestsPage() {
  const requests =
    await prisma.placementRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: true,
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">
            Placement Requests
          </h1>

          <p className="mt-2 text-gray-500">
            Review student placement requests.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Submitted
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {requests.map((request) => (

                <tr
                  key={request.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {request.student.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {request.companyName}
                  </td>

                  <td className="px-6 py-4">

                    {request.status === "APPROVED" ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        APPROVED
                      </span>

                    ) : request.status === "REJECTED" ? (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        REJECTED
                      </span>

                    ) : (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        PENDING
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      request.createdAt
                    ).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4">

                    <Link
                      href={`/liaison/placement-requests/${request.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Review
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}