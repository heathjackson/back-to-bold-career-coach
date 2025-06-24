import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      experience, 
      education, 
      skills, 
      interests, 
      preferences,
      breakReason,
      returnMotivation,
      timeAvailability,
      locationPreference,
      salaryExpectations
    } = body;

    // Validate required fields
    if (!experience || !education || !skills || !interests || !preferences) {
      return NextResponse.json(
        { error: 'All required fields are missing' },
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

    // Create a comprehensive prompt that includes all conversational data
    const comprehensivePrompt = `Career Path Assessment for Return-to-Work Professional

BACKGROUND:
- Previous Experience: ${experience}
- Education: ${education}
- Career Break Reason: ${breakReason || 'Not specified'}
- Return Motivation: ${returnMotivation || 'Not specified'}

CURRENT SITUATION:
- Key Skills: ${skills}
- Work Preferences: ${interests}
- Industry/Role Interests: ${preferences}
- Timeline: ${timeAvailability || 'Not specified'}
- Location Preferences: ${locationPreference || 'Not specified'}
- Salary Expectations: ${salaryExpectations || 'Not specified'}

Please provide:
1. 3-4 specific job titles that would be a good fit
2. 2-3 industries or company types to target
3. Specific strategies for their job search
4. How to address their career break positively
5. Next steps to take immediately

Make your response encouraging, practical, and specific. Focus on opportunities that align with their skills and preferences while being realistic about their timeline and location constraints.`;

    console.log('About to call OpenAI...');

    // Call OpenAI GPT-4o-mini (more accessible model)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a career coach specializing in helping professionals return to the workforce after career breaks. Provide encouraging, practical advice with specific job titles, company types, and actionable next steps. Be warm, supportive, and realistic."
        },
        {
          role: "user",
          content: comprehensivePrompt
        }
      ],
      max_tokens: 1200,
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