# Blog Summarizer with Urdu Translation

A modern web application built with Next.js that extracts content from blog URLs, generates summaries, and provides Urdu translations. The application features a beautiful UI with dual database storage (Supabase + MongoDB) for comprehensive data management.

## 🚀 Features

- **URL Content Extraction**: Scrapes and extracts text content from any blog URL
- **AI-Powered Summarization**: Generates concise summaries from blog content
- **Urdu Translation**: Automatically translates summaries to Urdu
- **Dual Database Storage**: 
  - Supabase for structured summary data
  - MongoDB for full text content storage
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Toast notifications and loading states

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons
- **React Hook Form** with Zod validation

### Backend
- **Next.js API Routes**
- **Supabase** (PostgreSQL) for structured data
- **MongoDB** for document storage
- **Cheerio** for web scraping

### UI Components
- Radix UI primitives
- Custom theme provider with dark/light mode
- Toast notifications with Sonner
- Modern form components and layouts

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- pnpm package manager
- Supabase account and project
- MongoDB database (local or cloud)

## 🔧 Environment Setup

Create a `.env.local` file in the `assignment-2` directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/blog_summarizer
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_summarizer

# Optional: Custom API endpoints
SUMMARIZATION_API_URL=your_custom_api_url
TRANSLATION_API_URL=your_translation_api_url
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/musabsarmadmir/Nexium_Musab_Assign2.git
   cd Nexium_Musab_Assign2/assignment-2
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up databases**
   
   **Supabase Setup:**
   ```bash
   # Run the Supabase table creation script
   # Execute the SQL in scripts/create-supabase-table.sql in your Supabase SQL editor
   ```

   **MongoDB Setup:**
   ```bash
   # Run MongoDB setup script
   pnpm run setup-mongodb
   ```

4. **Run the application**
   ```bash
   # Development mode
   pnpm dev

   # Production build
   pnpm build
   pnpm start
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Database Schema

### Supabase (summaries table)
```sql
CREATE TABLE summaries (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  summary TEXT NOT NULL,
  urdu_summary TEXT,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### MongoDB (blog_texts collection)
```javascript
{
  _id: ObjectId,
  summaryId: String,
  url: String,
  title: String,
  fullText: String,
  extractedAt: Date,
  metadata: {
    contentLength: Number,
    extractionMethod: String
  }
}
```

## 🎯 How to Use

1. **Enter Blog URL**: Paste any blog or article URL into the input field
2. **Submit**: Click "Summarize Blog" to start the process
3. **View Results**: The application will display:
   - Original article title and URL
   - Generated summary in English
   - Urdu translation of the summary
   - Word count statistics
4. **Data Storage**: All results are automatically saved to both databases

## 🏗️ Project Structure

```
assignment-2/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── summarize/     # Blog summarization endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── theme-provider.tsx # Theme management
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── text-processor.ts  # Content extraction & summarization
│   ├── translator.ts      # Urdu translation logic
│   └── utils.ts           # General utilities
├── public/                # Static assets
├── scripts/               # Database setup scripts
└── styles/                # Additional stylesheets
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev                   # Start development server
pnpm build                 # Build for production
pnpm start                 # Start production server
pnpm lint                  # Run ESLint

# Database Setup
pnpm setup-mongodb         # Initialize MongoDB collections
pnpm setup                 # Run general setup script
```

## 🌟 Key Features Explained

### Content Extraction
- Uses Cheerio for HTML parsing
- Intelligent content selection with multiple fallback selectors
- Removes ads, navigation, and non-content elements
- Extracts clean article text and titles

### Summarization Algorithm
- Rule-based text summarization
- Sentence scoring based on word frequency
- Configurable summary length
- Preserves important context and meaning

### Urdu Translation
- Built-in English to Urdu translation
- Handles technical terms and proper nouns
- Contextual translation for better accuracy

### Database Integration
- **Supabase**: Fast queries for summary metadata
- **MongoDB**: Flexible storage for full article content
- Automatic data synchronization between databases

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Automatic theme switching
- **Responsive Layout**: Mobile-first design approach
- **Loading States**: Visual feedback during processing
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time status updates

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of an internship assignment and is for educational purposes.

## 👨‍💻 Author

**Musab Sarmad Mir**
- GitHub: [@musabsarmadmir](https://github.com/musabsarmadmir)
- Repository: [Nexium_Musab_Assign2](https://github.com/musabsarmadmir/Nexium_Musab_Assign2)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the backend infrastructure
- [MongoDB](https://www.mongodb.com/) for flexible document storage
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI development

---

**Note**: This is Assignment 2 for the Nexium internship program, demonstrating full-stack development skills with modern web technologies.
