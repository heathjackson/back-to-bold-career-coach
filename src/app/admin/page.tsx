"use client";

import { useState, useEffect, useCallback } from "react";

interface EmailEntry {
  email: string;
  addedAt: string;
}

export default function AdminPage() {
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/verify');
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadEmails();
      }
    } catch {
      console.error('Auth check failed');
    }
  }, []);

  // Check authentication on load
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        loadEmails();
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch {
      console.error('Logout error');
    }
    
    setIsAuthenticated(false);
    setPassword("");
  };

  // Load existing emails from localStorage
  const loadEmails = () => {
    const storedEmails = localStorage.getItem("adminEmails");
    if (storedEmails) {
      setEmails(JSON.parse(storedEmails));
    }
  };

  const addEmail = () => {
    if (!newEmail || !newEmail.includes("@")) {
      setMessage("Please enter a valid email address");
      return;
    }

    const emailEntry: EmailEntry = {
      email: newEmail.toLowerCase().trim(),
      addedAt: new Date().toISOString()
    };

    const updatedEmails = [...emails, emailEntry];
    localStorage.setItem("adminEmails", JSON.stringify(updatedEmails));
    setEmails(updatedEmails);
    setNewEmail("");
    setMessage(`Email ${emailEntry.email} added successfully!`);
    
    setTimeout(() => setMessage(""), 3000);
  };

  const removeEmail = (emailToRemove: string) => {
    const updatedEmails = emails.filter(email => email.email !== emailToRemove);
    localStorage.setItem("adminEmails", JSON.stringify(updatedEmails));
    setEmails(updatedEmails);
    setMessage(`Email ${emailToRemove} removed successfully!`);
    
    setTimeout(() => setMessage(""), 3000);
  };

  const setCurrentUserEmail = (email: string) => {
    localStorage.setItem("userEmail", email);
    setMessage(`Set current user email to ${email}`);
    setTimeout(() => setMessage(""), 3000);
  };

  const exportEmails = () => {
    const emailList = emails.map(e => e.email).join("\n");
    const blob = new Blob([emailList], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user-emails.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importEmails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const emailList = content.split("\n").filter(email => email.trim() && email.includes("@"));
      
      const newEmails: EmailEntry[] = emailList.map(email => ({
        email: email.toLowerCase().trim(),
        addedAt: new Date().toISOString()
      }));

      const updatedEmails = [...emails, ...newEmails];
      localStorage.setItem("adminEmails", JSON.stringify(updatedEmails));
      setEmails(updatedEmails);
      setMessage(`Imported ${newEmails.length} emails successfully!`);
      setTimeout(() => setMessage(""), 3000);
    };
    reader.readAsText(file);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[--color-bg-primary] text-white py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900/40 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-blue-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Admin Access
              </h1>
              <p className="text-blue-200">
                Enter password to access email management
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {loginError && (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {loginError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Access Admin Panel
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Security Note:</strong> Change the default password in the code before deploying to production.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show admin panel if authenticated
  return (
    <div className="min-h-screen bg-[--color-bg-primary] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Email Management
            </h1>
            <p className="text-xl text-blue-200">
              Manage user emails for testing and development purposes
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-200">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Email Section */}
          <div className="bg-blue-900/40 rounded-2xl p-8 backdrop-blur-sm border border-blue-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Add New Email
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="newEmail" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-blue-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="user@example.com"
                />
              </div>
              
              <button
                onClick={addEmail}
                className="w-full bg-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Add Email
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Import/Export</h3>
              
              <div className="space-y-3">
                <button
                  onClick={exportEmails}
                  className="w-full bg-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export Emails to File
                </button>
                
                <div>
                  <label htmlFor="importFile" className="block text-sm font-medium text-white mb-2">
                    Import Emails from File
                  </label>
                  <input
                    type="file"
                    id="importFile"
                    accept=".txt,.csv"
                    onChange={importEmails}
                    className="w-full px-4 py-2 bg-gray-800 border border-blue-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload a text file with one email per line
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email List Section */}
          <div className="bg-blue-900/40 rounded-2xl p-8 backdrop-blur-sm border border-blue-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Stored Emails ({emails.length})
            </h2>
            
            {emails.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">📧</div>
                <p>No emails stored yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {emails.map((emailEntry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex-1">
                      <div className="text-white font-medium">{emailEntry.email}</div>
                      <div className="text-xs text-gray-400">
                        Added: {new Date(emailEntry.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentUserEmail(emailEntry.email)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        title="Set as current user email"
                      >
                        Set
                      </button>
                      <button
                        onClick={() => removeEmail(emailEntry.email)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        title="Remove email"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Current User Email Display */}
        <div className="mt-8 bg-blue-900/40 rounded-2xl p-6 backdrop-blur-sm border border-blue-700">
          <h3 className="text-lg font-semibold text-white mb-4">Current User Email</h3>
          <div className="flex items-center space-x-4">
            <span className="text-blue-200">
              {localStorage.getItem("userEmail") || "No email set"}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("userEmail");
                setMessage("Current user email cleared");
                setTimeout(() => setMessage(""), 3000);
              }}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 