// MongoDB setup script
const { MongoClient } = require("mongodb");

// Load environment variables
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#') && key.trim()) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

async function setupMongoDB() {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment variables");
    console.log("Please update your .env.local file with your MongoDB connection string");
    process.exit(1);
  }

  if (process.env.MONGODB_URI.includes('YOUR_USERNAME') || process.env.MONGODB_URI.includes('placeholder')) {
    console.error("❌ Please update MONGODB_URI in .env.local with your actual MongoDB credentials");
    console.log("Current value contains placeholders that need to be replaced");
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    console.log("🔗 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB successfully");

    const db = client.db("blog_summarizer");

    // Drop collection if it exists (for clean setup)
    try {
      await db.collection("full_texts").drop();
      console.log("🗑️  Dropped existing collection");
    } catch (error) {
      // Collection doesn't exist, that's fine
    }

    // Create collection with validation
    await db.createCollection("full_texts", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["summaryId", "url", "title", "fullText", "createdAt"],
          properties: {
            summaryId: {
              bsonType: "string",
              description: "Summary ID reference",
            },
            url: {
              bsonType: "string",
              description: "Original blog URL",
            },
            title: {
              bsonType: "string",
              description: "Blog title",
            },
            fullText: {
              bsonType: "string",
              description: "Full blog content",
            },
            createdAt: {
              bsonType: "date",
              description: "Creation timestamp",
            },
            wordCount: {
              bsonType: "int",
              description: "Word count of full text",
            },
          },
        },
      },
    });

    console.log("📄 Created 'full_texts' collection with validation");

    // Create indexes
    await db.collection("full_texts").createIndex({ summaryId: 1 });
    await db.collection("full_texts").createIndex({ url: 1 });
    await db.collection("full_texts").createIndex({ createdAt: -1 });

    console.log("🔍 Created indexes for better query performance");
    console.log("🎉 MongoDB setup completed successfully!");
    console.log("\nDatabase: blog_summarizer");
    console.log("Collection: full_texts");
    console.log("Indexes: summaryId, url, createdAt");

  } catch (error) {
    console.error("❌ MongoDB setup error:", error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log("\n💡 Authentication failed. Please check:");
      console.log("   - Your MongoDB username and password are correct");
      console.log("   - Your user has the necessary permissions");
      console.log("   - Your IP address is whitelisted in MongoDB Atlas");
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log("\n💡 Connection failed. Please check:");
      console.log("   - Your cluster URL is correct");
      console.log("   - Your internet connection is working");
    }
    
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔐 Connection closed");
  }
}

// Run the setup
setupMongoDB().catch(error => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
