import { getDocsDatabase } from '../db/chroma.js'
import type { SiteConfig } from '../types/index.js'
import { chunkDocument } from './chunker.js'
import {
  listCleanedDocuments,
  loadSiteConfig,
  loadSiteState,
  readCleanedDocument,
  saveSiteState,
} from './storage.js'
import { generateContentHash } from './utils.js'

export async function embedProject(
  projectName: string,
  apiKey: string,
  options?: { force?: boolean },
) {
  console.log(`Starting embedding process for ${projectName}...`)

  // Load configuration
  const config: SiteConfig = await loadSiteConfig(projectName)
  const state = await loadSiteState(projectName)

  // Get all cleaned documents
  const cleanedFiles = await listCleanedDocuments(projectName)
  if (cleanedFiles.length === 0) {
    console.log('No cleaned documents found. Run cleaning process first.')
    return { embedded: 0, chunks: 0 }
  }

  // Initialize database
  const db = getDocsDatabase(apiKey)

  // If force option is set, clear existing data
  if (options?.force) {
    console.log('Force option set, clearing existing embeddings...')
    await db.deleteProject(projectName)
  }

  // Check if project exists in database
  try {
    const dbProjects = await db.listProjects()
    if (dbProjects.some((p) => p.name === projectName) && !options?.force) {
      // Project exists, we'll do incremental updates
      console.log('Performing incremental embedding update...')
    }
  } catch (error) {
    console.error('Error checking existing embeddings:', error)
  }

  let totalChunks = 0
  let processedDocs = 0
  let skippedDocs = 0

  // Process each document
  for (const filePath of cleanedFiles) {
    try {
      // Read cleaned document
      const doc = await readCleanedDocument(filePath)

      // Check if document needs to be embedded
      const url = doc.metadata.url as string
      const urlState = state.urls[url]

      // Calculate content hash
      const currentHash = generateContentHash(doc.content)

      // Skip if content hasn't changed (unless force is set)
      if (!options?.force && urlState?.contentHash === currentHash && urlState.embeddedAt) {
        skippedDocs++
        continue
      }

      // Chunk the document
      const chunks = chunkDocument(doc, config.chunking)

      // Update total chunks count in each chunk
      for (const chunk of chunks) {
        chunk.metadata.totalChunks = chunks.length
      }

      // Add to database - always replace since we're only processing changed documents
      await db.addDocuments(projectName, chunks, { replace: true })

      // Update state with embedding timestamp
      if (urlState) {
        urlState.embeddedAt = new Date().toISOString()
        urlState.contentHash = currentHash
      }

      totalChunks += chunks.length
      processedDocs++

      console.log(
        `Embedded ${filePath}: ${chunks.length} chunks (${processedDocs + skippedDocs}/${cleanedFiles.length})`,
      )
    } catch (error) {
      console.error(`Failed to embed ${filePath}:`, error)
    }
  }

  // Update state - add to existing chunks if not forced
  if (!options?.force && state.stats.totalChunks) {
    state.stats.totalChunks += totalChunks
  } else {
    state.stats.totalChunks = totalChunks
  }
  state.stats.lastEmbeddingRun = new Date().toISOString()
  await saveSiteState(projectName, state)

  console.log(
    `Embedding complete: ${processedDocs} documents embedded, ${skippedDocs} skipped, ${totalChunks} new chunks`,
  )

  return {
    embedded: processedDocs,
    chunks: totalChunks,
  }
}

export async function embedSingleDocument(projectName: string, filePath: string, apiKey: string) {
  const config: SiteConfig = await loadSiteConfig(projectName)
  const db = getDocsDatabase(apiKey)

  // Read and chunk document
  const doc = await readCleanedDocument(filePath)
  const chunks = chunkDocument(doc, config.chunking)

  // Update total chunks count
  for (const chunk of chunks) {
    chunk.metadata.totalChunks = chunks.length
  }

  // Add to database - always replace for single document updates
  await db.addDocuments(projectName, chunks, { replace: true })

  return chunks.length
}
