"use client";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentForm() {
  const router = useRouter();

  const [studentId, setStudentId] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [programme, setProgramme] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createStudent() {
    try {
      setLoading(true);

      const response =
        await fetch("/api/students", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            studentId,
            fullName,
            email,
            phone,
            department,
            programme,
            level,
          }),
        });

      const data =
        await response.json();

      if (!response.ok) {
        toast.error(
          data.message ??
            "Failed to create student."
        );
        return;
      }

      toast.success(
        "Student created successfully."
      );

      router.push(
        "/liaison/students"
      );

      router.refresh();

    } catch {
      toast.error(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label
            htmlFor="studentId"
            className="mb-2 block font-medium"
          >
            Student ID
          </label>

          <input
            id="studentId"
            value={studentId}
            onChange={(e) =>
              setStudentId(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="fullName"
            className="mb-2 block font-medium"
          >
            Full Name
          </label>

          <input
            id="fullName"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="email"
            className="mb-2 block font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="phone"
            className="mb-2 block font-medium"
          >
            Phone Number
          </label>

          <input
            id="phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="department"
            className="mb-2 block font-medium"
          >
            Department
          </label>

          <input
            id="department"
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="programme"
            className="mb-2 block font-medium"
          >
            Programme
          </label>

          <input
            id="programme"
            value={programme}
            onChange={(e) =>
              setProgramme(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label
            htmlFor="level"
            className="mb-2 block font-medium"
          >
            Level
          </label>

          <input
            id="level"
            type="number"
            value={level}
            onChange={(e) =>
              setLevel(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

      </div>

      <button
        type="button"
        onClick={createStudent}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating Student..."
          : "Register Student"}
      </button>

    </div>
  );
}