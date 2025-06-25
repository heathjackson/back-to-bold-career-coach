"use client";

import { useState } from "react";

interface ATSScore {
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
  };
}

interface ResumeResponse {
  resume: string;
  atsScore: ATSScore;
  message: string;
}

export default function ResumePage() {
  const [result, setResult] = useState<string>("");
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    setResult("");
    setAtsScore(null);

    try {
      const resume = formData.get("resume") as string;
      const jobDescription = formData.get("jobDescription") as string;
      const targetRole = formData.get("targetRole") as string;
      const yearsOfExperience = parseInt(formData.get("yearsOfExperience") as string) || 5;
      const industry = formData.get("industry") as string || "general";

      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription,
          targetRole,
          yearsOfExperience,
          industry,
        }),
      });

      const data: ResumeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to rewrite resume");
      }

      setResult(data.resume);
      setAtsScore(data.atsScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        alert("Resume copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const downloadText = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rewritten-resume.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-brand-primary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
            AI-Powered Resume Rewriting
          </h1>
          <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
            Transform your resume with industry-specific optimization, ATS compatibility, 
            and professional formatting that helps you stand out to recruiters.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary">
            <h2 className="text-2xl font-bold text-brand-primary mb-6">
              Rewrite Your Resume
            </h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }} className="space-y-6">
              
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-brand-primary mb-2">
                  Your Current Resume *
                </label>
                <textarea
                  id="resume"
                  name="resume"
                  rows={8}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-brand-primary rounded-lg text-brand-primary placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="Paste your current resume here..."
                />
              </div>

              <div>
                <label htmlFor="targetRole" className="block text-sm font-medium text-brand-primary mb-2">
                  Target Role *
                </label>
                <input
                  type="text"
                  id="targetRole"
                  name="targetRole"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-brand-primary rounded-lg text-brand-primary placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="e.g., Senior Software Engineer, Marketing Manager"
                />
              </div>

              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-brand-primary mb-2">
                  Job Description *
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-brand-primary rounded-lg text-brand-primary placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="Paste the job description here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-brand-primary mb-2">
                    Years of Experience
                  </label>
                  <select
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    className="w-full px-4 py-3 bg-gray-800 border border-brand-primary rounded-lg text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  >
                    <option value="1">1 year</option>
                    <option value="3">3 years</option>
                    <option value="5" selected>5 years</option>
                    <option value="8">8 years</option>
                    <option value="12">12 years</option>
                    <option value="15">15+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-brand-primary mb-2">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="w-full px-4 py-3 bg-gray-800 border border-brand-primary rounded-lg text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  >
                    <option value="tech">Technology</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Rewriting Resume..." : "Rewrite My Resume"}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary">
            <h2 className="text-2xl font-bold text-brand-primary mb-6">
              Results
            </h2>

            {atsScore && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-brand-primary">
                <h3 className="text-lg font-semibold text-brand-primary mb-4">
                  ATS Optimization Score
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(atsScore.overall)}`}>
                      {atsScore.overall}%
                    </div>
                    <div className="text-sm text-brand-secondary">
                      {getScoreLabel(atsScore.overall)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-secondary">Keyword Match:</span>
                      <span className={getScoreColor(atsScore.keywordMatch)}>{atsScore.keywordMatch}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-secondary">Formatting:</span>
                      <span className={getScoreColor(atsScore.formatting)}>{atsScore.formatting}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-secondary">Readability:</span>
                      <span className={getScoreColor(atsScore.readability)}>{atsScore.readability}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-secondary">Achievement Focus:</span>
                      <span className={getScoreColor(atsScore.achievementFocus)}>{atsScore.achievementFocus}%</span>
                    </div>
                  </div>
                </div>

                {atsScore.details.missingKeywords.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-brand-primary mb-1">Missing Keywords:</div>
                    <div className="text-xs text-brand-secondary">
                      {atsScore.details.missingKeywords.slice(0, 5).join(", ")}
                      {atsScore.details.missingKeywords.length > 5 && "..."}
                    </div>
                  </div>
                )}

                {atsScore.details.formattingIssues.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-brand-primary mb-1">Suggestions:</div>
                    <ul className="text-xs text-brand-secondary space-y-1">
                      {atsScore.details.formattingIssues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-brand-primary">
                    Rewritten Resume
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1 text-sm btn-secondary rounded hover:border-brand-accent transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={downloadText}
                      className="px-3 py-1 text-sm btn-secondary rounded hover:border-brand-accent transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-brand-primary">
                  <pre className="whitespace-pre-wrap text-sm text-brand-primary font-sans">
                    {result}
                  </pre>
                </div>
              </div>
            )}

            {!result && !isLoading && (
              <div className="text-center text-brand-secondary py-12">
                <div className="text-6xl mb-4">📄</div>
                <p>Your rewritten resume will appear here</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center text-brand-secondary py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
                <p>AI is rewriting your resume...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 