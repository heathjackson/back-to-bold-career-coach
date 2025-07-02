import bcrypt from 'bcryptjs';

// Password hashing configuration
const SALT_ROUNDS = 12; // Higher = more secure but slower

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 * @param password - Plain text password to verify
 * @param hash - Stored password hash
 * @returns True if password matches
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate a secure password hash for environment variables
 * Use this to create the ADMIN_PASSWORD_HASH for your .env file
 */
export async function generatePasswordHash(password: string): Promise<void> {
  try {
    const hash = await hashPassword(password);
    console.log('\n🔐 Password Hash Generated:');
    console.log('============================');
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log('\n📝 Add this to your .env.local file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n⚠️  Keep your password secure and never commit .env files to version control!\n');
  } catch (error) {
    console.error('Error generating password hash:', error);
  }
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation results
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number; // 0-4 (0=very weak, 4=very strong)
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else if (password.length >= 12) {
    score += 1;
  }

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Missing character types
  if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters');
  if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Add numbers');
  if (!/[^A-Za-z0-9]/.test(password)) feedback.push('Add special characters');

  // Common patterns to avoid
  if (password.toLowerCase().includes('password')) feedback.push('Avoid common words like "password"');
  if (password.toLowerCase().includes('admin')) feedback.push('Avoid common words like "admin"');
  if (/(.)\1{2,}/.test(password)) feedback.push('Avoid repeated characters');

  const isValid = score >= 3 && password.length >= 8;

  return {
    isValid,
    score,
    feedback
  };
}

// CLI utility for generating password hashes
if (require.main === module) {
  const password = process.argv[2];
  
  if (!password) {
    console.log('Usage: npx tsx src/lib/password-utils.ts <password>');
    console.log('Example: npx tsx src/lib/password-utils.ts "MySecurePassword123!"');
    process.exit(1);
  }

  generatePasswordHash(password);
} 