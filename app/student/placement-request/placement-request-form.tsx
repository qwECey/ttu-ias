"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type Company = {
  id: string;
  companyName: string;
  location: string;
  contactPerson: string;
  contactEmail: string | null;
};

export default function PlacementRequestForm({
  companies,
}: {
  companies: Company[];
}) {
  const router = useRouter();

  const [submitting, setSubmitting] =
    useState(false);

  const [existingCompanyId, setExistingCompanyId] =
    useState("");

  const [showCompanyForm, setShowCompanyForm] =
  useState(false);

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
    setSubmitting(true);

    try {
      const response = await fetch(
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
        toast.success(
          "Placement request submitted successfully."
        );

        router.push("/student");
        router.refresh();
      } else {
        toast.error(
          data.message ??
            "Failed to submit placement request."
        );
      }
    } catch {
      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h2 className="mb-2 text-2xl font-bold">
          Browse Approved Companies
        </h2>

        <p className="mb-6 text-gray-500">
          Select one of TTU`s approved internship companies.
        </p>

        <div className="grid gap-5 md:grid-cols-2">

          {companies.map((company) => {

            const selected =
              existingCompanyId === company.id;

            return (

              <button
                key={company.id}
                type="button"
                disabled={showCompanyForm}
                onClick={() =>
                  setExistingCompanyId(company.id)
                }
                className={`rounded-2xl border p-6 text-left transition ${
                  selected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >

                <h3 className="text-xl font-bold">
                  {company.companyName}
                </h3>

                <p className="mt-2 text-gray-600">
                  📍 {company.location}
                </p>

                <p className="mt-1 text-gray-600">
                  👤 {company.contactPerson}
                </p>

                <p className="mt-1 text-gray-600">
                  ✉️ {company.contactEmail ?? "No email available"}
                </p>

                {selected && (

                  <div className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white">
                    Selected
                  </div>

                )}

              </button>

            );

          })}

        </div>

      </div>

      <div className="border-t pt-6">

        <div className="mb-6 text-center">

          <p className="mb-3 text-gray-500">
            Already have a company?
          </p>

          <button
            type="button"
            onClick={() => {
              setShowCompanyForm(!showCompanyForm);

              if (!showCompanyForm) {
                setExistingCompanyId("");
              }
            }}
            className="rounded-lg bg-slate-800 px-5 py-2 text-white"
          >
            {showCompanyForm
              ? "Hide Company Details"
              : "Register New Company"}
          </button>

        </div>

        {showCompanyForm && (
          <>
        <h2 className="mb-4 text-2xl font-bold">
          I Already Have a Company
        </h2>

        <p className="mb-6 text-gray-500">
          If you`ve already secured an internship, provide the company`s details below. The Liaison Officer will verify the information before approving your placement.
        </p>

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
        </>
        )}
      </div>

      <button
        disabled={
          submitting ||
          (
            !showCompanyForm &&
            !existingCompanyId
          )
        }

        onClick={handleSubmit}
        className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Submitting..."
          : showCompanyForm
            ? "Submit for Verification"
            : existingCompanyId
              ? `Apply to ${
                  companies.find(
                    (company) =>
                      company.id ===
                      existingCompanyId
                  )?.companyName
                }`
              : "Select a Company"}
      </button>

    </div>
  );
}