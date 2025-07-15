"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Globe, FileText, Languages, Database, Zap, Sparkles, Rocket, Brain, Heart, Star, TrendingUp, Copy } from "lucide-react"
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard! 🎉`)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 pt-8">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white animate-bounce hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="text-sm font-medium">AI-Powered Blog Intelligence</span>
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold text-white drop-shadow-lg animate-fade-in-up">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
              Blog Summarizer
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-1000">
            ⚡ Extract • 🧠 Summarize • 🌍 Translate
            <br />
            <span className="text-lg">Transform any blog into instant insights with AI magic!</span>
          </p>
          
          <div className="flex justify-center gap-4">
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-none px-4 py-2 animate-pulse">
              <Rocket className="h-4 w-4 mr-1 animate-bounce" />
              Lightning Fast
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-none px-4 py-2 animate-pulse animation-delay-1000">
              <Brain className="h-4 w-4 mr-1 animate-bounce animation-delay-1000" />
              AI Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-none px-4 py-2 animate-pulse animation-delay-2000">
              <Heart className="h-4 w-4 mr-1 animate-bounce animation-delay-2000" />
              Free to Use
            </Badge>
          </div>
        </div>

        {/* Input Form */}
        <Card className="shadow-2xl border-none bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-white/20 rounded-full">
                <Globe className="h-6 w-6" />
              </div>
              Enter Blog URL
              <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-white/90 text-base">
              🚀 Paste any blog URL and watch the magic happen!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="url" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Blog URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/amazing-blog-post"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="h-14 text-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl transition-all duration-200"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    <span className="animate-pulse">Processing Magic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-5 w-5" />
                    Summarize Blog
                    <Rocket className="ml-3 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in-50 duration-1000">
            {/* Summary Stats */}
            <Card className="shadow-2xl border-none bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-lg p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Summary Analytics
                    </span>
                    <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{result.wordCount.toLocaleString()}</div>
                      <div className="text-sm text-blue-800 font-medium">Original Words</div>
                      <div className="text-xs text-blue-600 mt-1">📝 Full Content</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-4xl font-bold text-green-600 mb-2">{result.summary.split(" ").length.toLocaleString()}</div>
                      <div className="text-sm text-green-800 font-medium">Summary Words</div>
                      <div className="text-xs text-green-600 mt-1">✨ AI Condensed</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {Math.round((result.summary.split(" ").length / result.wordCount) * 100)}%
                      </div>
                      <div className="text-sm text-purple-800 font-medium">Compression</div>
                      <div className="text-xs text-purple-600 mt-1">🎯 Efficiency</div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 text-sm">
                        <FileText className="h-4 w-4 mr-2" />
                        {result.title}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono bg-gray-50 border-gray-300">
                        🆔 {result.summaryId}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* English Summary */}
            <Card className="shadow-2xl border-none bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <FileText className="h-6 w-6" />
                    </div>
                    English Summary
                    <Badge className="bg-white/20 text-white border-white/30">
                      AI Generated
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.summary, "English Summary")}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <Textarea 
                    value={result.summary} 
                    readOnly 
                    className="min-h-[200px] resize-none text-lg leading-relaxed border-2 border-emerald-200 focus:border-emerald-500 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-emerald-500 text-white">
                      {result.summary.split(" ").length} words
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Urdu Translation */}
            <Card className="shadow-2xl border-none bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Languages className="h-6 w-6" />
                    </div>
                    Urdu Translation
                    <Badge className="bg-white/20 text-white border-white/30">
                      LLM Powered
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.urduSummary, "Urdu Translation")}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <Textarea
                    value={result.urduSummary}
                    readOnly
                    className="min-h-[200px] resize-none text-lg leading-relaxed font-urdu text-right border-2 border-rose-200 focus:border-rose-500 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50"
                    dir="rtl"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-rose-500 text-white">
                      اردو ترجمہ
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="shadow-2xl border-none bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-1 transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-lg p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Storage Intelligence
                    </span>
                    <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500 rounded-full">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Supabase</h3>
                        <Badge className="bg-green-500 text-white">PostgreSQL</Badge>
                      </div>
                      <p className="text-green-700 mb-3">📊 Summary and metadata stored</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
                          Fast Queries
                        </Badge>
                        <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
                          Structured Data
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500 rounded-full">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-800">MongoDB</h3>
                        <Badge className="bg-blue-500 text-white">NoSQL</Badge>
                      </div>
                      <p className="text-blue-700 mb-3">🗄️ Full text content archived</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-blue-100 border-blue-300 text-blue-800">
                          Flexible Schema
                        </Badge>
                        <Badge variant="outline" className="bg-blue-100 border-blue-300 text-blue-800">
                          Document Store
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 text-purple-800">
                      <Sparkles className="h-5 w-5" />
                      <span className="font-semibold">Dual Storage Architecture</span>
                    </div>
                    <p className="text-purple-700 mt-2 text-sm">
                      Your data is intelligently distributed across two powerful databases for optimal performance and reliability! 🚀
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
