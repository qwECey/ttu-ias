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
      <div className="mb-6 flex gap-4">

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
          className="rounded border px-4 py-2"
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
          className="rounded border px-4 py-2"
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

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left">
                Student
              </th>

              <th className="px-4 py-3 text-left">
                Title
              </th>

              <th className="px-4 py-3 text-left">
                Type
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Submitted
              </th>

              <th className="px-4 py-3 text-left">
                Remarks
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (report) => (
                <tr
                  key={report.id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {
                      report.student
                        .fullName
                    }
                  </td>

                  <td className="px-4 py-3">
                    {report.title}
                  </td>

                  <td className="px-4 py-3">
                    {
                      report.reportType
                    }
                  </td>

                  <td className="px-4 py-3">
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

                  <td className="px-4 py-3">
                    {new Date(
                      report.submittedAt
                    ).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {report.academicRemarks ??
                      report.industryRemarks ??
                      "-"}
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