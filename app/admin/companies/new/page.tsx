import Link from "next/link";

import CompanyForm from "@/components/company/CompanyForm";

export default function NewCompanyPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <Link
          href="/admin/companies"
          className="mb-4 inline-block text-sm font-medium text-yellow-600 hover:underline"
        >
          ← Back to Companies
        </Link>

        <h1 className="text-3xl font-bold">
          Add Company
        </h1>

        <p className="mt-2 text-gray-600">
          Register a company for industrial attachment.
        </p>

        <div className="mt-8">
          <CompanyForm />
        </div>
      </div>
    </main>
  );
}