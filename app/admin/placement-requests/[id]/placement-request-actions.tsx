"use client";

import { useRouter } from "next/navigation";

export default function PlacementRequestActions({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();

  async function approve() {
    await fetch(
      `/api/placement-requests/${requestId}/approve`,
      {
        method: "PATCH",
      }
    );

    router.push(
      "/admin/placement-requests"
    );

    router.refresh();
  }

  async function reject() {
    await fetch(
      `/api/placement-requests/${requestId}/reject`,
      {
        method: "PATCH",
      }
    );

    router.push(
      "/admin/placement-requests"
    );

    router.refresh();
  }

  return (
    <div className="mt-8 flex gap-4">

      <button
        onClick={approve}
        className="rounded-lg bg-green-600 px-5 py-3 text-white"
      >
        Approve
      </button>

      <button
        onClick={reject}
        className="rounded-lg bg-red-600 px-5 py-3 text-white"
      >
        Reject
      </button>

    </div>
  );
}