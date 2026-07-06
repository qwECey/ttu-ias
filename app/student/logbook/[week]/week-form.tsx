"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Entry = {
  id: string;
  department: string | null;
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
  studentRemarks: string | null;
  submitted: boolean;
} | null;

export default function WeekForm({
  weekNumber,
  entry,
}: {
  weekNumber: number;
  entry: Entry;
}) {

  const router = useRouter();

  const [department, setDepartment] = useState(
    entry?.department ?? ""
  );

  const [monday, setMonday] = useState(
    entry?.monday ?? ""
  );

  const [tuesday, setTuesday] = useState(
    entry?.tuesday ?? ""
  );

  const [wednesday, setWednesday] = useState(
    entry?.wednesday ?? ""
  );

  const [thursday, setThursday] = useState(
    entry?.thursday ?? ""
  );

  const [friday, setFriday] = useState(
    entry?.friday ?? ""
  );

  const [saturday, setSaturday] = useState(
    entry?.saturday ?? ""
  );

  const [sunday, setSunday] = useState(
    entry?.sunday ?? ""
  );

  const [studentRemarks, setStudentRemarks] =
    useState(
      entry?.studentRemarks ?? ""
    );

  const submitted =
    entry?.submitted ?? false;

  const [loading, setLoading] =
    useState(false);

    const [message, setMessage] =
    useState("");

    async function saveDraft() {
    try {
        setLoading(true);
        setMessage("");

        const response = await fetch(
        "/api/logbook/weeks",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            weekNumber,
            department,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            studentRemarks,
            }),
        }
        );

        const data = await response.json();

        if (!response.ok) {
        setMessage(
            data.message ??
            "Failed to save draft."
        );
        return;
        }

        setMessage(
        "✅ Draft saved successfully."
        );

        router.refresh();

    } catch (error) {

        console.error(error);

        setMessage(
        "❌ Something went wrong."
        );

    } finally {

        setLoading(false);

    }
    }

    async function submitWeek() {
        try {
            setLoading(true);
            setMessage("");

            // Save the latest changes first
            const saveResponse = await fetch(
            "/api/logbook/weeks",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                weekNumber,
                department,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
                studentRemarks,
                }),
            }
            );

            if (!saveResponse.ok) {
            const data = await saveResponse.json();

            setMessage(
                data.message ??
                "Failed to save your work."
            );

            return;
            }

            // Now submit the week
            const submitResponse = await fetch(
            "/api/logbook/weeks/submit",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                weekNumber,
                }),
            }
            );

            const submitData =
            await submitResponse.json();

            if (!submitResponse.ok) {
            setMessage(
                submitData.message ??
                "Failed to submit week."
            );

            return;
            }

            setMessage(
            "✅ Week submitted successfully."
            );

            router.refresh();

        } catch (error) {

            console.error(error);

            setMessage(
            "❌ Something went wrong."
            );

        } finally {

            setLoading(false);

        }
        }

  return (
    <div className="space-y-6">

      <div className="rounded-xl bg-blue-50 p-4">

        <h2 className="text-xl font-bold">
          Week {weekNumber}
        </h2>

        <p className="text-sm text-gray-600">
          Record your daily activities for this week.
        </p>

      </div>

      <div>

        <label
          htmlFor="department"
          className="mb-2 block font-medium"
        >
          Department / Section
        </label>

        <input
          id="department"
          placeholder="e.g. Software Development Unit"
          value={department}
          disabled={submitted}
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
          htmlFor="monday"
          className="mb-2 block font-medium"
        >
          Monday
        </label>

        <textarea
          id="monday"
          placeholder="Describe today's activities..."
          rows={4}
          value={monday}
          disabled={submitted}
          onChange={(e) =>
            setMonday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="tuesday"
          className="mb-2 block font-medium"
        >
          Tuesday
        </label>

        <textarea
          id="tuesday"
          placeholder="Describe today's activities..."
          rows={4}
          value={tuesday}
          disabled={submitted}
          onChange={(e) =>
            setTuesday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="wednesday"
          className="mb-2 block font-medium"
        >
          Wednesday
        </label>

        <textarea
          id="wednesday"
          placeholder="Describe today's activities..."
          rows={4}
          value={wednesday}
          disabled={submitted}
          onChange={(e) =>
            setWednesday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="thursday"
          className="mb-2 block font-medium"
        >
          Thursday
        </label>

        <textarea
          id="thursday"
          placeholder="Describe today's activities..."
          rows={4}
          value={thursday}
          disabled={submitted}
          onChange={(e) =>
            setThursday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="friday"
          className="mb-2 block font-medium"
        >
          Friday
        </label>

        <textarea
          id="friday"
          placeholder="Describe today's activities..."
          rows={4}
          value={friday}
          disabled={submitted}
          onChange={(e) =>
            setFriday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="saturday"
          className="mb-2 block font-medium"
        >
          Saturday
        </label>

        <textarea
          id="saturday"
          placeholder="Optional"
          rows={4}
          value={saturday}
          disabled={submitted}
          onChange={(e) =>
            setSaturday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="sunday"
          className="mb-2 block font-medium"
        >
          Sunday
        </label>

        <textarea
          id="sunday"
          placeholder="Optional"
          rows={4}
          value={sunday}
          disabled={submitted}
          onChange={(e) =>
            setSunday(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label
          htmlFor="remarks"
          className="mb-2 block font-medium"
        >
          Student Remarks
        </label>

        <textarea
          id="remarks"
          placeholder="Additional comments..."
          rows={5}
          value={studentRemarks}
          disabled={submitted}
          onChange={(e) =>
            setStudentRemarks(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      {message && (

        <div
            className={`rounded-xl border p-4 ${
            message.startsWith("✅")
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
            {message}
        </div>

        )}

      {submitted ? (

        <div className="rounded-xl bg-green-100 p-4 text-green-700">

          This week`s logbook has already been submitted and is awaiting Industry Supervisor certification.

        </div>

      ) : (

        <div className="flex gap-4">

          <button
            type="button"
            onClick={saveDraft}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
            {loading
                ? "Saving..."
                : "💾 Save Draft"}
          </button>

          <button
            type="button"
            onClick={submitWeek}
            disabled={loading}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
            {loading
                ? "Submitting..."
                : "📤 Submit Week"}
            </button>

        </div>

      )}

    </div>
  );
}