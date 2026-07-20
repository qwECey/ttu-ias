"use client";

import { useMemo, useState } from "react";

type Criterion = {
  id: string;
  name: string;
  maximumScore: number;
  score: number | string | null;
};

type Section = {
  id: string;
  name: string;
  criteria: Criterion[];
};

type Template = {
  id: string;
  sections: Section[];
};

type Props = {
  internshipId: string;
  template: Template;
  completed: boolean;
};

export default function AssessmentForm({
  internshipId,
  template,
  completed,
}: Props) {
  const [scores, setScores] = useState<
    Record<string, number>
  >(() => {
    const values: Record<string, number> = {};

    template.sections.forEach((section) => {
      section.criteria.forEach((criterion) => {
        if (criterion.score !== null) {
          values[criterion.id] = Number(
            criterion.score
          );
        }
      });
    });

    return values;
  });

  const currentTotal = useMemo(() => {
    return Object.values(scores).reduce(
      (sum, value) => sum + value,
      0
    );
  }, [scores]);

  const totalCriteria = useMemo(() => {
    return template.sections.reduce(
      (total, section) =>
        total + section.criteria.length,
      0
    );
  }, [template]);

  const allCriteriaScored =
    Object.keys(scores).length ===
    totalCriteria;

  async function saveScore(
    assessmentCriterionId: string,
    score: number
  ) {
    setScores((previous) => ({
      ...previous,
      [assessmentCriterionId]: score,
    }));

    try {
      await fetch(
        "/api/supervisors/assessments/save-score",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            internshipId,
            assessmentCriterionId,
            score,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function saveRemarks(
    generalRemarks: string
  ) {
    try {
      await fetch(
        "/api/supervisors/assessments/save-score",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            internshipId,
            generalRemarks,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function submitAssessment() {
    try {
      await fetch(
        "/api/supervisors/assessments/save-score",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            internshipId,
            submit: true,
          }),
        }
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

    return (
    <>
      <div className="mb-8 rounded-2xl bg-slate-100 p-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Current Score
          </span>

          <span className="text-2xl font-bold">
            {currentTotal} / 30
          </span>
        </div>
      </div>

      {template.sections.map((section) => (
        <section
          key={section.id}
          className="mb-8 rounded-3xl bg-white p-8 shadow"
        >
          <h2 className="mb-6 text-2xl font-bold">
            {section.name}
          </h2>

          <div className="space-y-4">
            {section.criteria.map((criterion, index) => (
              <div
                key={criterion.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div className="max-w-2xl">
                  <p className="font-medium">
                    {index + 1}. {criterion.name}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor={`score-${criterion.id}`}
                    className="text-sm font-medium"
                  >
                    Score (0-
                    {criterion.maximumScore})
                  </label>

                  <select
                    id={`score-${criterion.id}`}
                    aria-label={`Score for ${criterion.name}`}
                    title={`Score for ${criterion.name}`}
                    disabled={
                      completed ||
                      !allCriteriaScored
                    }
                    value={
                      scores[criterion.id] ?? ""
                    }
                    className="rounded-lg border px-3 py-2"
                    onChange={(e) =>
                      saveScore(
                        criterion.id,
                        Number(
                          e.target.value
                        )
                      )
                    }
                  >
                    <option value="" disabled>
                      Select
                    </option>

                    {Array.from(
                      {
                        length:
                          criterion.maximumScore +
                          1,
                      },
                      (_, score) => (
                        <option
                          key={score}
                          value={score}
                        >
                          {score}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mb-8 rounded-3xl bg-white p-8 shadow">
        <label
          htmlFor="generalRemarks"
          className="mb-3 block text-lg font-semibold"
        >
          General Remarks
        </label>

        <textarea
          id="generalRemarks"
          rows={6}
          disabled={completed}
          placeholder="Enter your overall remarks..."
          className="w-full rounded-xl border p-4"
          onBlur={(e) =>
            saveRemarks(e.target.value)
          }
        />
      </div>

      <div className="flex flex-col items-end">

        {!completed && !allCriteriaScored && (
          <p className="mb-4 text-sm text-red-600">
            Please score every assessment criterion before submitting.
          </p>
        )}

        <button
          type="button"
          disabled={
            completed ||
            !allCriteriaScored
          }
          onClick={submitAssessment}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70"
        >
          {completed
            ? "Assessment Submitted"
            : "Submit Assessment"}
        </button>

      </div>
    </>
  );
}