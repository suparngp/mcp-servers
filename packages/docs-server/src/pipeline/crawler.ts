import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import split2 from 'split2'
import type { CrawledPage } from '../types/index.js'

/**
 * Unified crawler that uses crawl.py with optional --no-browser flag
 * Both modes use crawler4ai for parsing, ensuring consistent output format
 *
 * @param useBrowser - If true, uses Playwright/browser. If false, uses HTTP fetch with --no-browser flag
 */
export async function crawlUrls(
  projectName: string,
  urls: string[],
  outputFormat: 'markdown' | 'json' = 'markdown',
  useBrowser = true,
): Promise<CrawledPage[]> {
  const configPath = join('sites', projectName, 'config.json')
  const scriptsDir = join(process.cwd(), 'scripts')
  const scriptPath = join(scriptsDir, 'crawl.py')
  const venvPath = join(scriptsDir, 'venv')
  const pages: CrawledPage[] = []
  const errors: string[] = []

  // Determine Python executable
  let pythonCmd = 'python3'
  if (existsSync(venvPath)) {
    // Use virtual environment Python if it exists
    if (process.platform === 'win32') {
      pythonCmd = join(venvPath, 'Scripts', 'python.exe')
    } else {
      pythonCmd = join(venvPath, 'bin', 'python')
    }
  }

  return new Promise((resolve, reject) => {
    // Build args: script, config, format, [--no-browser], urls...
    const args = [scriptPath, configPath, outputFormat]
    if (!useBrowser) {
      args.push('--no-browser')
    }
    args.push(...urls)

    const pythonProcess = spawn(pythonCmd, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    // Handle stdout - parse JSON results
    pythonProcess.stdout.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const result = JSON.parse(line)

        pages.push({
          url: result.url,
          content: result.content,
          title: result.title || result.metadata?.title || '',
          depth: 0, // Depth tracking not implemented in Python scripts
          score: 1.0, // Default score
          metadata: {
            ...result.metadata,
            title: result.title || result.metadata?.title || '',
            crawledAt: new Date().toISOString(),
            crawler: useBrowser ? 'browser' : 'http',
          },
        })
      } catch (error) {
        console.error('Failed to parse crawler output:', error)
        console.error('Raw line:', line)
      }
    })

    // Handle stderr - parse error messages
    pythonProcess.stderr.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const errorResult = JSON.parse(line)
        if (errorResult.error) {
          errors.push(`${errorResult.url}: ${errorResult.error}`)
        }
      } catch {
        // If not JSON, just log it
        console.error('Crawler stderr:', line)
      }
    })

    pythonProcess.on('error', (error) => {
      reject(new Error(`Failed to start crawler: ${error.message}`))
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0 && pages.length === 0) {
        reject(new Error(`Crawler exited with code ${code}. Errors: ${errors.join(', ')}`))
      } else {
        if (errors.length > 0) {
          console.warn('Some URLs failed to crawl:', errors)
        }
        resolve(pages)
      }
    })
  })
}

export async function crawlProject(
  projectName: string,
  options?: {
    force?: boolean
    urls?: string[]
    outputFormat?: 'markdown' | 'json'
    useBrowser?: boolean
  },
): Promise<CrawledPage[]> {
  // Determine URLs to crawl
  const urlsToCrawl = options?.urls || []
  const outputFormat = options?.outputFormat || 'markdown'
  const useBrowser = options?.useBrowser ?? true

  if (urlsToCrawl.length === 0) {
    console.warn('No URLs provided to crawl')
    return []
  }

  console.log(
    `Crawling ${urlsToCrawl.length} URLs using ${useBrowser ? 'browser' : 'HTTP'} mode...`,
  )
  return crawlUrls(projectName, urlsToCrawl, outputFormat, useBrowser)
}
