import * as cheerio from 'cheerio'
import axios from 'axios'

export interface ScrapedContent {
  title: string
  content: string
  url: string
  wordCount: number
}

export class BlogScraper {
  static async scrapeUrl(url: string): Promise<ScrapedContent> {
    try {
      // Add timeout and proper headers
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })

      const $ = cheerio.load(response.data)
      
      // Extract title
      let title = $('title').text().trim()
      if (!title) {
        title = $('h1').first().text().trim() || 'Untitled Blog Post'
      }

      // Remove script, style, nav, header, footer elements
      $('script, style, nav, header, footer, .advertisement, .ad, .sidebar').remove()
      
      // Try to find main content area
      let content = ''
      
      // Common selectors for blog content
      const contentSelectors = [
        'article',
        '.post-content',
        '.entry-content', 
        '.content',
        'main',
        '.post-body',
        '.article-content',
        '[role="main"]'
      ]
      
      for (const selector of contentSelectors) {
        const element = $(selector)
        if (element.length && element.text().trim().length > 200) {
          content = element.text().trim()
          break
        }
      }
      
      // Fallback: get all paragraph text
      if (!content || content.length < 100) {
        content = $('p').map((_, el) => $(el).text().trim()).get().join(' ')
      }
      
      // Clean up the content
      content = content
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .trim()
      
      if (!content || content.length < 50) {
        throw new Error('Could not extract meaningful content from the blog post')
      }

      const wordCount = content.split(/\s+/).length

      return {
        title,
        content,
        url,
        wordCount
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - the blog may be slow to respond')
        }
        if (error.response?.status === 404) {
          throw new Error('Blog post not found (404)')
        }
        if (error.response?.status && error.response.status >= 400) {
          throw new Error(`Blog is not accessible (${error.response.status})`)
        }
      }
      
      throw new Error(error instanceof Error ? error.message : 'Failed to scrape blog content')
    }
  }
}
