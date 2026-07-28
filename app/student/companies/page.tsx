import {
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

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
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg sm:p-8">

          <h1 className="text-3xl font-bold sm:text-4xl">
            Available Companies
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {companies.map((company) => (
              <div
                key={company.id}
                className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Card Header */}
                <div className="mb-6 flex items-start justify-between gap-3">

                  <h2 className="min-h-[56px] flex-1 text-xl font-bold leading-7 text-gray-800">
                    {company.companyName}
                  </h2>

                  <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Approved
                  </span>

                </div>

                {/* Company Information */}
                <div className="space-y-5 text-sm">

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={18}
                      className="mt-1 text-blue-600"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        Location
                      </p>

                      <p className="text-gray-600">
                        {company.location}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <User
                      size={18}
                      className="mt-1 text-blue-600"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        Contact Person
                      </p>

                      <p className="text-gray-600">
                        {company.contactPerson}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <Phone
                      size={18}
                      className="mt-1 text-blue-600"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        Phone
                      </p>

                      <p className="text-gray-600 break-all">
                        {company.contactPhone}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <Mail
                      size={18}
                      className="mt-1 text-blue-600"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        Email
                      </p>

                      <p className="text-gray-600 break-all">
                        {company.contactEmail ??
                          "Not Available"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}