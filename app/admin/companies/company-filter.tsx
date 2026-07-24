"use client";

import { useState } from "react";

type Company = {
  id: string;
  companyName: string;
  location: string;
  contactPerson: string;
  contactPhone: string;
  approved: boolean;
};

export default function CompanyFilter({
  companies,
}: {
  companies: Company[];
}) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const filtered =
    companies.filter((company) => {
      const matchesSearch =
        company.companyName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        company.location
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        company.contactPerson
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "ALL"
          ? true
          : status === "APPROVED"
          ? company.approved
          : !company.approved;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <label
          htmlFor="company-search"
          className="sr-only"
        >
          Search companies
        </label>

        <input
          id="company-search"
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm"
        />

        <label
          htmlFor="company-status"
          className="sr-only"
        >
          Filter company status
        </label>

        <select
          id="company-status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="rounded-xl border bg-white px-4 py-3 shadow-sm"
        >
          <option value="ALL">
            All Companies
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="PENDING">
            Pending
          </option>

        </select>

      </div>

      {filtered.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h3 className="text-xl font-semibold">
            No Companies Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[1000px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Company
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Location
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Contact Person
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (company) => (

                  <tr
                    key={company.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {company.companyName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.location}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.contactPerson}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.contactPhone}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">

                      {company.approved ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Approved
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
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

    </>
  );
}