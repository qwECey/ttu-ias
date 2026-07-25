"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type User = {
  id: string;
  fullName: string;
  loginId: string;
  email: string | null;
  role: string;
  isActive: boolean;
  mustChangePassword: boolean;
};
export default function UserFilter({
  users,
}: {
  users: User[];
}) {
  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("ALL");

  const [
    resetCredentials,
    setResetCredentials,
  ] = useState<{
    loginId: string;
    temporaryPassword: string;
  } | null>(null);

  const router = useRouter();

  const toggleStatus =
    async (
      userId: string,
      isActive: boolean
    ) => {
      await fetch(
        "/api/users/toggle-status",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId,
            isActive,
          }),
        }
      );

      window.location.reload();
    };

  async function resetPassword(
    userId: string
  ) {
    const confirmed =
      window.confirm(
        "Reset this user's password?"
      );

    if (!confirmed) {
      return;
    }

    const response =
      await fetch(
        "/api/users/reset-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      toast.error(
        data.message ??
          "Failed to reset password."
      );
      return;
    }

    toast.success(
      "Password reset successfully."
    );

    setResetCredentials({
      loginId: data.loginId,
      temporaryPassword:
        data.temporaryPassword,
    });

  }

  const filtered =
    users.filter((user) => {
      const matchesSearch =
        user.fullName
          .toLowerCase()
          .includes(search.toLowerCase()
          ) ||
        user.loginId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (user.email ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRole =
        role === "ALL"
          ? true
          : user.role === role;

      return (
        matchesSearch &&
        matchesRole
      );
    });

  return (
    <>
      <div className="mb-6 flex gap-4">

        <label
          htmlFor="user-search"
          className="sr-only"
        >
          Search users
        </label>

        <input
          id="user-search"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="rounded border px-4 py-2"
        />

        <label
          htmlFor="role-filter"
          className="sr-only"
        >
          Filter by role
        </label>

        <select
          id="role-filter"
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="rounded border px-4 py-2"
        >
          <option value="ALL">
            All Roles
          </option>

          <option value="ADMIN">
            Admin
          </option>

          <option value="LIAISON">
            Liaison
          </option>

          <option value="SUPERVISOR">
            Supervisor
          </option>

          <option value="STUDENT">
            Student
          </option>
        </select>

      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Login ID
              </th>

              <th className="px-4 py-3 text-left">
                Email
              </th>

              <th className="px-4 py-3 text-left">
                Role
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Password
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (user) => (
                <tr
                  key={user.id}
                  className="border-b"
                >
                  <td className="px-4 py-3 font-medium">
                    {user.fullName || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {user.loginId}
                  </td>

                  <td className="px-4 py-3">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {user.role}
                      </span>
                  </td>

                  <td className="px-4 py-3">
                    {user.isActive ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.mustChangePassword ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        Temporary
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Updated
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">

                    <div className="flex flex-col gap-2">

                      <button
                        onClick={() =>
                          resetPassword(user.id)
                        }
                        className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Reset Password
                      </button>

                      <button
                        onClick={() =>
                          toggleStatus(
                            user.id,
                            user.isActive
                          )
                        }
                        className={
                          user.isActive
                            ? "rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                            : "rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                        }
                      >
                        {user.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                    </div>

                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>
      {resetCredentials && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold">
              Password Reset Successful
            </h2>

            <p className="mt-2 text-gray-600">
              Provide these credentials to the user.
            </p>

            <div className="mt-6 space-y-4">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Login ID
                </p>

                <p className="rounded-lg bg-gray-100 p-3 font-mono">
                  {resetCredentials.loginId}
                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Temporary Password
                </p>

                <p className="rounded-lg bg-yellow-100 p-3 font-mono font-bold text-yellow-800">
                  {resetCredentials.temporaryPassword}
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    resetCredentials.temporaryPassword
                  );

                  toast.success(
                    "Password copied."
                  );
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Copy Password
              </button>

              <button
                onClick={() => {
                  setResetCredentials(null);

                  router.refresh();
                }}
                className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}