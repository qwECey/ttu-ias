import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-100">
      {children}
    </main>
  );
}