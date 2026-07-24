"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow hover:bg-red-700"
    >
      Logout
    </button>
  );
}