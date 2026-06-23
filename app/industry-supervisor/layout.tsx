import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function IndustrySupervisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white p-2">
              <Image
                src="/images/ttu-logo.png"
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
                Industry Supervisor
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/industry-supervisor/dashboard"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/industry-supervisor/students"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Students
              </Link>
            </li>

            <li>
              <Link
                href="/industry-supervisor/reports"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
          <h1 className="text-xl font-bold">
            Industry Supervisor Portal
          </h1>

          <LogoutButton />
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}