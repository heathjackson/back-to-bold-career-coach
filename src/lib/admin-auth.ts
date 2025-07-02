// Admin Authentication Configuration
// This file handles admin authentication securely

// Get admin password from environment variable
export const getAdminPassword = (): string => {
  // In production, this should be set as an environment variable
  if (typeof window !== 'undefined') {
    // Client-side: use a secure method or environment variable
    const clientPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (!clientPassword) {
      console.warn('⚠️  No NEXT_PUBLIC_ADMIN_PASSWORD set. Please configure this in your .env.local file.');
    }
    return clientPassword || '';
  }
  
  // Server-side: use environment variable
  const serverPassword = process.env.ADMIN_PASSWORD;
  if (!serverPassword) {
    console.error('❌ ADMIN_PASSWORD environment variable is required for server-side authentication.');
    throw new Error('ADMIN_PASSWORD not configured');
  }
  return serverPassword;
};

// Hash function for better security (simple implementation)
export const hashPassword = (password: string): string => {
  // In production, use a proper hashing library like bcrypt
  return btoa(password); // Base64 encoding (NOT secure for production)
};

// Verify password
export const verifyPassword = (inputPassword: string): boolean => {
  const correctPassword = getAdminPassword();
  return inputPassword === correctPassword;
};

// Session management
export const setAdminSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("adminAuthenticated", "true");
    localStorage.setItem("adminSessionStart", new Date().toISOString());
  }
};

export const clearAdminSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminSessionStart");
  }
};

export const isAdminAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const authenticated = localStorage.getItem("adminAuthenticated");
    const sessionStart = localStorage.getItem("adminSessionStart");
    
    if (!authenticated || !sessionStart) {
      return false;
    }
    
    // Check if session is expired (24 hours)
    const sessionTime = new Date(sessionStart).getTime();
    const currentTime = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (currentTime - sessionTime > sessionDuration) {
      clearAdminSession();
      return false;
    }
    
    return true;
  }
  
  return false;
};

// Security recommendations
export const securityRecommendations = `
SECURITY RECOMMENDATIONS:
=======================

1. Change the default password immediately
2. Use environment variables for passwords
3. Implement proper password hashing (bcrypt)
4. Add rate limiting for login attempts
5. Use HTTPS in production
6. Consider implementing 2FA for admin access
7. Log admin access attempts
8. Regularly rotate admin passwords

For production deployment:
- Set ADMIN_PASSWORD environment variable
- Use a strong, unique password
- Consider using a proper authentication service
`; 