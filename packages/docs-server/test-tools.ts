import { config } from 'dotenv'
import { getDocsDatabase } from './src/db/chroma.js'

// Load environment variables
config()

async function testTools() {
  console.log('🧪 Testing MCP Tools\n')
  
  const db = getDocsDatabase(process.env.OPENAI_API_KEY!)
  
  try {
    // Test 1: List Projects
    console.log('📋 Test 1: List Projects')
    console.log('------------------------')
    const projects = await db.listProjects()
    console.log('MCP Response:', JSON.stringify({
      tool: 'listProjects',
      arguments: {},
      response: { projects }
    }, null, 2))
    console.log('\n')

    // Test 2: Search across all projects
    console.log('🔍 Test 2: Search "user roles" (all projects)')
    console.log('---------------------------------------------')
    try {
      const searchResults1 = await db.searchDocs('user roles', { limit: 3 })
      console.log('MCP Response:', JSON.stringify({
        tool: 'searchDocs',
        arguments: { query: 'user roles', limit: 3 },
        response: {
          results: searchResults1.map(r => ({
            content: r.content?.substring(0, 200) + '...',
            metadata: r.metadata,
            relevance: 1 - (r.distance || 0)
          }))
        }
      }, null, 2))
    } catch (err) {
      console.error('Error:', err)
    }
    console.log('\n')

    // Test 3: Search within specific project
    console.log('🔍 Test 3: Search "role" in supertokens project')
    console.log('------------------------------------------------')
    try {
      const searchResults2 = await db.searchDocs('role', {
        projectName: 'supertokens',
        limit: 3
      })
      console.log('MCP Response:', JSON.stringify({
        tool: 'searchDocs',
        arguments: { query: 'role', projectName: 'supertokens', limit: 3 },
        response: {
          results: searchResults2.map(r => ({
            content: r.content?.substring(0, 200) + '...',
            metadata: r.metadata,
            relevance: 1 - (r.distance || 0)
          }))
        }
      }, null, 2))
    } catch (err) {
      console.error('Error:', err)
    }
    console.log('\n')

    // Test 4: Get specific document
    console.log('📄 Test 4: Get specific document')
    console.log('--------------------------------')
    try {
      const doc = await db.getDocByPath('supertokens', '/docs/references/cdi/user-roles/get-role-users.md')
      console.log('MCP Response:', JSON.stringify({
        tool: 'getDocs',
        arguments: {
          projectName: 'supertokens',
          path: '/docs/references/cdi/user-roles/get-role-users.md'
        },
        response: doc ? {
          path: doc.path,
          content: doc.content?.substring(0, 300) + '...',
          metadata: doc.metadata
        } : null
      }, null, 2))
    } catch (err) {
      console.error('Error:', err)
    }
    console.log('\n')

    // Test 5: Search with empty filter (edge case)
    console.log('🔍 Test 5: Search with empty filter')
    console.log('-----------------------------------')
    try {
      const searchResults3 = await db.searchDocs('GET', {
        projectName: 'supertokens',
        limit: 2,
        filter: {} // Empty filter should work now
      })
      console.log('MCP Response:', JSON.stringify({
        tool: 'searchDocs',
        arguments: { query: 'GET', projectName: 'supertokens', limit: 2, filter: {} },
        response: {
          results: searchResults3.map(r => ({
            content: r.content?.substring(0, 200) + '...',
            metadata: r.metadata,
            relevance: 1 - (r.distance || 0)
          }))
        }
      }, null, 2))
    } catch (err) {
      console.error('Error:', err)
    }

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run tests
testTools().then(() => {
  console.log('✅ Tests completed')
  process.exit(0)
}).catch(err => {
  console.error('❌ Tests failed:', err)
  process.exit(1)
})