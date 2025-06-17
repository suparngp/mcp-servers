# MCP Documentation Server

A Model Context Protocol (MCP) server that provides indexed documentation search capabilities for coding agents. This server enables Claude and other MCP clients to search through pre-indexed API documentation, SDK references, technical guides, and other documentation using natural language queries.

## Overview

This server solves the problem of coding agents not having access to up-to-date API documentation and technical references. It crawls documentation websites, creates semantic embeddings, and provides fast, accurate search results through MCP tools. Perfect for helping agents understand APIs, find code examples, and access technical documentation.

## Features

- 🕷️ **Web Crawling**: Uses Python's crawl4ai to extract clean markdown from documentation sites
- 🚀 **Dual Crawling Modes**: Browser-based (for JS-heavy sites) or HTTP-only (for static sites)
- 🔍 **Semantic Search**: Vector embeddings with OpenAI's text-embedding-3-small model
- 💾 **Vector Storage**: ChromaDB for efficient similarity search
- 🔌 **MCP Integration**: Fully compatible with Claude Code and other MCP clients
- 🌐 **Web Interface**: Modern dark-themed UI for testing and browsing indexed docs
- 📦 **Multi-Project Support**: Index and search across multiple documentation sites

## Prerequisites

- Node.js 20+
- Python 3.8+
- Docker (for ChromaDB)
- pnpm package manager
- OpenAI API key

## Installation

1. **Clone and install dependencies:**
   ```bash
   cd packages/docs-server
   pnpm install
   ```

2. **Set up Python environment:**
   ```bash
   pnpm setup
   # Or manually:
   cd scripts
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key:
   # OPENAI_API_KEY=sk-...
   ```

4. **Start ChromaDB:**
   ```bash
   docker-compose up -d
   ```
   This starts ChromaDB on port 7777 with persistent storage in `./data/chroma`.

## Usage

### 1. Configure a Documentation Site

Create a configuration file in `sites/[project-name]/config.json`:

```json
{
  "name": "myproject",
  "displayName": "My Project Docs",
  "baseUrl": "https://docs.example.com",
  "crawl": {
    "strategy": {
      "type": "bfs",
      "maxDepth": 3,
      "maxPages": 100
    },
    "includePatterns": ["^/docs/"],
    "excludePatterns": ["/changelog", "/blog"],
    "jsEnabled": true,
    "waitForSelector": "main"
  },
  "extraction": {
    "selector": "main",
    "excludeSelectors": ["nav", "footer", ".sidebar"]
  },
  "cleaners": [
    "removeEmptyLines",
    "normalizeWhitespace",
    "extractMetadata"
  ],
  "chunking": {
    "strategy": "semantic",
    "maxSize": 1000,
    "overlap": 200
  }
}
```

#### Crawler Mode Configuration

To automatically use the HTTP crawler (without browser) for a project, add `preferSimple` to the crawl config:

```json
{
  "crawl": {
    "preferSimple": true,  // Use HTTP crawler by default
    // ... other config
  }
}
```

This is useful for documentation sites that don't require JavaScript rendering.

### 2. Run the Pipeline

```bash
# Build the TypeScript code
pnpm build

# Run the full pipeline (concurrent by default)
pnpm pipeline:run myproject

# Use HTTP crawler (no browser) for faster crawling
pnpm pipeline:run myproject --http

# Run in sequential mode (legacy)
pnpm pipeline:run myproject --sequential

# Or run individual steps:
pnpm pipeline:crawl myproject
pnpm pipeline:clean myproject
pnpm pipeline:embed myproject
```

The concurrent pipeline offers significant performance improvements by:
- Processing pages as soon as they're discovered (no waiting for all URLs)
- Fetching and embedding in parallel
- Using lightweight HTTP requests instead of browser automation when possible

For projects like SuperTokens that don't require JavaScript rendering, the `--http` flag uses lightweight HTTP requests instead of a full browser, reducing resource usage and improving speed.

### 3. Test with Web Interface

```bash
pnpm web
# Open http://localhost:3000
```

The web interface allows you to:
- Search documentation with semantic queries
- View indexed projects
- Browse document content in markdown or plain text
- Test search relevance

### 4. Use with Claude Code

1. **Add to Claude Code configuration:**

   Edit your Claude Code MCP settings file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/claude/claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "docs-server": {
         "command": "node",
         "args": ["/path/to/mcp-servers/packages/docs-server/dist/index.js"],
         "env": {
           "OPENAI_API_KEY": "sk-..."
         }
       }
     }
   }
   ```

2. **Restart Claude Code** to load the MCP server.

3. **Use in conversations:**
   ```
   "Search the API docs for authentication endpoints"
   "Find the user roles management documentation"
   "Show me how to implement OAuth2 with SuperTokens"
   "What are the available WebAuthn API endpoints?"
   ```

## MCP Tools

The server provides three powerful tools for accessing indexed documentation:

### `search_docs`
Search through indexed documentation using natural language queries. Perfect for finding API endpoints, understanding authentication flows, locating code examples, or discovering implementation details.
- **query** (required): Natural language search query (e.g., "authentication API", "how to implement OAuth", "error handling")
- **project** (optional): Limit search to a specific project
- **limit** (optional): Maximum number of results to return (default: 5)

Example queries:
- "How do I authenticate users with email and password?"
- "WebAuthn API endpoints"
- "OAuth2 client configuration"
- "Rate limiting implementation"

### `get_docs`
Retrieve complete documentation content by URL path. Use this when you need the full API reference, guide, or documentation page.
- **project** (required): Project name (use list_projects to see available)
- **path** (required): URL path of the documentation (e.g., /api/auth, /guides/quickstart)

### `list_projects`
List all available documentation projects with their indexing status. Shows which API documentation, SDK references, and technical guides are currently indexed and searchable.

## Architecture

```
┌─────────────────────────────┐
│      crawl.py (Python)      │
│  ┌─────────┐ ┌───────────┐ │     ┌──────────────┐     ┌─────────────┐
│  │ Browser │ │   HTTP    │ │────▶│   Cleaner    │────▶│  Embedder   │
│  │  Mode   │ │   Mode    │ │     │ (TypeScript) │     │ (TypeScript)│
│  └─────────┘ └───────────┘ │     └──────────────┘     └─────────────┘
│    Playwright    aiohttp    │            │                     │
│         ↓           ↓       │            ▼                     ▼
│       crawler4ai parsing    │      Clean Markdown         Vector Store
└─────────────────────────────┘       + Metadata            (ChromaDB)
              │                                                  │
              ▼                                                  ▼
         Raw Markdown                                    ┌─────────────┐
          + Metadata                                     │ MCP Server  │
                                                        │(TypeScript) │
                                                        └─────────────┘
```

The crawler (crawl.py) supports two modes:
- **Browser Mode**: Uses Playwright for JavaScript-heavy sites
- **HTTP Mode** (--no-browser): Uses aiohttp for static sites, then processes with crawler4ai's raw:// scheme

Both modes use crawler4ai's markdown generation for consistent output.

## Advanced Usage

### Using the Unified Pipeline CLI

After installing globally with `npm link`, you can use the `docs-pipeline` command:

```bash
# Show all available commands
docs-pipeline --help

# Run pipeline (concurrent by default)
docs-pipeline run myproject

# Run with HTTP crawler (no browser)
docs-pipeline run supertokens --http

# Run with custom concurrency
docs-pipeline run myproject --concurrency 10

# Force re-process all pages
docs-pipeline run myproject --force

# Run sequential pipeline (legacy mode)
docs-pipeline run myproject --sequential

# Run specific pipeline stages
docs-pipeline crawl myproject
docs-pipeline clean myproject
docs-pipeline embed myproject
```

### Pipeline Modes Comparison

| Feature | Sequential | Concurrent | Concurrent + HTTP |
|---------|------------|------------|-------------------|
| Speed | Slowest | Fast | Fastest |
| Memory Usage | Low | Medium | Low |
| Browser Required | Yes | Yes | No |
| JavaScript Support | Yes | Yes | No |
| Best For | Complex sites | Most sites | Static docs |

### Programmatic Usage

You can also use the pipeline programmatically in your own scripts:

```typescript
import { runConcurrentPipeline } from '@mcp-servers/docs-server'

// Use browser-based crawler (default)
await runConcurrentPipeline('myproject', {
  apiKey: process.env.OPENAI_API_KEY,
  maxConcurrency: 10,
  force: false
})

// Use HTTP crawler (no browser)
await runConcurrentPipeline('supertokens', {
  apiKey: process.env.OPENAI_API_KEY,
  useSimpleCrawler: true,  // Uses HTTP crawler
  maxConcurrency: 10,
  force: false
})
```

## Development

```bash
# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Watch mode for development
pnpm dev
```

## Troubleshooting

### ChromaDB Connection Issues
- Ensure Docker is running: `docker ps`
- Check ChromaDB logs: `docker-compose logs chroma`
- Verify port 7777 is not in use: `lsof -i :7777`

### Crawling Issues
- Check Python virtual environment is activated
- Verify crawl4ai installation: `pip list | grep crawl4ai`
- Check site config for correct selectors

### Embedding Issues
- Verify OpenAI API key is set correctly
- Check API key has sufficient credits
- Monitor rate limits in OpenAI dashboard

## Adding Custom Cleaners

Create a new cleaner in `src/pipeline/cleaners/`:

```typescript
export function myCustomCleaner(content: string): string {
  // Transform content
  return content.replace(/pattern/g, 'replacement')
}
```

Then add it to your site configuration's `cleaners` array.

## License

MIT