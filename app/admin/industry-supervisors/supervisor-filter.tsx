"use client";

import { useState } from "react";

type Supervisor = {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
};

export default function SupervisorFilter({
  supervisors,
}: {
  supervisors: Supervisor[];
}) {
  const [search, setSearch] =
    useState("");

  const filtered =
    supervisors.filter(
      (supervisor) =>
        supervisor.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        supervisor.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        supervisor.companyName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      <input
        type="text"
        placeholder="Search supervisor, email or company..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="mb-6 w-full rounded-xl border bg-white p-3 shadow-sm"
      />

      {filtered.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h3 className="text-xl font-semibold">
            No Industry Supervisors Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[850px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Email
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Company
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (supervisor) => (

                  <tr
                    key={supervisor.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 font-medium whitespace-nowrap">
                      {supervisor.fullName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {supervisor.email}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {supervisor.companyName}
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