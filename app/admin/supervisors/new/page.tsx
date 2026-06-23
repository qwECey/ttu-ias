import SupervisorForm from "@/components/supervisor/SupervisorForm";

export default function NewSupervisorPage() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Academic Supervisor
        </h1>

        <p className="mt-2 text-gray-600">
          Register a new academic supervisor.
        </p>
      </div>

      <div className="max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <SupervisorForm />
      </div>
    </main>
  );
}