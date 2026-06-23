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

type AssignIndustrySupervisorFormProps =
  {
    students: StudentItem[];
    supervisors: SupervisorItem[];
  };

export default function AssignIndustrySupervisorForm({
  students,
  supervisors,
}: AssignIndustrySupervisorFormProps) {
  const [studentId, setStudentId] =
    useState("");

  const [
    supervisorId,
    setSupervisorId,
  ] = useState("");

  const [search, setSearch] =
    useState("");

  async function handleAssign() {
    if (
      !studentId ||
      !supervisorId
    ) {
      alert(
        "Please select a student and supervisor."
      );
      return;
    }

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
        "Industry supervisor assigned successfully."
      );

      location.reload();
    } else {
      alert(
        data.message ??
          "Assignment failed."
      );
    }
  }

  const filteredStudents =
    students.filter(
      (student) =>
        student.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">
          Assign Supervisor
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label
              htmlFor="student-select"
              className="sr-only"
            >
              Select Student
            </label>

            <select
              id="student-select"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              className="rounded-xl border p-4"
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

          <label
              htmlFor="supervisor-select"
              className="sr-only"
            >
              Select Industry Supervisor
            </label>

            <select
              id="supervisor-select"
              value={supervisorId}
              onChange={(e) =>
                setSupervisorId(e.target.value)
              }
              className="rounded-xl border p-4"
            >
              <option value="">
                Select Industry Supervisor
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
                    </div>

        <button
          onClick={handleAssign}
          className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600"
        >
          Assign Supervisor
        </button>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">
            Current Assignments
          </h2>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="rounded-xl border px-4 py-3 md:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-4 text-left">
                  Student
                </th>

                <th className="px-4 py-4 text-left">
                  Supervisor
                </th>

                <th className="px-4 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map(
                (student) => (
                  <tr
                    key={
                      student.id
                    }
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-medium">
                      {
                        student.fullName
                      }
                    </td>

                    <td className="px-4 py-4">
                      {student
                        .industrySupervisor
                        ?.fullName ??
                        "-"}
                    </td>

                    <td className="px-4 py-4">
                      {student.industrySupervisor ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Assigned
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Unassigned
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}