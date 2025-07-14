import * as cheerio from "cheerio"

export async function extractTextFromUrl(url: string): Promise<{ text: string; title: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style elements
    $("script, style, nav, header, footer, aside, .advertisement, .ads").remove()

    // Extract title
    const title = $("title").text().trim() || $("h1").first().text().trim() || "Untitled"

    // Extract main content - try multiple selectors
    let text = ""
    const contentSelectors = [
      "article",
      ".post-content",
      ".entry-content",
      ".content",
      "main",
      ".post-body",
      ".article-body",
    ]

    for (const selector of contentSelectors) {
      const content = $(selector).text().trim()
      if (content && content.length > text.length) {
        text = content
      }
    }

    // Fallback to body if no specific content found
    if (!text) {
      text = $("body").text().trim()
    }

    // Clean up the text
    text = text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim()

    return { text, title }
  } catch (error) {
    console.error("Error extracting text:", error)
    throw new Error("Failed to extract text from URL")
  }
}

export function generateSummary(text: string): string {
  // Simple static summarization logic
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 20)

  if (sentences.length <= 3) {
    return text
  }

  // Score sentences based on:
  // 1. Length (not too short, not too long)
  // 2. Position (first and last sentences often important)
  // 3. Common important words
  const importantWords = [
    "important",
    "significant",
    "key",
    "main",
    "primary",
    "essential",
    "conclusion",
    "result",
    "finding",
    "discovery",
    "research",
    "study",
    "analysis",
    "data",
    "evidence",
    "shows",
    "indicates",
    "suggests",
    "therefore",
    "however",
    "moreover",
    "furthermore",
    "additionally",
  ]

  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0
    const words = sentence.toLowerCase().split(/\s+/)

    // Length score (prefer medium-length sentences)
    if (words.length >= 10 && words.length <= 30) {
      score += 2
    }

    // Position score
    if (index === 0 || index === sentences.length - 1) {
      score += 1
    }

    // Important words score
    const importantWordCount = words.filter((word) =>
      importantWords.some((important) => word.includes(important)),
    ).length
    score += importantWordCount * 2

    // Avoid sentences with too many numbers or special characters
    const specialCharCount = (sentence.match(/[0-9@#$%^&*()]/g) || []).length
    if (specialCharCount > 5) {
      score -= 1
    }

    return { sentence: sentence.trim(), score, index }
  })

  // Sort by score and take top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, Math.ceil(sentences.length * 0.3)))
    .sort((a, b) => a.index - b.index) // Restore original order

  const summary = topSentences.map((item) => item.sentence).join(". ")

  return summary + (summary.endsWith(".") ? "" : ".")
}
