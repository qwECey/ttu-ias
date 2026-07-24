"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import {
  Menu,
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  User,
} from "lucide-react";

export default function SupervisorMobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

    // useEffect(() => {
    //   setOpen(false);
    // }, [pathname]);

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">
        <h1 className="text-lg font-bold text-slate-900">
          Academic Supervisor
        </h1>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl bg-slate-900 p-2 text-white transition hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div className="border-b bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col p-4">

            <Link
              href="/supervisor"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/supervisor/students"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/students"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users size={20} />
              Students
            </Link>

            <Link
              href="/supervisor/reports"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/reports"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText size={20} />
              Reports
            </Link>

            <Link
              href="/supervisor/logbook"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/logbook"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BookOpen size={20} />
              Logbooks
            </Link>

            <Link
              href="/supervisor/assessments"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/assessments"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ClipboardCheck size={20} />
              Assessments
            </Link>

            <Link
              href="/supervisor/results"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/results"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BarChart3 size={20} />
              Results
            </Link>

            <Link
              href="/supervisor/profile"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                pathname === "/supervisor/profile"
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