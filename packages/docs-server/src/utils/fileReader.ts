import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { encode } from 'gpt-tokenizer'

/**
 * Read a cleaned markdown file from the sites directory
 */
export async function readCleanedFile(projectName: string, path: string): Promise<string | null> {
  try {
    // Normalize the path - remove leading slash if present
    let normalizedPath = path.startsWith('/') ? path.substring(1) : path

    // Add .md extension if not present
    if (!normalizedPath.endsWith('.md')) {
      normalizedPath += '.md'
    }

    // Construct file path: sites/{project}/cleaned/{path}
    const filePath = resolve(process.cwd(), 'sites', projectName, 'cleaned', normalizedPath)

    const content = await readFile(filePath, 'utf-8')
    return content
  } catch (error) {
    // File doesn't exist or can't be read
    return null
  }
}

/**
 * Count actual tokens using GPT tokenizer (for GPT-3.5/GPT-4 compatible encoding)
 */
export function countTokens(text: string): number {
  try {
    const tokens = encode(text)
    return tokens.length
  } catch (error) {
    // Fallback to rough approximation if tokenization fails
    console.warn('Token counting failed, using approximation:', error)
    return Math.ceil(text.length / 4)
  }
}

/**
 * Paginate content by token count using accurate GPT tokenization
 */
export function paginateContent(
  content: string,
  tokensPerPage: number = 15000
): { pages: string[]; totalPages: number; tokensPerPage: number } {
  const totalTokens = countTokens(content)

  // If content fits in one page, return it as is
  if (totalTokens <= tokensPerPage) {
    return {
      pages: [content],
      totalPages: 1,
      tokensPerPage
    }
  }

  // Split content into pages
  // We'll split by paragraphs to avoid breaking mid-sentence
  const paragraphs = content.split(/\n\n+/)
  const pages: string[] = []
  let currentPage = ''
  let currentTokens = 0

  for (const paragraph of paragraphs) {
    const paragraphWithSeparator = paragraph + '\n\n'
    const paragraphTokens = countTokens(paragraphWithSeparator)

    // If a single paragraph exceeds the limit, split it by sentences
    if (paragraphTokens > tokensPerPage) {
      // Save current page if it has content
      if (currentPage.trim().length > 0) {
        pages.push(currentPage.trim())
        currentPage = ''
        currentTokens = 0
      }

      // Split large paragraph by sentences
      const sentences = paragraph.split(/(?<=[.!?])\s+/)
      for (const sentence of sentences) {
        const sentenceWithSpace = sentence + ' '
        const sentenceTokens = countTokens(sentenceWithSpace)

        if (currentTokens + sentenceTokens > tokensPerPage && currentPage.length > 0) {
          pages.push(currentPage.trim())
          currentPage = sentenceWithSpace
          currentTokens = sentenceTokens
        } else {
          currentPage += sentenceWithSpace
          currentTokens += sentenceTokens
        }
      }
      // Add paragraph separator after processing sentences
      currentPage += '\n'
      currentTokens = countTokens(currentPage)
      continue
    }

    // If adding this paragraph would exceed the limit
    if (currentTokens + paragraphTokens > tokensPerPage && currentPage.length > 0) {
      // Save current page and start a new one
      pages.push(currentPage.trim())
      currentPage = paragraphWithSeparator
      currentTokens = paragraphTokens
    } else {
      // Add to current page
      currentPage += paragraphWithSeparator
      currentTokens += paragraphTokens
    }
  }

  // Add the last page if it has content
  if (currentPage.trim().length > 0) {
    pages.push(currentPage.trim())
  }

  return {
    pages,
    totalPages: pages.length,
    tokensPerPage
  }
}
