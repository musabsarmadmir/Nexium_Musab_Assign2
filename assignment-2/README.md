# Blog Summarizer Application

A Next.js application that extracts content from blog URLs, generates summaries, and provides Urdu translations with dual database storage.

## Quick Start

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   Create `.env.local` with your Supabase and MongoDB credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Initialize databases**

   ```bash
   # Set up MongoDB collections
   pnpm run setup-mongodb
   
   # Run the Supabase SQL script from scripts/create-supabase-table.sql
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open application**
   Visit [http://localhost:3000](http://localhost:3000)

## Features

- 🌐 **URL Content Extraction** - Scrape blog content from any URL
- 📝 **AI Summarization** - Generate concise summaries
- 🌍 **LLM-Powered Urdu Translation** - AI translation using Gemini or Llama models
- 💾 **Dual Storage** - Supabase + MongoDB integration
- 🎨 **Modern UI** - Beautiful interface with dark/light mode
- 📱 **Responsive** - Works on all devices
- 🔄 **Fallback System** - Dictionary backup for translation reliability

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase, MongoDB
- **AI/LLM**: Google Gemini, Llama (via Groq), fallback dictionary
- **Tools**: Cheerio (scraping), React Hook Form, Zod validation

## Project Structure

```text
├── app/                 # Next.js App Router
├── components/          # React components
├── hooks/              # Custom hooks
├── lib/                # Utilities & core logic
├── public/             # Static assets
├── scripts/            # Database setup
└── styles/             # Global styles
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm setup-mongodb` - Initialize MongoDB
- `pnpm setup` - Run general setup

## Environment Variables

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MongoDB
MONGODB_URI=mongodb://localhost:27017/blog_summarizer

# LLM Translation APIs (choose one or both)
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key
```

### Getting API Keys

**Google Gemini API Key:**

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select existing
3. Generate an API key
4. Free tier includes generous limits

**Groq API Key (for Llama):**

1. Sign up at [Groq Console](https://console.groq.com/)
2. Create a new API key
3. Fast inference with free tier available

## Database Setup

### Supabase

Run the SQL script from `scripts/create-supabase-table.sql` in your Supabase SQL editor.

### MongoDB

```bash
pnpm run setup-mongodb
```

This creates the necessary collections and indexes.

## Usage

1. Enter a blog URL in the input field
2. Click "Summarize Blog"
3. View the generated summary and Urdu translation
4. Data is automatically saved to both databases

---

For detailed documentation, see the main [README.md](../README.md) in the root directory.
