"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ResumePage() {
  const [form, setForm] = useState({
    resume: "",
    job: "",
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/resume", {
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

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  const handleDownloadText = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rewritten-resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Resume Rewriter</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="resume" className="block text-lg font-semibold text-gray-900 mb-3">
                Your Current Resume
              </label>
              <textarea
                id="resume"
                name="resume"
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-base"
                placeholder="Paste your current resume here..."
                value={form.resume}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="job" className="block text-base font-medium text-gray-700 mb-2">
                Job Title or Description <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="job"
                name="job"
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-transparent text-base"
                placeholder="e.g., Product Manager at a tech company, or paste a job description..."
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
                {loading ? "Rewriting..." : "Rewrite My Resume"}
              </button>
            </div>
          </form>
        </div>
        {output && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">📝 Rewritten Resume</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-semibold px-4 py-2 rounded-lg transition-colors text-base shadow"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={handleDownloadText}
                  className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-semibold px-4 py-2 rounded-lg transition-colors text-base shadow"
                >
                  Download as Text
                </button>
              </div>
            </div>
            <div ref={outputRef} className="prose prose-lg max-w-none text-gray-800 bg-white">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 