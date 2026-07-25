import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

  const pendingCount =
    requests.filter(
      (request) =>
        request.status === "PENDING"
    ).length;

  const approvedCount =
    requests.filter(
      (request) =>
        request.status === "APPROVED"
    ).length;

  const rejectedCount =
    requests.filter(
      (request) =>
        request.status === "REJECTED"
    ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-yellow-500 to-orange-600 p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Placement Requests
          </h1>

          <p className="mt-2 text-yellow-100">
            Review student placement requests
            and make approval decisions.
          </p>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-600">
              {pendingCount}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Approved
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {approvedCount}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <h2 className="mt-2 text-4xl font-bold text-red-600">
              {rejectedCount}
            </h2>

          </div>

        </div>

        {/* Requests Table */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Requests
          </h2>

          {requests.length === 0 ? (

            <div className="rounded-xl bg-gray-50 p-10 text-center">

              <p className="text-gray-500">
                No placement requests found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto rounded-2xl">

              <table className="min-w-[1000px] w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Student
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Company
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Contact Person
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Status
                    </th>

                    <th className="px-4 py-4 text-left whitespace-nowrap">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {requests.map(
                    (request) => (

                      <tr
                        key={request.id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="px-4 py-4 font-medium whitespace-nowrap">
                          {request.student.fullName}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {request.companyName}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          {request.contactPerson}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">

                          {request.status === "APPROVED" ? (

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                              APPROVED
                            </span>

                          ) : request.status === "REJECTED" ? (

                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                              REJECTED
                            </span>

                          ) : (

                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                              PENDING
                            </span>

                          )}

                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">

                          <Link
                            href={`/admin/placement-requests/${request.id}`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                          >
                            Review
                          </Link>

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