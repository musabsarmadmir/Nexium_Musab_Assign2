import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Spinner } from './ui/spinner'
import { Globe, Search } from 'lucide-react'

interface BlogFormProps {
  onSubmit: (url: string) => Promise<void>
  loading: boolean
}

export default function BlogForm({ onSubmit, loading }: BlogFormProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a blog URL')
      return
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    try {
      await onSubmit(url.trim())
      setUrl('')
    } catch (err) {
      setError('Failed to process the blog. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-3xl">
          <Globe className="w-8 h-8 text-blue-600" />
          Blog Summariser
        </CardTitle>
        <CardDescription>
          Enter a blog URL to get an AI-generated summary in English and Urdu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="blog-url" className="text-sm font-medium">
              Blog URL
            </label>
            <div className="relative">
              <Input
                id="blog-url"
                type="url"
                placeholder="https://example.com/blog-post"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="pr-10"
              />
              <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Search className="mr-2 w-4 h-4" />
                Summarise Blog
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
