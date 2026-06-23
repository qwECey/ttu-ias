"use client";

import { useState } from "react";

type Report = {
  id: string;
  title: string;
  reportType: string;
  periodNumber: number | null;
  status: string;
  submittedAt: string;
  supervisorRemarks: string | null;
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

  function getStatusBadge(
    status: string
  ) {
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

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <div className="flex-1">
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
            className="w-full rounded-xl border bg-white px-4 py-3 shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="sr-only"
          >
            Filter reports by status
          </label>

          <select
            id="status-filter"
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

      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            No Reports Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search
            criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {filtered.map(
            (report) => (
              <div
                key={report.id}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {report.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {report.reportType}
                    </p>

                  </div>

                  <div>
                    {getStatusBadge(
                      report.status
                    )}
                  </div>

                </div>

                <div className="mt-5 grid gap-3 text-sm text-gray-700 md:grid-cols-3">

                  <p>
                    <strong>
                      Period:
                    </strong>{" "}
                    {report.periodNumber ??
                      "-"}
                  </p>

                  <p>
                    <strong>
                      Submitted:
                    </strong>{" "}
                    {new Date(
                      report.submittedAt
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>
                      Remarks:
                    </strong>{" "}
                    {report.supervisorRemarks ??
                      "No remarks"}
                  </p>

                </div>
              </div>
            )
          )}

        </div>
      )}
    </>
  );
}