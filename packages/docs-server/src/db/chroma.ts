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

    // Add all chunks at once since we're replacing the entire document
    try {
      await collection.add({
        ids,
        documents,
        metadatas,
      })
    } catch (error) {
      console.error('Failed to add documents to ChromaDB:', error)
      console.error('First chunk content preview:', documents[0]?.substring(0, 100))
      throw error
    }

    return chunks.length
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
