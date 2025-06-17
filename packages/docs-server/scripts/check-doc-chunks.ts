#!/usr/bin/env tsx
import { ChromaClient } from 'chromadb'

async function checkDocumentChunks(projectName: string, path: string) {
  const client = new ChromaClient({
    path: process.env.CHROMA_URL || 'http://localhost:7777',
  })

  const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  
  try {
    const collection = await client.getCollection({ name: collectionName })
    
    // Get all chunks for this document
    const results = await collection.get({
      where: { path: path }
    })
    
    console.log(`Found ${results.ids.length} chunks for path: ${path}`)
    
    // Group by chunk ID to find duplicates
    const idCounts = new Map<string, number>()
    results.ids.forEach(id => {
      idCounts.set(id, (idCounts.get(id) || 0) + 1)
    })
    
    // Check for duplicates
    const duplicates = Array.from(idCounts.entries()).filter(([_, count]) => count > 1)
    if (duplicates.length > 0) {
      console.log('\nDUPLICATE IDs found:')
      duplicates.forEach(([id, count]) => {
        console.log(`  ID ${id}: appears ${count} times`)
      })
    }
    
    // Show chunk details
    console.log('\nChunk details:')
    for (let i = 0; i < Math.min(results.ids.length, 5); i++) {
      const metadata = results.metadatas?.[i] || {}
      console.log(`\nChunk ${i}:`)
      console.log('  ID:', results.ids[i])
      console.log('  Metadata:', {
        chunkIndex: metadata.chunkIndex,
        totalChunks: metadata.totalChunks,
        section: metadata.section,
        contentLength: results.documents?.[i]?.length
      })
      console.log('  First 100 chars:', results.documents?.[i]?.substring(0, 100))
    }
    
    if (results.ids.length > 5) {
      console.log(`\n... and ${results.ids.length - 5} more chunks`)
    }
    
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}

// Usage
const projectName = 'supertokens'
const path = 'docs/authentication/m2m/client-credentials.md'

checkDocumentChunks(projectName, path).catch(console.error)