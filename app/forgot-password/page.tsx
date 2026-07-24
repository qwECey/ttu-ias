import Link from "next/link";

import PageHeader from "@/components/ui/PageHeader";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">

      <PageHeader
        title="Password Reset"
        description="Password resets are managed by the TTU Industrial Attachment System."
      />

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

          <h2 className="text-xl font-semibold text-yellow-800">
            Password Recovery
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            If you have forgotten your password,
            please contact the TTU Industrial
            Attachment System Administrator or visit
            the TTU TP-CONNECT Office for identity
            verification and password reset
            assistance.
          </p>

          <p className="mt-4 leading-7 text-gray-700">
            After your password has been reset,
            you will be required to change it the
            next time you sign in.
          </p>

        </div>

        <div className="mt-8 flex justify-end">

          <Link
            href="/login"
            className="rounded-xl bg-[#0F2D52] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </main>
  );
}