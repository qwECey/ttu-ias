import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-xl font-bold">
          TTU IAS
        </h2>
      </div>

    <nav className="flex-1 p-4">
        <ul className="space-y-2">
            <li>
                <Link
                href="/admin"
                className="block rounded-lg bg-slate-800 px-4 py-3"
                >
                Dashboard
                </Link>
            </li>

            <li>
                <Link
                href="/admin/students"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                Students
                </Link>
            </li>

            <li>
                <Link
                href="/admin/companies"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                Companies
                </Link>
            </li>

            <li>
                <Link
                href="/admin/supervisors"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                Supervisors
                </Link>
            </li>

            <li>
                <Link
                href="/admin/placements"
                className="block rounded-lg px-4 py-3 hover:bg-slate-800"
                >
                Placements
                </Link>
            </li>

            <li>
                <Link
                href="/admin/reports"
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