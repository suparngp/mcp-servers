import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import split2 from 'split2'
import type { CrawledPage } from '../types/index.js'

export async function crawlUrls(
  projectName: string,
  urls: string[],
  outputFormat: 'markdown' | 'json' = 'markdown',
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
    const crawler = spawn(pythonCmd, [scriptPath, configPath, outputFormat, ...urls])

    // Parse JSON output line by line
    crawler.stdout.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const data = JSON.parse(line)
        if (!data.error) {
          pages.push(data as CrawledPage)
        }
      } catch (e) {
        console.error('Failed to parse crawler output:', e)
      }
    })

    // Capture errors
    crawler.stderr.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const error = JSON.parse(line)
        errors.push(`${error.url}: ${error.error}`)
      } catch (e) {
        // Non-JSON error output
        console.error('Crawler error:', line)
      }
    })

    crawler.on('close', (code) => {
      if (code === 0) {
        console.log(`Crawled ${pages.length} pages successfully`)
        if (errors.length > 0) {
          console.warn(`Failed to crawl ${errors.length} pages:`, errors)
        }
        resolve(pages)
      } else {
        reject(new Error(`Crawler exited with code ${code}`))
      }
    })

    crawler.on('error', (err) => {
      reject(new Error(`Failed to start crawler: ${err.message}`))
    })
  })
}

export async function crawlProject(
  projectName: string,
  options?: {
    force?: boolean
    urls?: string[]
    outputFormat?: 'markdown' | 'json'
  },
): Promise<CrawledPage[]> {
  // Load config to get start URLs
  const configPath = join(process.cwd(), 'sites', projectName, 'config.json')
  const configContent = await import('node:fs').then(fs => 
    fs.promises.readFile(configPath, 'utf-8')
  )
  const config = JSON.parse(configContent)

  // Determine URLs to crawl
  const urlsToCrawl = options?.urls || [config.baseUrl]

  // TODO: Implement incremental crawling by checking state.json
  // For now, just crawl the provided URLs

  return crawlUrls(projectName, urlsToCrawl, options?.outputFormat)
}
