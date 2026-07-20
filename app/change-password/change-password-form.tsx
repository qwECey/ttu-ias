"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
    ) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        toast.error(
        "New passwords do not match."
        );
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
        "/api/change-password",
        {
            method: "POST",
            headers: {
            "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
            currentPassword,
            newPassword,
            }),
        }
        );

        const data =
        await response.json();

        if (!response.ok) {
        toast.error(
            data.message ??
            "Failed to update password."
        );
        return;
        }

        toast.success(
        "Password updated successfully."
        );

        router.refresh();

        window.location.href = "/";
    } finally {
        setLoading(false);
    }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label
            htmlFor="currentPassword"
            className="mb-2 block font-medium"
        >
            Current Password
        </label>

        <div className="relative">

            <input
            id="currentPassword"
            type={
                showCurrentPassword
                ? "text"
                : "password"
            }
            value={currentPassword}
            onChange={(e) =>
                setCurrentPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3 pr-20"
            />

            <button
            type="button"
            onClick={() =>
                setShowCurrentPassword(
                !showCurrentPassword
                )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
            {showCurrentPassword
                ? "Hide"
                : "Show"}
            </button>

        </div>

      </div>

      <div>

        <label
            htmlFor="newPassword"
            className="mb-2 block font-medium"
        >
            New Password
        </label>

        <div className="relative">

            <input
            id="newPassword"
            type={
                showNewPassword
                ? "text"
                : "password"
            }
            value={newPassword}
            onChange={(e) =>
                setNewPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3 pr-20"
            />

            <button
            type="button"
            onClick={() =>
                setShowNewPassword(
                !showNewPassword
                )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
            {showNewPassword
                ? "Hide"
                : "Show"}
            </button>

        </div>

      </div>

      <div>

        <label
            htmlFor="confirmPassword"
            className="mb-2 block font-medium"
        >
            Confirm New Password
        </label>

        <div className="relative">

            <input
            id="confirmPassword"
            type={
                showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
                setConfirmPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3 pr-20"
            />

            <button
            type="button"
            onClick={() =>
                setShowConfirmPassword(
                !showConfirmPassword
                )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
            {showConfirmPassword
                ? "Hide"
                : "Show"}
            </button>

        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
        {loading
            ? "Updating Password..."
            : "Update Password"}
      </button>

    </form>
  );
}