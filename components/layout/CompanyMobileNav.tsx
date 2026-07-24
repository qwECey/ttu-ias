"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/auth/LogoutButton";

import {
  Menu,
  LayoutDashboard,
  Users,
  Building2,
  User,
} from "lucide-react";

export default function CompanyMobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">
        <h1 className="text-lg font-bold text-slate-900">
          Company Portal
        </h1>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl bg-slate-900 p-2 text-white transition hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div className="border-b bg-white shadow-lg lg:hidden">
          <nav className="space-y-2 p-4">

            <Link
              href="/company"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/company"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/company/assignments"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/company/assignments")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users size={20} />
              Assignments
            </Link>

            <Link
              href="/company/industry-supervisors"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/company/industry-supervisors")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Building2 size={20} />
              Industry Supervisors
            </Link>

            <Link
              href="/company/profile"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/company/profile"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <User size={20} />
              Profile
            </Link>

            <div className="mt-4 border-t pt-4">
              <LogoutButton />
            </div>

          </nav>
        </div>
      )}
    </>
  );
}