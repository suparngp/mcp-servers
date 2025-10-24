import { ChromaClient, CloudClient, Collection } from 'chromadb'
import { OpenAIEmbeddingFunction } from 'chromadb'
import OpenAI from 'openai'
import type { DocumentChunk } from '../types/index.js'

export class DocsDatabase {
  private client: ChromaClient | CloudClient
  private embedder: OpenAIEmbeddingFunction
  private openai: OpenAI
  private collectionPromises: Map<string, Promise<Collection>> = new Map()

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
    // Check if using cloud or local ChromaDB
    const chromaApiKey = process.env.CHROMA_API_KEY

    if (chromaApiKey) {
      // Use CloudClient for cloud-hosted ChromaDB
      const tenantId = process.env.CHROMA_TENANT_ID
      const database = process.env.CHROMA_DATABASE

      if (!tenantId || !database) {
        throw new Error(
          'CHROMA_TENANT_ID and CHROMA_DATABASE must be set when using CHROMA_API_KEY'
        )
      }

      this.client = new CloudClient({
        apiKey: chromaApiKey,
        tenant: tenantId,
        database: database,
      })
      console.log('Using ChromaDB Cloud')
    } else {
      // Use local ChromaDB
      this.client = new ChromaClient({
        path: process.env.CHROMA_URL || 'http://localhost:7777',
      })
      console.log('Using local ChromaDB at', process.env.CHROMA_URL || 'http://localhost:7777')
    }

    this.embedder = new OpenAIEmbeddingFunction({
      openai_api_key: apiKey,
      openai_model: 'text-embedding-3-small',
    })
  }

  async getOrCreateCollection(projectName: string) {
    const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`

    // Check if we already have a promise in flight for this collection
    if (this.collectionPromises.has(collectionName)) {
      return await this.collectionPromises.get(collectionName)!
    }

    // Create a new promise for this collection
    const promise = (async () => {
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
    })()

    // Store the promise so concurrent calls reuse it
    this.collectionPromises.set(collectionName, promise)

    // Once resolved, we can keep the promise cached (it's already resolved)
    // No need to remove it - a resolved promise is safe to await multiple times
    return await promise
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

    // Validate and extract content for embedding generation
    const contentsForEmbedding = chunks.map((chunk) => {
      if (!chunk.content || typeof chunk.content !== 'string') {
        throw new Error(`Invalid chunk content for chunk ${chunk.id}: ${typeof chunk.content}`)
      }
      return chunk.content
    })

    // Store only minimal placeholder documents (empty strings)
    // Content will be read from local files via fileReader.ts
    const placeholderDocuments = chunks.map(() => '')

    const metadatas = chunks.map((chunk) => ({
      ...chunk.metadata,
      // Ensure all values are strings for ChromaDB
      chunkIndex: String(chunk.metadata.chunkIndex),
      totalChunks: String(chunk.metadata.totalChunks),
    }))

    // Batch chunks to avoid exceeding OpenAI embedding limits
    // OpenAI's text-embedding-3-small has a limit of ~8000 texts per request
    const BATCH_SIZE = 2000 // Conservative batch size

    let totalAdded = 0

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const endIdx = Math.min(i + BATCH_SIZE, chunks.length)
      const batchIds = ids.slice(i, endIdx)
      const batchContents = contentsForEmbedding.slice(i, endIdx)
      const batchPlaceholders = placeholderDocuments.slice(i, endIdx)
      const batchMetadatas = metadatas.slice(i, endIdx)

      try {
        // Generate embeddings using OpenAI directly
        console.log(`Generating embeddings for batch of ${batchIds.length} chunks...`)
        const embeddingResponse = await this.openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: batchContents,
        })

        const embeddings = embeddingResponse.data.map(e => e.embedding)

        // Store embeddings + minimal placeholders in ChromaDB
        // We pass embeddings directly and empty documents to minimize storage
        await collection.upsert({
          ids: batchIds,
          embeddings: embeddings,
          documents: batchPlaceholders,
          metadatas: batchMetadatas,
        })

        totalAdded += batchIds.length
        console.log(`Added batch of ${batchIds.length} chunks with embeddings (minimal storage)`)
      } catch (error) {
        console.error('Failed to add batch to ChromaDB:', error)
        console.error('Batch size:', batchIds.length)
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

    // Get metadata from first chunk (all chunks have same metadata)
    const metadata = results.metadatas[0]

    return {
      path,
      metadata,
      // Note: Content is no longer returned here
      // The caller should read from local files using fileReader.ts
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
