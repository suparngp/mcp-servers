#!/usr/bin/env tsx
import { ChromaClient } from 'chromadb'

async function checkProject(projectName: string) {
  const client = new ChromaClient({
    path: process.env.CHROMA_URL || 'http://localhost:7777',
  })

  const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  
  try {
    // Try to get the collection
    const collection = await client.getCollection({ name: collectionName })
    console.log(`Collection '${collectionName}' exists`)
    
    // Count documents
    const count = await collection.count()
    console.log(`Number of documents: ${count}`)
    
    if (count > 0) {
      // Get a sample of documents
      const sample = await collection.get({ limit: 5 })
      console.log(`\nFirst few document IDs:`)
      sample.ids.forEach(id => console.log(`  - ${id}`))
    }
  } catch (error: any) {
    if (error.message?.includes('does not exist')) {
      console.log(`Collection '${collectionName}' does not exist`)
    } else {
      console.error(`Error checking collection:`, error.message)
    }
  }
  
  // List all collections
  console.log('\nAll collections in ChromaDB:')
  const collections = await client.listCollections()
  collections.forEach(col => console.log(`  - ${col.name}`))
}

// Get project name from command line
const projectName = process.argv[2] || 'supertokens'

checkProject(projectName).catch(console.error)