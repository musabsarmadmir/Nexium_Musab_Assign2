import { MongoClient, Db, Collection } from 'mongodb'

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DATABASE_NAME = process.env.MONGODB_DATABASE || 'blog_summariser'

let client: MongoClient | null = null
let db: Db | null = null

export interface BlogContent {
  _id?: string
  url: string
  title: string
  content: string
  wordCount: number
  scrapedAt: Date
  metadata?: {
    domain?: string
    author?: string
    publishDate?: string
    tags?: string[]
  }
}

class MongoDBService {
  private async connect(): Promise<Db> {
    if (db) {
      return db
    }

    try {
      client = new MongoClient(MONGODB_URI)
      await client.connect()
      db = client.db(DATABASE_NAME)
      console.log('Connected to MongoDB')
      return db
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
      throw new Error('Database connection failed')
    }
  }

  private async getCollection(name: string): Promise<Collection> {
    const database = await this.connect()
    return database.collection(name)
  }

  async saveFullBlogContent(blogData: {
    url: string
    title: string
    content: string
    wordCount: number
    metadata?: {
      domain?: string
      author?: string
      publishDate?: string
      tags?: string[]
    }
  }): Promise<string> {
    try {
      const collection = await this.getCollection('blog_contents')
      
      // Check if content already exists for this URL
      const existing = await collection.findOne({ url: blogData.url })
      if (existing) {
        // Update existing content
        await collection.updateOne(
          { url: blogData.url },
          {
            $set: {
              title: blogData.title,
              content: blogData.content,
              wordCount: blogData.wordCount,
              scrapedAt: new Date(),
              metadata: blogData.metadata || {}
            }
          }
        )
        return existing._id.toString()
      }

      // Insert new content
      const result = await collection.insertOne({
        url: blogData.url,
        title: blogData.title,
        content: blogData.content,
        wordCount: blogData.wordCount,
        scrapedAt: new Date(),
        metadata: blogData.metadata || {}
      })

      return result.insertedId.toString()
    } catch (error) {
      console.error('Error saving blog content to MongoDB:', error)
      throw new Error('Failed to save blog content')
    }
  }

  async getBlogContent(url: string): Promise<BlogContent | null> {
    try {
      const collection = await this.getCollection('blog_contents')
      const result = await collection.findOne({ url })
      
      if (result) {
        return {
          _id: result._id.toString(),
          url: result.url,
          title: result.title,
          content: result.content,
          wordCount: result.wordCount,
          scrapedAt: result.scrapedAt,
          metadata: result.metadata
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting blog content from MongoDB:', error)
      throw new Error('Failed to get blog content')
    }
  }

  async getBlogContentById(id: string): Promise<BlogContent | null> {
    try {
      const collection = await this.getCollection('blog_contents')
      const { ObjectId } = require('mongodb')
      const result = await collection.findOne({ _id: new ObjectId(id) })
      
      if (result) {
        return {
          _id: result._id.toString(),
          url: result.url,
          title: result.title,
          content: result.content,
          wordCount: result.wordCount,
          scrapedAt: result.scrapedAt,
          metadata: result.metadata
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting blog content by ID from MongoDB:', error)
      throw new Error('Failed to get blog content')
    }
  }

  async searchBlogContent(query: string, limit: number = 10): Promise<BlogContent[]> {
    try {
      const collection = await this.getCollection('blog_contents')
      
      // Create text index if it doesn't exist
      try {
        await collection.createIndex({
          title: 'text',
          content: 'text',
          'metadata.author': 'text',
          'metadata.tags': 'text'
        })
      } catch (indexError) {
        // Index might already exist, ignore error
      }

      const results = await collection
        .find({
          $text: { $search: query }
        })
        .limit(limit)
        .sort({ scrapedAt: -1 })
        .toArray()

      return results.map(result => ({
        _id: result._id.toString(),
        url: result.url,
        title: result.title,
        content: result.content,
        wordCount: result.wordCount,
        scrapedAt: result.scrapedAt,
        metadata: result.metadata
      }))
    } catch (error) {
      console.error('Error searching blog content in MongoDB:', error)
      throw new Error('Failed to search blog content')
    }
  }

  async getRecentBlogContent(limit: number = 10): Promise<BlogContent[]> {
    try {
      const collection = await this.getCollection('blog_contents')
      const results = await collection
        .find({})
        .sort({ scrapedAt: -1 })
        .limit(limit)
        .toArray()

      return results.map(result => ({
        _id: result._id.toString(),
        url: result.url,
        title: result.title,
        content: result.content,
        wordCount: result.wordCount,
        scrapedAt: result.scrapedAt,
        metadata: result.metadata
      }))
    } catch (error) {
      console.error('Error getting recent blog content from MongoDB:', error)
      throw new Error('Failed to get recent blog content')
    }
  }

  async deleteBlogContent(url: string): Promise<void> {
    try {
      const collection = await this.getCollection('blog_contents')
      await collection.deleteOne({ url })
    } catch (error) {
      console.error('Error deleting blog content from MongoDB:', error)
      throw new Error('Failed to delete blog content')
    }
  }

  async close(): Promise<void> {
    if (client) {
      await client.close()
      client = null
      db = null
      console.log('Disconnected from MongoDB')
    }
  }

  async getStats(): Promise<{
    totalBlogs: number
    totalWordCount: number
    averageWordCount: number
    domains: { [domain: string]: number }
  }> {
    try {
      const collection = await this.getCollection('blog_contents')
      
      const totalBlogs = await collection.countDocuments()
      
      const aggregation = await collection.aggregate([
        {
          $group: {
            _id: null,
            totalWordCount: { $sum: '$wordCount' },
            avgWordCount: { $avg: '$wordCount' }
          }
        }
      ]).toArray()

      const domainAggregation = await collection.aggregate([
        {
          $group: {
            _id: '$metadata.domain',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray()

      const domains: { [domain: string]: number } = {}
      domainAggregation.forEach(item => {
        if (item._id) {
          domains[item._id] = item.count
        }
      })

      return {
        totalBlogs,
        totalWordCount: aggregation[0]?.totalWordCount || 0,
        averageWordCount: Math.round(aggregation[0]?.avgWordCount || 0),
        domains
      }
    } catch (error) {
      console.error('Error getting MongoDB stats:', error)
      throw new Error('Failed to get database statistics')
    }
  }
}

// Create singleton instance
export const mongoService = new MongoDBService()

// Export the service for use in API routes
export default mongoService
