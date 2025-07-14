// Test MongoDB connection
const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error("❌ MONGODB_URI not found in environment variables");
    console.log("Please check your .env.local file");
    return;
  }

  if (uri.includes("YOUR_USERNAME") || uri.includes("your_actual")) {
    console.error("❌ Please update MONGODB_URI with your actual credentials");
    console.log("Current value:", uri);
    return;
  }

  console.log("🔄 Testing MongoDB connection...");
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");
    
    // Test database access
    const db = client.db("blog_summarizer");
    const collections = await db.listCollections().toArray();
    console.log("📊 Available collections:", collections.map(c => c.name));
    
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    
    if (error.message.includes("authentication failed")) {
      console.log("\n🔧 Troubleshooting:");
      console.log("1. Check your username and password");
      console.log("2. Verify the user has proper permissions");
      console.log("3. Make sure Network Access allows your IP");
    }
  } finally {
    await client.close();
  }
}

testConnection();
