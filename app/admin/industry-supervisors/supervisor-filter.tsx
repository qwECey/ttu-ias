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
        className="mb-6 w-full rounded-xl border p-3"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-4 text-left">
                Name
              </th>

              <th className="px-4 py-4 text-left">
                Email
              </th>

              <th className="px-4 py-4 text-left">
                Company
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (supervisor) => (
                <tr
                  key={supervisor.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4 font-medium">
                    {
                      supervisor.fullName
                    }
                  </td>

                  <td className="px-4 py-4">
                    {supervisor.email}
                  </td>

                  <td className="px-4 py-4">
                    {
                      supervisor.companyName
                    }
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