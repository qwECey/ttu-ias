"use client";

import { useState } from "react";

type StudentItem = {
  id: string;
  fullName: string;
  industrySupervisor?: {
    fullName: string;
  } | null;
};

type SupervisorItem = {
  id: string;
  fullName: string;
};

export default function AssignIndustrySupervisorForm({
  students,
  supervisors,
}: {
  students: StudentItem[];
  supervisors: SupervisorItem[];
}) {
  const [studentId, setStudentId] =
    useState("");

  const [
    supervisorId,
    setSupervisorId,
  ] = useState("");

  async function handleAssign() {
    const response =
      await fetch(
        "/api/industry-supervisors/assign",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentId,
            supervisorId,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Industry supervisor assigned successfully"
      );

      location.reload();
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <select
          title="Student"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
          className="rounded border p-2"
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.fullName}
              </option>
            )
          )}
        </select>

        <select
          title="Industry Supervisor"
          value={supervisorId}
          onChange={(e) =>
            setSupervisorId(
              e.target.value
            )
          }
          className="rounded border p-2"
        >
          <option value="">
            Select Industry Supervisor
          </option>

          {supervisors.map(
            (supervisor) => (
              <option
                key={
                  supervisor.id
                }
                value={
                  supervisor.id
                }
              >
                {
                  supervisor.fullName
                }
              </option>
            )
          )}
        </select>

        <button
          onClick={handleAssign}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Assign
        </button>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Current Assignments
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">
                Student
              </th>

              <th className="px-4 py-3 text-left">
                Industry Supervisor
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map(
              (student) => (
                <tr
                  key={student.id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {
                      student.fullName
                    }
                  </td>

                  <td className="px-4 py-3">
                    {student
                      .industrySupervisor
                      ?.fullName ??
                      "Not Assigned"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}