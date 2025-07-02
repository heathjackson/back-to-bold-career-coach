"use client";

import { useState, useEffect } from "react";
import EmailCollector from "@/components/EmailCollector";

export default function ToolkitPage() {
  const [hasEmail, setHasEmail] = useState(false);
  const [showEmailCollector, setShowEmailCollector] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const checkEmail = () => {
      const email = localStorage.getItem("userEmail");
      setHasEmail(!!email);
      
      // If no email, show collector immediately
      if (!email) {
        setShowEmailCollector(true);
      }
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

  const handleEmailCollected = () => {
    setHasEmail(true);
    setShowEmailCollector(false);
    // Redirect to the external toolkit after email is collected
    redirectToToolkit();
  };

  const redirectToToolkit = () => {
    setIsRedirecting(true);
    const toolkitUrl = "https://www.notion.so/Back-to-Bold-AI-Resume-Prompt-Pack-1f02ec42493f80008008cbf7250372a9";
    
    // Try to open in new tab
    const newWindow = window.open(toolkitUrl, "_blank");
    
    // If popup is blocked, redirect in same window
    if (!newWindow) {
      console.log("Popup blocked, redirecting in same window");
      window.location.href = toolkitUrl;
    }
    
    // Reset redirecting state after a short delay
    setTimeout(() => {
      setIsRedirecting(false);
    }, 2000);
  };

  const handleDirectAccess = () => {
    console.log("Access Free Toolkit button clicked");
    
    // Double-check localStorage in case it was cleared
    const currentEmail = localStorage.getItem("userEmail");
    console.log("Current email from localStorage:", currentEmail);
    
    if (!currentEmail) {
      console.log("No email found, showing email collector");
      setShowEmailCollector(true);
      return;
    }
    
    console.log("Email found, redirecting to toolkit");
    redirectToToolkit();
  };

  return (
    <div className="min-h-screen bg-[--color-bg-primary] py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-900/40 rounded-2xl shadow-lg p-10 mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Free Career Toolkit</h1>
          <p className="text-xl text-blue-200 text-center mb-8">
            Access our comprehensive collection of AI prompts, templates, and resources to supercharge your job search.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-700">
              <h3 className="text-xl font-semibold text-white mb-4">🎯 What's Included:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  AI Resume Prompts & Templates
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Cover Letter Writing Guides
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  LinkedIn Profile Optimization
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Job Application Tracker
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-700">
              <h3 className="text-xl font-semibold text-white mb-4">💡 How to Use:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">1.</span>
                  Enter your email to access
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">2.</span>
                  Browse our curated resources
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">3.</span>
                  Download templates and guides
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">4.</span>
                  Apply AI prompts to your job search
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            {isRedirecting ? (
              <div className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Redirecting to Toolkit...
              </div>
            ) : (
              <button
                onClick={handleDirectAccess}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                🎁 Access Free Toolkit
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-700">
          <h3 className="text-lg font-semibold text-white mb-4">🔒 Why We Ask for Your Email:</h3>
          <p className="text-blue-200 mb-4">
            We collect your email to:
          </p>
          <ul className="space-y-2 text-blue-200 mb-4">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Send you updates when we add new resources
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Provide personalized career tips and insights
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Keep you informed about new AI tools and features
            </li>
          </ul>
          <p className="text-blue-200 text-sm">
            We respect your privacy and will never spam you. You can unsubscribe at any time.
          </p>
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