"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RemarksForm({
  reportId,
  initialRemarks,
}: {
  reportId: string;
  initialRemarks: string;
}) {
  const router =
    useRouter();

  const [remarks, setRemarks] =
    useState(
      initialRemarks
    );

  const [loading, setLoading] =
    useState(false);

  async function saveRemarks() {
    try {
      setLoading(true);

      await fetch(
        `/api/reports/${reportId}/remarks`,
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

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border p-6">

      <h2 className="mb-4 text-lg font-semibold">
        Supervisor Remarks
      </h2>

      <label
        htmlFor="remarks"
        className="mb-2 block font-medium"
        >
        Remarks
        </label>

        <textarea
        id="remarks"
        value={remarks}
        onChange={(e) =>
            setRemarks(
            e.target.value
            )
        }
        rows={5}
        placeholder="Enter your remarks here..."
        className="w-full rounded border p-3"
      />

      <button
        onClick={
          saveRemarks
        }
        disabled={loading}
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
      >
        {loading
          ? "Saving..."
          : "Save Remarks"}
      </button>

    </div>
  );
}