import { NextRequest, NextResponse } from "next/server";

import {
  getAssessmentTemplate,
  getOrCreateInternshipAssessment,
  saveAssessmentScore,
  submitAssessment,
  updateAssessmentRemarks,
} from "@/lib/assessments";

export async function POST(request: NextRequest) {
  try {
    const {
      internshipId,
      assessmentCriterionId,
      score,
      generalRemarks,
      submit,
    }: {
      internshipId: string;
      assessmentCriterionId?: string;
      score?: number;
      generalRemarks?: string;
      submit?: boolean;
    } = await request.json();

    const template = await getAssessmentTemplate(
      "Academic Supervisor Assessment"
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

    if (
      assessmentCriterionId &&
      score !== undefined
    ) {
      await saveAssessmentScore(
        assessment.id,
        assessmentCriterionId,
        score
      );
    }

    if (generalRemarks !== undefined) {
      await updateAssessmentRemarks(
        assessment.id,
        generalRemarks
      );
    }

    if (submit) {
      await submitAssessment(assessment.id);
    }

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