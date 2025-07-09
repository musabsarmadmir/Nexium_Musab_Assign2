import type { NextApiRequest, NextApiResponse } from 'next'
import { BlogScraper } from '@/services/scraper'
import { BlogSummarizer } from '@/services/summarizer'
import { UrduTranslator } from '@/services/translator'
import { SupabaseService } from '@/services/supabase'
import mongoService from '@/services/mongodb'

export interface ProcessBlogResponse {
  success: boolean
  data?: {
    id: string
    originalUrl: string
    title: string
    summary: string
    urduSummary: string
    wordCount: number
    createdAt: string
  }
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcessBlogResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { url } = req.body

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid URL is required'
      })
    }

    // Step 1: Scrape the blog content
    console.log('Scraping blog content from:', url)
    const scrapedContent = await BlogScraper.scrapeUrl(url)

    // Step 2: Generate AI summary (simulated)
    console.log('Generating summary for:', scrapedContent.title)
    const summaryResult = await BlogSummarizer.generateSummary(
      scrapedContent.content,
      scrapedContent.title
    )

    // Step 3: Translate to Urdu
    console.log('Translating summary to Urdu')
    const urduSummary = await UrduTranslator.translateSummary(summaryResult.summary)

    // Step 4: Save full content to MongoDB
    console.log('Saving full content to MongoDB')
    try {
      await mongoService.saveFullBlogContent({
        url: scrapedContent.url,
        title: scrapedContent.title,
        content: scrapedContent.content,
        wordCount: scrapedContent.wordCount,
        metadata: {
          domain: new URL(url).hostname
        }
      })
    } catch (mongoError) {
      console.warn('MongoDB save failed, continuing with Supabase save:', mongoError)
    }

    // Step 5: Save summary to Supabase
    console.log('Saving summary to Supabase')
    const savedSummary = await SupabaseService.saveSummary({
      originalUrl: scrapedContent.url,
      title: scrapedContent.title,
      summary: summaryResult.summary,
      urduSummary: urduSummary,
      wordCount: summaryResult.wordCount
    })

    res.status(200).json({
      success: true,
      data: {
        id: savedSummary.id,
        originalUrl: savedSummary.original_url,
        title: savedSummary.title,
        summary: savedSummary.summary,
        urduSummary: savedSummary.urdu_summary,
        wordCount: savedSummary.word_count,
        createdAt: savedSummary.created_at
      }
    })

  } catch (error) {
    console.error('Error processing blog:', error)
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process blog'
    })
  }
}
