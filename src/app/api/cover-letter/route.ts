import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, company, background, job } = body;

    if (!role || !company || !background) {
      return NextResponse.json({ error: 'Role, company, and background are required.' }, { status: 400 });
    }

    let prompt = `Write a professional, warm, and clear cover letter for the following job application.\n\nRole: ${role}\nCompany: ${company}\nBackground/career break summary: ${background}`;
    if (job && job.trim().length > 0) {
      prompt += `\nJob description: ${job}`;
    }
    prompt += `\n\nThe letter should sound confident, supportive, and tailored for this role and company. Use modern language and keep it concise.`;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert career coach and cover letter writer. Always use clear, modern, and supportive language."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: 'Failed to generate cover letter.' }, { status: 500 });
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error('Cover letter API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 