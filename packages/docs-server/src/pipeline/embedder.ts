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

export async function embedProject(projectName: string, apiKey: string) {
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

  // Clear existing data for fresh embedding
  await db.deleteProject(projectName)

  let totalChunks = 0
  let processedDocs = 0

  // Process each document
  for (const filePath of cleanedFiles) {
    try {
      // Read cleaned document
      const doc = await readCleanedDocument(filePath)

      // Chunk the document
      const chunks = chunkDocument(doc, config.chunking)

      // Update total chunks count in each chunk
      for (const chunk of chunks) {
        chunk.metadata.totalChunks = chunks.length
      }

      // Add to database
      await db.addDocuments(projectName, chunks)

      totalChunks += chunks.length
      processedDocs++

      console.log(
        `Embedded ${filePath}: ${chunks.length} chunks (${processedDocs}/${cleanedFiles.length})`,
      )
    } catch (error) {
      console.error(`Failed to embed ${filePath}:`, error)
    }
  }

  // Update state
  state.stats.totalChunks = totalChunks
  state.stats.lastEmbeddingRun = new Date().toISOString()
  await saveSiteState(projectName, state)

  console.log(`Embedding complete: ${processedDocs} documents, ${totalChunks} chunks`)

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

  // Add to database
  await db.addDocuments(projectName, chunks)

  return chunks.length
}
