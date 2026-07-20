"use client";

import { useState } from "react";

type Report = {
  id: string;
  title: string;
  reportType: string;
  periodNumber: number | null;

  fileUrl: string | null;

  industryStatus: string;
  academicStatus: string;

  industryRemarks: string | null;
  academicRemarks: string | null;

  submittedAt: string;
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

  function getOverallStatus(
    report: Report
  ) {
    if (
      report.industryStatus ===
        "REJECTED" ||
      report.academicStatus ===
        "REJECTED"
    ) {
      return "REJECTED";
    }

    if (
      report.industryStatus ===
        "APPROVED" &&
      report.academicStatus ===
        "APPROVED"
    ) {
      return "APPROVED";
    }

    return "PENDING";
  }

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

        <input
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

        <select
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
            Try changing your search.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {filtered.map(
            (report) => (

              <div
                key={report.id}
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {report.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {report.reportType}
                    </p>

                  </div>

                  {getStatusBadge(
                    getOverallStatus(
                      report
                    )
                  )}

                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Submitted
                    </p>

                    <p className="mt-1 text-slate-700">
                      {new Date(
                        report.submittedAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Period
                    </p>

                    <p className="mt-1 text-slate-700">
                      {report.periodNumber ??
                        "-"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Industry Review
                    </p>

                    <div className="mt-2">
                      {getStatusBadge(
                        report.industryStatus
                      )}
                    </div>

                  </div>

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Academic Review
                    </p>

                    <div className="mt-2">
                      {getStatusBadge(
                        report.academicStatus
                      )}
                    </div>

                  </div>

                </div>

                {report.reportType ===
                  "FINAL" &&
                  report.fileUrl && (

                  <div className="mt-6 rounded-2xl bg-blue-50 p-4">

                    <p className="text-sm font-semibold text-blue-700">
                      Final Report Uploaded
                    </p>

                    <p className="mt-2 break-all text-blue-600">
                      {report.fileUrl.split("/").pop()}
                    </p>

                  </div>

                )}

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <h4 className="font-semibold text-slate-700">
                      Industry Remarks
                    </h4>

                    <p className="mt-2 text-slate-600">
                      {report.industryRemarks?.trim() ||
                        "No remarks yet."}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <h4 className="font-semibold text-slate-700">
                      Academic Remarks
                    </h4>

                    <p className="mt-2 text-slate-600">
                      {report.academicRemarks?.trim() ||
                        "No remarks yet."}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </>
  );
}