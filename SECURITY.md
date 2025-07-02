# Security Guide for Admin Panel

## 🔒 **Admin Panel Security**

The admin panel at `/admin` is now password-protected to prevent unauthorized access to your collected emails.

### **Default Password**
- **Current password**: `admin123`
- **⚠️ IMPORTANT**: Change this immediately before deploying to production

### **How to Change the Password**

#### Option 1: Environment Variable (Recommended)
1. Create a `.env.local` file in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ```
3. Replace `your_secure_password_here` with a strong password
4. Restart your development server

#### Option 2: Direct Code Change
1. Open `src/lib/admin-auth.ts`
2. Find the line: `return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';`
3. Change `'admin123'` to your secure password

### **Password Requirements**
- At least 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Avoid common words or patterns
- Don't use the same password as other accounts

### **Example Strong Passwords**
- `MySecureAdminPass123!`
- `CareerCoach2024#Admin`
- `BackToBold!Secure@2024`

## 🛡️ **Additional Security Measures**

### **Session Management**
- Admin sessions expire after 24 hours
- Sessions are cleared when you logout
- Sessions are stored in localStorage (client-side only)

### **Email Protection**
- Emails are stored in localStorage (client-side only)
- No emails are sent to external servers
- Admin panel access is required to view/manage emails

### **Production Security Checklist**
- [ ] Change default admin password
- [ ] Use environment variables for passwords
- [ ] Enable HTTPS
- [ ] Consider implementing 2FA
- [ ] Add rate limiting for login attempts
- [ ] Log admin access attempts
- [ ] Regularly rotate passwords

## 🚨 **Security Warnings**

### **Current Limitations**
1. **Client-side storage**: Emails are stored in browser localStorage
2. **Simple authentication**: Uses basic password verification
3. **No encryption**: Emails are stored in plain text
4. **No backup**: Emails are lost if browser data is cleared

### **For Production Use**
Consider implementing:
- Server-side database for email storage
- Proper password hashing (bcrypt)
- JWT tokens for authentication
- HTTPS encryption
- Rate limiting
- Audit logging

## 🔧 **Testing Security**

### **Test Admin Access**
1. Visit `http://localhost:3001/admin`
2. Enter the admin password
3. Verify you can access the email management panel
4. Test logout functionality

### **Test Unauthorized Access**
1. Try accessing `/admin` without password
2. Try incorrect passwords
3. Verify access is denied

## 📞 **Support**

If you need help with security setup or have concerns:
1. Review this security guide
2. Check the admin authentication code in `src/lib/admin-auth.ts`
3. Consider consulting with a security expert for production deployments

---

**Remember**: Security is crucial when handling user data. Always use strong passwords and follow security best practices. 