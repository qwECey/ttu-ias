import UserForm from "./user-form";

export default function NewUserPage() {
  return (
    <main className="p-8">

      <div className="mb-8 rounded-3xl bg-linear-to-r from-slate-700 to-slate-900 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Create User
        </h1>

        <p className="mt-2 text-slate-200">
          Create a new system user account.
        </p>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <UserForm />

      </div>

    </main>
  );
}