import PageHeader from "@/components/ui/PageHeader";
import ChangePasswordForm from "./change-password-form";

export default function ChangePasswordPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">

      <PageHeader
        title="Change Your Password"
        description="Before you can continue, you must change your temporary password."
      />

      <div className="rounded-3xl bg-white p-8 shadow">

        <p className="mb-6 text-gray-600">
            For security reasons, you are required to
            replace your temporary password before
            accessing the system.
        </p>

        <ChangePasswordForm />

      </div>

    </main>
  );
}