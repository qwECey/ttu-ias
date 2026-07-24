"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/auth/LogoutButton";

import {
  Menu,
  LayoutDashboard,
  GraduationCap,
  Building2,
  UserCog,
  Users,
  Briefcase,
  ClipboardList,
  FileText,
  BarChart3,
  Shield,
} from "lucide-react";

export default function AdminMobileNav() {
  const [open, setOpen] =
    useState(false);

  const pathname =
    usePathname();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow lg:hidden">

        <h1 className="text-lg font-bold text-slate-900">
          Administrator
        </h1>

        <button
          onClick={() =>
            setOpen((prev) => !prev)
          }
          className="rounded-xl bg-slate-900 p-2 text-white transition hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>

      </header>

      {open && (

        <div className="border-b bg-white shadow-lg lg:hidden">

          <nav className="flex flex-col p-4">

            <NavItem
              href="/admin"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/students"
              icon={<GraduationCap size={20} />}
              label="Students"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/companies"
              icon={<Building2 size={20} />}
              label="Companies"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/supervisors"
              icon={<UserCog size={20} />}
              label="Academic Supervisors"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/industry-supervisors"
              icon={<Users size={20} />}
              label="Industry Supervisors"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/placements"
              icon={<Briefcase size={20} />}
              label="Placements"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/placement-requests"
              icon={<ClipboardList size={20} />}
              label="Placement Requests"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/reports"
              icon={<FileText size={20} />}
              label="Reports"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/results"
              icon={<BarChart3 size={20} />}
              label="Results"
              pathname={pathname}
              onClick={closeMenu}
            />

            <NavItem
              href="/admin/users"
              icon={<Shield size={20} />}
              label="Users"
              pathname={pathname}
              onClick={closeMenu}
            />

            <div className="mt-4 border-t pt-4">
              <LogoutButton />
            </div>

          </nav>

        </div>

      )}
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  pathname,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  onClick: () => void;
}) {
  const active =
    pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}