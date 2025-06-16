// Base cleaner functions that can be composed

export const removeEmptyLines = (content: string): string => {
  return content
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .join('\n')
}

export const normalizeWhitespace = (content: string): string => {
  return content
    .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
    .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive newlines
    .trim()
}

export const removeExcessiveNewlines = (content: string): string => {
  return content.replace(/\n{4,}/g, '\n\n\n')
}

export const extractCodeBlocks = (content: string): string => {
  // Preserve code blocks but clean around them
  const codeBlockRegex = /```[\s\S]*?```/g
  const codeBlocks: string[] = []

  // Extract and store code blocks
  let match: RegExpExecArray | null = codeBlockRegex.exec(content)
  while (match !== null) {
    codeBlocks.push(match[0])
    match = codeBlockRegex.exec(content)
  }

  // Replace code blocks with placeholders
  let cleanedContent = content
  codeBlocks.forEach((block, index) => {
    cleanedContent = cleanedContent.replace(block, `__CODE_BLOCK_${index}__`)
  })

  // Clean the content
  cleanedContent = normalizeWhitespace(cleanedContent)

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    cleanedContent = cleanedContent.replace(`__CODE_BLOCK_${index}__`, block)
  })

  return cleanedContent
}

export const removeHtmlComments = (content: string): string => {
  return content.replace(/<!--[\s\S]*?-->/g, '')
}

export const cleanUrls = (content: string): string => {
  // Convert relative URLs to more readable format
  return content.replace(/\[([^\]]+)\]\(\/([^)]+)\)/g, '[$1](/$2)')
}

export const removeDuplicateHeaders = (content: string): string => {
  const lines = content.split('\n')
  const cleaned: string[] = []
  let lastHeader = ''

  for (const line of lines) {
    if (line.startsWith('#')) {
      if (line !== lastHeader) {
        cleaned.push(line)
        lastHeader = line
      }
    } else {
      cleaned.push(line)
      if (line.trim()) {
        lastHeader = ''
      }
    }
  }

  return cleaned.join('\n')
}

export const extractMetadata = (
  content: string,
): { content: string; metadata: Record<string, unknown> } => {
  const metadata: Record<string, unknown> = {}

  // Extract title - try multiple patterns
  // Pattern 1: Standard markdown h1 (# Title)
  let titleMatch = content.match(/^#\s+(.+)$/m)
  
  // Pattern 2: If no h1, try h2 (## Title)
  if (!titleMatch) {
    titleMatch = content.match(/^##\s+(.+)$/m)
  }
  
  // Pattern 3: Look for any heading at the start
  if (!titleMatch) {
    titleMatch = content.match(/^#{1,6}\s+(.+)$/m)
  }
  
  if (titleMatch) {
    metadata.title = titleMatch[1].trim()
  }

  // Extract description (first paragraph after title)
  const descMatch = content.match(/^#{1,6}\s+.+\n+([^#\n].+?)(?:\n\n|$)/m)
  if (descMatch) {
    metadata.description = descMatch[1].trim()
  }

  return { content, metadata }
}
