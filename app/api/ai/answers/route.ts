import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const { question, content } = await req.json();
  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Generate a markdown-formatted response to the following question: ${question}. Base it on the provided content: ${content}`,
      system:
        "You are helpful assistant that provides information responses in markdown format. Use appropriate markdown syntax for headings, list, code blocks, and emphasis where necessary. for code blocks, use short-form smaller case language identifiers (e.g., 'js' for javascript ,'py' for Python, 'ts' for Typscript, 'html' for HTML, 'css' for CSS, etc.).",
    });
    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
