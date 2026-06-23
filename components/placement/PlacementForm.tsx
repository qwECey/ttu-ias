"use client";

import { useState } from "react";

type Student = {
  id: string;
  fullName: string;
};

type Company = {
  id: string;
  companyName: string;
};

type Props = {
  students: Student[];
  companies: Company[];
};

export default function PlacementForm({
  students,
  companies,
}: Props) {
  const [studentId, setStudentId] =
    useState("");

  const [companyId, setCompanyId] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!studentId || !companyId) {
      alert(
        "Select both a student and a company."
      );
      return;
    }

    const response = await fetch(
      "/api/placements",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          studentId,
          companyId,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.message ??
          "Failed to assign placement."
      );
      return;
    }

    alert(
      "Student assigned successfully!"
    );

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div>
        <label
          htmlFor="student-select"
          className="mb-2 block font-medium"
        >
          Student
        </label>

        <select
          id="student-select"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 p-4"
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.fullName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="company-select"
          className="mb-2 block font-medium"
        >
          Company
        </label>

        <select
          id="company-select"
          value={companyId}
          onChange={(e) =>
            setCompanyId(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 p-4"
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

      <button
        type="submit"
        className="w-full rounded-xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
      >
        Assign Placement
      </button>
    </form>
  );
}