"use client";

import { useState } from "react";
import { toast } from "sonner";

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

  const [file, setFile] =
    useState<File | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSubmitting(true);

    try {
      let fileUrl: string | null =
        null;

      if (
        reportType === "FINAL"
      ) {
        if (!file) {
          alert(
            "Please choose a PDF file."
          );
          setSubmitting(false);
          return;
        }

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const uploadResponse =
          await fetch(
            "/api/reports/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadData =
          await uploadResponse.json();

        if (
          !uploadData.success
        ) {
          alert(
            uploadData.message
          );
          setSubmitting(false);
          return;
        }

        fileUrl =
          uploadData.fileUrl;
      }

      const response =
        await fetch(
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
                reportType ===
                "FINAL"
                  ? null
                  : Number(
                      periodNumber
                    ),

              content,

              fileUrl,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        toast.error(
          data.message ??
            "Failed to submit report."
        );

        setSubmitting(false);

        return;
      }

      toast.success(
        "Report submitted successfully."
      );

      setTitle("");
      setContent("");
      setPeriodNumber("");
      setReportType(
        "WEEKLY"
      );
      setFile(null);

      window.location.reload();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>

        <label className="mb-2 block font-medium">
          Report Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Report Type
        </label>

        <select
          value={reportType}
          onChange={(e) =>
            setReportType(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
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

      {reportType !==
        "FINAL" && (

        <div>

          <label className="mb-2 block font-medium">
            Period Number
          </label>

          <input
            type="number"
            min={1}
            value={
              periodNumber
            }
            onChange={(e) =>
              setPeriodNumber(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

        </div>

      )}

      <div>

        <label className="mb-2 block font-medium">
          {reportType ===
          "FINAL"
            ? "Report Summary"
            : "Report Content"}
        </label>

        <textarea
          rows={10}
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          required
        />

      </div>

      {reportType ===
        "FINAL" && (

        <div>

          <label className="mb-2 block font-medium">
            Final Report (PDF)
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target
                  .files?.[0] ??
                  null
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

          {file && (
            <p className="mt-2 text-sm text-green-600">
              Selected:
              {" "}
              {file.name}
            </p>
          )}

        </div>

      )}

      <button
        type="submit"
        disabled={
          submitting
        }
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Submitting..."
          : "Submit Report"}
      </button>

    </form>
  );
}