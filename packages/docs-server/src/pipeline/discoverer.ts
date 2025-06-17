import { spawn } from 'node:child_process'
import { join } from 'node:path'
import split2 from 'split2'

// Use Python from virtual environment
const venvPath = join(process.cwd(), 'scripts', 'venv')
const pythonCmd =
  process.platform === 'win32'
    ? join(venvPath, 'Scripts', 'python.exe')
    : join(venvPath, 'bin', 'python')

export interface DiscoveredUrl {
  url: string
  depth: number
  fromPage?: string
}

export async function discoverUrls(
  projectName: string,
  baseUrl: string,
  options?: {
    maxDepth?: number
    includePatterns?: string[]
    excludePatterns?: string[]
  },
): Promise<DiscoveredUrl[]> {
  const scriptPath = join(process.cwd(), 'scripts', 'discover.py')
  const configPath = join(process.cwd(), 'sites', projectName, 'config.json')

  const urls: DiscoveredUrl[] = []
  const errors: string[] = []

  return new Promise((resolve, reject) => {
    const args = [scriptPath, configPath, baseUrl, String(options?.maxDepth || 3)]

    const discoverer = spawn(pythonCmd, args)

    // Parse JSON output line by line
    discoverer.stdout.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const data = JSON.parse(line)
        if (data.type === 'url') {
          urls.push({
            url: data.url,
            depth: data.depth || 0,
            fromPage: data.from_page,
          })
        } else if (data.type === 'complete') {
          console.log(`Discovery complete: found ${data.total} URLs`)
        }
      } catch (e) {
        console.error('Failed to parse discoverer output:', e)
      }
    })

    // Capture errors
    discoverer.stderr.pipe(split2()).on('data', (line: string) => {
      if (!line.trim()) return

      try {
        const error = JSON.parse(line)
        errors.push(`${error.url}: ${error.error}`)
      } catch (e) {
        // Non-JSON error output
        console.error('Discoverer error:', line)
      }
    })

    discoverer.on('close', (code) => {
      if (code === 0) {
        console.log(`Discovered ${urls.length} URLs successfully`)
        if (errors.length > 0) {
          console.warn(`Failed to process ${errors.length} pages:`, errors)
        }
        resolve(urls)
      } else {
        reject(new Error(`Discoverer exited with code ${code}`))
      }
    })

    discoverer.on('error', (err) => {
      reject(new Error(`Failed to start discoverer: ${err.message}`))
    })
  })
}
