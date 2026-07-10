"use client";
// import { useState } from "react";
//import type { Decimal } from "@/lib/generated/prisma/runtime/library";

type Criterion = {
  id: string;
  name: string;
  maximumScore: number;
  score: string | number | null;
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
};

export default function AssessmentForm({
  internshipId,
  template,
}: Props) {

  async function saveScore(
    assessmentCriterionId: string,
    score: number
  ) {
    try {
      const response = await fetch(
        "/api/industry-supervisors/assessments/save-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            internshipId,
            assessmentCriterionId,
            score,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
                <p className="font-medium">
                  {index + 1}. {criterion.name}
                </p>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor={`score-${criterion.id}`}
                    className="text-sm font-medium"
                  >
                    Score
                  </label>

                  <select
                    id={`score-${criterion.id}`}
                    aria-label={`Score for ${criterion.name}`}
                    title={`Score for ${criterion.name}`}
                    defaultValue={
                      criterion.score !== null
                        ? Number(criterion.score)
                        : ""
                    }
                    className="rounded-lg border px-3 py-2"
                    onChange={(e) =>
                      saveScore(
                        criterion.id,
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value="" disabled>
                      Select
                    </option>

                    {Array.from(
                      {
                        length:
                          Number(
                            criterion.maximumScore
                          ) + 1,
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
    </>
  );
}