import { getDocsDatabase } from '../db/chroma.js'

export const getDocsDefinition = {
  name: 'get_docs',
  description:
    'Retrieve full documentation content by URL path. Use this to get complete API documentation, guides, or reference material when you know the specific path. Make sure to pass the project name for accurate results.',
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
    },
    required: ['project', 'path'],
  },
}

export async function getDocsHandler(args: { project: string; path: string }) {
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

    return {
      content: [
        {
          type: 'text',
          text: `# ${doc.metadata?.title || 'Documentation'}

**URL:** ${doc.metadata?.url || 'N/A'}
**Last Updated:** ${doc.metadata?.cleanedAt || doc.metadata?.crawledAt || 'Unknown'}

${doc.content}`,
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
