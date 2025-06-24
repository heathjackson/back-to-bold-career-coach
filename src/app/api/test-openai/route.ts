import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    console.log('Testing OpenAI API key...');
    console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, this is a test!'"
        }
      ],
      max_tokens: 50,
    });

    const response = completion.choices[0]?.message?.content;
    
    return NextResponse.json({
      success: true,
      message: response,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 