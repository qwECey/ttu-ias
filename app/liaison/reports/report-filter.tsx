"use client";

import { useState } from "react";

type Report = {
  id: string;
  title: string;
  reportType: string;
  status: string;
  submittedAt: string;
  studentName: string;
};

export default function ReportFilter({
  reports,
}: {
  reports: Report[];
}) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const filtered =
    reports.filter((report) => {
      const matchesSearch =
        report.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        report.studentName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "ALL"
          ? true
          : report.status ===
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
          htmlFor="liaison-search"
          className="sr-only"
        >
          Search student or report...
        </label>

        <input
          id="liaison-report-search"
          type="text"
          placeholder="Search student or report..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="rounded border px-4 py-2"
        />

        <label
            htmlFor="liaison-status-filter"
            className="sr-only"
            >
            Filter reports by status
            </label>

            <select
            id="liaison-status-filter"
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

          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Type
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Submitted
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (report) => (
                <tr
                  key={report.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {
                      report.studentName
                    }
                  </td>

                  <td className="px-6 py-4">
                    {report.title}
                  </td>

                  <td className="px-6 py-4">
                    {
                      report.reportType
                    }
                  </td>

                  <td className="px-6 py-4">
                    {report.status}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      report.submittedAt
                    ).toLocaleDateString()}
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