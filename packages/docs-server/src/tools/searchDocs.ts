import { getDocsDatabase } from '../db/chroma.js'

export const searchDocsDefinition = {
  name: 'search_docs',
  description: 'Search documentation using semantic search',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query to find relevant documentation',
      },
      project: {
        type: 'string',
        description: 'Project name to search within (optional, searches all if not specified)',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results to return',
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
      return `## Result ${index + 1}: ${metadata.title || 'Untitled'}

**Source:** ${metadata.url || 'Unknown'}
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
