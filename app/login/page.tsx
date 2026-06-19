import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* LEFT PANEL - DESKTOP ONLY */}
      <section className="relative hidden lg:flex">
        <Image
          src="/images/ttu_campus.jpg"
          alt="TTU Campus"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center text-white">
          <Image
            src="/images/ttu_logo.png"
            alt="TTU Logo"
            width={140}
            height={140}
            priority
          />

          <h1 className="mt-8 text-5xl font-bold">
            TTU Internship & Attachment System
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-200">
            A digital platform for managing internship placement,
            supervision, reporting and evaluation for students,
            companies and university administrators.
          </p>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          {/* MOBILE BRANDING */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <Image
              src="/images/ttu_logo.png"
              alt="TTU Logo"
              width={90}
              height={90}
              priority
            />

            <h1 className="mt-4 text-center text-xl font-bold text-gray-900">
              TTU Internship & Attachment System
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              Access your internship portal
            </p>
          </div>

          <h2 className="text-center lg:text-left text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-center lg:text-left text-gray-600">
            Sign in to continue.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
            TTU IAS © 2026
          </div>
        </div>
      </section>
    </main>
  );
}