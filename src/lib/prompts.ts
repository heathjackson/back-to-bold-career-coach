// Prompt templates for different career services

export const resumePrompts = {
  summary: "Write a compelling professional summary for a resume based on the following information:",
  experience: "Help me write a professional experience bullet point for my resume based on this role:",
  skills: "Suggest relevant skills to include on my resume based on my background:",
  optimization: "Optimize my resume for ATS systems and make it more impactful:",
};

export const coverLetterPrompts = {
  opening: "Write an engaging opening paragraph for a cover letter based on this job description:",
  body: "Help me write the main body of my cover letter connecting my experience to this role:",
  closing: "Write a professional closing paragraph for my cover letter:",
  customization: "Customize my cover letter for this specific company and position:",
};

export const linkedinPrompts = {
  headline: "Create an attention-grabbing LinkedIn headline based on my background:",
  summary: "Write a compelling LinkedIn summary that showcases my professional story:",
  experience: "Help me write LinkedIn experience descriptions that highlight my achievements:",
  optimization: "Optimize my LinkedIn profile to attract recruiters and opportunities:",
};

export const generalPrompts = {
  careerAdvice: "Provide career advice for someone in my situation:",
  interviewPrep: "Help me prepare for an interview with this company:",
  networking: "Suggest networking strategies for my career goals:",
  jobSearch: "Provide job search strategies for my target role and industry:",
};

// Function to get a specific prompt template
export function getPromptTemplate(category: string, type: string): string {
  const prompts: Record<string, Record<string, string>> = {
    resume: resumePrompts,
    coverLetter: coverLetterPrompts,
    linkedin: linkedinPrompts,
    general: generalPrompts,
  };
  
  return prompts[category]?.[type] || "Please provide guidance on this topic:";
} 

//career path prompt
export function generateCareerPathPrompt({
    pastExperience,
    skills,
    interests,
    jobTypes,
  }: {
    pastExperience: string;
    skills: string;
    interests: string;
    jobTypes: string;
  }) {
    return `
  I'm a mom returning to the workforce after a career break.
  
  Here’s my background:
  - Past experience: ${pastExperience}
  - Skills I feel confident in: ${skills}
  - Interests: ${interests}
  - Preferred job types or industries: ${jobTypes}
  
  Please suggest 2–3 career directions that align with this info.
  For each, include:
  - A job title
  - A short explanation of why it fits
  - The kind of companies or roles that typically offer it
  
  Use clear, encouraging language. These should feel like realistic next steps, not overly aspirational.
  `;
  }
  