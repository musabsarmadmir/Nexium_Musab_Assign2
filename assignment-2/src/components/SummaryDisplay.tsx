import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Copy, FileText, Globe, Languages, Calendar, ExternalLink } from 'lucide-react'

interface Summary {
  id: string
  originalUrl: string
  title: string
  summary: string
  urduSummary: string
  createdAt: string
  wordCount: number
}

interface SummaryDisplayProps {
  summary: Summary | null
  onNewSummary: () => void
}

export default function SummaryDisplay({ summary, onNewSummary }: SummaryDisplayProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!summary) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Summary Yet
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Enter a blog URL above to generate your first summary
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Summary Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {summary.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(summary.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {summary.wordCount} words
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(summary.originalUrl, '_blank')}
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Original
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNewSummary}
              >
                New Summary
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* English Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              English Summary
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(summary.summary)}
              className="flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={summary.summary}
            readOnly
            className="min-h-[200px] resize-none"
            placeholder="English summary will appear here..."
          />
        </CardContent>
      </Card>

      {/* Urdu Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Urdu Translation
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(summary.urduSummary)}
              className="flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={summary.urduSummary}
            readOnly
            className="min-h-[200px] resize-none font-urdu"
            placeholder="اردو خلاصہ یہاں ظاہر ہوگا..."
            dir="rtl"
          />
        </CardContent>
      </Card>
    </div>
  )
}
