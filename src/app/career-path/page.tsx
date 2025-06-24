"use client";

import { useState } from "react";

interface FormData {
  experience: string;
  skills: string;
  interests: string;
  preferences: string;
  education: string;
}

export default function CareerPathPage() {
  const [formData, setFormData] = useState<FormData>({
    experience: "",
    skills: "",
    interests: "",
    preferences: "",
    education: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGptResponse("");

    try {
      const response = await fetch("/api/career-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages
        if (data.error?.includes('quota')) {
          setGptResponse("🚫 OpenAI quota exceeded. This usually means your OpenAI account needs billing setup or has reached its usage limit. Please check your OpenAI billing settings or try again later.");
        } else if (data.error?.includes('API key')) {
          setGptResponse("🔑 OpenAI API key issue. Please check your environment configuration.");
        } else {
          setGptResponse(`❌ ${data.error || 'Sorry, there was an error generating your career suggestions. Please try again.'}`);
        }
        return;
      }

      setGptResponse(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setGptResponse("❌ Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Path Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let&apos;s explore your career journey and discover opportunities that align with your experience and goals.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div>
              <label htmlFor="experience" className="block text-lg font-semibold text-gray-900 mb-3">
                1. What did you do before your career break?
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="Describe your previous role, responsibilities, and achievements..."
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Question 2 */}
            <div>
              <label htmlFor="education" className="block text-lg font-semibold text-gray-900 mb-3">
                2. What is your highest level of education achieved?
              </label>
              <textarea
                id="education"
                name="education"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="e.g., Bachelor's degree in Business Administration, Master's in Education, High school diploma with certifications..."
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Question 3 */}
            <div>
              <label htmlFor="skills" className="block text-lg font-semibold text-gray-900 mb-3">
                3. What are 2–3 skills you feel confident in?
              </label>
              <textarea
                id="skills"
                name="skills"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="e.g., project management, communication, data analysis, leadership..."
                value={formData.skills}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Question 4 */}
            <div>
              <label htmlFor="interests" className="block text-lg font-semibold text-gray-900 mb-3">
                4. What kind of work are you interested in now?
              </label>
              <textarea
                id="interests"
                name="interests"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="e.g., remote work, flexible hours, team-based projects, independent work..."
                value={formData.interests}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Question 5 */}
            <div>
              <label htmlFor="preferences" className="block text-lg font-semibold text-gray-900 mb-3">
                5. What industries or job types appeal to you?
              </label>
              <textarea
                id="preferences"
                name="preferences"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="e.g., technology, healthcare, education, consulting, non-profit..."
                value={formData.preferences}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Thinking..." : "Find My Fit"}
              </button>
            </div>
          </form>
        </div>

        {/* GPT Response Section */}
        {gptResponse && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              {gptResponse.startsWith('❌') || gptResponse.startsWith('🚫') || gptResponse.startsWith('🔑') ? '⚠️ Error' : '🔍 Career Suggestions'}
            </h2>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {gptResponse}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 