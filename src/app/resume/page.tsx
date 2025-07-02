"use client";

import { useState, useEffect } from "react";
import EmailCollector from "@/components/EmailCollector";

interface ResumeResponse {
  resume: string;
  message: string;
}

export default function ResumePage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showEmailCollector, setShowEmailCollector] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  // Check if user already has email
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setHasEmail(true);
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    // Check if user has email, if not show email collector
    if (!hasEmail) {
      setPendingFormData(formData);
      setShowEmailCollector(true);
      return;
    }

    // Proceed with form submission
    await submitForm(formData);
  };

  const submitForm = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const resume = formData.get("resume") as string;
      const jobDescription = formData.get("jobDescription") as string;
      const targetRole = formData.get("targetRole") as string;

      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription,
          targetRole,
        }),
      });

      const data: ResumeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to rewrite resume");
      }

      setResult(data.resume);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCollected = () => {
    setHasEmail(true);
    setShowEmailCollector(false);
    // Automatically submit the form after email is collected
    if (pendingFormData) {
      submitForm(pendingFormData);
      setPendingFormData(null);
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

  const formatResumeOutput = (resume: string) => {
    // Split the resume into lines
    const lines = resume.split('\n');
    const formattedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        formattedLines.push('');
        continue;
      }
      
      // Detect and format section headers
      const sectionHeaders = [
        'summary', 'experience', 'education', 'skills', 'technical skills', 
        'objective', 'professional summary', 'work experience', 'employment history',
        'certifications', 'awards', 'publications', 'projects', 'volunteer', 
        'languages', 'interests', 'additional'
      ];
      
      const isSectionHeader = sectionHeaders.some(header => 
        line.toLowerCase().includes(header)
      );
      
      if (isSectionHeader) {
        // Format section headers
        formattedLines.push('');
        formattedLines.push(`**${line.toUpperCase()}**`);
        formattedLines.push('');
      } else if (line.match(/^[A-Z][A-Z\s&]+$/)) {
        // Likely a company name or job title (all caps)
        formattedLines.push('');
        formattedLines.push(`**${line}**`);
      } else if (line.match(/^\d{4}\s*[-–—]\s*\d{4}|\d{4}\s*[-–—]\s*Present|\d{4}\s*[-–—]\s*Current/)) {
        // Date range
        formattedLines.push(`*${line}*`);
      } else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        // Bullet points
        formattedLines.push(`  ${line}`);
      } else if (line.match(/^[A-Z][^.!?]*[.!?]$/)) {
        // Likely a sentence (starts with capital, ends with punctuation)
        formattedLines.push(line);
      } else if (line.match(/^[A-Z][A-Za-z\s]+$/)) {
        // Likely a name or title (starts with capital, no punctuation)
        formattedLines.push(`**${line}**`);
      } else if (line.includes('|') && line.includes('@')) {
        // Contact information line
        formattedLines.push(line);
      } else if (line.includes('[') && line.includes(']')) {
        // Links line
        formattedLines.push(line);
      } else {
        // Regular text
        formattedLines.push(line);
      }
    }
    
    return formattedLines.join('\n');
  };

  return (
    <div className="min-h-screen bg-[--color-bg-primary] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Resume Rewriting
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Transform your resume with industry-specific optimization, ATS compatibility, 
            and professional formatting that helps you stand out to recruiters.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-blue-900/40 rounded-2xl p-8 backdrop-blur-sm border border-blue-700">
            <h2 className="text-2xl font-bold text-white mb-6">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {result && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-brand-primary">
                    Rewritten Resume
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={downloadText}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      💾 Download
                    </button>
                  </div>
                </div>
                
                <div className="bg-white text-gray-900 rounded-lg p-6 border border-brand-primary shadow-lg">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="font-sans leading-relaxed"
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#1f2937'
                      }}
                    >
                      {formatResumeOutput(result).split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          // Bold headers
                          const text = line.slice(2, -2);
                          return (
                            <div key={index} className="font-bold text-lg text-gray-800 mb-3 mt-6 first:mt-0 border-b border-gray-300 pb-1">
                              {text}
                            </div>
                          );
                        } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                          // Italic dates
                          const text = line.slice(1, -1);
                          return (
                            <div key={index} className="text-gray-600 italic mb-2 text-sm">
                              {text}
                            </div>
                          );
                        } else if (line.startsWith('  •') || line.startsWith('  -') || line.startsWith('  *')) {
                          // Bullet points
                          const text = line.slice(3);
                          return (
                            <div key={index} className="ml-6 mb-2 flex items-start">
                              <span className="text-gray-500 mr-3 mt-1 text-sm">•</span>
                              <span className="text-sm">{text}</span>
                            </div>
                          );
                        } else if (line.includes('|') && line.includes('@')) {
                          // Contact information line
                          return (
                            <div key={index} className="mb-2 text-sm text-gray-700">
                              {line}
                            </div>
                          );
                        } else if (line.includes('[') && line.includes(']')) {
                          // Links line
                          return (
                            <div key={index} className="mb-2 text-sm text-blue-600">
                              {line}
                            </div>
                          );
                        } else if (line.trim() === '') {
                          // Empty lines
                          return <div key={index} className="h-3"></div>;
                        } else {
                          // Regular text
                          return (
                            <div key={index} className="mb-2 text-sm">
                              {line}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Tip:</strong> This ATS-optimized resume is tailored to your target role. 
                    Review and customize the content to ensure it accurately reflects your experience and achievements.
                  </p>
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

      {/* Email Collector Modal */}
      <EmailCollector
        isOpen={showEmailCollector}
        onClose={() => setShowEmailCollector(false)}
        onEmailCollected={handleEmailCollected}
      />
    </div>
  );
} 