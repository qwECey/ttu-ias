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
          <li className="rounded-lg bg-slate-800 px-4 py-3">
            Dashboard
          </li>

          <li className="rounded-lg px-4 py-3 hover:bg-slate-800">
            Students
          </li>

          <li className="rounded-lg px-4 py-3 hover:bg-slate-800">
            Companies
          </li>

          <li className="rounded-lg px-4 py-3 hover:bg-slate-800">
            Supervisors
          </li>

          <li className="rounded-lg px-4 py-3 hover:bg-slate-800">
            Placements
          </li>

          <li className="rounded-lg px-4 py-3 hover:bg-slate-800">
            Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
}