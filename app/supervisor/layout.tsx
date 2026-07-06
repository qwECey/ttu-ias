import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function SupervisorLayout({
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
                Academic Supervisor
              </p>
            </div>

          </div>
        </div>

        <nav className="p-4">

          <ul className="space-y-2">

            <li>
              <Link
                href="/supervisor"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/supervisor/students"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Students
              </Link>
            </li>
            

            <li>
              <Link
                href="/supervisor/reports"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Reports
              </Link>
            </li>

            <li>
              <Link
                href="/supervisor/logbook"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Logbooks
              </Link>
            </li>

            {/* <li>
              <Link
                href="/admin/supervisors/assign"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Assign Supervisor
              </Link>
            </li> */}

            <li>
              <Link
                href="/supervisor/profile"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
              >
                Profile
              </Link>
            </li>

          </ul>

        </nav>

      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">

        <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">

          <h1 className="text-xl font-bold">
            Academic Supervisor Portal
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