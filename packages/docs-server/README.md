# MCP Documentation Server

A Model Context Protocol (MCP) server that crawls, indexes, and serves documentation from public websites to coding agents through semantic search.

## Overview

This server solves the problem of coding agents not knowing available APIs when projects have many endpoints. It pre-scrapes documentation, embeds it using OpenAI embeddings, stores vectors in ChromaDB, and serves the content via MCP for semantic search.

## Features

- 🕷️ **Web Crawling**: Uses Python's crawl4ai to extract clean markdown from documentation sites
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

### 2. Run the Pipeline

```bash
# Build the TypeScript code
pnpm build

# Run the full pipeline (crawl, clean, embed)
pnpm pipeline run myproject

# Or run individual steps:
pnpm pipeline crawl myproject
pnpm pipeline clean myproject
pnpm pipeline embed myproject
```

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
   "Search the SuperTokens docs for how to get users with a specific role"
   "Find React documentation about useEffect cleanup"
   "Show me the API reference for user authentication"
   ```

## MCP Tools

The server provides three MCP tools:

### `search_docs`
Search documentation using semantic search.
- **query** (required): Search query
- **project** (optional): Limit to specific project
- **limit** (optional): Max results (default: 5)

### `get_docs`
Retrieve a specific document by path.
- **project** (required): Project name
- **path** (required): Document path

### `list_projects`
List all indexed documentation projects.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Crawler   │────▶│   Cleaner    │────▶│  Embedder   │
│ (Python)    │     │ (TypeScript) │     │ (TypeScript)│
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
  Raw Markdown      Clean Markdown         Vector Store
   + Metadata        + Metadata            (ChromaDB)
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │ MCP Server  │
                                          │(TypeScript) │
                                          └─────────────┘
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