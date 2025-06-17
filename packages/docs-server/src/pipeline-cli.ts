#!/usr/bin/env node
import { program } from 'commander'
import { config } from 'dotenv'
import { runConcurrentPipeline } from './pipeline/orchestrator-concurrent.js'
import { runPipeline } from './pipeline/orchestrator.js'

// Load environment variables
config()

program
  .name('docs-pipeline')
  .description('Documentation processing pipeline (concurrent by default)')
  .version('0.0.1')

// Main command - run full pipeline
program
  .command('run <project>')
  .description('Run full pipeline for a project')
  .option('--api-key <key>', 'OpenAI API key')
  .option('-u, --urls <urls...>', 'Specific URLs to process')
  .option('-f, --force', 'Force re-process even if recently processed')
  .option('-c, --concurrency <number>', 'Max concurrent operations (default: 5)')
  .option('--http', 'Use HTTP crawler instead of browser')
  .option('--sequential', 'Use sequential pipeline instead of concurrent')
  .action(async (project, options) => {
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OpenAI API key required (--api-key or OPENAI_API_KEY env var)')
      process.exit(1)
    }

    if (options.sequential) {
      console.log('Running in sequential mode...')
      await runPipeline(project, {
        apiKey,
        urls: options.urls,
        force: options.force,
        useBrowser: !options.http,
      })
    } else {
      await runConcurrentPipeline(project, {
        apiKey,
        urls: options.urls,
        force: options.force,
        maxConcurrency: Number.parseInt(options.concurrency) || 5,
        useSimpleCrawler: options.http,
      })
    }
  })

// Individual phase commands (always sequential for these)
program
  .command('crawl <project>')
  .description('Crawl documentation for a project')
  .option('-u, --urls <urls...>', 'Specific URLs to crawl')
  .option('-f, --force', 'Force re-crawl even if recently crawled')
  .option('--http', 'Use HTTP crawler instead of browser')
  .option('--sequential', 'Use sequential crawling instead of concurrent')
  .option('-c, --concurrency <number>', 'Max concurrent operations (default: 5)')
  .action(async (project, options) => {
    if (options.sequential) {
      await runPipeline(project, {
        apiKey: process.env.OPENAI_API_KEY || '',
        urls: options.urls,
        force: options.force,
        skipClean: true,
        skipEmbed: true,
        useBrowser: !options.http,
      })
    } else {
      await runConcurrentPipeline(project, {
        apiKey: process.env.OPENAI_API_KEY || '',
        urls: options.urls,
        force: options.force,
        maxConcurrency: Number.parseInt(options.concurrency) || 5,
        useSimpleCrawler: options.http,
        skipDiscover: true,
        skipClean: true,
        skipEmbed: true,
      })
    }
  })

program
  .command('clean <project>')
  .description('Clean raw documents for a project')
  .action(async (project) => {
    await runPipeline(project, {
      apiKey: process.env.OPENAI_API_KEY || '',
      skipDiscover: true,
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
      skipDiscover: true,
      skipCrawl: true,
      skipClean: true,
      force: options.force,
    })
  })

// Default command shows help
program.action(() => {
  program.help()
})

program.parse()
