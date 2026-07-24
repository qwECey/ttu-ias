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
  const router = useRouter();

  const [remarks, setRemarks] =
    useState(initialRemarks);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
  useState("");

  const [messageType, setMessageType] =
    useState<"success" | "error" | "">("");

  // useEffect(() => {
  //   setRemarks(initialRemarks);
  // }, [initialRemarks]);

  async function saveRemarks() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/reports/${reportId}/remarks`,
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

      console.log("Status:", res.status);

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message ?? "Failed to save remarks.");
        return;
      }

      setMessageType("success");
      setMessage("Remarks saved successfully.");

    } catch (error) {
      console.error(error);

      setMessageType("error");
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function approveReport() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/reports/${reportId}/approve`,
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
        setMessage("❌ Failed to approve report.");
        return;
    }

    setMessage("✅ Report approved successfully.");

    router.push("/supervisor/reports");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function rejectReport() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/reports/${reportId}/reject`,
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
        setMessage("❌ Failed to reject report.");
        return;
      }

      setMessage("✅ Report rejected successfully.");

      router.push("/supervisor/reports");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Academic Supervisor Review
      </h2>

      {message && (
        <div
          className={`mb-4 rounded-lg border p-3 ${
            messageType === "success"
              ? "border-green-300 bg-green-100 text-green-700"
              : "border-red-300 bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

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
          setRemarks(e.target.value)
        }
        rows={5}
        placeholder="Enter your remarks here..."
        className="w-full rounded border p-3"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={saveRemarks}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Remarks"}
        </button>

        <button
          type="button"
          onClick={approveReport}
          disabled={loading}
          className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Approving..." : "Approve Report"}
        </button>

        <button
          type="button"
          onClick={rejectReport}
          disabled={loading}
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Rejecting..." : "Reject Report"}
        </button>
      </div>
    </div>
  );
}