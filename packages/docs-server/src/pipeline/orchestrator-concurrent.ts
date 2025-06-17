import { program } from 'commander'
import { config } from 'dotenv'
import type { CleanedDocument, SiteConfig } from '../types/index.js'
import { runCleaners } from './cleaners/index.js'
import { crawlProject } from './crawler.js'
import { discoverUrls } from './discoverer.js'
import { embedSingleDocument } from './embedder.js'
import {
  cleanupOldFiles,
  loadSiteConfig,
  loadSiteState,
  saveCleanedDocument,
  saveRawPage,
  saveSiteState,
} from './storage.js'
import { generateContentHash } from './utils.js'

// Load environment variables
config()

/**
 * Process a single URL: crawl, clean, and embed
 */
async function processUrl(
  projectName: string,
  url: string,
  config: SiteConfig,
  apiKey: string,
  options: {
    useSimpleCrawler?: boolean
    skipClean?: boolean
    skipEmbed?: boolean
  },
): Promise<{
  success: boolean
  error?: string
  chunksCreated?: number
}> {
  try {
    // Step 1: Crawl the URL
    const pages = await crawlProject(projectName, {
      urls: [url],
      outputFormat: 'markdown',
      useBrowser: !options.useSimpleCrawler,
    })

    if (pages.length === 0) {
      // Check console output for specific error type
      // For now, return a generic error
      return { success: false, error: 'Failed to crawl URL - possibly 404 or network error' }
    }

    const page = pages[0]

    // Step 2: Save raw page
    await saveRawPage(projectName, page)

    let chunksCreated = 0
    
    if (!options.skipClean) {
      // Step 3: Clean the content
      const { content: cleanedContent, metadata: cleanerMetadata } = await runCleaners(
        page.content,
        config.cleaners,
      )

      // Create cleaned document
      const pathname = new URL(url).pathname === '/' ? '/index.md' : `${new URL(url).pathname}.md`
      const cleanedDoc: CleanedDocument = {
        url,
        path: pathname,
        content: cleanedContent,
        metadata: {
          title: String(cleanerMetadata.title || page.metadata?.title || ''),
          crawledAt: String(page.metadata?.crawledAt || new Date().toISOString()),
          cleanedAt: new Date().toISOString(),
          url,
          ...cleanerMetadata,
        },
      }

      // Step 4: Save cleaned document
      const cleanedPath = await saveCleanedDocument(projectName, cleanedDoc)

      if (!options.skipEmbed) {
        // Step 5: Embed the document
        chunksCreated = await embedSingleDocument(projectName, cleanedPath, apiKey)
      }
    }

    return { success: true, chunksCreated }
  } catch (error) {
    console.error(`Failed to process ${url}:`, error)
    return { success: false, error: String(error) }
  }
}

export async function runConcurrentPipeline(
  projectName: string,
  options: {
    apiKey: string
    force?: boolean
    urls?: string[]
    skipDiscover?: boolean
    skipClean?: boolean
    skipEmbed?: boolean
    maxConcurrency?: number
    useSimpleCrawler?: boolean
  },
) {
  console.log(`Running concurrent pipeline for project: ${projectName}`)

  const stats = {
    discovered: 0,
    processed: 0,
    failed: 0,
    chunks: 0,
  }

  // Load configuration
  const siteConfig: SiteConfig = await loadSiteConfig(projectName)
  const state = await loadSiteState(projectName)

  // Check if we should use simple crawler for this project
  const useSimpleCrawler = options.useSimpleCrawler ?? siteConfig.crawl?.preferSimple ?? false

  if (useSimpleCrawler) {
    console.log('Using HTTP crawler (no browser)')
  } else {
    console.log('Using browser-based crawler')
  }

  // Initialize database (keeping for potential future use)
  // const db = getDocsDatabase(options.apiKey)

  // Step 1: Discover URLs
  let urlsToProcess: string[] = []

  if (!options.skipDiscover && !options.urls) {
    console.log('\n🔍 Starting URL discovery phase...')

    const baseUrl = siteConfig.baseUrl
    const discoveredUrls = await discoverUrls(projectName, baseUrl, {
      maxDepth: siteConfig.crawl.strategy.maxDepth,
      includePatterns: siteConfig.crawl.includePatterns,
      excludePatterns: siteConfig.crawl.excludePatterns,
    })

    // Update state with discovered URLs
    for (const discovered of discoveredUrls) {
      if (!state.urls[discovered.url]) {
        state.urls[discovered.url] = {
          url: discovered.url,
          status: 'pending',
        }
      }
    }

    state.lastDiscovery = new Date().toISOString()
    state.baseUrl = baseUrl
    state.stats.totalDiscovered = Object.keys(state.urls).length
    await saveSiteState(projectName, state)

    stats.discovered = discoveredUrls.length
    console.log(`Discovered ${discoveredUrls.length} URLs`)
  }

  // Determine URLs to process
  if (options.urls) {
    urlsToProcess = options.urls
  } else {
    // Get pending URLs from state
    urlsToProcess = Object.values(state.urls)
      .filter((urlState) => {
        if (options.force) return true
        // Only process pending URLs - don't retry any failures
        return urlState.status === 'pending'
      })
      .map((urlState) => urlState.url)
      .slice(0, siteConfig.crawl.strategy.maxPages) // Respect max pages limit
  }

  if (urlsToProcess.length === 0) {
    console.log('No URLs need processing')
    return stats
  }

  // Step 2: Process URLs concurrently (crawl + clean + embed)
  console.log(`\n🚀 Processing ${urlsToProcess.length} URLs concurrently...`)

  const maxConcurrency = options.maxConcurrency || 5
  const results: Array<{ url: string; result: Awaited<ReturnType<typeof processUrl>> }> = []

  // Process in batches to limit concurrency
  for (let i = 0; i < urlsToProcess.length; i += maxConcurrency) {
    const batch = urlsToProcess.slice(i, i + maxConcurrency)
    console.log(
      `Processing batch ${Math.floor(i / maxConcurrency) + 1}/${Math.ceil(urlsToProcess.length / maxConcurrency)}...`,
    )

    const batchPromises = batch.map((url) =>
      processUrl(projectName, url, siteConfig, options.apiKey, { 
        useSimpleCrawler,
        skipClean: options.skipClean,
        skipEmbed: options.skipEmbed
      }).then(
        (result) => ({ url, result }),
      ),
    )

    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)

    // Update state after each batch
    for (const { url, result } of batchResults) {
      if (result.success) {
        state.urls[url] = {
          ...state.urls[url],
          url,
          status: 'completed',
          crawledAt: new Date().toISOString(),
          embeddedAt: new Date().toISOString(),
          contentHash: generateContentHash(url), // Simplified for now
        }
        stats.processed++
        stats.chunks += result.chunksCreated || 0
      } else {
        // Mark as failed - won't be retried
        state.urls[url] = {
          ...state.urls[url],
          url,
          status: 'failed',
          error: result.error,
          retries: (state.urls[url].retries || 0) + 1,
        }
        stats.failed++
      }
    }

    // Save state after each batch
    state.lastCrawl = new Date().toISOString()
    state.stats.totalCrawled = Object.values(state.urls).filter(
      (u) => u.status === 'completed',
    ).length
    state.stats.totalFailed = Object.values(state.urls).filter((u) => u.status === 'failed').length
    state.stats.totalPages = state.stats.totalCrawled
    state.stats.totalChunks =
      (state.stats.totalChunks || 0) +
      batchResults.reduce((sum, r) => sum + (r.result.chunksCreated || 0), 0)
    state.stats.lastEmbeddingRun = new Date().toISOString()
    await saveSiteState(projectName, state)

    console.log(
      `Batch complete: ${batchResults.filter((r) => r.result.success).length} succeeded, ${batchResults.filter((r) => !r.result.success).length} failed`,
    )
  }

  // Cleanup old files
  const keepUrls = new Set(
    Object.entries(state.urls)
      .filter(([_, urlState]) => urlState.status === 'completed')
      .map(([url]) => url),
  )
  const removed = await cleanupOldFiles(projectName, keepUrls, state)
  if (removed > 0) {
    console.log(`\n🗑️  Cleaned up ${removed} old files`)
  }

  console.log('\n✅ Concurrent pipeline complete!')
  console.log(`   Discovered: ${stats.discovered} URLs`)
  console.log(`   Processed: ${stats.processed} pages`)
  console.log(`   Failed: ${stats.failed} pages`)
  console.log(`   Total chunks: ${stats.chunks}`)

  return stats
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  program
    .name('docs-pipeline-concurrent')
    .description('Concurrent documentation processing pipeline')
    .version('0.0.1')

  program
    .command('run <project>')
    .description('Run concurrent pipeline for a project')
    .option('--api-key <key>', 'OpenAI API key')
    .option('-u, --urls <urls...>', 'Specific URLs to process')
    .option('-f, --force', 'Force re-process even if recently processed')
    .option('-c, --concurrency <number>', 'Max concurrent operations', '5')
    .option('--simple', 'Use simple HTTP crawler (no browser)')
    .action(async (project, options) => {
      const apiKey = options.apiKey || process.env.OPENAI_API_KEY
      if (!apiKey) {
        console.error('OpenAI API key required (--api-key or OPENAI_API_KEY env var)')
        process.exit(1)
      }

      await runConcurrentPipeline(project, {
        apiKey,
        urls: options.urls,
        force: options.force,
        maxConcurrency: Number.parseInt(options.concurrency),
        useSimpleCrawler: options.simple,
      })
    })

  program.parse()
}
