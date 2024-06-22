// src/app/api/change-tone/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { text, tone } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Rewrite the following text in a ${tone} tone. Maintain the original meaning and content, but adjust the language and style to match the requested tone. be slightly neutral and deterministic.:

Original text: "${text}"

${tone.charAt(0).toUpperCase() + tone.slice(1)} version:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const modifiedText = response.text();

    return NextResponse.json({ modifiedText });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
