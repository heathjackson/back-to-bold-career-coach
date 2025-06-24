import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, access } from 'fs/promises';
import { join } from 'path';

const EMAILS_FILE = join(process.cwd(), 'emails.json');

// Helper function to read existing emails
async function readEmails(): Promise<string[]> {
  try {
    await access(EMAILS_FILE);
    const data = await readFile(EMAILS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper function to write emails
async function writeEmails(emails: string[]): Promise<void> {
  try {
    await writeFile(EMAILS_FILE, JSON.stringify(emails, null, 2));
  } catch (error) {
    console.error('Error writing emails file:', error);
    throw new Error('Failed to save email');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // For now, just log the email and return success
    // In production, you might want to use a database or email service
    console.log(`New email collected: ${email}`);
    
    // Try to save to file (may fail in serverless environment)
    try {
      const existingEmails = await readEmails();
      
      // Check if email already exists
      if (existingEmails.includes(email.toLowerCase())) {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        );
      }

      // Add new email
      const updatedEmails = [...existingEmails, email.toLowerCase()];
      await writeEmails(updatedEmails);
      console.log(`Total emails: ${updatedEmails.length}`);
    } catch {
      console.log('File system not available, continuing without file storage');
      // Continue without file storage - this is okay for now
    }

    return NextResponse.json({
      success: true,
      message: 'Email collected successfully'
    });

  } catch (error) {
    console.error('Error collecting email:', error);
    return NextResponse.json(
      { error: 'Failed to collect email. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to view collected emails (for admin purposes)
export async function GET() {
  try {
    const emails = await readEmails();
    return NextResponse.json({
      count: emails.length,
      emails: emails
    });
  } catch (error) {
    console.error('Error reading emails:', error);
    return NextResponse.json(
      { error: 'Failed to read emails' },
      { status: 500 }
    );
  }
} 