"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

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
            contactEmail,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        toast.error(
          data.message ??
            "Failed to create company."
        );
        return;
      }

      // Keep this alert for now because
      // it contains the login credentials.
      alert(
  `Company created successfully!

  Login ID: ${data.loginId}
  Password: ${data.loginId}`
      );

      setCompanyName("");
      setLocation("");
      setContactPerson("");
      setContactPhone("");
      setContactEmail("");

      router.push("/admin/companies");
      router.refresh();

    } catch {
      toast.error(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
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

      <input
        type="email"
        placeholder="Contact Email"
        value={contactEmail}
        onChange={(e) =>
          setContactEmail(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating Company..."
          : "Create Company"}
      </button>
    </form>
  );
}