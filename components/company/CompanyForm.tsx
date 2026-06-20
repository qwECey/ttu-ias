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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/companies",
        {
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
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ??
            "Failed to create company"
        );
        return;
      }

      alert(
        `Company created successfully!

Login ID: ${data.loginId}
Password: ${data.loginId}`
      );

      setCompanyName("");
      setLocation("");
      setContactPerson("");
      setContactPhone("");

      router.push("/admin/companies");
      router.refresh();
    } catch {
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) =>
          setCompanyName(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        placeholder="Contact Person"
        value={contactPerson}
        onChange={(e) =>
          setContactPerson(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        placeholder="Contact Phone"
        value={contactPhone}
        onChange={(e) =>
          setContactPhone(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <button
        type="submit"
        className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600"
      >
        Create Company
      </button>
    </form>
  );
}