"use client";

import { useState } from "react";
import Link from "next/link";

// import LogoutButton from "@/components/auth/LogoutButton";

export default function StudentMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white p-4 shadow lg:hidden">

        <h1 className="text-lg font-bold text-[#0F2D52]">
          Student Portal
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg bg-[#0F2D52] px-3 py-2 text-white"
        >
          ☰
        </button>

      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b bg-white shadow-lg lg:hidden">

          <nav className="flex flex-col p-4">

            <Link
              href="/student"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/student/companies"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Companies
            </Link>

            <Link
              href="/student/reports"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              Reports
            </Link>

            {/* <div className="mt-4">
              <LogoutButton />
            </div> */}

          </nav>

        </div>
      )}
    </>
  );
}