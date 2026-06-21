"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SupervisorForm() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/supervisors",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Supervisor created successfully"
      );

      router.push(
        "/admin/supervisors"
      );
    } else {
      alert(
        data.message ||
          "Failed to create supervisor"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
            htmlFor="fullName"
            className="mb-2 block"
            >
            Full Name
            </label>

            <input
            id="fullName"
            type="text"
            placeholder="Dr. Mensah"
            value={fullName}
            onChange={(e) =>
                setFullName(e.target.value)
            }
            required
            className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label
            htmlFor="email"
            className="mb-2 block"
            >
            Email
            </label>

            <input
            id="email"
            type="email"
            placeholder="mensah@ttu.edu.gh"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            required
            className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label
            htmlFor="phone"
            className="mb-2 block"
            >
            Phone
            </label>

            <input
            id="phone"
            type="text"
            placeholder="0551234567"
            value={phone}
            onChange={(e) =>
                setPhone(e.target.value)
            }
            className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Create Supervisor
      </button>
    </form>
  );
}