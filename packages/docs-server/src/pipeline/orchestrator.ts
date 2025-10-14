import { program } from 'commander'
import { config } from 'dotenv'
import type { CleanedDocument, SiteConfig } from '../types/index.js'
import { runCleaners } from './cleaners/index.js'
import { crawlProject } from './crawler.js'
import { discoverUrls } from './discoverer.js'
import { embedProject } from './embedder.js'
import {
  cleanupOldFiles,
  listRawPages,
  loadSiteConfig,
  loadSiteState,
  readRawPage,
  saveCleanedDocument,
  saveRawPage,
  saveSiteState,
} from './storage.js'
import { generateContentHash } from './utils.js'

// Load environment variables
config()

export async function runPipeline(
  projectName: string,
  options: {
    apiKey: string
    force?: boolean
    urls?: string[]
    skipDiscover?: boolean
    skipCrawl?: boolean
    skipClean?: boolean
    skipEmbed?: boolean
    useBrowser?: boolean
  },
) {
  console.log(`Running pipeline for project: ${projectName}`)

  const stats = {
    crawled: 0,
    cleaned: 0,
    embedded: 0,
    chunks: 0,
  }

  // Load configuration
  const config: SiteConfig = await loadSiteConfig(projectName)
  const state = await loadSiteState(projectName)

  // Step 1: Discover URLs
  if (!options.skipDiscover && !options.urls) {
    console.log('\n🔍 Starting URL discovery phase...')

    const baseUrl = config.baseUrl
    const discoveredUrls = await discoverUrls(projectName, baseUrl, {
      maxDepth: config.crawl.strategy.maxDepth,
      includePatterns: config.crawl.includePatterns,
      excludePatterns: config.crawl.excludePatterns,
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

    console.log(`Discovered ${discoveredUrls.length} URLs`)
  }

  // Step 2: Crawl
  if (!options.skipCrawl) {
    console.log('\n📥 Starting crawl phase...')

    // Determine URLs to crawl
    let urlsToCrawl: string[] = []

    if (options.urls) {
      // Use provided URLs
      urlsToCrawl = options.urls
    } else {
      // Get pending URLs from state
      urlsToCrawl = Object.values(state.urls)
        .filter((urlState) => {
          if (options.force) return true
          // Only process pending URLs - don't retry any failures
          return urlState.status === 'pending'
        })
        .map((urlState) => urlState.url)
        .slice(0, config.crawl.strategy.maxPages) // Respect max pages limit
    }

    if (urlsToCrawl.length === 0) {
      console.log('No URLs need crawling')
    } else {
      // Determine crawler mode: explicit option > config preference > default (browser)
      const useBrowser = options.useBrowser ?? (config.crawl.preferSimple === undefined ? true : !config.crawl.preferSimple)

      const pages = await crawlProject(projectName, {
        urls: urlsToCrawl,
        outputFormat: 'markdown',
        useBrowser,
      })

      // Save raw pages and update state
      for (const page of pages) {
        await saveRawPage(projectName, page)

        // Update URL state - preserve existing fields
        state.urls[page.url] = {
          ...state.urls[page.url],
          url: page.url,
          status: 'completed',
          crawledAt: new Date().toISOString(),
        }

        stats.crawled++
      }

      // Mark failed URLs
      const crawledUrls = new Set(pages.map((p) => p.url))
      for (const url of urlsToCrawl) {
        if (!crawledUrls.has(url) && state.urls[url]) {
          state.urls[url].status = 'failed'
          state.urls[url].error = 'Failed to crawl'
          state.urls[url].retries = (state.urls[url].retries || 0) + 1
        }
      }

      state.lastCrawl = new Date().toISOString()
      state.stats.totalCrawled = Object.values(state.urls).filter(
        (u) => u.status === 'completed',
      ).length
      state.stats.totalFailed = Object.values(state.urls).filter(
        (u) => u.status === 'failed',
      ).length
      state.stats.totalPages = state.stats.totalCrawled
      await saveSiteState(projectName, state)

      console.log(`Crawled ${stats.crawled} pages`)
    }
  }

  // Step 2: Clean
  if (!options.skipClean) {
    console.log('\n🧹 Starting cleaning phase...')

    const rawFiles = await listRawPages(projectName)
    for (const filePath of rawFiles) {
      try {
        const { content, metadata } = await readRawPage(filePath)

        // Run cleaners
        const { content: cleanedContent, metadata: cleanerMetadata } = await runCleaners(
          content,
          config.cleaners,
        )

        // Create cleaned document
        const url = (metadata as any).url || ''
        const pathname = new URL(url).pathname === '/' ? '/index.md' : `${new URL(url).pathname}.md`

        const cleanedDoc: CleanedDocument = {
          url,
          path: pathname,
          content: cleanedContent,
          metadata: {
            title:
              cleanerMetadata.title ||
              (metadata as any).metadata?.title ||
              (metadata as any).title ||
              '',
            crawledAt: (metadata as any).crawledAt || '',
            cleanedAt: new Date().toISOString(),
            url,
            ...cleanerMetadata,
          },
        }

        await saveCleanedDocument(projectName, cleanedDoc)

        // Update content hash in state
        const contentHash = generateContentHash(cleanedContent)
        if (state.urls[url]) {
          state.urls[url].contentHash = contentHash
        }

        stats.cleaned++
      } catch (error) {
        console.error(`Failed to clean ${filePath}:`, error)
      }
    }

    // Save state with updated content hashes
    await saveSiteState(projectName, state)
    console.log(`Cleaned ${stats.cleaned} documents`)
  }

  // Step 3: Embed
  if (!options.skipEmbed) {
    console.log('\n🔤 Starting embedding phase...')

    const embedResult = await embedProject(projectName, options.apiKey, { force: options.force })
    stats.embedded = embedResult.embedded
    stats.chunks = embedResult.chunks
  }

  // Cleanup old files if doing full pipeline
  if (!options.skipCrawl && !options.skipClean) {
    const keepUrls = new Set(
      Object.entries(state.urls)
        .filter(([_, urlState]) => urlState.status === 'completed')
        .map(([url]) => url),
    )
    const removed = await cleanupOldFiles(projectName, keepUrls, state)
    if (removed > 0) {
      console.log(`\n🗑️  Cleaned up ${removed} old files`)
    }
  }

  console.log('\n✅ Pipeline complete!')
  console.log(`   Crawled: ${stats.crawled} pages`)
  console.log(`   Cleaned: ${stats.cleaned} documents`)
  console.log(`   Embedded: ${stats.embedded} documents (${stats.chunks} chunks)`)

  return stats
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  program.name('docs-pipeline').description('Documentation processing pipeline').version('0.0.1')

  program
    .command('crawl <project>')
    .description('Crawl documentation for a project')
    .option('-u, --urls <urls...>', 'Specific URLs to crawl')
    .option('-f, --force', 'Force re-crawl even if recently crawled')
    .action(async (project, options) => {
      await runPipeline(project, {
        apiKey: process.env.OPENAI_API_KEY || '',
        urls: options.urls,
        force: options.force,
        skipClean: true,
        skipEmbed: true,
      })
    })

  program
    .command('clean <project>')
    .description('Clean raw documents for a project')
    .action(async (project) => {
      await runPipeline(project, {
        apiKey: process.env.OPENAI_API_KEY || '',
        skipCrawl: true,
        skipEmbed: true,
      })
    })

  program
    .command('embed <project>')
    .description('Generate embeddings for a project')
    .option('--api-key <key>', 'OpenAI API key')
    .option('-f, --force', 'Force re-embed all documents')
    .action(async (project, options) => {
      const apiKey = options.apiKey || process.env.OPENAI_API_KEY
      if (!apiKey) {
        console.error('OpenAI API key required (--api-key or OPENAI_API_KEY env var)')
        process.exit(1)
      }

      await runPipeline(project, {
        apiKey,
        skipCrawl: true,
        skipClean: true,
        force: options.force,
      })
    })

  program
    .command('run <project>')
    .description('Run full pipeline for a project')
    .option('--api-key <key>', 'OpenAI API key')
    .option('-u, --urls <urls...>', 'Specific URLs to crawl')
    .option('-f, --force', 'Force re-crawl even if recently crawled')
    .action(async (project, options) => {
      const apiKey = options.apiKey || process.env.OPENAI_API_KEY
      if (!apiKey) {
        console.error('OpenAI API key required (--api-key or OPENAI_API_KEY env var)')
        process.exit(1)
      }

      await runPipeline(project, {
        apiKey,
        urls: options.urls,
        force: options.force,
      })
    })

  program.parse()
}
