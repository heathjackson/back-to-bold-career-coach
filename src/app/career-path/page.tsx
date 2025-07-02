"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import EmailCollector from "@/components/EmailCollector";

interface FormData {
  experience: string;
  skills: string;
  interests: string;
  preferences: string;
  education: string;
  breakReason?: string;
  returnMotivation?: string;
  timeAvailability?: string;
  locationPreference?: string;
  salaryExpectations?: string;
}

interface Question {
  id: string;
  text: string;
  placeholder: string;
  required: boolean;
  type: 'text' | 'textarea';
  rows?: number;
  conditional?: boolean; // Whether this question should be skipped based on previous answers
  condition?: (formData: FormData) => boolean; // Function to determine if question should be shown
}

export default function CareerPathPage() {
  const [formData, setFormData] = useState<FormData>({
    experience: "",
    skills: "",
    interests: "",
    preferences: "",
    education: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState<string>("");
  const [showEmailCollector, setShowEmailCollector] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  // Check if user already has email
  useEffect(() => {
    const checkEmail = () => {
      // Email status is checked dynamically when needed
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

  // Define all possible questions upfront
  const allQuestions: Question[] = [
    {
      id: "experience",
      text: "Hi! I'm here to help you find your next career path. Let's start with what you did before your career break. What was your previous role?",
      placeholder: "e.g., I was a Marketing Manager at a tech company, or I worked as a teacher for 8 years...",
      required: true,
      type: 'textarea',
      rows: 3
    },
    {
      id: "breakReason",
      text: "What led to your career break?",
      placeholder: "e.g., I took time off to raise my children, I was caring for a family member, I wanted to travel...",
      required: true,
      type: 'textarea',
      rows: 3
    },
    {
      id: "returnMotivation",
      text: "What's motivating you to return to work now?",
      placeholder: "e.g., I'm ready for a new challenge, I want to contribute financially, I miss the social aspect...",
      required: true,
      type: 'textarea',
      rows: 3
    },
    {
      id: "education",
      text: "What's your highest level of education?",
      placeholder: "e.g., Bachelor's degree in Business, Master's in Education, High school with certifications...",
      required: true,
      type: 'textarea',
      rows: 2
    },
    {
      id: "skills",
      text: "What are 2-3 skills you feel most confident in?",
      placeholder: "e.g., project management, communication, data analysis, leadership, problem-solving...",
      required: true,
      type: 'textarea',
      rows: 2
    },
    {
      id: "interests",
      text: "What kind of work environment and schedule are you looking for?",
      placeholder: "e.g., remote work, flexible hours, part-time, team-based projects, independent work...",
      required: true,
      type: 'textarea',
      rows: 2
    },
    {
      id: "preferences",
      text: "What industries or types of roles appeal to you most?",
      placeholder: "e.g., technology, healthcare, education, consulting, non-profit, remote-first companies...",
      required: true,
      type: 'textarea',
      rows: 2
    },
    {
      id: "timeAvailability",
      text: "How soon are you looking to return to work?",
      placeholder: "e.g., immediately, within 3 months, flexible timeline, part-time to start...",
      required: true,
      type: 'textarea',
      rows: 2
    },
    {
      id: "locationPreference",
      text: "Where are you located and what are your location preferences?",
      placeholder: "e.g., I'm in Austin, TX and prefer remote or hybrid work, I'm open to relocation...",
      required: true,
      type: 'textarea',
      rows: 2
    }
  ];

  // Get the current visible questions (filter out conditional ones that shouldn't be shown)
  const getVisibleQuestions = (): Question[] => {
    return allQuestions.filter(question => {
      if (!question.conditional) return true;
      if (question.condition) {
        return question.condition(formData);
      }
      return true;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentStep];
  const totalQuestions = visibleQuestions.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion && formData[currentQuestion.id as keyof FormData]) {
      // Add to conversation history
      setConversationHistory(prev => [...prev, `Q: ${currentQuestion.text}`, `A: ${formData[currentQuestion.id as keyof FormData]}`]);
      
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // We've reached the end, submit the form
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Double-check localStorage in case it was cleared
    const currentEmail = localStorage.getItem("userEmail");
    const shouldShowEmailCollector = !currentEmail;
    
    // Check if user has email, if not show email collector
    if (shouldShowEmailCollector) {
      setShowEmailCollector(true);
      return;
    }

    // Proceed with form submission
    await submitForm();
  };

  const submitForm = async () => {
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

  const handleEmailCollected = () => {
    setShowEmailCollector(false);
    // Automatically submit the form after email is collected
    submitForm();
  };

  const resetConversation = () => {
    setFormData({
      experience: "",
      skills: "",
      interests: "",
      preferences: "",
      education: "",
    });
    setCurrentStep(0);
    setConversationHistory([]);
    setGptResponse("");
  };

  return (
    <div className="min-h-screen bg-[--color-bg-primary] py-12 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-900/40 rounded-2xl shadow-lg p-10 mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Career Path Assessment</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Let&apos;s have a conversation about your career journey and discover opportunities that align with your experience and goals.
          </p>
        </div>

        {!gptResponse ? (
          <div className="bg-blue-900/40 rounded-lg shadow-md p-8 border border-blue-800">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-blue-200 mb-2">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
                <span>{Math.round(((currentStep + 1) / totalQuestions) * 100)}% complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current question */}
            {currentQuestion && (
              <div className="space-y-6">
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-700">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {currentQuestion.text}
                  </h2>
                  
                  {currentQuestion.type === 'textarea' ? (
                    <textarea
                      name={currentQuestion.id}
                      rows={currentQuestion.rows || 3}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.id as keyof FormData] || ""}
                      onChange={handleInputChange}
                      required={currentQuestion.required}
                    />
                  ) : (
                    <input
                      type="text"
                      name={currentQuestion.id}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400"
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.id as keyof FormData] || ""}
                      onChange={handleInputChange}
                      required={currentQuestion.required}
                    />
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="bg-gray-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData[currentQuestion.id as keyof FormData] || isLoading}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Thinking..." : currentStep === totalQuestions - 1 ? "Get My Results" : "Next"}
                  </button>
                </div>
              </div>
            )}

            {/* Conversation history */}
            {conversationHistory.length > 0 && (
              <div className="mt-8 border-t border-blue-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Our Conversation</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto text-blue-200">
                  {conversationHistory.map((entry, index) => (
                    <div key={index} className="text-sm">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-blue-900/40 rounded-lg shadow-md p-8 border border-blue-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                {gptResponse.startsWith('❌') || gptResponse.startsWith('🚫') || gptResponse.startsWith('🔑') ? '⚠️ Error' : '🔍 Career Suggestions'}
              </h2>
              <div className="flex gap-2">
                {!gptResponse.startsWith('❌') && !gptResponse.startsWith('🚫') && !gptResponse.startsWith('🔑') && (
                  <>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(gptResponse);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([gptResponse], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'career-suggestions.txt';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      💾 Download
                    </button>
                  </>
                )}
                <button
                  onClick={resetConversation}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  🔄 Start Over
                </button>
              </div>
            </div>
            
            {gptResponse.startsWith('❌') || gptResponse.startsWith('🚫') || gptResponse.startsWith('🔑') ? (
              // Error display
              <div className="bg-red-900/20 rounded-lg p-6 border-l-4 border-red-500">
                <div className="prose prose-lg max-w-none">
                  <p className="text-red-200 leading-relaxed text-base">{gptResponse}</p>
                </div>
              </div>
            ) : (
              // Success display
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
                    {gptResponse}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            
            {!gptResponse.startsWith('❌') && !gptResponse.startsWith('🚫') && !gptResponse.startsWith('🔑') && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Next Steps:</strong> Research these career paths, connect with professionals in those fields, 
                  and consider taking relevant courses or certifications to build your skills.
                </p>
              </div>
            )}
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