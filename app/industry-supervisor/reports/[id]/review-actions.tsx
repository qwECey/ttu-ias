"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewActions({
  reportId,
}: {
  reportId: string;
}) {
  const router = useRouter();

  const [remarks, setRemarks] =
    useState("");

  async function approve() {
    await fetch(
      `/api/reports/${reportId}/approve`,
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

    router.push(
      "/industry-supervisor/dashboard"
    );

    router.refresh();
  }

  async function reject() {
    await fetch(
      `/api/reports/${reportId}/reject`,
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

    router.push(
      "/industry-supervisor/dashboard"
    );

    router.refresh();
  }

  return (
    <div className="space-y-4">
      <textarea
        value={remarks}
        onChange={(e) =>
          setRemarks(e.target.value)
        }
        placeholder="Supervisor remarks..."
        className="w-full rounded-lg border p-3"
        rows={4}
      />

      <div className="flex gap-3">
        <button
          onClick={approve}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Approve Report
        </button>

        <button
          onClick={reject}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Reject Report
        </button>
      </div>
    </div>
  );
}