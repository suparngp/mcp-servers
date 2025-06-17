#!/usr/bin/env tsx
import { readCleanedDocument } from '../dist/pipeline/storage.js'
import { chunkDocument } from '../dist/pipeline/chunker.js'
import { loadSiteConfig } from '../dist/pipeline/storage.js'

async function testChunking() {
  const projectName = 'supertokens'
  const filePath = 'sites/supertokens/cleaned/docs/authentication/m2m/client-credentials.md'
  
  try {
    // Load config
    const config = await loadSiteConfig(projectName)
    
    // Read document
    const doc = await readCleanedDocument(filePath)
    console.log('Document URL:', doc.url)
    console.log('Document content length:', doc.content.length)
    console.log('First 200 chars:', doc.content.substring(0, 200))
    console.log('\n---\n')
    
    // Chunk document
    const chunks = chunkDocument(doc, config.chunking)
    console.log('Number of chunks created:', chunks.length)
    console.log('\nChunk details:')
    
    chunks.forEach((chunk, idx) => {
      console.log(`\nChunk ${idx}:`)
      console.log('  ID:', chunk.id)
      console.log('  Content length:', chunk.content.length)
      console.log('  First 100 chars:', chunk.content.substring(0, 100).replace(/\n/g, '\\n'))
      console.log('  Metadata:', chunk.metadata)
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

testChunking()