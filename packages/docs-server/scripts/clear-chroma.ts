#!/usr/bin/env tsx
import { ChromaClient } from 'chromadb'

async function clearProject(projectName: string) {
  const client = new ChromaClient({
    path: process.env.CHROMA_URL || 'http://localhost:7777',
  })

  const collectionName = `docs_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  
  try {
    // Try to delete the collection
    await client.deleteCollection({ name: collectionName })
    console.log(`Successfully deleted collection: ${collectionName}`)
  } catch (error) {
    console.error(`Failed to delete collection ${collectionName}:`, error)
  }
}

// Get project name from command line
const projectName = process.argv[2]

if (!projectName) {
  console.error('Usage: tsx clear-chroma.ts <project-name>')
  process.exit(1)
}

clearProject(projectName).catch(console.error)