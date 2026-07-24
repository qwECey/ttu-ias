import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LiaisonCompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      internships: {
        where: {
          status: "ACTIVE",
        },

        include: {
          student: true,
        },
      },

      industrySupervisors: true,
    },

    orderBy: {
      companyName: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Companies
            </h1>

            <p className="mt-2 text-gray-500">
              View all registered attachment companies.
            </p>

          </div>

          <Link
            href="/liaison/companies/new"
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            + Register Company
          </Link>

        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[1100px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Company
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Contact Person
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Students
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Industry Supervisors
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {companies.map((company) => (

                <tr
                  key={company.id}
                  className="border-t"
                >

                  <td className="px-6 py-4 whitespace-nowrap">

                    <div className="font-semibold">
                      {company.companyName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {company.location}
                    </div>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.contactPerson}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.contactPhone}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.internships.length}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.industrySupervisors.length}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">

                    {company.approved ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        APPROVED
                      </span>

                    ) : (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        PENDING
                      </span>

                    )}

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