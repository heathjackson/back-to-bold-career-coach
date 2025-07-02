"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import EmailCollector from "@/components/EmailCollector";

export default function CoverLetterPage() {
  const [form, setForm] = useState({
    role: "",
    company: "",
    background: "",
    job: "",
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [showEmailCollector, setShowEmailCollector] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);

  // Check if user already has email
  useEffect(() => {
    const checkEmail = () => {
      const userEmail = localStorage.getItem("userEmail");
      setHasEmail(!!userEmail);
    };
    
    // Check on mount
    checkEmail();
    
    // Listen for storage changes (when localStorage is cleared in another tab)
    const handleStorageChange = () => {
      checkEmail();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Double-check localStorage in case it was cleared
    const currentEmail = localStorage.getItem("userEmail");
    const shouldShowEmailCollector = !currentEmail;
    
    console.log("Form submission check:", {
      hasEmail,
      currentEmail,
      shouldShowEmailCollector
    });
    
    // Check if user has email, if not show email collector
    if (shouldShowEmailCollector) {
      setShowEmailCollector(true);
      return;
    }

    // Proceed with form submission
    await submitForm();
  };

  const submitForm = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setOutput(data.message || data.error || "Sorry, something went wrong.");
    } catch {
      setOutput("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCollected = () => {
    setHasEmail(true);
    setShowEmailCollector(false);
    // Automatically submit the form after email is collected
    submitForm();
  };

  return (
    <div className="min-h-screen bg-[--color-bg-primary] py-12 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-900/40 rounded-2xl shadow-lg p-10 mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Cover Letter Generator</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="role" className="block text-lg font-semibold text-white mb-2">
                Role you&apos;re applying for
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                placeholder="e.g., Product Manager"
                value={form.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-lg font-semibold text-white mb-2">
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                placeholder="e.g., Acme Corp"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="background" className="block text-lg font-semibold text-white mb-2">
                Your background/career break summary
              </label>
              <textarea
                id="background"
                name="background"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Briefly describe your background, career break, and why you're returning to work..."
                value={form.background}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="job" className="block text-base font-medium text-white mb-2">
                Job description <span className="text-blue-200">(optional)</span>
              </label>
              <textarea
                id="job"
                name="job"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Paste the job description here to tailor the cover letter..."
                value={form.job}
                onChange={handleChange}
              />
            </div>
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Cover Letter"}
              </button>
              
              {/* Debug button - remove in production */}
              <button
                type="button"
                onClick={() => {
                  console.log("Current state:", {
                    hasEmail,
                    localStorage: localStorage.getItem("userEmail"),
                    showEmailCollector
                  });
                  localStorage.removeItem("userEmail");
                  setHasEmail(false);
                  console.log("Email cleared, hasEmail set to false");
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                🐛 Debug: Clear Email & Test Gate
              </button>
            </div>
          </form>
        </div>

        {/* Output Section */}
        {output && (
          <div className="bg-blue-900/40 rounded-2xl shadow-lg p-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Cover Letter</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    // You could add a toast notification here
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([output], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'cover-letter.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  💾 Download
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-200">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">{children}</h3>,
                    p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed text-base">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
                    li: ({children}) => <li className="text-gray-700">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-600">{children}</em>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 mb-4 bg-blue-50 py-2 rounded-r">{children}</blockquote>,
                    br: () => <br className="mb-2" />,
                  }}
                >
                  {output}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                💡 <strong>Tip:</strong> Customize this cover letter to match your specific experience and the company's culture. 
                Make sure to proofread and adjust the tone as needed.
              </p>
            </div>
          </div>
        )}

        {/* Email Collector Modal */}
        <EmailCollector
          isOpen={showEmailCollector}
          onClose={() => setShowEmailCollector(false)}
          onEmailCollected={handleEmailCollected}
        />
      </div>
    </div>
  );
} 