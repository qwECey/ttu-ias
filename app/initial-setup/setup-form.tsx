"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createInitialAdmin } from "./actions";

export default function SetupForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [fullName, setFullName] =
    useState("");

  const [loginId, setLoginId] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData =
      new FormData(e.currentTarget);

    startTransition(async () => {
      const result =
        await createInitialAdmin(
          formData
        );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        "Administrator created successfully."
      );

      router.push("/login");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <input
          name="fullName"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Login ID
        </label>

        <input
          name="loginId"
          value={loginId}
          onChange={(e) =>
            setLoginId(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Confirm Password
        </label>

        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
          required
        />
      </div>

      <button
        disabled={isPending}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending
          ? "Creating..."
          : "Create Administrator"}
      </button>
    </form>
  );
}