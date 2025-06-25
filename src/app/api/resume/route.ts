import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateResumePrompt, calculateATSScore, type ResumeData } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription, targetRole, yearsOfExperience, industry } = await request.json();

    if (!resume || !jobDescription || !targetRole) {
      return NextResponse.json(
        { error: "Resume, job description, and target role are required" },
        { status: 400 }
      );
    }

    // Prepare data for enhanced prompt
    const resumeData: ResumeData = {
      currentResume: resume,
      jobDescription,
      targetRole,
      yearsOfExperience: yearsOfExperience || 5,
      industry: industry || "general"
    };

    // Generate enhanced prompt
    const prompt = generateResumePrompt(resumeData);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and career coach with deep knowledge of ATS optimization and industry-specific best practices. You create compelling, professional resumes that help candidates stand out and get interviews."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const rewrittenResume = completion.choices[0]?.message?.content || "";

    // Calculate ATS score for the rewritten resume
    const atsScore = calculateATSScore(rewrittenResume, jobDescription);

    return NextResponse.json({
      resume: rewrittenResume,
      atsScore,
      message: "Resume successfully rewritten with ATS optimization"
    });

  } catch (error) {
    console.error("Error rewriting resume:", error);
    
    if (error instanceof Error && error.message.includes("quota")) {
      return NextResponse.json(
        { error: "OpenAI quota exceeded. Please try again later." },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to rewrite resume. Please try again." },
      { status: 500 }
    );
  }
} 