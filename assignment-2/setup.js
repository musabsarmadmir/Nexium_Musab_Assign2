#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Blog Summarizer Setup Script');
console.log('================================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please copy .env.example to .env.local and fill in your values.\n');
  process.exit(1);
}

// Read .env.local to check for placeholder values
const envContent = fs.readFileSync(envPath, 'utf8');
if (envContent.includes('placeholder')) {
  console.log('⚠️  Placeholder values detected in .env.local');
  console.log('Please update .env.local with your actual values:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  console.log('- MONGODB_URI\n');
  console.log('After updating, run this script again.\n');
  process.exit(1);
}

console.log('✅ Environment variables configured');

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.log('❌ Failed to install dependencies');
  process.exit(1);
}

// Build the project
console.log('🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed - check your environment variables');
  process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Run the Supabase SQL script in your Supabase dashboard');
console.log('2. Run: npm run setup-mongodb');
console.log('3. Start development: npm run dev');
console.log('4. Deploy to Vercel when ready');
