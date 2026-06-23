"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Students",
      href: "/admin/students",
    },
    {
      name: "Companies",
      href: "/admin/companies",
    },
    {
      name: "Supervisors",
      href: "/admin/supervisors",
    },
    {
      name: "Industry Supervisor Assign",
      href: "/admin/industry-supervisors/assign",
    },
    {
      name: "Industry Supervisors",
      href: "/admin/industry-supervisors",
    },
    {
      name: "Placements",
      href: "/admin/placements",
    },
    {
      name: "Reports",
      href: "/admin/reports",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-xl font-bold">
          TTU IAS
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
                item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}