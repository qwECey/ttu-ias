"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

    try {
      const res = await fetch(
        `/api/industry-supervisors/logbook/${weekId}/remarks`,
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
        throw new Error();
      }

      toast.success("Remarks saved successfully.");

      router.refresh();
    } catch {
      toast.error(
        "Failed to save remarks."
      );
    } finally {
      setLoading(false);
    }
  }

  async function certify() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/industry-supervisors/logbook/${weekId}/certify`,
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
        throw new Error();
      }

      toast.success(
        "Week certified successfully."
      );

      router.push(
        "/industry-supervisor/logbook"
      );

      router.refresh();
    } catch {
      toast.error(
        "Failed to certify week."
      );
    } finally {
      setLoading(false);
    }
  }

  async function reject() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/industry-supervisors/logbook/${weekId}/reject`,
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
        throw new Error();
      }

      toast.success(
        "Week returned to student."
      );

      router.push(
        "/industry-supervisor/logbook"
      );

      router.refresh();
    } catch {
      toast.error(
        "Failed to reject week."
      );
    } finally {
      setLoading(false);
    }
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
          {loading
          ? "Saving..."
          : "Save Remarks"}
        </button>

        <button
          onClick={certify}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          {loading
            ? "Certifying..."
            : "Certify Week"}
        </button>

        <button
          onClick={reject}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          {loading
            ? "Rejecting..."
            : "Reject"}
        </button>

      </div>

    </div>
  );
}