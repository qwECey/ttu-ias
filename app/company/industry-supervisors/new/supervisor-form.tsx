"use client";

import { useState } from "react";

export default function IndustrySupervisorForm() {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  async function handleSubmit() {
    const response =
      await fetch(
        "/api/companies/industry-supervisors",
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
        `Supervisor created.

Login ID:
${data.credentials.loginId}

Password:
${data.credentials.password}`
      );

      window.location.href =
        "/company/industry-supervisors";
    } else {
      alert(
        data.message ??
          "Something went wrong."
      );
    }
  }

  return (
    <div className="space-y-5">

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <button
        onClick={handleSubmit}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Register Supervisor
      </button>

    </div>
  );
}