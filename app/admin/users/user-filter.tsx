"use client";

import { useState } from "react";

type User = {
  id: string;
  loginId: string;
  email: string | null;
  role: string;
  isActive: boolean;
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

  const filtered =
    users.filter((user) => {
      const matchesSearch =
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
                    <button
                        onClick={() =>
                        toggleStatus(
                            user.id,
                            user.isActive
                        )
                        }
                        className={
                        user.isActive
                            ? "rounded bg-red-600 px-3 py-2 text-white"
                            : "rounded bg-green-600 px-3 py-2 text-white"
                        }
                    >
                        {user.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>
    </>
  );
}