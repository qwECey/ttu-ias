"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyForm() {
  const router = useRouter();

  const [companyName, setCompanyName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [contactPerson, setContactPerson] =
    useState("");

  const [contactPhone, setContactPhone] =
    useState("");

  const [contactEmail, setContactEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function registerCompany() {
    try {
      setLoading(true);

      const response =
        await fetch("/api/companies", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            companyName,
            location,
            contactPerson,
            contactPhone,
            contactEmail,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ??
            "Failed to register company."
        );
        return;
      }

      alert(
        `Company created successfully.

Login ID: ${data.loginId}

Temporary Password: ${data.loginId}`
      );

      router.push(
        "/liaison/companies"
      );

      router.refresh();

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label
            htmlFor="companyName"
            className="mb-2 block font-medium"
          >
            Company Name
          </label>

          <input
            id="companyName"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="location"
            className="mb-2 block font-medium"
          >
            Location
          </label>

          <input
            id="location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="contactPerson"
            className="mb-2 block font-medium"
          >
            Contact Person
          </label>

          <input
            id="contactPerson"
            value={contactPerson}
            onChange={(e) =>
              setContactPerson(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="contactPhone"
            className="mb-2 block font-medium"
          >
            Contact Phone
          </label>

          <input
            id="contactPhone"
            value={contactPhone}
            onChange={(e) =>
              setContactPhone(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="md:col-span-2">

          <label
            htmlFor="contactEmail"
            className="mb-2 block font-medium"
          >
            Contact Email
          </label>

          <input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) =>
              setContactEmail(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

      </div>

      <button
        type="button"
        onClick={registerCompany}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Registering Company..."
          : "Register Company"}
      </button>

    </div>
  );
}