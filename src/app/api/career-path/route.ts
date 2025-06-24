import { NextRequest, NextResponse } from 'next/server';
import { generateCareerPathPrompt } from '@/lib/prompts';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experience, education, skills, interests, preferences } = body;

    // Validate required fields
    if (!experience || !education || !skills || !interests || !preferences) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Debug: Log API key (first 10 characters only for security)
    console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    console.log('API Key length:', process.env.OPENAI_API_KEY?.length);

    // Generate prompt using the existing function
    const prompt = generateCareerPathPrompt({
      pastExperience: `${experience} (Education: ${education})`,
      skills,
      interests,
      jobTypes: preferences,
    });

    console.log('About to call OpenAI...');

    // Call OpenAI GPT-4o-mini (more accessible model)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a career coach specializing in helping moms return to the workforce. Provide encouraging, practical advice with specific job titles and company types."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('OpenAI response received');

    const gptResponse = completion.choices[0]?.message?.content;

    if (!gptResponse) {
      return NextResponse.json(
        { error: 'Failed to generate career suggestions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: gptResponse
    });

  } catch (error) {
    console.error('Career path API error:', error);
    
    // Handle OpenAI-specific errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key is invalid or missing' },
          { status: 500 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.message.includes('quota') || error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'OpenAI quota exceeded. Please check your billing or try again later.' },
          { status: 429 }
        );
      }
      if (error.message.includes('model') || error.message.includes('404')) {
        return NextResponse.json(
          { error: 'Model access issue. Please try again or contact support.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 