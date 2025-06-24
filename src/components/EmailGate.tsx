"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface EmailGateProps {
  children: React.ReactNode;
}

export default function EmailGate({ children }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user already provided email
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setHasEmail(true);
    }
    setIsChecking(false);
  }, []);

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
        setHasEmail(true);
        // Redirect immediately
        router.push(pathname);
      } else {
        const data = await response.json();
        // If email already exists, treat it as success and let them proceed
        if (response.status === 409 && data.error?.includes('already registered')) {
          localStorage.setItem("userEmail", email);
          setHasEmail(true);
          // Redirect immediately
          router.push(pathname);
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

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show email collection form if no email
  if (!hasEmail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Back to Bold
            </h1>
            <p className="text-gray-600">
              Please provide your email to access our career coaching tools.
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-800 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-purple-900 transition focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Setting you up..." : "Continue"}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            We&apos;ll send you career tips and updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // Show the actual page content if user has email
  return <>{children}</>;
} 