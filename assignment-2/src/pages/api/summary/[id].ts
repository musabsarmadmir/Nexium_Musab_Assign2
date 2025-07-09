import type { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseService, BlogSummary } from '@/services/supabase'

export interface GetSummaryResponse {
  success: boolean
  data?: BlogSummary
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSummaryResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid summary ID is required'
      })
    }

    const summary = await SupabaseService.getSummary(id)

    if (!summary) {
      return res.status(404).json({
        success: false,
        error: 'Summary not found'
      })
    }

    res.status(200).json({
      success: true,
      data: summary
    })

  } catch (error) {
    console.error('Error getting summary:', error)
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get summary'
    })
  }
}
