import { program } from 'commander'
import { config } from 'dotenv'
import type { CleanedDocument, SiteConfig } from '../types/index.js'
import { runCleaners } from './cleaners/index.js'
import { crawlProject } from './crawler.js'
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

// Load environment variables
config()

export async function runPipeline(
  projectName: string,
  options: {
    apiKey: string
    force?: boolean
    urls?: string[]
    skipCrawl?: boolean
    skipClean?: boolean
    skipEmbed?: boolean
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

  // Step 1: Crawl
  if (!options.skipCrawl) {
    console.log('\n📥 Starting crawl phase...')

    // Determine URLs to crawl
    let urlsToCrawl = options.urls || [config.baseUrl]

    // If not forcing, filter out already crawled URLs
    if (!options.force) {
      const recentCrawlThreshold = Date.now() - 24 * 60 * 60 * 1000 // 24 hours
      urlsToCrawl = urlsToCrawl.filter((url) => {
        const lastCrawled = state.crawledUrls[url]
        if (!lastCrawled) return true
        return new Date(lastCrawled).getTime() < recentCrawlThreshold
      })
    }

    if (urlsToCrawl.length === 0) {
      console.log('No URLs need crawling (all recently crawled)')
    } else {
      const pages = await crawlProject(projectName, {
        urls: urlsToCrawl,
        outputFormat: 'markdown',
      })

      // Save raw pages
      for (const page of pages) {
        await saveRawPage(projectName, page)
        state.crawledUrls[page.url] = new Date().toISOString()
        stats.crawled++
      }

      state.lastCrawl = new Date().toISOString()
      state.stats.totalPages = Object.keys(state.crawledUrls).length
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
            title: cleanerMetadata.title || (metadata as any).metadata?.title || (metadata as any).title || '',
            crawledAt: (metadata as any).crawledAt || '',
            cleanedAt: new Date().toISOString(),
            url,
            ...cleanerMetadata,
          },
        }

        await saveCleanedDocument(projectName, cleanedDoc)
        stats.cleaned++
      } catch (error) {
        console.error(`Failed to clean ${filePath}:`, error)
      }
    }

    console.log(`Cleaned ${stats.cleaned} documents`)
  }

  // Step 3: Embed
  if (!options.skipEmbed) {
    console.log('\n🔤 Starting embedding phase...')

    const embedResult = await embedProject(projectName, options.apiKey)
    stats.embedded = embedResult.embedded
    stats.chunks = embedResult.chunks
  }

  // Cleanup old files if doing full pipeline
  if (!options.skipCrawl && !options.skipClean) {
    const keepUrls = new Set(Object.keys(state.crawledUrls))
    const removed = await cleanupOldFiles(projectName, keepUrls)
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
