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
  
  Here's my background:
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
  
// Enhanced prompt system with industry-specific templates and ATS optimization

export interface JobAnalysis {
  role: string;
  company: string;
  industry: string;
  requiredSkills: string[];
  preferredExperience: string;
  keyMetrics: string[];
  companyCulture: string;
}

export interface ResumeData {
  currentResume: string;
  jobDescription: string;
  targetRole: string;
  yearsOfExperience: number;
  industry: string;
}

export interface CoverLetterData {
  resume: string;
  jobDescription: string;
  companyName: string;
  role: string;
  personalStory?: string;
}

export interface LinkedInData {
  currentProfile: string;
  targetRole: string;
  industry: string;
  yearsOfExperience: number;
}

// Industry-specific prompt templates
const industryPrompts = {
  tech: {
    focus: "quantifiable technical achievements, system improvements, and measurable impact on business outcomes",
    keywords: "agile, scrum, CI/CD, cloud computing, microservices, API development, database optimization",
    metrics: "performance improvements, cost savings, user engagement, system reliability, code quality"
  },
  marketing: {
    focus: "campaign performance, brand growth, customer acquisition, and ROI metrics",
    keywords: "digital marketing, SEO, SEM, social media, content strategy, analytics, conversion optimization",
    metrics: "conversion rates, customer acquisition cost, revenue growth, brand awareness, engagement rates"
  },
  sales: {
    focus: "quota attainment, revenue growth, client relationships, and territory expansion",
    keywords: "B2B sales, CRM, lead generation, account management, pipeline management, negotiation",
    metrics: "quota achievement, revenue growth, client retention, deal size, sales cycle length"
  },
  finance: {
    focus: "financial analysis, risk management, cost savings, and strategic financial planning",
    keywords: "financial modeling, budgeting, forecasting, compliance, risk assessment, investment analysis",
    metrics: "cost savings, revenue growth, risk reduction, efficiency improvements, compliance scores"
  },
  healthcare: {
    focus: "patient outcomes, quality improvement, regulatory compliance, and operational efficiency",
    keywords: "patient care, quality metrics, regulatory compliance, clinical outcomes, healthcare systems",
    metrics: "patient satisfaction, quality scores, efficiency improvements, cost reduction, compliance rates"
  },
  education: {
    focus: "student outcomes, curriculum development, program management, and educational innovation",
    keywords: "curriculum design, student assessment, program management, educational technology, learning outcomes",
    metrics: "student success rates, program enrollment, learning outcomes, cost efficiency, innovation adoption"
  }
};

// ATS optimization keywords and patterns
const atsOptimization = {
  actionVerbs: [
    "achieved", "developed", "implemented", "managed", "created", "designed", "led", "coordinated",
    "analyzed", "improved", "increased", "reduced", "optimized", "streamlined", "launched", "delivered"
  ],
  quantifiableMetrics: [
    "percentage", "dollars", "users", "customers", "efficiency", "revenue", "cost", "time",
    "growth", "improvement", "reduction", "increase", "decrease", "expansion", "optimization"
  ],
  formattingRules: [
    "Use bullet points for achievements",
    "Include specific numbers and percentages",
    "Use industry-standard section headers",
    "Avoid graphics, tables, or complex formatting",
    "Use standard fonts (Arial, Calibri, Times New Roman)",
    "Keep sections clearly separated"
  ]
};

// Enhanced Resume Prompt Generator
export function generateResumePrompt(data: ResumeData): string {
  const industry = data.industry.toLowerCase();
  const industryConfig = industryPrompts[industry as keyof typeof industryPrompts] || industryPrompts.tech;
  
  return `You are an expert resume writer specializing in ATS optimization and industry-specific content. 

TASK: Rewrite the following resume to be highly effective for the target role and company.

CURRENT RESUME:
${data.currentResume}

TARGET ROLE: ${data.targetRole}
JOB DESCRIPTION: ${data.jobDescription}
YEARS OF EXPERIENCE: ${data.yearsOfExperience}
INDUSTRY: ${data.industry}

INSTRUCTIONS:

1. ATS OPTIMIZATION:
- Include relevant keywords from the job description naturally
- Use standard section headers (Experience, Education, Skills, etc.)
- Format for maximum ATS compatibility
- Use bullet points for all achievements
- Include specific numbers, percentages, and quantifiable results

2. CONTENT FOCUS:
- Emphasize ${industryConfig.focus}
- Highlight achievements over responsibilities
- Use action verbs: ${atsOptimization.actionVerbs.slice(0, 8).join(", ")}
- Include metrics like: ${industryConfig.metrics.split(", ").slice(0, 3).join(", ")}

3. INDUSTRY-SPECIFIC KEYWORDS:
- Incorporate relevant terms: ${industryConfig.keywords.split(", ").slice(0, 5).join(", ")}

4. FORMATTING REQUIREMENTS:
- Use clear, professional formatting
- Ensure all sections are properly labeled
- Use consistent bullet point style
- Keep content scannable and easy to read

5. QUALITY STANDARDS:
- Every bullet point should start with an action verb
- Include specific numbers and percentages where possible
- Focus on impact and results, not just tasks
- Ensure relevance to the target role

OUTPUT FORMAT:
Return the resume in clean, professional formatting with proper sections. Do not include explanations or notes - just the optimized resume content.`;
}

// Enhanced Cover Letter Prompt Generator
export function generateCoverLetterPrompt(data: CoverLetterData): string {
  return `You are an expert cover letter writer who creates compelling, personalized cover letters.

TASK: Write a compelling cover letter for the specified role and company.

RESUME: ${data.resume}
JOB DESCRIPTION: ${data.jobDescription}
COMPANY: ${data.companyName}
ROLE: ${data.role}
PERSONAL STORY: ${data.personalStory || "Focus on relevant experience and enthusiasm for the role"}

INSTRUCTIONS:

1. PERSONALIZATION:
- Research and reference the company's values, mission, or recent news
- Connect your experience directly to the role requirements
- Show genuine enthusiasm for the company and position

2. STRUCTURE:
- Opening: Engaging hook that shows understanding of the role
- Body: 2-3 paragraphs connecting your experience to the job requirements
- Closing: Strong call to action and enthusiasm for next steps

3. CONTENT FOCUS:
- Tell a story about why you're interested in this specific role
- Connect your achievements to what the company needs
- Show cultural fit and alignment with company values
- Demonstrate understanding of the industry and company

4. TONE AND STYLE:
- Professional but engaging
- Confident but not arrogant
- Specific and detailed, not generic
- Show personality while maintaining professionalism

5. QUALITY STANDARDS:
- No generic templates or filler content
- Specific examples from your experience
- Clear connection to the job requirements
- Professional formatting and structure

OUTPUT FORMAT:
Return a well-formatted cover letter that is ready to send. Do not include explanations or notes - just the cover letter content.`;
}

// Enhanced LinkedIn Prompt Generator
export function generateLinkedInPrompt(data: LinkedInData): string {
  const industry = data.industry.toLowerCase();
  const industryConfig = industryPrompts[industry as keyof typeof industryPrompts] || industryPrompts.tech;
  
  return `You are an expert LinkedIn profile optimizer specializing in professional branding and recruiter attraction.

TASK: Optimize the LinkedIn profile for the target role and industry.

CURRENT PROFILE: ${data.currentProfile}
TARGET ROLE: ${data.targetRole}
INDUSTRY: ${data.industry}
YEARS OF EXPERIENCE: ${data.yearsOfExperience}

INSTRUCTIONS:

1. HEADLINE OPTIMIZATION:
- Create a compelling, keyword-rich headline
- Include target role and key expertise
- Make it searchable for recruiters
- Show value proposition

2. ABOUT SECTION:
- Tell a compelling professional story
- Include relevant keywords naturally
- Show career progression and expertise
- Demonstrate industry knowledge

3. EXPERIENCE SECTIONS:
- Optimize job titles and descriptions
- Include quantifiable achievements
- Use industry-specific keywords
- Focus on impact and results

4. SKILLS AND ENDORSEMENTS:
- Prioritize skills relevant to target role
- Include industry-specific technical skills
- Ensure keyword optimization for searches

5. INDUSTRY FOCUS:
- Emphasize ${industryConfig.focus}
- Include relevant keywords: ${industryConfig.keywords.split(", ").slice(0, 6).join(", ")}
- Highlight metrics like: ${industryConfig.metrics.split(", ").slice(0, 3).join(", ")}

6. QUALITY STANDARDS:
- Professional tone throughout
- Consistent formatting
- Clear value proposition
- Optimized for both human readers and ATS systems

OUTPUT FORMAT:
Return the optimized LinkedIn profile sections (Headline, About, Experience summaries). Do not include explanations or notes - just the optimized content.`;
}

// ATS Scoring System
export interface ATSScore {
  overall: number;
  keywordMatch: number;
  formatting: number;
  readability: number;
  achievementFocus: number;
  details: {
    keywordMatches: string[];
    missingKeywords: string[];
    formattingIssues: string[];
    readabilityScore: string;
    achievementCount: number;
    improvements: string[];
    optimizationSummary: string;
  };
}

export function calculateATSScore(resume: string, jobDescription: string): ATSScore {
  const keywords = extractKeywords(jobDescription);
  const resumeLower = resume.toLowerCase();
  
  // Keyword matching
  const matchedKeywords = keywords.filter(keyword => 
    resumeLower.includes(keyword.toLowerCase())
  );
  const keywordMatch = (matchedKeywords.length / keywords.length) * 100;
  
  // Formatting check
  const formattingScore = checkFormatting(resume);
  
  // Readability check
  const readabilityScore = calculateReadability(resume);
  
  // Achievement focus
  const achievementScore = checkAchievementFocus(resume);
  
  // Overall score (weighted average)
  const overall = Math.round(
    (keywordMatch * 0.3) + 
    (formattingScore * 0.25) + 
    (readabilityScore * 0.25) + 
    (achievementScore * 0.2)
  );
  
  // Generate improvement suggestions
  const improvements = generateImprovementSuggestions(resume, jobDescription, {
    keywordMatch,
    formattingScore,
    readabilityScore,
    achievementScore,
    overall,
    matchedKeywords,
    missingKeywords: keywords.filter(k => !matchedKeywords.includes(k))
  });
  
  // Generate optimization summary
  const optimizationSummary = generateOptimizationSummary(resume, {
    keywordMatch,
    formattingScore,
    readabilityScore,
    achievementScore,
    matchedKeywords,
    missingKeywords: keywords.filter(k => !matchedKeywords.includes(k))
  });
  
  return {
    overall: Math.min(100, Math.max(0, overall)),
    keywordMatch: Math.round(keywordMatch),
    formatting: formattingScore,
    readability: readabilityScore,
    achievementFocus: achievementScore,
    details: {
      keywordMatches: matchedKeywords,
      missingKeywords: keywords.filter(k => !matchedKeywords.includes(k)),
      formattingIssues: getFormattingIssues(resume),
      readabilityScore: getReadabilityDescription(readabilityScore),
      achievementCount: countAchievements(resume),
      improvements,
      optimizationSummary
    }
  };
}

function generateImprovementSuggestions(resume: string, jobDescription: string, scores: {
  keywordMatch: number;
  formattingScore: number;
  readabilityScore: number;
  achievementScore: number;
  overall: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}): string[] {
  const suggestions: string[] = [];
  
  // Keyword suggestions
  if (scores.keywordMatch < 70) {
    suggestions.push(`Add more relevant keywords from the job description. Consider including: ${scores.missingKeywords.slice(0, 3).join(", ")}`);
  }
  
  if (scores.missingKeywords.length > 0) {
    suggestions.push(`Incorporate these key terms naturally: ${scores.missingKeywords.slice(0, 5).join(", ")}`);
  }
  
  // Formatting suggestions
  if (scores.formattingScore < 80) {
    if (!resume.includes('•') && !resume.includes('-')) {
      suggestions.push("Use bullet points (•) for all achievements to improve ATS compatibility");
    }
    if (!/\d+%|\d+%|\$\d+/.test(resume)) {
      suggestions.push("Add specific numbers and percentages to quantify your achievements");
    }
    if (resume.length < 500) {
      suggestions.push("Expand your resume with more detailed achievements and responsibilities");
    }
  }
  
  // Readability suggestions
  if (scores.readabilityScore < 80) {
    suggestions.push("Simplify complex sentences to improve readability for both ATS and human readers");
    suggestions.push("Break up long paragraphs into shorter, scannable sections");
  }
  
  // Achievement focus suggestions
  if (scores.achievementScore < 70) {
    suggestions.push("Start each bullet point with strong action verbs like 'achieved', 'developed', 'implemented'");
    suggestions.push("Focus on quantifiable results and impact rather than just listing responsibilities");
  }
  
  // General optimization suggestions
  if (scores.overall < 80) {
    suggestions.push("Ensure all sections are clearly labeled (Experience, Education, Skills)");
    suggestions.push("Use consistent formatting throughout the document");
    suggestions.push("Remove any graphics, tables, or complex formatting that might confuse ATS systems");
  }
  
  // Industry-specific suggestions
  const industryKeywords = extractIndustryKeywords(jobDescription);
  if (industryKeywords.length > 0) {
    suggestions.push(`Include industry-specific terminology: ${industryKeywords.slice(0, 3).join(", ")}`);
  }
  
  return suggestions.slice(0, 8); // Limit to 8 suggestions
}

function generateOptimizationSummary(resume: string, scores: {
  keywordMatch: number;
  formattingScore: number;
  readabilityScore: number;
  achievementScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}): string {
  const improvements: string[] = [];
  
  // What was optimized
  if (scores.keywordMatch > 60) {
    improvements.push(`✅ Matched ${scores.matchedKeywords.length} keywords from the job description`);
  }
  
  if (scores.formattingScore > 80) {
    improvements.push("✅ Optimized formatting for ATS compatibility");
  }
  
  if (scores.readabilityScore > 80) {
    improvements.push("✅ Improved readability and clarity");
  }
  
  if (scores.achievementScore > 70) {
    improvements.push("✅ Enhanced achievement-focused content");
  }
  
  // Specific optimizations made
  const bulletPoints = (resume.match(/[•\-*]/g) || []).length;
  if (bulletPoints > 0) {
    improvements.push(`✅ Used ${bulletPoints} bullet points for better scanning`);
  }
  
  const numbers = (resume.match(/\d+%|\d+%|\$\d+|\d+ years|\d+ people|\d+ projects/gi) || []).length;
  if (numbers > 0) {
    improvements.push(`✅ Included ${numbers} quantifiable metrics`);
  }
  
  const actionVerbs = atsOptimization.actionVerbs.filter(verb => 
    new RegExp(`\\b${verb}\\b`, 'i').test(resume)
  );
  if (actionVerbs.length > 0) {
    improvements.push(`✅ Used ${actionVerbs.length} strong action verbs`);
  }
  
  return improvements.join("\n");
}

function extractIndustryKeywords(jobDescription: string): string[] {
  const industryTerms = [
    // Tech
    "agile", "scrum", "ci/cd", "cloud", "microservices", "api", "database", "frontend", "backend",
    // Marketing
    "seo", "sem", "social media", "content", "analytics", "conversion", "brand", "campaign",
    // Sales
    "b2b", "crm", "pipeline", "quota", "territory", "negotiation", "prospecting",
    // Finance
    "modeling", "budgeting", "forecasting", "compliance", "risk", "investment",
    // Healthcare
    "patient", "clinical", "regulatory", "quality", "outcomes", "compliance",
    // Education
    "curriculum", "assessment", "learning", "student", "program", "instruction"
  ];
  
  const words = jobDescription.toLowerCase().split(/\s+/);
  return words.filter(word => 
    industryTerms.some(term => word.includes(term) || term.includes(word))
  ).slice(0, 5);
}

function extractKeywords(jobDescription: string): string[] {
  const commonKeywords = [
    "management", "leadership", "strategy", "analysis", "development", "implementation",
    "coordination", "planning", "communication", "collaboration", "problem solving",
    "project management", "data analysis", "customer service", "sales", "marketing",
    "technical", "creative", "strategic", "operational", "financial", "administrative"
  ];
  
  const words = jobDescription.toLowerCase().split(/\s+/);
  const uniqueWords = [...new Set(words)];
  
  return uniqueWords.filter(word => 
    word.length > 3 && 
    commonKeywords.some(keyword => word.includes(keyword) || keyword.includes(word))
  ).slice(0, 15);
}

function checkFormatting(resume: string): number {
  let score = 100;
  const issues: string[] = [];
  
  // Check for bullet points
  if (!resume.includes('•') && !resume.includes('-') && !resume.includes('*')) {
    score -= 20;
    issues.push("Missing bullet points for achievements");
  }
  
  // Check for clear sections
  const sections = ['experience', 'education', 'skills', 'summary'];
  const hasSections = sections.some(section => 
    resume.toLowerCase().includes(section)
  );
  if (!hasSections) {
    score -= 15;
    issues.push("Missing clear section headers");
  }
  
  // Check for numbers/percentages
  const hasNumbers = /\d+%|\d+%|\$\d+|\d+ years|\d+ people|\d+ projects/i.test(resume);
  if (!hasNumbers) {
    score -= 10;
    issues.push("Missing quantifiable achievements");
  }
  
  return Math.max(0, score);
}

function calculateReadability(resume: string): number {
  const sentences = resume.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = resume.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  
  // Simple readability scoring
  if (avgWordsPerSentence <= 15) return 90;
  if (avgWordsPerSentence <= 20) return 80;
  if (avgWordsPerSentence <= 25) return 70;
  return 60;
}

function checkAchievementFocus(resume: string): number {
  const actionVerbs = atsOptimization.actionVerbs;
  const achievementPatterns = actionVerbs.map(verb => new RegExp(`\\b${verb}\\b`, 'i'));
  
  const matches = achievementPatterns.filter(pattern => pattern.test(resume));
  const achievementCount = matches.length;
  
  if (achievementCount >= 8) return 100;
  if (achievementCount >= 6) return 85;
  if (achievementCount >= 4) return 70;
  if (achievementCount >= 2) return 50;
  return 30;
}

function getFormattingIssues(resume: string): string[] {
  const issues: string[] = [];
  
  if (!resume.includes('•') && !resume.includes('-')) {
    issues.push("Use bullet points for achievements");
  }
  
  if (!/\d+%|\d+%|\$\d+/.test(resume)) {
    issues.push("Include specific numbers and percentages");
  }
  
  if (resume.length < 500) {
    issues.push("Resume may be too brief");
  }
  
  return issues;
}

function getReadabilityDescription(score: number): string {
  if (score >= 90) return "Excellent - Easy to read";
  if (score >= 80) return "Good - Clear and concise";
  if (score >= 70) return "Fair - Some complex sentences";
  return "Needs improvement - Consider simplifying";
}

function countAchievements(resume: string): number {
  const actionVerbs = atsOptimization.actionVerbs;
  const achievementPatterns = actionVerbs.map(verb => new RegExp(`\\b${verb}\\b`, 'i'));
  
  return achievementPatterns.filter(pattern => pattern.test(resume)).length;
}
  