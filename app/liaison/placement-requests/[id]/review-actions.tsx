"use client";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewActions({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();

  const [remarks, setRemarks] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function approve() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/placement-requests/${requestId}/approve`,
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

      const data =
        await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Placement request approved.");

      setRemarks("");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function reject() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/placement-requests/${requestId}/reject`,
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

      const data =
        await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
    }

      toast.error("Placement request rejected.");
      setRemarks("");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <textarea
        value={remarks}
        onChange={(e) =>
          setRemarks(e.target.value)
        }
        placeholder="Liaison remarks..."
        rows={4}
        className="w-full rounded-lg border p-3"
      />

      <div className="flex gap-3">

        <button
          type="button"
          onClick={approve}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Approving..."
            : "Approve"}
        </button>

        <button
          type="button"
          onClick={reject}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? "Rejecting..."
            : "Reject"}
        </button>

      </div>

    </div>
  );
}