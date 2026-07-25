"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createUser } from "./actions";

export default function UserForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [fullName, setFullName] =
  useState("");

  const [loginId, setLoginId] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("LIAISON");

  const [
    credentials,
    setCredentials,
  ] = useState<{
    loginId: string;
    temporaryPassword: string;
  } | null>(null);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData =
      new FormData(e.currentTarget);

    startTransition(async () => {
      const result =
        await createUser(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        "User created successfully."
      );

      setCredentials({
        loginId: result.loginId!,
        temporaryPassword: result.temporaryPassword!,
      });

      setFullName("");
      setLoginId("");
      setEmail("");
      setRole("LIAISON");
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

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
            Role
          </label>

          <select
            name="role"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          >

            <option value="ADMIN">
              Administrator
            </option>

            <option value="LIAISON">
              Liaison Officer
            </option>

          </select>

        </div>

        <button
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending
            ? "Creating..."
            : "Create User"}
        </button>

      </form>

      {credentials && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold">
              User Created Successfully
            </h2>

            <p className="mt-2 text-gray-600">
              Provide these credentials to the user.
            </p>

            <div className="mt-6 space-y-4">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Login ID
                </p>

                <p className="rounded-lg bg-gray-100 p-3 font-mono">
                  {credentials.loginId}
                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Temporary Password
                </p>

                <p className="rounded-lg bg-yellow-100 p-3 font-mono font-bold text-yellow-800">
                  {credentials.temporaryPassword}
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    credentials.temporaryPassword
                  );

                  toast.success(
                    "Password copied."
                  );
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Copy Password
              </button>

              <button
                onClick={() => {
                  setCredentials(null);

                  router.push(
                    "/admin/users"
                  );

                  router.refresh();
                }}
                className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Done
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}