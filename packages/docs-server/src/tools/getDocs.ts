import { getDocsDatabase } from '../db/chroma.js'

export const getDocsDefinition = {
  name: 'get_docs',
  description:
    'Retrieve full documentation content by URL path. Use this to get complete API documentation, guides, or reference material when you know the specific path.',
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
    // Normalize path
    let normalizedPath = args.path
    if (!normalizedPath.endsWith('.md')) {
      normalizedPath += '.md'
    }
    if (normalizedPath === '/.md') {
      normalizedPath = '/index.md'
    }

    const doc = await db.getDocByPath(args.project, normalizedPath)

    if (!doc) {
      return {
        content: [
          {
            type: 'text',
            text: `Documentation not found for path: ${args.path} in project: ${args.project}`,
          },
        ],
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
