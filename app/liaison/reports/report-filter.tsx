"use client";

import { useState } from "react";

type Report = {
  id: string;
  title: string;
  reportType: string;
  academicStatus: string;
  industryStatus: string;
  submittedAt: string;
  studentName: string;
};

function getOverallStatus(report: Report) {
  if (
    report.academicStatus === "REJECTED" ||
    report.industryStatus === "REJECTED"
  ) {
    return "REJECTED";
  }

  if (
    report.academicStatus === "APPROVED" &&
    report.industryStatus === "APPROVED"
  ) {
    return "APPROVED";
  }

  return "PENDING";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Approved
        </span>
      );

    case "REJECTED":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Rejected
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );
  }
}

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
          : getOverallStatus(
              report
            ) === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <label
          htmlFor="liaison-report-search"
          className="sr-only"
        >
          Search student or report
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
          className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm"
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
          className="rounded-xl border bg-white px-4 py-3 shadow-sm"
        >
          <option value="ALL">
            All Statuses
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

      {filtered.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow">

          <h3 className="text-xl font-semibold">
            No Reports Found
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
                  Student
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Title
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Type
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="px-6 py-4 text-left whitespace-nowrap">
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

                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {report.studentName}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.title}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.reportType}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(
                        getOverallStatus(
                          report
                        )
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(
                        report.submittedAt
                      ).toLocaleDateString(
                        "en-GB"
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