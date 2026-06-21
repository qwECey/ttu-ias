"use client";

import { useState } from "react";

export default function ReportForm() {
  const [title, setTitle] =
    useState("");

  const [reportType, setReportType] =
    useState("WEEKLY");

  const [
    periodNumber,
    setPeriodNumber,
  ] = useState("");

  const [content, setContent] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/reports",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          reportType,
          periodNumber:
            periodNumber
              ? Number(
                  periodNumber
                )
              : null,
          content,
        }),
      }
    );

    const data =
      await res.json();

    if (data.success) {
      alert(
        "Report submitted"
      );

      setTitle("");
      setContent("");
      setPeriodNumber("");
    } else {
      alert("Failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-4 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div>
        <label>
          Report Title
        </label>

        <input
          title="Report Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label>
          Report Type
        </label>

        <select
          title="Report Type"
          value={reportType}
          onChange={(e) =>
            setReportType(
              e.target.value
            )
          }
          className="w-full rounded border p-2"
        >
          <option value="WEEKLY">
            Weekly
          </option>

          <option value="MONTHLY">
            Monthly
          </option>

          <option value="FINAL">
            Final
          </option>
        </select>
      </div>

      <div>
        <label>
          Period Number
        </label>

        <input
          title="Period Number"
          type="number"
          value={periodNumber}
          onChange={(e) =>
            setPeriodNumber(
              e.target.value
            )
          }
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label>
          Report Content
        </label>

        <textarea
          title="Report Content"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={10}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Submit Report
      </button>
    </form>
  );
}