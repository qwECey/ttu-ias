import { prisma } from "@/lib/prisma";

export default async function StudentCompaniesPage() {
  const companies =
    await prisma.company.findMany({
      where: {
        approved: true,
      },

      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Available Companies
          </h1>

          <p className="mt-3 text-blue-100">
            Explore approved companies available
            for industrial attachment and internship
            placement.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              No Approved Companies Found
            </h2>

            <p className="mt-2 text-gray-500">
              Check back later for available
              placement opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {companies.map((company) => (
              <div
                key={company.id}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold text-gray-800">
                    {company.companyName}
                  </h2>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Approved
                  </span>

                </div>

                <div className="mt-5 space-y-3 text-sm text-gray-700">

                  <p>
                    📍 <strong>Location:</strong>{" "}
                    {company.location}
                  </p>

                  <p>
                    👤 <strong>Contact:</strong>{" "}
                    {company.contactPerson}
                  </p>

                  <p>
                    📞 <strong>Phone:</strong>{" "}
                    {company.contactPhone}
                  </p>

                  <p>
                    ✉️ <strong>Email:</strong>{" "}
                    {company.contactEmail ??
                      "Not Available"}
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}