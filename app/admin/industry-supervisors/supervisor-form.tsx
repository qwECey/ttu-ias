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
      className="grid gap-4 md:grid-cols-2"
    >
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(
            e.target.value
          )
        }
        className="rounded-xl border p-3"
        required
      />

      <input
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="rounded-xl border p-3"
        required
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(
            e.target.value
          )
        }
        className="rounded-xl border p-3"
      />

      <div>
        <label
          htmlFor="companyId"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Company
        </label>

        <select
          id="companyId"
          value={companyId}
          onChange={(e) =>
            setCompanyId(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
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
                {company.companyName}
              </option>
            )
          )}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:col-span-2"
      >
        Create Industry Supervisor
      </button>
    </form>
  );
}