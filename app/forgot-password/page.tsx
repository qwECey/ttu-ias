import PageHeader from "@/components/ui/PageHeader";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">

      <PageHeader
        title="Forgot Password"
        description="Password recovery is managed by TTU TP-CONNECT."
      />

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

          <h2 className="text-xl font-semibold text-yellow-800">
            Password Recovery
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            If you have forgotten your password,
            please visit the TTU TP-CONNECT Office
            for identity verification and password
            recovery assistance.
          </p>

          <p className="mt-4 leading-7 text-gray-700">
            After your password has been reset,
            you will be required to change it
            the next time you sign in.
          </p>

        </div>

      </div>

    </main>
  );
}