"use client";

import { useState } from "react";

type Student = {
  id: string;
  studentId: string;
  fullName: string;
  department: string;
  programme: string;
  level: number;
  placementStatus: string;
  companyName: string;
  supervisorName: string;
};

export default function StudentFilter({
  students,
}: {
  students: Student[];
}) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const filtered =
    students.filter((student) => {
      const matchesSearch =
        student.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.studentId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.programme
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "ALL"
          ? true
          : student.placementStatus ===
            status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <label
          htmlFor="student-search"
          className="sr-only"
        >
          Search students
        </label>

        <input
          id="student-search"
          type="text"
          placeholder="Search name, ID or programme..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm"
        />

        <label
          htmlFor="placement-filter"
          className="sr-only"
        >
          Filter placement status
        </label>

        <select
          id="placement-filter"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="rounded-xl border bg-white px-4 py-3 shadow-sm"
        >
          <option value="ALL">
            All Students
          </option>

          <option value="PLACED">
            Placed
          </option>

          <option value="UNPLACED">
            Unplaced
          </option>

        </select>

      </div>

      {filtered.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h3 className="text-xl font-semibold">
            No Students Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-[1400px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Student ID
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Department
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Programme
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Level
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Placement Status
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Company
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Academic Supervisor
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (student) => (

                  <tr
                    key={student.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.studentId}
                    </td>

                    <td className="px-4 py-4 font-medium whitespace-nowrap">
                      {student.fullName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.department}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.programme}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.level}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">

                      {student.placementStatus === "PLACED" ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          PLACED
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                          UNPLACED
                        </span>

                      )}

                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.companyName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {student.supervisorName}
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