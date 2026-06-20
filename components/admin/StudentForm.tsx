"use client";

import { useState } from "react";

export default function StudentForm() {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [programme, setProgramme] = useState("");
  const [level, setLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const response = await fetch(
      "/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Student created successfully!");

    setStudentId("");
    setFullName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setProgramme("");
    setLevel("");
  } catch {
    alert("Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        placeholder="Programme"
        value={programme}
        onChange={(e) => setProgramme(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-yellow-500 px-6 py-3 text-white"
      >
        {isLoading
            ? "Creating Student..."
            : "Create Student"}
      </button>
    </form>
  );
}