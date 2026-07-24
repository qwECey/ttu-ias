"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/auth/LogoutButton";

import {
  Menu,
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ClipboardCheck,
  BarChart3,
  User,
} from "lucide-react";

export default function IndustrySupervisorMobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">

        <h1 className="text-lg font-bold text-slate-900">
          Industry Supervisor
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
              href="/industry-supervisor/dashboard"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/dashboard"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/industry-supervisor/students"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/students"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users size={20} />
              Students
            </Link>

            <Link
              href="/industry-supervisor/logbook"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/logbook"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BookOpen size={20} />
              Weekly Logbooks
            </Link>

            <Link
              href="/industry-supervisor/reports"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/reports"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText size={20} />
              Reports
            </Link>

            <Link
              href="/industry-supervisor/assessments"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/assessments"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ClipboardCheck size={20} />
              Assessments
            </Link>

            <Link
              href="/industry-supervisor/results"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/results"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BarChart3 size={20} />
              Results
            </Link>

            <Link
              href="/industry-supervisor/profile"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/industry-supervisor/profile"
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