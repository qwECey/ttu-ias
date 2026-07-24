"use client";

import { useState } from "react";

type Report = {
  id: string;
  title: string;
  reportType: string;
  submittedAt: string;

  industryStatus: string;
  academicStatus: string;

  industryRemarks: string | null;
  academicRemarks: string | null;

  student: {
    fullName: string;
  };
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
        report.student.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "ALL"
          ? true
          : getOverallStatus(report) ===
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
          htmlFor="report-search"
          className="sr-only"
        >
          Search reports
        </label>

        <input
          id="report-search"
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm"
        />

        <label
          htmlFor="report-status"
          className="sr-only"
        >
          Filter reports by status
        </label>

        <select
          id="report-status"
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

          <table className="min-w-[1200px] w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Student
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Title
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Type
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Submitted
                </th>

                <th className="px-4 py-4 text-left whitespace-nowrap">
                  Remarks
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (report) => (

                  <tr
                    key={report.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 font-medium whitespace-nowrap">
                      {report.student.fullName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {report.title}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {report.reportType}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">

                      {getOverallStatus(report) ===
                      "APPROVED" ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          APPROVED
                        </span>

                      ) : getOverallStatus(report) ===
                        "REJECTED" ? (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                          REJECTED
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                          PENDING
                        </span>

                      )}

                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(
                        report.submittedAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>

                    <td className="px-4 py-4 max-w-xs">
                      <p className="truncate">
                        {report.academicRemarks ??
                          report.industryRemarks ??
                          "-"}
                      </p>
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