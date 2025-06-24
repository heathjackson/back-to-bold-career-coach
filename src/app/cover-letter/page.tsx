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
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setHasEmail(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has email, if not show email collector
    if (!hasEmail) {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Cover Letter Generator</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="role" className="block text-lg font-semibold text-gray-900 mb-2">
                Role you&apos;re applying for
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-base"
                placeholder="e.g., Product Manager"
                value={form.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-lg font-semibold text-gray-900 mb-2">
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-base"
                placeholder="e.g., Acme Corp"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="background" className="block text-lg font-semibold text-gray-900 mb-2">
                Your background/career break summary
              </label>
              <textarea
                id="background"
                name="background"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-base"
                placeholder="Briefly describe your background, career break, and why you're returning to work..."
                value={form.background}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="job" className="block text-base font-medium text-gray-700 mb-2">
                Job description <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="job"
                name="job"
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-transparent text-base"
                placeholder="Paste the job description here to tailor the cover letter..."
                value={form.job}
                onChange={handleChange}
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Cover Letter"}
              </button>
            </div>
          </form>
        </div>

        {/* Output Section */}
        {output && (
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cover Letter</h2>
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-cyan-500">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">{children}</h3>,
                    p: ({children}) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
                    li: ({children}) => <li className="text-gray-700">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-800">{children}</em>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-cyan-300 pl-4 italic text-gray-600 mb-4">{children}</blockquote>,
                  }}
                >
                  {output}
                </ReactMarkdown>
              </div>
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