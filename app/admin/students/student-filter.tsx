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
      <div className="mb-6 flex gap-4">

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
          className="rounded border px-4 py-2"
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
          className="rounded border px-4 py-2"
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

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left">
                Student ID
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Department
              </th>

              <th className="px-4 py-3 text-left">
                Programme
              </th>

              <th className="px-4 py-3 text-left">
                Level
              </th>

              <th className="px-4 py-3 text-left">
                Placement Status
              </th>

              <th className="px-4 py-3 text-left">
                Company
              </th>

              <th className="px-4 py-3 text-left">
                Supervisor
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {student.studentId}
                  </td>

                  <td className="px-4 py-3">
                    {student.fullName}
                  </td>

                  <td className="px-4 py-3">
                    {student.department}
                  </td>

                  <td className="px-4 py-3">
                    {student.programme}
                  </td>

                  <td className="px-4 py-3">
                    {student.level}
                  </td>

                  <td className="px-4 py-3">
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

                  <td className="px-4 py-3">
                    {
                      student.companyName
                    }
                  </td>

                  <td className="px-4 py-3">
                    {
                      student.supervisorName
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