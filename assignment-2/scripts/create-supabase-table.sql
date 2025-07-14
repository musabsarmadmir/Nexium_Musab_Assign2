-- Create summaries table in Supabase
CREATE TABLE IF NOT EXISTS summaries (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  summary TEXT NOT NULL,
  urdu_summary TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_summaries_created_at ON summaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_summaries_url ON summaries(url);
