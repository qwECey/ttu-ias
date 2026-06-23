import Link from "next/link";
import Image from "next/image";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-72 bg-white shadow-lg">

          <div className="border-b p-6">

            <div className="rounded-xl bg-white p-4 shadow-sm">
              <Image
                src="/images/ttu_logo.png"
                alt="TTU Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold text-gray-800">
              Student Portal
            </h2>

          </div>

          <nav className="p-4">
            <ul className="space-y-2">

              <li>
                <Link
                  href="/student"
                  className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-yellow-100"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/student/companies"
                  className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-yellow-100"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/student/reports"
                  className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-yellow-100"
                >
                  Reports
                </Link>
              </li>

            </ul>
          </nav>

        </aside>

      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}