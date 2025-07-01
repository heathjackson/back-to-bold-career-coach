"use client";

import { useState } from "react";

interface EmailCollectorProps {
  onEmailCollected: (email: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailCollector({ onEmailCollected, isOpen, onClose }: EmailCollectorProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              required
            />
          </div>
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