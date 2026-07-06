import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LiaisonCompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      students: true,
      industrySupervisors: true,
    },
    orderBy: {
      companyName: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-8 shadow">

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
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Register Company
          </Link>

        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Contact Person
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Students
                </th>

                <th className="px-6 py-4 text-left">
                  Industry Supervisors
                </th>

                <th className="px-6 py-4 text-left">
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

                  <td className="px-6 py-4">
                    <div className="font-semibold">
                      {company.companyName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {company.location}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {company.contactPerson}
                  </td>

                  <td className="px-6 py-4">
                    {company.contactPhone}
                  </td>

                  <td className="px-6 py-4">
                    {company.students.length}
                  </td>

                  <td className="px-6 py-4">
                    {company.industrySupervisors.length}
                  </td>

                  <td className="px-6 py-4">

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