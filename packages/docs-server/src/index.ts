#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { config } from 'dotenv'

import { getDocsDefinition, getDocsHandler } from './tools/getDocs.js'
import { listProjectsDefinition, listProjectsHandler } from './tools/listProjects.js'
import { searchDocsDefinition, searchDocsHandler } from './tools/searchDocs.js'

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url))

// Find the package root (where sites directory should be)
let packageRoot = __dirname
// If we're in dist/, go up one level
if (__dirname.endsWith('dist')) {
  packageRoot = dirname(__dirname)
}

// Change to package root directory if sites exists there
const sitesPath = join(packageRoot, 'sites')
if (existsSync(sitesPath)) {
  process.chdir(packageRoot)
}

// Load environment variables
config()

const server = new Server(
  {
    name: 'docs-server',
    version: '0.0.1',
    description:
      'MCP server for searching and retrieving indexed documentation including API references, guides, and technical documentation',
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
