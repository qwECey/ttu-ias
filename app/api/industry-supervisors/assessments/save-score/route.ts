import { NextRequest, NextResponse } from "next/server";

import {
  getAssessmentTemplate,
  getOrCreateInternshipAssessment,
  saveAssessmentScore,
} from "@/lib/assessments";

export async function POST(request: NextRequest) {
  try {
    const {
      internshipId,
      assessmentCriterionId,
      score,
    }: {
      internshipId: string;
      assessmentCriterionId: string;
      score: number;
    } = await request.json();

    const template = await getAssessmentTemplate(
      "Industry Supervisor Assessment"
    );

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment template not found.",
        },
        {
          status: 404,
        }
      );
    }

    const assessment =
      await getOrCreateInternshipAssessment(
        internshipId,
        template.id
      );

    await saveAssessmentScore(
      assessment.id,
      assessmentCriterionId,
      score
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}