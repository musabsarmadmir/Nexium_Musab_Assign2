import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({ 
  children, 
  title = 'Blog Summariser', 
  description = 'AI-powered blog summarisation with Urdu translation' 
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <main className="space-y-8">
            {children}
          </main>
        </div>
        
        <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>© 2025 Blog Summariser. Built with Next.js, ShadCN UI, Supabase & MongoDB.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
