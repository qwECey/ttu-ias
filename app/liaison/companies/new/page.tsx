import CompanyForm from "./company-form";

export default function NewCompanyPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Register Company
          </h1>

          <p className="mt-2 text-gray-500">
            Register a new internship company and automatically create its login account.
          </p>

        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow">

          <CompanyForm />

        </div>

      </div>

    </main>
  );
}