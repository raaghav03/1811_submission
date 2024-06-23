import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { text, tone, temperature } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Modify the following text to match a ${tone} tone. Adjust the language, style, and vocabulary to fit the requested tone while preserving the original meaning and content. Ensure the rewritten text is coherent and natural in the new tone. Original text: "${text}"

${tone.charAt(0).toUpperCase() + tone.slice(1)} version:`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: temperature,
      },
    });

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
