# Blog Summariser Project

## Overview
A modern web application that scrapes blog content from URLs, generates AI-powered summaries, translates them to Urdu, and stores the data using Supabase and MongoDB.

## Features
- **Blog Scraping**: Extract content from any blog URL using Cheerio
- **AI Summary**: Generate intelligent summaries using simulated AI logic
- **Urdu Translation**: Translate summaries to Urdu using a comprehensive dictionary
- **Data Storage**: Save summaries in Supabase and full content in MongoDB
- **Modern UI**: Beautiful interface built with ShadCN UI and Tailwind CSS
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: ShadCN UI with Tailwind CSS
- **Backend**: Next.js API Routes
- **Databases**: 
  - Supabase (for summaries)
  - MongoDB (for full blog content)
- **Scraping**: Cheerio + Axios
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure
```
assignment-2/
├── src/
│   ├── components/
│   │   ├── ui/           # ShadCN UI components
│   │   ├── BlogForm.tsx  # URL input form
│   │   ├── SummaryDisplay.tsx # Summary display
│   │   └── Layout.tsx    # Main layout wrapper
│   ├── services/
│   │   ├── scraper.ts    # Blog content scraping
│   │   ├── summarizer.ts # AI summary generation
│   │   ├── translator.ts # Urdu translation
│   │   ├── supabase.ts   # Supabase integration
│   │   └── mongodb.ts    # MongoDB integration
│   ├── pages/
│   │   ├── api/          # API endpoints
│   │   └── index.tsx     # Main page
│   └── styles/
│       └── globals.css   # Global styles
├── public/               # Static assets
└── Configuration files
```

## Database Schema

### Supabase Table: `blog_summaries`
```sql
CREATE TABLE blog_summaries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  original_url TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  urdu_summary TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### MongoDB Collection: `blog_contents`
```json
{
  "_id": "ObjectId",
  "url": "string",
  "title": "string", 
  "content": "string (full blog text)",
  "wordCount": "number",
  "scrapedAt": "Date",
  "metadata": {
    "domain": "string",
    "author": "string (optional)",
    "publishDate": "string (optional)",
    "tags": ["array of strings (optional)"]
  }
}
```

## API Endpoints

### POST /api/process-blog
Process a blog URL and return summary data.

**Request:**
```json
{
  "url": "https://example.com/blog-post"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "originalUrl": "string",
    "title": "string",
    "summary": "string",
    "urduSummary": "string",
    "wordCount": "number",
    "createdAt": "ISO date string"
  }
}
```

### GET /api/summary/[id]
Get a specific summary by ID.

## Key Components

### BlogForm
- URL input with validation
- Loading states with spinner
- Error handling and display
- Responsive design

### SummaryDisplay  
- English and Urdu summary sections
- Copy to clipboard functionality
- Word count and metadata
- Link to original article

### Services
- **Scraper**: Robust content extraction with fallbacks
- **Summarizer**: Intelligent summary generation with key points
- **Translator**: Comprehensive English-to-Urdu dictionary (500+ words)
- **Database Services**: Type-safe database operations

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in:
   - Supabase URL and API key
   - MongoDB connection string

3. **Database Setup**
   - Create Supabase table using provided schema
   - Set up MongoDB database

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Deployment Checklist
- [ ] Set up Supabase project
- [ ] Configure MongoDB Atlas
- [ ] Set environment variables in Vercel
- [ ] Deploy to Vercel
- [ ] Test all functionality

## Usage Flow
1. User enters blog URL in the form
2. System validates URL and starts processing
3. Blog content is scraped using Cheerio
4. AI summary is generated from content
5. Summary is translated to Urdu
6. Full content is saved to MongoDB
7. Summary is saved to Supabase
8. User sees both English and Urdu summaries
9. User can copy summaries or process new URLs

## Error Handling
- Invalid URLs are caught and displayed
- Network timeouts are handled gracefully
- Database connection issues are managed
- User-friendly error messages throughout

## Performance Features
- Efficient content extraction with multiple fallback selectors
- Responsive design with mobile optimization
- Loading states and progress indicators
- Error boundaries for graceful failure handling
