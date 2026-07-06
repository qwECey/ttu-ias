import StudentForm from "./student-form";

export default function NewStudentPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            Register Student
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new student account for internship attachment.
          </p>

        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow">

          <StudentForm />

        </div>

      </div>

    </main>
  );
}