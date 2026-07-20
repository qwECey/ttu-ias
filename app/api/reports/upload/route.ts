import { NextRequest, NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

export async function POST(
  request: NextRequest
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const uploadsDir =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "reports"
      );

    await fs.mkdir(
      uploadsDir,
      {
        recursive: true,
      }
    );

    const extension =
      path.extname(file.name);

    const fileName =
      `report_${Date.now()}${extension}`;

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    await fs.writeFile(
      path.join(
        uploadsDir,
        fileName
      ),
      buffer
    );

    return NextResponse.json({
      success: true,

      fileUrl:
        `/uploads/reports/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to upload file.",
      },
      {
        status: 500,
      }
    );
  }
}