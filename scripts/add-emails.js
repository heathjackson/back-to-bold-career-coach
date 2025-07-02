#!/usr/bin/env node

/**
 * Email Pre-population Script
 * 
 * This script helps you add emails to localStorage for testing purposes.
 * Run this script in your browser console or use it as a reference.
 */

// List of emails to add (replace with your actual emails)
const emailsToAdd = [
  "user1@example.com",
  "user2@example.com", 
  "user3@example.com",
  "test@backtobold.com",
  "demo@careercoach.com"
];

// Function to add emails to localStorage
function addEmailsToLocalStorage(emails) {
  console.log("Adding emails to localStorage...");
  
  emails.forEach((email, index) => {
    // Store in adminEmails array
    const existingEmails = JSON.parse(localStorage.getItem("adminEmails") || "[]");
    const emailEntry = {
      email: email.toLowerCase().trim(),
      addedAt: new Date().toISOString()
    };
    
    // Check if email already exists
    const emailExists = existingEmails.some(e => e.email === emailEntry.email);
    if (!emailExists) {
      existingEmails.push(emailEntry);
      localStorage.setItem("adminEmails", JSON.stringify(existingEmails));
      console.log(`✅ Added: ${email}`);
    } else {
      console.log(`⚠️  Already exists: ${email}`);
    }
  });
  
  console.log(`\n📧 Total emails in storage: ${JSON.parse(localStorage.getItem("adminEmails") || "[]").length}`);
}

// Function to set a specific email as current user
function setCurrentUserEmail(email) {
  localStorage.setItem("userEmail", email);
  console.log(`👤 Set current user email to: ${email}`);
}

// Function to clear all emails
function clearAllEmails() {
  localStorage.removeItem("adminEmails");
  localStorage.removeItem("userEmail");
  console.log("🗑️  Cleared all emails from localStorage");
}

// Function to list all stored emails
function listStoredEmails() {
  const emails = JSON.parse(localStorage.getItem("adminEmails") || "[]");
  const currentUser = localStorage.getItem("userEmail");
  
  console.log("\n📋 Stored Emails:");
  emails.forEach((emailEntry, index) => {
    const isCurrent = emailEntry.email === currentUser;
    console.log(`${index + 1}. ${emailEntry.email} ${isCurrent ? '(👤 current)' : ''}`);
  });
  
  if (!currentUser) {
    console.log("\n⚠️  No current user email set");
  }
}

// Browser console commands (copy and paste these into your browser console)
const browserCommands = `
// Add all emails from the list above
addEmailsToLocalStorage(${JSON.stringify(emailsToAdd)});

// Set a specific email as current user
setCurrentUserEmail("user1@example.com");

// List all stored emails
listStoredEmails();

// Clear all emails
clearAllEmails();
`;

console.log("Email Pre-population Script");
console.log("========================");
console.log("\nTo use this script:");
console.log("1. Open your browser's developer console (F12)");
console.log("2. Copy and paste the functions above");
console.log("3. Run the commands below:");
console.log(browserCommands);

// Export functions for use in browser console
if (typeof window !== 'undefined') {
  window.addEmailsToLocalStorage = addEmailsToLocalStorage;
  window.setCurrentUserEmail = setCurrentUserEmail;
  window.clearAllEmails = clearAllEmails;
  window.listStoredEmails = listStoredEmails;
} 