import { promises as fs } from 'node:fs'
import { getDocsDatabase } from '../db/chroma.js'
import { loadSiteState } from '../pipeline/storage.js'

export const listProjectsDefinition = {
  name: 'list_projects',
  description:
    'List all available documentation projects with their indexing status. Shows which API documentation, SDK references, and technical guides are available for searching.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
}

export async function listProjectsHandler() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set')
  }

  try {
    // Get projects from database
    const db = getDocsDatabase(apiKey)
    const dbProjects = await db.listProjects()

    // Get projects from filesystem
    const sitesDir = 'sites'
    let fsProjects: string[] = []
    try {
      const entries = await fs.readdir(sitesDir, { withFileTypes: true })
      fsProjects = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    } catch {
      // Sites directory might not exist
    }

    // Combine information
    const projectInfo = await Promise.all(
      fsProjects.map(async (projectName) => {
        const dbProject = dbProjects.find((p) => p.name === projectName)
        const state = await loadSiteState(projectName)

        return {
          name: projectName,
          indexed: !!dbProject,
          totalPages: state.stats.totalPages,
          totalChunks: state.stats.totalChunks,
          lastCrawl: state.lastCrawl,
          lastEmbedding: state.stats.lastEmbeddingRun,
        }
      }),
    )

    if (projectInfo.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No documentation projects found.',
          },
        ],
      }
    }

    const formatted = projectInfo
      .map(
        (project) => `## ${project.name}
- Status: ${project.indexed ? '✅ Indexed' : '❌ Not indexed'}
- Total Pages: ${project.totalPages}
- Total Chunks: ${project.totalChunks}
- Last Crawl: ${project.lastCrawl || 'Never'}
- Last Embedding: ${project.lastEmbedding || 'Never'}`,
      )
      .join('\n\n')

    return {
      content: [
        {
          type: 'text',
          text: `# Documentation Projects\n\n${formatted}`,
        },
      ],
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error listing projects: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    }
  }
}
