import { getDocsDatabase } from '../db/chroma.js'

export const searchDocsDefinition = {
  name: 'search_docs',
  description:
    'Search indexed documentation using semantic search. Includes API references, SDK documentation, guides, and technical documentation. Use natural language queries to find relevant information.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'Natural language search query (e.g., "authentication API", "how to implement OAuth", "error handling")',
      },
      project: {
        type: 'string',
        description:
          'Optional: Limit search to a specific project (use list_projects to see available projects)',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results to return (default: 5)',
        default: 5,
      },
    },
    required: ['query'],
  },
}

export async function searchDocsHandler(args: {
  query: string
  project?: string
  limit?: number
}) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set')
  }

  const db = getDocsDatabase(apiKey)

  try {
    const results = await db.searchDocs(args.query, {
      projectName: args.project,
      limit: args.limit || 5,
    })

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No results found for your query.',
          },
        ],
      }
    }

    // Format results
    const formattedResults = results.map((result, index) => {
      const metadata = result.metadata || {}
      const chunkInfo = metadata.chunkIndex !== undefined && metadata.totalChunks !== undefined
        ? ` (Chunk ${Number(metadata.chunkIndex) + 1}/${metadata.totalChunks})`
        : ''
      
      return `## Result ${index + 1}: ${metadata.title || 'Untitled'}${chunkInfo}

**Source:** ${metadata.url || 'Unknown'}
**Path:** ${metadata.path || 'Unknown'}
**Section:** ${metadata.section || 'N/A'}
**Relevance:** ${((1 - (result.distance || 0)) * 100).toFixed(1)}%

${result.content}

---`
    })

    return {
      content: [
        {
          type: 'text',
          text: formattedResults.join('\n\n'),
        },
      ],
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching documentation: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    }
  }
}
