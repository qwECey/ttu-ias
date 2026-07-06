import IndustrySupervisorForm from "./supervisor-form";

export default function NewIndustrySupervisorPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-3xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="mb-6 text-3xl font-bold">
            Register Industry Supervisor
          </h1>

          <IndustrySupervisorForm />

        </div>

      </div>

    </main>
  );
}