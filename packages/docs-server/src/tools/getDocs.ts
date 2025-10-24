import { getDocsDatabase } from '../db/chroma.js'
import { readCleanedFile, paginateContent } from '../utils/fileReader.js'

export const getDocsDefinition = {
  name: 'get_docs',
  description:
    'Retrieve full documentation content by URL path. Use this to get complete API documentation, guides, or reference material when you know the specific path. Content is paginated with ~15,000 tokens per page. Make sure to pass the project name for accurate results.',
  inputSchema: {
    type: 'object',
    properties: {
      project: {
        type: 'string',
        description: 'Project name (use list_projects to see available projects)',
      },
      path: {
        type: 'string',
        description:
          'URL path of the documentation (e.g., /references/cdi/introduction, /api/authentication, /guides/quickstart)',
      },
      page: {
        type: 'number',
        description: 'Page number (1-indexed). If omitted, returns page 1. Use totalPages in response to know how many pages are available.',
        minimum: 1,
      },
    },
    required: ['project', 'path'],
  },
}

export async function getDocsHandler(args: { project: string; path: string; page?: number }) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set')
  }

  const db = getDocsDatabase(apiKey)

  try {
    // Try multiple path variations
    const pathVariations = []
    let basePath = args.path
    
    // Remove leading slash if present
    if (basePath.startsWith('/')) {
      basePath = basePath.substring(1)
    }
    
    // Try the path as-is
    pathVariations.push(basePath)
    
    // Try with .md extension
    if (!basePath.endsWith('.md')) {
      pathVariations.push(basePath + '.md')
    }
    
    // Try with index.md for directory paths
    if (!basePath.includes('.')) {
      pathVariations.push(basePath + '/index.md')
      if (!basePath.endsWith('/')) {
        pathVariations.push(basePath + '/index.md')
      }
    }
    
    // Try with leading slash variations
    for (const p of [...pathVariations]) {
      pathVariations.push('/' + p)
    }
    
    // Special case for root
    if (basePath === '' || basePath === '/') {
      pathVariations.push('index.md')
      pathVariations.push('/index.md')
    }

    // Try each variation
    let doc = null
    let triedPaths = []
    
    for (const path of pathVariations) {
      doc = await db.getDocByPath(args.project, path)
      triedPaths.push(path)
      if (doc) break
    }

    if (!doc) {
      // If still not found, try a search as fallback
      const searchResults = await db.searchDocs(args.path, {
        projectName: args.project,
        limit: 1
      })
      
      if (searchResults.length > 0) {
        // Found via search - get the full document
        const foundPath = searchResults[0].metadata?.path
        if (foundPath && typeof foundPath === 'string') {
          doc = await db.getDocByPath(args.project, foundPath)
        }
      }
      
      if (!doc) {
        return {
          content: [
            {
              type: 'text',
              text: `Documentation not found for path: ${args.path} in project: ${args.project}\n\nTried paths: ${triedPaths.join(', ')}`,
            },
          ],
        }
      }
    }

    // Read content from local file instead of ChromaDB
    const fileContent = await readCleanedFile(args.project, doc.path)

    if (!fileContent) {
      return {
        content: [
          {
            type: 'text',
            text: `Documentation found in index but file not available: ${doc.path}\n\nThis may happen if the cleaned files haven't been committed to git yet.`,
          },
        ],
      }
    }

    // Paginate content
    const { pages, totalPages, tokensPerPage } = paginateContent(fileContent, 15000)
    const currentPage = Math.min(Math.max(args.page || 1, 1), totalPages)
    const pageContent = pages[currentPage - 1]

    // Build response with pagination info
    let responseText = `# ${doc.metadata?.title || 'Documentation'}

**URL:** ${doc.metadata?.url || 'N/A'}
**Last Updated:** ${doc.metadata?.cleanedAt || doc.metadata?.crawledAt || 'Unknown'}
**Page:** ${currentPage} of ${totalPages} (~${tokensPerPage} tokens per page)

${totalPages > 1 ? `---\n**Note:** This document has ${totalPages} pages. To view other pages, call this tool again with the \`page\` parameter.\n---\n\n` : ''}${pageContent}`

    return {
      content: [
        {
          type: 'text',
          text: responseText,
        },
      ],
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error retrieving documentation: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    }
  }
}
