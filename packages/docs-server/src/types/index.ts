export interface SiteConfig {
  name: string
  displayName: string
  baseUrl: string
  crawl: {
    strategy: {
      type: 'bfs' | 'dfs' | 'best-first'
      maxDepth: number
      maxPages: number
      includeExternal: boolean
      scorer?: {
        type: string
        keywords?: string[]
        weight?: number
      }
    }
    includePatterns?: string[]
    excludePatterns?: string[]
    contentTypes?: string[]
    stream: boolean
    delay: number
    timeout: number
    jsEnabled: boolean
    waitForSelector?: string
    respectRobots: boolean
    headers?: Record<string, string>
  }
  extraction: {
    selector: string
    excludeSelectors: string[]
  }
  cleaners: string[]
  chunking: {
    strategy: 'semantic' | 'fixed' | 'sliding'
    maxSize: number
    overlap: number
    minSize: number
  }
  embedding: {
    model: string
    dimensions: number
  }
}

export interface CrawledPage {
  url: string
  content: string
  title: string
  depth: number
  score: number
  metadata: Record<string, unknown>
}

export interface SiteState {
  lastCrawl: string | null
  crawledUrls: Record<string, string>
  stats: {
    totalPages: number
    totalChunks: number
    lastEmbeddingRun: string | null
  }
}

export interface CleanedDocument {
  url: string
  path: string
  content: string
  metadata: {
    title: string
    crawledAt: string
    cleanedAt: string
    [key: string]: unknown
  }
}

export interface DocumentChunk {
  id: string
  content: string
  metadata: {
    url: string
    title: string
    path: string
    chunkIndex: number
    totalChunks: number
    [key: string]: unknown
  }
}
