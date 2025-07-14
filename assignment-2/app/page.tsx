"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Globe, FileText, Languages, Database } from "lucide-react"
import { toast } from "sonner"

interface SummaryResult {
  originalText: string
  summary: string
  urduSummary: string
  url: string
  title: string
  wordCount: number
  summaryId: string
}

export default function BlogSummarizer() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SummaryResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error("Please enter a valid URL")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to process the blog")
      }

      const data = await response.json()
      setResult(data)
      toast.success("Blog summarized successfully!")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to summarize the blog. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog Summarizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract, summarize, and translate blog content with AI-powered insights
          </p>
        </div>

        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Enter Blog URL
            </CardTitle>
            <CardDescription>Paste the URL of the blog post you want to summarize and translate</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Blog URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/blog-post"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Summarize Blog"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Summary Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.wordCount}</div>
                    <div className="text-sm text-gray-600">Original Words</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{result.summary.split(" ").length}</div>
                    <div className="text-sm text-gray-600">Summary Words</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((result.summary.split(" ").length / result.wordCount) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Compression Ratio</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Title: {result.title}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      ID: {result.summaryId}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* English Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  English Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={result.summary} readOnly className="min-h-[150px] resize-none" />
              </CardContent>
            </Card>

            {/* Urdu Translation */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Urdu Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={result.urduSummary}
                  readOnly
                  className="min-h-[150px] resize-none font-urdu text-right"
                  dir="rtl"
                />
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Storage Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Supabase</h3>
                    <p className="text-sm text-green-600">Summary and metadata stored</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800">MongoDB</h3>
                    <p className="text-sm text-blue-600">Full text content archived</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
