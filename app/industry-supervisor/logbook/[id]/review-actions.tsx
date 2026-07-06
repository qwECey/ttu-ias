"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewActions({
  weekId,
  initialRemarks,
}: {
  weekId: string;
  initialRemarks: string;
}) {
  const router = useRouter();

  const [remarks, setRemarks] =
    useState(initialRemarks);

  const [loading, setLoading] =
    useState(false);

  async function saveRemarks() {
    setLoading(true);

    const res = await fetch(
      `/api/industry-supervisors/logbook/${weekId}/remarks`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          remarks,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save remarks.");
      return;
    }

    alert("Remarks saved.");

    router.refresh();
  }

  async function certify() {
    setLoading(true);

    const res = await fetch(
      `/api/industry-supervisors/logbook/${weekId}/certify`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          remarks,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to certify.");
      return;
    }

    alert("Week certified.");

    router.push(
      "/industry-supervisor/logbook"
    );

    router.refresh();
  }

  async function reject() {
    setLoading(true);

    const res = await fetch(
      `/api/industry-supervisors/logbook/${weekId}/reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          remarks,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to reject.");
      return;
    }

    alert("Week returned to student.");

    router.push(
      "/industry-supervisor/logbook"
    );

    router.refresh();
  }

  return (
    <div className="mt-8 space-y-4">

      <textarea
        rows={5}
        value={remarks}
        onChange={(e) =>
          setRemarks(e.target.value)
        }
        placeholder="Supervisor remarks..."
        className="w-full rounded-lg border p-3"
      />

      <div className="flex gap-3">

        <button
          onClick={saveRemarks}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Save Remarks
        </button>

        <button
          onClick={certify}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Certify Week
        </button>

        <button
          onClick={reject}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Reject
        </button>

      </div>

    </div>
  );
}