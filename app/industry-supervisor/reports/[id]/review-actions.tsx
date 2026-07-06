"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewActions({
  reportId,
  initialRemarks,
}: {
  reportId: string;
  initialRemarks: string;
}) {
  const router = useRouter();

  const [remarks, setRemarks] =
    useState(initialRemarks);

  const [loading, setLoading] = useState(false);

  async function saveRemarks() {
    try {
      setLoading(true);

      await fetch(
        `/api/industry-supervisors/reports/${reportId}/remarks`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remarks,
          }),
        }
      );

      setRemarks("");

      router.push("/industry-supervisor/reports");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function approve() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/industry-supervisors/reports/${reportId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remarks,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to approve report.");
        return;
      }

      alert("Report approved successfully.");

      setRemarks(remarks);

      router.push("/industry-supervisor/reports");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function reject() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/industry-supervisors/reports/${reportId}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remarks,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to reject report.");
        return;
      }

      setRemarks("");

      router.push("/industry-supervisor/reports");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Supervisor remarks..."
        className="w-full rounded-lg border p-3"
        rows={4}
      />

      <div className="flex gap-3">

        <button
          type="button"
          onClick={saveRemarks}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Remarks
        </button>

        <button
          type="button"
          onClick={approve}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Approve Report
        </button>

        <button
          type="button"
          onClick={reject}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reject Report
        </button>

      </div>
    </div>
  );
}