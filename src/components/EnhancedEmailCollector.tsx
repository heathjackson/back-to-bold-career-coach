"use client";

import { useState, useEffect } from "react";

interface EmailCollectorProps {
  onEmailCollected: (email: string) => void;
  isOpen: boolean;
  onClose: () => void;
  suggestedEmails?: string[]; // Emails to suggest to the user
}

export default function EnhancedEmailCollector({ 
  onEmailCollected, 
  isOpen, 
  onClose, 
  suggestedEmails = [] 
}: EmailCollectorProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Load suggested emails from localStorage (admin emails)
  const [localSuggestedEmails, setLocalSuggestedEmails] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Load admin emails from localStorage
      const adminEmails = localStorage.getItem("adminEmails");
      if (adminEmails) {
        try {
          const emails = JSON.parse(adminEmails);
          const emailList = emails.map((entry: { email: string }) => entry.email);
          setLocalSuggestedEmails(emailList);
        } catch (error) {
          console.error("Error parsing admin emails:", error);
        }
      }
    }
  }, [isOpen]);

  // Combine suggested emails from props and localStorage
  const allSuggestedEmails = [...new Set([...suggestedEmails, ...localSuggestedEmails])];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Show suggestions if user starts typing
    if (value.length > 0) {
      const filtered = allSuggestedEmails.filter(suggestedEmail => 
        suggestedEmail.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestedEmail: string) => {
    setEmail(suggestedEmail);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/collect-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        onEmailCollected(email);
        setEmail("");
      } else {
        const data = await response.json();
        // If email already exists, treat it as success and let them proceed
        if (response.status === 409 && data.error?.includes('already registered')) {
          localStorage.setItem("userEmail", email);
          onEmailCollected(email);
          setEmail("");
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Results
          </h2>
          <p className="text-gray-600">
            Enter your email to receive your personalized career insights and continue using our tools.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              onFocus={() => {
                if (email.length > 0 && filteredSuggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Delay hiding suggestions to allow clicking on them
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              required
            />
            
            {/* Email Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestedEmail, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestedEmail)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                  >
                    <div className="text-gray-900">{suggestedEmail}</div>
                    <div className="text-xs text-gray-500">Click to select</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Selection Buttons */}
          {allSuggestedEmails.length > 0 && email.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {allSuggestedEmails.slice(0, 3).map((suggestedEmail, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestedEmail)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {suggestedEmail}
                  </button>
                ))}
                {allSuggestedEmails.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowSuggestions(true)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    +{allSuggestedEmails.length - 3} more
                  </button>
                )}
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 py-3 px-6 rounded-lg font-semibold shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Setting you up..." : "Get Results"}
            </button>
          </div>
        </form>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          We&apos;ll send you career tips and updates. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
} 