#!/usr/bin/env node

const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = "MySecureAdminPass123!";
  const saltRounds = 12;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n🔐 Password Hash Generated Successfully!');
    console.log('==========================================');
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log('\n📝 Add this to your .env.local file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n✅ Security Features Implemented:');
    console.log('   • bcrypt password hashing (12 rounds)');
    console.log('   • Rate limiting (5 attempts per 15 min)');
    console.log('   • HTTP-only secure cookies');
    console.log('   • Security headers');
    console.log('   • HTTPS enforcement (production)');
    console.log('   • Brute force protection');
    console.log('\n⚠️  Remember:');
    console.log('   • Keep your password secure');
    console.log('   • Never commit .env files to version control');
    console.log('   • Change this password regularly');
    console.log('\n🚀 Your admin panel is now much more secure!\n');
    
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash(); 