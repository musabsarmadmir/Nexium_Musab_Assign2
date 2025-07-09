import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface BlogSummary {
  id: string
  original_url: string
  title: string
  summary: string
  urdu_summary: string
  word_count: number
  created_at: string
  updated_at: string
}

export class SupabaseService {
  static async saveSummary(summaryData: {
    originalUrl: string
    title: string
    summary: string
    urduSummary: string
    wordCount: number
  }): Promise<BlogSummary> {
    try {
      const { data, error } = await supabase
        .from('blog_summaries')
        .insert({
          original_url: summaryData.originalUrl,
          title: summaryData.title,
          summary: summaryData.summary,
          urdu_summary: summaryData.urduSummary,
          word_count: summaryData.wordCount,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Failed to save summary: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error saving summary to Supabase:', error)
      throw error
    }
  }

  static async getSummary(id: string): Promise<BlogSummary | null> {
    try {
      const { data, error } = await supabase
        .from('blog_summaries')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No rows found
        }
        throw new Error(`Failed to get summary: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error getting summary from Supabase:', error)
      throw error
    }
  }

  static async getSummariesByUrl(url: string): Promise<BlogSummary[]> {
    try {
      const { data, error } = await supabase
        .from('blog_summaries')
        .select('*')
        .eq('original_url', url)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Failed to get summaries: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error getting summaries by URL from Supabase:', error)
      throw error
    }
  }

  static async getRecentSummaries(limit: number = 10): Promise<BlogSummary[]> {
    try {
      const { data, error } = await supabase
        .from('blog_summaries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw new Error(`Failed to get recent summaries: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error getting recent summaries from Supabase:', error)
      throw error
    }
  }

  static async deleteSummary(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('blog_summaries')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Failed to delete summary: ${error.message}`)
      }
    } catch (error) {
      console.error('Error deleting summary from Supabase:', error)
      throw error
    }
  }

  static async updateSummary(id: string, updates: Partial<{
    title: string
    summary: string
    urduSummary: string
    wordCount: number
  }>): Promise<BlogSummary> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      if (updates.title) updateData.title = updates.title
      if (updates.summary) updateData.summary = updates.summary
      if (updates.urduSummary) updateData.urdu_summary = updates.urduSummary
      if (updates.wordCount) updateData.word_count = updates.wordCount

      const { data, error } = await supabase
        .from('blog_summaries')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update summary: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error updating summary in Supabase:', error)
      throw error
    }
  }
}
