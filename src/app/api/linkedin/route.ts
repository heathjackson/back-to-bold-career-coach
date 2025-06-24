import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { previous, target, breakSummary, strengths } = body;

    if (!previous || !breakSummary) {
      return NextResponse.json({ error: 'Previous field/role and break summary are required.' }, { status: 400 });
    }

    let prompt = `Write a refreshed LinkedIn About section for someone returning to work after a break.\n\nPrevious field/role: ${previous}`;
    if (target && target.trim().length > 0) {
      prompt += `\nNew target field/role: ${target}`;
    }
    prompt += `\nBreak summary: ${breakSummary}`;
    if (strengths && strengths.trim().length > 0) {
      prompt += `\nStrengths/values to highlight: ${strengths}`;
    }
    prompt += `\n\nThe About section should be warm, confident, and professional. Highlight transferable skills, growth during the break, and readiness for the new role. Use modern, clear language.`;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert LinkedIn profile writer and career coach. Always use clear, modern, and supportive language."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'Failed to generate LinkedIn About section.' }, { status: 500 });
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error('LinkedIn API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 