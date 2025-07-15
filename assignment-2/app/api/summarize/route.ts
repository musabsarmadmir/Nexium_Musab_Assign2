import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { MongoClient } from "mongodb"
import { translateToUrdu } from "@/lib/translator"
import { extractTextFromUrl, generateSummary } from "@/lib/text-processor"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const mongoClient = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Step 1: Scrape the blog content
    const { text: originalText, title } = await extractTextFromUrl(url)

    if (!originalText) {
      return NextResponse.json({ error: "Could not extract text from URL" }, { status: 400 })
    }

    // Step 2: Generate summary using static logic
    const summary = generateSummary(originalText)

    // Step 3: Translate summary to Urdu using LLM
    const urduSummary = await translateToUrdu(summary)
    // The translation will automatically use the best available model
    // You can also specify a model: await translateToUrdu(summary, { model: 'llama' })

    // Step 4: Save to databases
    const summaryId = `summary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save summary to Supabase
    const { error: supabaseError } = await supabase.from("summaries").insert({
      id: summaryId,
      url,
      title,
      summary,
      urdu_summary: urduSummary,
      word_count: originalText.split(" ").length,
      created_at: new Date().toISOString(),
    })

    if (supabaseError) {
      console.error("Supabase error:", supabaseError)
    }

    // Save full text to MongoDB
    try {
      await mongoClient.connect()
      const db = mongoClient.db("blog_summarizer")
      const collection = db.collection("full_texts")

      await collection.insertOne({
        summaryId,
        url,
        title,
        fullText: originalText,
        createdAt: new Date(),
        wordCount: originalText.split(" ").length,
      })
    } catch (mongoError) {
      console.error("MongoDB error:", mongoError)
    } finally {
      await mongoClient.close()
    }

    return NextResponse.json({
      originalText,
      summary,
      urduSummary,
      url,
      title,
      wordCount: originalText.split(" ").length,
      summaryId,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process the blog" }, { status: 500 })
  }
}
