export function calculateRawAssessmentScore(
  scores: number[]
) {
  return scores.reduce(
    (total, score) => total + score,
    0
  );
}

export function calculateMaximumRawScore(
  maximumScores: number[]
) {
  return maximumScores.reduce(
    (total, score) => total + score,
    0
  );
}

export function calculateAcademicScore(
  rawScore: number,
  maximumRawScore: number
) {
  return Number(
    (
      (rawScore / maximumRawScore) *
      30
    ).toFixed(2)
  );
}

type Assessment = {
  completed: boolean;

  assessmentTemplate: {
    name: string;

    sections: {
      criteria: {
        maximumScore: number | { toNumber(): number };
      }[];
    }[];
  };

  scores: {
    score: number | { toNumber(): number };
  }[];
};

export function getAssessmentDisplayScore(
  assessment: Assessment
) {
  const rawScore =
    calculateRawAssessmentScore(
      assessment.scores.map((score) =>
        typeof score.score === "number"
            ? score.score
            : score.score.toNumber()
        )
    );

  const maximumRawScore =
    calculateMaximumRawScore(
      assessment.assessmentTemplate.sections
        .flatMap(
          (section) => section.criteria
        )
        .map(
          (criterion) =>
            typeof criterion.maximumScore ===
                "number"
                ? criterion.maximumScore
                : criterion.maximumScore.toNumber()
                        )
        );

  const maximum =
    assessment.assessmentTemplate.name ===
    "Academic Supervisor Assessment"
      ? 30
      : maximumRawScore;

  const score =
    assessment.assessmentTemplate.name ===
    "Academic Supervisor Assessment"
      ? calculateAcademicScore(
          rawScore,
          maximumRawScore
        )
      : rawScore;

  return {
    score,
    maximum,
    rawScore,
    rawMaximum: maximumRawScore,
    completed: assessment.completed,
    template:
      assessment.assessmentTemplate.name,
  };
}