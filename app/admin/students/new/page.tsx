import StudentForm from "@/components/admin/StudentForm";

export default function NewStudentPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">
          Add Student
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <StudentForm />
        </div>
      </div>
    </main>
  );
}