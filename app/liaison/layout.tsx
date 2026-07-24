import Image from "next/image";
import Link from "next/link";

import LogoutButton from "@/components/auth/LogoutButton";
import LiaisonMobileNav from "@/components/layout/LiaisonMobileNav";

export default function LiaisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">

      <LiaisonMobileNav />

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden w-72 bg-slate-900 text-white lg:block">

          <div className="border-b border-slate-700 p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-white p-2">
                <Image
                  src="/images/ttu_logo.png"
                  alt="TTU Logo"
                  width={40}
                  height={40}
                />
              </div>

              <div>
                <h2 className="font-bold">
                  TTU IAS
                </h2>

                <p className="text-sm text-slate-300">
                  Liaison Officer
                </p>
              </div>

            </div>

          </div>

          <nav className="p-4">

            <ul className="space-y-2">

              <li>
                <Link
                  href="/liaison"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/students"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Students
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/companies"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/industry-supervisors"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Industry Supervisors
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/assignments"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Assignments
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/placement-requests"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Placement Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/reports"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Reports
                </Link>
              </li>

              <li>
                <Link
                  href="/liaison/results"
                  className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                  Results
                </Link>
              </li>

            </ul>

          </nav>

        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex flex-1 flex-col">

          <header className="hidden items-center justify-between border-b bg-white px-8 py-4 shadow-sm lg:flex">

            <h1 className="text-xl font-bold">
              Liaison Officer Portal
            </h1>

            <LogoutButton />

          </header>

          <main className="flex-1">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}