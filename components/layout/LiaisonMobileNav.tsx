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
  UserCheck,
  Briefcase,
  FileText,
  BarChart3,
} from "lucide-react";

export default function LiaisonMobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">

        <h1 className="text-lg font-bold text-slate-900">
          Liaison Officer
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
              href="/liaison"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/liaison"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/liaison/students"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/students")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users size={20} />
              Students
            </Link>

            <Link
              href="/liaison/companies"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/companies")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Building2 size={20} />
              Companies
            </Link>

            <Link
              href="/liaison/industry-supervisors"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/industry-supervisors")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <UserCheck size={20} />
              Industry Supervisors
            </Link>

            <Link
              href="/liaison/assignments"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/assignments")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Briefcase size={20} />
              Assignments
            </Link>

            <Link
              href="/liaison/placement-requests"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/placement-requests")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText size={20} />
              Placement Requests
            </Link>

            <Link
              href="/liaison/reports"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/reports")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText size={20} />
              Reports
            </Link>

            <Link
              href="/liaison/results"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname.startsWith("/liaison/results")
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BarChart3 size={20} />
              Results
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