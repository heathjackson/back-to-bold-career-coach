// Database integration example
// This shows how you could connect to a real database to store user emails

interface User {
  id: string;
  email: string;
  createdAt: Date;
  lastVisit: Date;
}

// Example with different database options:

// Option 1: SQLite (local file database)
export const sqliteExample = `
// Install: npm install sqlite3
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./users.db');

// Create table
db.run(\`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_visit DATETIME DEFAULT CURRENT_TIMESTAMP
  )
\`);

// Add user
export async function addUser(email: string) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR REPLACE INTO users (id, email, last_visit) VALUES (?, ?, ?)',
      [crypto.randomUUID(), email, new Date().toISOString()],
      (err) => {
        if (err) reject(err);
        else resolve(true);
      }
    );
  });
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) reject(err);
        else resolve(row || null);
      }
    );
  });
}
`;

// Option 2: Supabase (PostgreSQL in the cloud)
export const supabaseExample = `
// Install: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Add user
export async function addUser(email: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ 
      email, 
      last_visit: new Date().toISOString() 
    });
  
  if (error) throw error;
  return data;
}

// Get user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) return null;
  return data;
}
`;

// Option 3: MongoDB
export const mongoExample = `
// Install: npm install mongodb
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('career-coach');
const users = db.collection('users');

// Add user
export async function addUser(email: string) {
  return await users.updateOne(
    { email },
    { 
      $set: { 
        email, 
        lastVisit: new Date() 
      },
      $setOnInsert: { 
        createdAt: new Date() 
      }
    },
    { upsert: true }
  );
}

// Get user by email
export async function getUserByEmail(email: string) {
  return await users.findOne({ email });
}
`;

// Option 4: Simple JSON file (for development)
export const jsonFileExample = `
// Store emails in a JSON file
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function addUser(email: string) {
  try {
    const users = await loadUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      existingUser.lastVisit = new Date().toISOString();
    } else {
      users.push({
        id: crypto.randomUUID(),
        email,
        createdAt: new Date().toISOString(),
        lastVisit: new Date().toISOString()
      });
    }
    
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const users = await loadUsers();
    return users.find(u => u.email === email) || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

async function loadUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}
`;

// Current localStorage implementation (for reference)
export const localStorageExample = `
// Current implementation - only works on same browser/device
export function addUserToLocalStorage(email: string) {
  localStorage.setItem("userEmail", email);
}

export function getUserFromLocalStorage(): string | null {
  return localStorage.getItem("userEmail");
}

export function checkIfUserExists(email: string): boolean {
  const storedEmail = localStorage.getItem("userEmail");
  return storedEmail === email;
}
`;

console.log(`
Email Storage Options:
====================

1. localStorage (current) - Only works on same browser/device
2. SQLite - Local file database, good for development
3. Supabase - Cloud PostgreSQL, good for production
4. MongoDB - NoSQL database, flexible schema
5. JSON file - Simple file-based storage

To implement real email persistence, choose one of the database options above.
`); 