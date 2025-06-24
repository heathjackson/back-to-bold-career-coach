import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeText = body.resume || body.resumeText;
    const jobDescription = body.job || body.jobDescription || "";

    if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 20) {
      return NextResponse.json({ error: "A valid resume is required." }, { status: 400 });
    }

    let prompt = "";
    if (jobDescription && jobDescription.trim().length > 0) {
      prompt = `I'm applying for a ${jobDescription}. Please rewrite the following resume to sound confident, clear, and tailored for that role. Focus on relevance and modern language.\n\nResume:\n${resumeText}`;
    } else {
      prompt = `Please rewrite the following resume to sound confident, clear, and modern. Focus on improving clarity, impact, and relevance.\n\nResume:\n${resumeText}`;
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured." }, { status: 500 });
    }

    console.log('Prompt sent to OpenAI:', prompt.slice(0, 500)); // Only log first 500 chars for privacy

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Always use clear, modern, and confident language."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1200,
      temperature: 0.7,
    });

    console.log('OpenAI completion:', JSON.stringify(completion, null, 2));

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in OpenAI response:', completion);
      return NextResponse.json({ error: "Failed to generate rewritten resume." }, { status: 500 });
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
} 