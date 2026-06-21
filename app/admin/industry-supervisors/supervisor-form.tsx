"use client";

import { useState } from "react";

export default function IndustrySupervisorForm({
  companies,
}: {
  companies: {
    id: string;
    companyName: string;
  }[];
}) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [companyId, setCompanyId] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/industry-supervisors",
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
          companyId,
        }),
      }
    );

    const data =
      await res.json();

    if (data.success) {
        alert(
            `Login ID: ${data.credentials.loginId}\nPassword: ${data.credentials.password}`
        );

        location.reload();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4">
        <input
          title="Full Name"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          className="rounded border p-2"
          required
        />

        <input
          title="Email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="rounded border p-2"
          required
        />

        <input
          title="Phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="rounded border p-2"
        />

        <select
          title="Company"
          value={companyId}
          onChange={(e) =>
            setCompanyId(
              e.target.value
            )
          }
          className="rounded border p-2"
          required
        >
          <option value="">
            Select Company
          </option>

          {companies.map(
            (company) => (
              <option
                key={company.id}
                value={company.id}
              >
                {
                  company.companyName
                }
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Industry Supervisor
        </button>
      </div>
    </form>
  );
}