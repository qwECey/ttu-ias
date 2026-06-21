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
      className="space-y-4"
    >
      <select
        value={studentId}
        onChange={(e) =>
          setStudentId(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
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

      <select
        value={companyId}
        onChange={(e) =>
          setCompanyId(
            e.target.value
          )
        }
        className="w-full rounded-lg border p-3"
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

      <button
        type="submit"
        className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white"
      >
        Assign Student
      </button>
    </form>
  );
}