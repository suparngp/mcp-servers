import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { spawn } from 'child_process'

async function testMCPServer() {
  // Start the MCP server as a subprocess
  const serverProcess = spawn('node', ['dist/index.js'], {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  // Create MCP client
  const transport = new StdioClientTransport({
    stdioProcess: serverProcess,
  })

  const client = new Client({
    name: 'test-client',
    version: '1.0.0',
  }, {
    capabilities: {}
  })

  // Connect to the server
  await client.connect(transport)

  console.log('Connected to MCP server\n')

  // List available tools
  const tools = await client.listTools()
  console.log('Available tools:')
  console.log(JSON.stringify(tools, null, 2))
  console.log('\n---\n')

  // Test 1: List projects
  console.log('Test 1: List projects')
  const listProjectsResult = await client.callTool({
    name: 'listProjects',
    arguments: {}
  })
  console.log('Result:', JSON.stringify(listProjectsResult, null, 2))
  console.log('\n---\n')

  // Test 2: Search for role-related docs
  console.log('Test 2: Search for "user roles"')
  const searchResult = await client.callTool({
    name: 'searchDocs',
    arguments: {
      query: 'user roles',
      projectName: 'supertokens',
      limit: 3
    }
  })
  console.log('Result:', JSON.stringify(searchResult, null, 2))
  console.log('\n---\n')

  // Test 3: Get specific doc
  console.log('Test 3: Get specific doc')
  const getDocResult = await client.callTool({
    name: 'getDocs',
    arguments: {
      projectName: 'supertokens',
      path: '/docs/references/cdi/user-roles/get-role-users.md'
    }
  })
  console.log('Result:', JSON.stringify(getDocResult, null, 2))

  // Clean up
  await client.close()
  serverProcess.kill()
}

// Run the test
testMCPServer().catch(console.error)