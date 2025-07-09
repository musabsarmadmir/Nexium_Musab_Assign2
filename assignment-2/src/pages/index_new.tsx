import React, { useState } from 'react'
import Layout from '@/components/Layout'
import BlogForm from '@/components/BlogForm'
import SummaryDisplay from '@/components/SummaryDisplay'
import axios from 'axios'

interface Summary {
  id: string
  originalUrl: string
  title: string
  summary: string
  urduSummary: string
  createdAt: string
  wordCount: number
}

export default function Home() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBlogSubmit = async (url: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('/api/process-blog', { url })
      
      if (response.data.success) {
        setSummary(response.data.data)
      } else {
        setError(response.data.error || 'Failed to process blog')
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleNewSummary = () => {
    setSummary(null)
    setError(null)
  }

  return (
    <Layout title="Blog Summariser - AI-Powered Blog Summarisation">
      <div className="space-y-8">
        {/* Show error message if any */}
        {error && (
          <div className="w-full max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Processing Blog
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Form */}
        <BlogForm onSubmit={handleBlogSubmit} loading={loading} />
        
        {/* Summary Display */}
        <SummaryDisplay summary={summary} onNewSummary={handleNewSummary} />
      </div>
    </Layout>
  )
}
