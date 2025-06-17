import { ChromaClient } from 'chromadb'
import { OpenAIEmbeddingFunction } from 'chromadb'
import type { DocumentChunk } from '../types/index.js'

export class DocsDatabase {
  private client: ChromaClient
  private embedder: OpenAIEmbeddingFunction

  constructor(apiKey: string) {
    this.client = new ChromaClient({
      path: process.env.CHROMA_URL || 'http://localhost:7777',
    })

    this.embedder = new OpenAIEmbeddingFunction({
      openai_api_key: apiKey,
      openai_model: 'text-embedding-3-small',
    })
  }

  async getOrCreateCollection(projectName: string) {
    const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`

    try {
      return await this.client.getCollection({
        name: collectionName,
        embeddingFunction: this.embedder,
      })
    } catch {
      // Collection doesn't exist, create it
      return await this.client.createCollection({
        name: collectionName,
        embeddingFunction: this.embedder,
        metadata: {
          project: projectName,
          created: new Date().toISOString(),
        },
      })
    }
  }

  async addDocuments(
    projectName: string,
    chunks: DocumentChunk[],
    options?: { replace?: boolean },
  ) {
    const collection = await this.getOrCreateCollection(projectName)

    // If replace option is set, delete existing chunks for this document first
    if (options?.replace && chunks.length > 0) {
      const docPath = chunks[0].metadata.path
      try {
        await collection.delete({
          where: { path: docPath },
        })
      } catch (error) {
        // Ignore if no documents to delete
      }
    }

    // Prepare data for ChromaDB
    const ids = chunks.map((chunk) => chunk.id)
    const documents = chunks.map((chunk) => {
      // Validate content
      if (!chunk.content || typeof chunk.content !== 'string') {
        throw new Error(`Invalid chunk content for chunk ${chunk.id}: ${typeof chunk.content}`)
      }
      return chunk.content
    })
    const metadatas = chunks.map((chunk) => ({
      ...chunk.metadata,
      // Ensure all values are strings for ChromaDB
      chunkIndex: String(chunk.metadata.chunkIndex),
      totalChunks: String(chunk.metadata.totalChunks),
    }))

    // Batch chunks to avoid exceeding token limits
    // OpenAI's text-embedding-3-small has a limit of 300,000 tokens per request
    // We'll use a conservative estimate of ~4 chars per token and batch at 200k tokens
    const MAX_CHARS_PER_BATCH = 200000 * 4 // ~200k tokens worth of characters
    
    let totalAdded = 0
    let currentBatch = {
      ids: [] as string[],
      documents: [] as string[],
      metadatas: [] as any[],
      charCount: 0,
    }
    
    for (let i = 0; i < chunks.length; i++) {
      const chunkChars = documents[i].length
      
      // If adding this chunk would exceed the limit, process the current batch
      if (currentBatch.charCount + chunkChars > MAX_CHARS_PER_BATCH && currentBatch.ids.length > 0) {
        try {
          await collection.add({
            ids: currentBatch.ids,
            documents: currentBatch.documents,
            metadatas: currentBatch.metadatas,
          })
          totalAdded += currentBatch.ids.length
          console.log(`Added batch of ${currentBatch.ids.length} chunks (${currentBatch.charCount} chars)`)
        } catch (error) {
          console.error('Failed to add batch to ChromaDB:', error)
          console.error('Batch size:', currentBatch.ids.length, 'chars:', currentBatch.charCount)
          throw error
        }
        
        // Reset batch
        currentBatch = {
          ids: [],
          documents: [],
          metadatas: [],
          charCount: 0,
        }
      }
      
      // Add chunk to current batch
      currentBatch.ids.push(ids[i])
      currentBatch.documents.push(documents[i])
      currentBatch.metadatas.push(metadatas[i])
      currentBatch.charCount += chunkChars
    }
    
    // Process any remaining chunks
    if (currentBatch.ids.length > 0) {
      try {
        await collection.add({
          ids: currentBatch.ids,
          documents: currentBatch.documents,
          metadatas: currentBatch.metadatas,
        })
        totalAdded += currentBatch.ids.length
        console.log(`Added final batch of ${currentBatch.ids.length} chunks (${currentBatch.charCount} chars)`)
      } catch (error) {
        console.error('Failed to add final batch to ChromaDB:', error)
        console.error('Batch size:', currentBatch.ids.length, 'chars:', currentBatch.charCount)
        throw error
      }
    }

    return totalAdded
  }

  async searchDocs(
    query: string,
    options: {
      projectName?: string
      limit?: number
      filter?: Record<string, string>
    } = {},
  ) {
    const { projectName, limit = 5, filter = {} } = options

    if (!projectName) {
      // Search across all collections
      const collections = await this.client.listCollections()
      const allResults = await Promise.all(
        collections.map((colName) => this.searchInCollection(colName, query, limit, filter)),
      )
      // Flatten and sort by distance
      return allResults
        .flat()
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
        .slice(0, limit)
    }

    const collection = await this.getOrCreateCollection(projectName)
    return this.searchInCollection(collection.name, query, limit, filter)
  }

  private async searchInCollection(
    collectionName: string,
    query: string,
    limit: number,
    filter: Record<string, string>,
  ) {
    const collection = await this.client.getCollection({
      name: collectionName,
      embeddingFunction: this.embedder,
    })

    const results = await collection.query({
      queryTexts: [query],
      nResults: limit,
      where: Object.keys(filter).length > 0 ? filter : undefined,
    })

    // Transform results to our format
    return results.ids[0].map((id, index) => ({
      id,
      content: results.documents[0][index],
      metadata: results.metadatas[0][index],
      distance: results.distances?.[0][index],
    }))
  }

  async getDocByPath(projectName: string, path: string) {
    const collection = await this.getOrCreateCollection(projectName)

    const results = await collection.get({
      where: { path },
    })

    if (results.ids.length === 0) {
      return null
    }

    // Sort by chunk index and concatenate
    const chunks = results.ids.map((id, index) => ({
      id,
      content: results.documents[index],
      metadata: results.metadatas[index],
      chunkIndex: Number.parseInt((results.metadatas?.[index] as any)?.chunkIndex || '0'),
    }))

    chunks.sort((a, b) => a.chunkIndex - b.chunkIndex)

    return {
      path,
      content: chunks.map((c) => c.content).join('\n\n'),
      metadata: chunks[0].metadata,
    }
  }

  async deleteProject(projectName: string) {
    const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    try {
      await this.client.deleteCollection({ name: collectionName })
      return true
    } catch {
      return false
    }
  }

  async listProjects() {
    const collectionsWithMetadata = await this.client.listCollectionsAndMetadata()

    return collectionsWithMetadata
      .filter((col) => col.name.startsWith('docs_'))
      .map((col) => ({
        name: col.metadata?.project || col.name.replace('docs_', ''),
        collection: col.name,
        created: col.metadata?.created,
      }))
  }
}

// Singleton instance
let dbInstance: DocsDatabase | null = null

export function getDocsDatabase(apiKey?: string): DocsDatabase {
  if (!dbInstance) {
    if (!apiKey) {
      throw new Error('OpenAI API key required for first initialization')
    }
    dbInstance = new DocsDatabase(apiKey)
  }
  return dbInstance
}
