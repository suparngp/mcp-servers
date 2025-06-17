#!/usr/bin/env tsx
import { ChromaClient } from 'chromadb'

async function debugPaths(projectName: string) {
  const client = new ChromaClient({
    path: process.env.CHROMA_URL || 'http://localhost:7777',
  })

  const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  
  try {
    const collection = await client.getCollection({ name: collectionName })
    
    // Get a sample of documents to see path format
    const results = await collection.get({
      limit: 10
    })
    
    console.log(`\nSample paths from ${projectName}:`)
    console.log('=' .repeat(50))
    
    // Get unique paths
    const uniquePaths = new Set<string>()
    results.metadatas?.forEach((metadata: any) => {
      if (metadata.path) {
        uniquePaths.add(metadata.path)
      }
    })
    
    Array.from(uniquePaths).sort().forEach(path => {
      console.log(`  ${path}`)
    })
    
    // Try to find the specific document
    console.log('\n\nSearching for docs/authentication/m2m/client-credentials.md:')
    console.log('=' .repeat(50))
    
    const testResults = await collection.get({
      where: { path: 'docs/authentication/m2m/client-credentials.md' }
    })
    console.log(`Found ${testResults.ids.length} chunks`)
    
    if (testResults.ids.length > 0) {
      console.log('Sample metadata:', testResults.metadatas?.[0])
    }
    
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}

// Run for supertokens
debugPaths('supertokens').catch(console.error)