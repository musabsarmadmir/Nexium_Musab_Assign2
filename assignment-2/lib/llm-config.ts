/**
 * Configuration for LLM translation services
 */

export interface LLMConfig {
  defaultModel: 'gemini' | 'llama'
  temperature: number
  maxTokens: number
  retryAttempts: number
  enableFallback: boolean
}

export const defaultLLMConfig: LLMConfig = {
  defaultModel: 'gemini', // Default to Gemini (free tier available)
  temperature: 0.3, // Lower temperature for more consistent translation
  maxTokens: 1000, // Sufficient for most blog summaries
  retryAttempts: 2, // Retry failed requests
  enableFallback: true, // Enable dictionary fallback on failure
}

/**
 * Get LLM configuration from environment variables or use defaults
 */
export function getLLMConfig(): LLMConfig {
  return {
    defaultModel: (process.env.DEFAULT_TRANSLATION_MODEL as 'gemini' | 'llama') || defaultLLMConfig.defaultModel,
    temperature: parseFloat(process.env.TRANSLATION_TEMPERATURE || '0.3'),
    maxTokens: parseInt(process.env.TRANSLATION_MAX_TOKENS || '1000'),
    retryAttempts: parseInt(process.env.TRANSLATION_RETRY_ATTEMPTS || '2'),
    enableFallback: process.env.TRANSLATION_ENABLE_FALLBACK !== 'false',
  }
}

/**
 * Check which LLM APIs are available based on environment variables
 */
export function getAvailableModels(): ('gemini' | 'llama')[] {
  const models: ('gemini' | 'llama')[] = []
  
  if (process.env.GEMINI_API_KEY) {
    models.push('gemini')
  }
  
  if (process.env.GROQ_API_KEY) {
    models.push('llama')
  }
  
  return models
}

/**
 * Get the best available model for translation
 */
export function getBestAvailableModel(): 'gemini' | 'llama' | null {
  const available = getAvailableModels()
  const config = getLLMConfig()
  
  // Prefer the configured default model if available
  if (available.includes(config.defaultModel)) {
    return config.defaultModel
  }
  
  // Otherwise return the first available model
  return available[0] || null
}
