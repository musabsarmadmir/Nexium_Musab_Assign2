export interface SummaryResult {
  summary: string
  keyPoints: string[]
  wordCount: number
}

export class BlogSummarizer {
  static async generateSummary(content: string, title: string): Promise<SummaryResult> {
    // Simulate AI processing with static logic
    // In a real implementation, this would call an AI service like OpenAI
    
    const sentences = this.extractSentences(content)
    const keyPoints = this.extractKeyPoints(content)
    const summary = this.createSummary(sentences, title, keyPoints)
    
    return {
      summary,
      keyPoints,
      wordCount: summary.split(/\s+/).length
    }
  }

  private static extractSentences(content: string): string[] {
    // Split content into sentences
    const sentences = content
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200)
    
    return sentences.slice(0, 10) // Take first 10 meaningful sentences
  }

  private static extractKeyPoints(content: string): string[] {
    // Simple keyword extraction based on frequency and common patterns
    const words = content.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
    
    // Count word frequency
    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-z]/g, '')
      if (cleanWord.length > 4) {
        wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1
      }
    })
    
    // Get most frequent words as key topics
    const keyWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word)
    
    return keyWords.map(word => `Key topic: ${word}`)
  }

  private static createSummary(sentences: string[], title: string, keyPoints: string[]): string {
    // Select most relevant sentences for summary
    const selectedSentences = sentences.slice(0, 3)
    
    let summary = `This blog post titled "${title}" discusses several important points. `
    
    if (selectedSentences.length > 0) {
      summary += selectedSentences.join('. ') + '. '
    }
    
    summary += `The main topics covered include: ${keyPoints.join(', ').toLowerCase()}. `
    
    summary += `This article provides valuable insights and is worth reading for anyone interested in the subject matter.`
    
    return summary
  }
}
