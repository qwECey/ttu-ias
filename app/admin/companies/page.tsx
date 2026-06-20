import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default async function CompaniesPage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const companies =
    await prisma.company.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar
          email={session.user.email ?? ""}
        />

        <main className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Company Management
              </h1>

              <p className="mt-1 text-gray-600">
                Manage attachment companies
              </p>
            </div>

            <Link
              href="/admin/companies/new"
              className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600"
            >
              + Add Company
            </Link>
          </div>

          <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Companies
            </h2>

            <p className="mt-2 text-4xl font-bold text-yellow-600">
              {companies.length}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                Registered Companies
              </h2>
            </div>

            {companies.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  No companies found
                </h3>

                <p className="mt-2 text-gray-500">
                  Start by registering a
                  company.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        Company
                      </th>

                      <th className="px-6 py-4 text-left">
                        Location
                      </th>

                      <th className="px-6 py-4 text-left">
                        Contact Person
                      </th>

                      <th className="px-6 py-4 text-left">
                        Phone
                      </th>

                      <th className="px-6 py-4 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {companies.map(
                      (company) => (
                        <tr
                          key={company.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium">
                            {company.companyName}
                          </td>

                          <td className="px-6 py-4">
                            {company.location}
                          </td>

                          <td className="px-6 py-4">
                            {company.contactPerson}
                          </td>

                          <td className="px-6 py-4">
                            {company.contactPhone}
                          </td>

                          <td className="px-6 py-4">
                            {company.approved ? (
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                Approved
                              </span>
                            ) : (
                              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                Pending
                              </span>
                            )}
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
      </div>
    </div>
  );
}