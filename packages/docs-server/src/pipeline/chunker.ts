import { createHash } from 'node:crypto'
import type { CleanedDocument, DocumentChunk } from '../types/index.js'

export interface ChunkingOptions {
  strategy: 'semantic' | 'fixed' | 'sliding'
  maxSize: number
  overlap: number
  minSize: number
}

export function chunkDocument(doc: CleanedDocument, options: ChunkingOptions): DocumentChunk[] {
  switch (options.strategy) {
    case 'semantic':
      return semanticChunk(doc, options)
    case 'sliding':
      return slidingWindowChunk(doc, options)
    default:
      return fixedSizeChunk(doc, options)
  }
}

function semanticChunk(doc: CleanedDocument, options: ChunkingOptions): DocumentChunk[] {
  const chunks: DocumentChunk[] = []
  const lines = doc.content.split('\n')
  let currentChunk: string[] = []
  let currentSize = 0

  // Track heading hierarchy for context
  let currentH1 = ''
  let currentH2 = ''
  let currentH3 = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineSize = line.length

    // Update heading context
    if (line.startsWith('# ')) {
      currentH1 = line
      currentH2 = ''
      currentH3 = ''
    } else if (line.startsWith('## ')) {
      currentH2 = line
      currentH3 = ''
    } else if (line.startsWith('### ')) {
      currentH3 = line
    }

    // Check if we're in a code block
    const isCodeBlockStart = line.startsWith('```')
    if (isCodeBlockStart) {
      // Find the end of the code block
      let codeBlockEnd = i
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('```')) {
          codeBlockEnd = j
          break
        }
      }

      // Get the entire code block
      const codeBlock = lines.slice(i, codeBlockEnd + 1)
      const codeBlockSize = codeBlock.join('\n').length

      // If adding this code block would exceed max size and we have content
      if (currentSize + codeBlockSize > options.maxSize && currentChunk.length > 0) {
        // Save current chunk
        chunks.push(createChunk(doc, currentChunk, chunks.length, currentH1, currentH2, currentH3))
        currentChunk = []
        currentSize = 0
      }

      // Add the entire code block
      currentChunk.push(...codeBlock)
      currentSize += codeBlockSize
      i = codeBlockEnd
      continue
    }

    // Check if this line would exceed max size
    if (currentSize + lineSize > options.maxSize && currentChunk.length > 0) {
      // Look for a good break point (heading or empty line)
      const breakPoint = findBreakPoint(lines, i, options.overlap)

      // Save current chunk
      chunks.push(createChunk(doc, currentChunk, chunks.length, currentH1, currentH2, currentH3))

      // Start new chunk with overlap
      if (breakPoint > 0) {
        currentChunk = lines.slice(i - breakPoint, i)
        currentSize = currentChunk.join('\n').length
      } else {
        currentChunk = []
        currentSize = 0
      }
    }

    currentChunk.push(line)
    currentSize += lineSize
  }

  // Don't forget the last chunk
  if (currentChunk.length > 0 && currentSize >= options.minSize) {
    chunks.push(createChunk(doc, currentChunk, chunks.length, currentH1, currentH2, currentH3))
  }

  return chunks
}

function slidingWindowChunk(doc: CleanedDocument, options: ChunkingOptions): DocumentChunk[] {
  const chunks: DocumentChunk[] = []
  const text = doc.content
  const words = text.split(/\s+/)
  const stepSize = Math.max(1, options.maxSize - options.overlap)

  for (let i = 0; i < words.length; i += stepSize) {
    const chunkWords = words.slice(i, i + options.maxSize)
    const chunkText = chunkWords.join(' ')

    if (chunkText.length >= options.minSize && chunkText.trim()) {
      chunks.push({
        id: generateChunkId(doc.url, i),
        content: chunkText.trim(),
        metadata: {
          url: doc.url,
          title: doc.metadata.title,
          path: doc.path,
          chunkIndex: chunks.length,
          totalChunks: 0, // Will be updated after
        },
      })
    }
  }

  // Update total chunks
  for (const chunk of chunks) {
    chunk.metadata.totalChunks = chunks.length
  }

  return chunks
}

function fixedSizeChunk(doc: CleanedDocument, options: ChunkingOptions): DocumentChunk[] {
  const chunks: DocumentChunk[] = []
  const text = doc.content

  for (let i = 0; i < text.length; i += options.maxSize - options.overlap) {
    const chunkText = text.slice(i, i + options.maxSize)

    if (chunkText.length >= options.minSize && chunkText.trim()) {
      chunks.push({
        id: generateChunkId(doc.url, i),
        content: chunkText.trim(),
        metadata: {
          url: doc.url,
          title: doc.metadata.title,
          path: doc.path,
          chunkIndex: chunks.length,
          totalChunks: 0, // Will be updated after
        },
      })
    }
  }

  // Update total chunks
  for (const chunk of chunks) {
    chunk.metadata.totalChunks = chunks.length
  }

  return chunks
}

function createChunk(
  doc: CleanedDocument,
  lines: string[],
  index: number,
  h1: string,
  h2: string,
  h3: string,
): DocumentChunk {
  // Add heading context if not already present
  const content = lines.join('\n')
  let contextualContent = content

  // Prepend heading hierarchy if chunk doesn't start with it
  if (!content.startsWith(h1) && h1) {
    const headings = [h1]
    if (h2 && !content.includes(h2)) headings.push(h2)
    if (h3 && !content.includes(h3)) headings.push(h3)

    if (headings.length > 0) {
      contextualContent = `${headings.join('\n')}\n\n${content}`
    }
  }

  // CRITICAL: Enforce hard limit to prevent exceeding embedding API token limits
  // OpenAI text-embedding-3-small has 8192 token limit
  // Using ~4 chars per token estimate: 6000 chars ≈ 1500 tokens (safe margin)
  const MAX_CHUNK_CHARS = 6000
  if (contextualContent.length > MAX_CHUNK_CHARS) {
    contextualContent = contextualContent.substring(0, MAX_CHUNK_CHARS)
  }

  // Validate that content is not empty
  const trimmedContent = contextualContent.trim()
  if (!trimmedContent) {
    throw new Error(`Empty chunk content for URL: ${doc.url}`)
  }

  return {
    id: generateChunkId(doc.url, index),
    content: trimmedContent,
    metadata: {
      url: doc.url,
      title: doc.metadata.title,
      path: doc.path,
      chunkIndex: index,
      totalChunks: 0, // Will be updated after all chunks are created
      section: h3 || h2 || h1 || '',
    },
  }
}

function findBreakPoint(lines: string[], currentIndex: number, maxLookback: number): number {
  // Look for a good break point within the overlap distance
  const lookbackLimit = Math.max(0, currentIndex - maxLookback)

  for (let i = currentIndex - 1; i >= lookbackLimit; i--) {
    const line = lines[i]
    // Good break points: headings or empty lines
    if (line.trim() === '' || line.startsWith('#')) {
      return currentIndex - i - 1
    }
  }

  return 0
}

function generateChunkId(url: string, index: number): string {
  // Normalize URL by removing trailing slash for consistent IDs
  const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url
  const hash = createHash('sha256')
  hash.update(normalizedUrl + index)
  return hash.digest('hex').substring(0, 16)
}
