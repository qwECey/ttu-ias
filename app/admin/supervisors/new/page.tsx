import SupervisorForm from "@/components/supervisor/SupervisorForm";

export default function NewSupervisorPage() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Create Supervisor
      </h1>

      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <SupervisorForm />
      </div>
    </main>
  );
}