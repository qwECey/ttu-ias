"use client";

import { useState } from "react";

type Supervisor = {
  id: string;
  fullName: string;
};

export default function AssignmentForm({
  internshipId,
  currentSupervisorId,
  supervisors,
}: {
  internshipId: string;
  currentSupervisorId: string | null;
  supervisors: Supervisor[];
}) {
  const [
    supervisorId,
    setSupervisorId,
  ] = useState(
    currentSupervisorId ?? ""
  );

  async function saveAssignment() {
    const response =
      await fetch(
        "/api/companies/industry-supervisors/assign",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            internshipId,
            supervisorId,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Assignment saved."
      );

      window.location.href =
        "/company/assignments";
    } else {
      alert(
        data.message ??
          "Something went wrong."
      );
    }
  }

  return (
    <div className="space-y-6">

      <label
        htmlFor="industry-supervisor"
        className="mb-2 block font-medium"
      >
        Industry Supervisor
      </label>

      <select
        id="industry-supervisor"
        value={supervisorId}
        onChange={(e) =>
          setSupervisorId(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      >
        <option value="">
          Select Supervisor
        </option>

        {supervisors.map(
          (supervisor) => (
            <option
              key={supervisor.id}
              value={supervisor.id}
            >
              {supervisor.fullName}
            </option>
          )
        )}

      </select>

      <button
        onClick={
          saveAssignment
        }
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Save Assignment
      </button>

    </div>
  );
}