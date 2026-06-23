"use client";

import { useState } from "react";

type Company = {
  id: string;
  companyName: string;
};

export default function PlacementRequestForm({
  companies,
}: {
  companies: Company[];
}) {
  const [existingCompanyId, setExistingCompanyId] =
    useState("");

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

  async function handleSubmit() {
    const response =
      await fetch(
        "/api/placement-requests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            existingCompanyId,
            companyName,
            location,
            contactPerson,
            contactPhone,
            contactEmail,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Placement request submitted."
      );

      window.location.href =
        "/student";
    }
  }

  return (
    <div className="space-y-6">

      <div>
        <label className="mb-2 block font-medium">
          Choose Existing Company
        </label>

        <label
            htmlFor="company-select"
            className="mb-2 block font-medium"
            >
            Choose Existing Company
            </label>

            <select
            id="company-select"
            value={existingCompanyId}
            onChange={(e) =>
                setExistingCompanyId(
                e.target.value
                )
            }
            className="w-full rounded border p-3"
        >
          <option value="">
            Select Company
          </option>

          {companies.map((company) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t pt-6">
        <h2 className="mb-4 text-xl font-semibold">
          Or Add New Company
        </h2>

        <div className="grid gap-4">

          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            className="rounded border p-3"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="rounded border p-3"
          />

          <input
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) =>
              setContactPerson(
                e.target.value
              )
            }
            className="rounded border p-3"
          />

          <input
            placeholder="Contact Phone"
            value={contactPhone}
            onChange={(e) =>
              setContactPhone(
                e.target.value
              )
            }
            className="rounded border p-3"
          />

          <input
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) =>
              setContactEmail(
                e.target.value
              )
            }
            className="rounded border p-3"
          />

        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white"
      >
        Submit Placement Request
      </button>

    </div>
  );
}