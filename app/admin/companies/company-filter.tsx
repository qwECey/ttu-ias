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
      <div className="mb-6 flex gap-4">

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
          className="rounded border px-4 py-2"
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
          className="rounded border px-4 py-2"
        >
          <option value="ALL">
            All
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>

      </div>

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
            {filtered.map(
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
    </>
  );
}