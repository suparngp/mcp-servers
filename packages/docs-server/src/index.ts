#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { config } from 'dotenv'

import { getDocsDefinition, getDocsHandler } from './tools/getDocs.js'
import { listProjectsDefinition, listProjectsHandler } from './tools/listProjects.js'
import { searchDocsDefinition, searchDocsHandler } from './tools/searchDocs.js'

// Load environment variables
config()

const server = new Server(
  {
    name: 'docs-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

// Register tool definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [searchDocsDefinition, getDocsDefinition, listProjectsDefinition],
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case 'search_docs':
        return await searchDocsHandler(args as Parameters<typeof searchDocsHandler>[0])

      case 'get_docs':
        return await getDocsHandler(args as Parameters<typeof getDocsHandler>[0])

      case 'list_projects':
        return await listProjectsHandler()

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    }
  }
})

async function main() {
  // Check for required environment variables
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required')
    console.error('Set it with: export OPENAI_API_KEY=your-api-key')
    process.exit(1)
  }

  // Optional: Set ChromaDB path
  if (process.env.CHROMA_PATH) {
    console.log(`Using ChromaDB at: ${process.env.CHROMA_PATH}`)
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error('Docs MCP Server running...')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
