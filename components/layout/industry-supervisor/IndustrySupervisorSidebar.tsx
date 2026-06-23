import Link from "next/link";

export default function IndustrySupervisorSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-xl font-bold">
          TTU IAS
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Industry Supervisor
        </p>
      </div>

      <nav className="flex-1 p-4">
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
              Assigned Students
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
  );
}