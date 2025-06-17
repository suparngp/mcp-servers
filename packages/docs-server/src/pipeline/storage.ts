import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import type { CleanedDocument, CrawledPage, SiteState, UrlState } from '../types/index.js'

const SITES_DIR = 'sites'

export async function ensureDirectory(path: string) {
  try {
    await fs.mkdir(path, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

export async function loadSiteConfig(projectName: string) {
  const configPath = join(SITES_DIR, projectName, 'config.json')
  const content = await fs.readFile(configPath, 'utf-8')
  return JSON.parse(content)
}

export async function loadSiteState(projectName: string): Promise<SiteState> {
  const statePath = join(SITES_DIR, projectName, 'state.json')
  try {
    const content = await fs.readFile(statePath, 'utf-8')
    const state = JSON.parse(content)

    // Handle legacy state format
    if (!state.urls && state.crawledUrls) {
      // Convert old format to new format
      const urls: Record<string, UrlState> = {}
      for (const [url, crawledAt] of Object.entries(state.crawledUrls)) {
        urls[url] = {
          url,
          status: 'completed',
          crawledAt: crawledAt as string,
        }
      }

      return {
        lastCrawl: state.lastCrawl,
        lastDiscovery: null,
        baseUrl: '',
        urls,
        stats: {
          totalDiscovered: Object.keys(urls).length,
          totalCrawled: Object.keys(urls).length,
          totalFailed: 0,
          ...state.stats,
        },
      }
    }

    return state
  } catch {
    // Return default state if file doesn't exist
    return {
      lastCrawl: null,
      lastDiscovery: null,
      baseUrl: '',
      urls: {},
      stats: {
        totalDiscovered: 0,
        totalCrawled: 0,
        totalFailed: 0,
        totalPages: 0,
        totalChunks: 0,
        lastEmbeddingRun: null,
      },
    }
  }
}

export async function saveSiteState(projectName: string, state: SiteState) {
  const statePath = join(SITES_DIR, projectName, 'state.json')
  await fs.writeFile(statePath, JSON.stringify(state, null, 2))
}

export async function saveRawPage(projectName: string, page: CrawledPage) {
  const url = new URL(page.url)
  const pathname = url.pathname === '/' ? '/index' : url.pathname
  const filePath = join(SITES_DIR, projectName, 'raw', `${pathname}.md`)

  await ensureDirectory(dirname(filePath))
  await fs.writeFile(filePath, page.content)

  // Save metadata
  const metaPath = filePath.replace('.md', '.meta.json')
  await fs.writeFile(
    metaPath,
    JSON.stringify(
      {
        url: page.url,
        title: page.title || '',
        crawledAt: new Date().toISOString(),
        depth: page.depth,
        score: page.score,
        metadata: page.metadata,
      },
      null,
      2,
    ),
  )

  return filePath
}

export async function saveCleanedDocument(projectName: string, doc: CleanedDocument) {
  const filePath = join(SITES_DIR, projectName, 'cleaned', doc.path)

  await ensureDirectory(dirname(filePath))
  await fs.writeFile(filePath, doc.content)

  // Save metadata - flatten the structure
  const metaPath = filePath.replace('.md', '.meta.json')
  const flatMetadata: Record<string, unknown> = {
    title: doc.metadata.title || '',
    crawledAt: doc.metadata.crawledAt || '',
    cleanedAt: doc.metadata.cleanedAt || '',
    url: doc.metadata.url || '',
  }
  if (doc.metadata.description) {
    flatMetadata.description = doc.metadata.description
  }
  await fs.writeFile(metaPath, JSON.stringify(flatMetadata, null, 2))

  return filePath
}

export async function listRawPages(projectName: string): Promise<string[]> {
  const rawDir = join(SITES_DIR, projectName, 'raw')
  try {
    const files = await walkDirectory(rawDir)
    return files.filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
}

export async function listCleanedDocuments(projectName: string): Promise<string[]> {
  const cleanedDir = join(SITES_DIR, projectName, 'cleaned')
  try {
    const files = await walkDirectory(cleanedDir)
    return files.filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
}

export async function readRawPage(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8')
  const metaPath = filePath.replace('.md', '.meta.json')

  let metadata = {}
  try {
    const metaContent = await fs.readFile(metaPath, 'utf-8')
    metadata = JSON.parse(metaContent)
  } catch {
    // No metadata file
  }

  return { content, metadata }
}

export async function readCleanedDocument(filePath: string): Promise<CleanedDocument> {
  const content = await fs.readFile(filePath, 'utf-8')
  const metaPath = filePath.replace('.md', '.meta.json')

  let metadata: Record<string, unknown> = {}
  try {
    const metaContent = await fs.readFile(metaPath, 'utf-8')
    metadata = JSON.parse(metaContent)
  } catch {
    // No metadata file
  }

  // Extract path relative to cleaned directory
  const match = filePath.match(/cleaned\/(.+)$/)
  const path = match ? match[1] : filePath

  return {
    url: (metadata as any).url || '',
    path,
    content,
    metadata: {
      title: (metadata as any).title || '',
      crawledAt: (metadata as any).crawledAt || '',
      cleanedAt: (metadata as any).cleanedAt || new Date().toISOString(),
      ...(metadata as any),
    },
  }
}

async function walkDirectory(dir: string): Promise<string[]> {
  const files: string[] = []

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else {
        files.push(fullPath)
      }
    }
  }

  await walk(dir)
  return files
}

export async function cleanupOldFiles(
  projectName: string,
  keepUrls: Set<string>,
  state?: SiteState,
) {
  const siteState = state || (await loadSiteState(projectName))

  const urlsToRemove: string[] = []

  // Find URLs that are no longer being crawled
  for (const [url, urlState] of Object.entries(siteState.urls)) {
    if (!keepUrls.has(url) && urlState.status === 'completed') {
      urlsToRemove.push(url)
    }
  }

  // Remove files and update state
  for (const url of urlsToRemove) {
    const pathname = new URL(url).pathname === '/' ? '/index' : new URL(url).pathname
    const rawPath = join(SITES_DIR, projectName, 'raw', `${pathname}.md`)
    const cleanedPath = join(SITES_DIR, projectName, 'cleaned', `${pathname}.md`)

    try {
      await fs.unlink(rawPath)
      await fs.unlink(rawPath.replace('.md', '.meta.json'))
    } catch {
      // File might not exist
    }

    try {
      await fs.unlink(cleanedPath)
      await fs.unlink(cleanedPath.replace('.md', '.meta.json'))
    } catch {
      // File might not exist
    }

    delete siteState.urls[url]
  }

  await saveSiteState(projectName, siteState)
  return urlsToRemove.length
}
