# Documentation Sites Configuration Guide

This guide provides the exact JSON structure for configuring documentation sites in the docs-server.

## config.json Structure

```jsonc
{
  // Internal identifier (lowercase, no spaces)
  "name": "example-site",
  
  // Display name shown in UI
  "displayName": "Example Documentation",
  
  // Starting URL for crawling
  "baseUrl": "https://example.com/docs",
  
  // Optional: How to discover URLs
  "discovery": {
    // Either "crawl" (follow links) or "sitemap" (use XML sitemap)
    "strategy": "crawl",
    // Required if strategy is "sitemap"
    "sitemapUrl": "https://example.com/sitemap.xml"
  },
  
  // Crawling configuration
  "crawl": {
    // Crawling algorithm settings
    "strategy": {
      // Algorithm: "bfs" (breadth-first), "dfs" (depth-first), or "best-first"
      "type": "bfs",
      // Maximum link depth from baseUrl
      "maxDepth": 3,
      // Maximum total pages to crawl
      "maxPages": 500,
      // Whether to crawl external domains
      "includeExternal": false
    },
    
    // Optional: Only crawl URLs matching these patterns
    "includePatterns": ["/docs/", "/guide/"],
    
    // Optional: Skip URLs matching these patterns
    "excludePatterns": ["/api/", "/blog/"],
    
    // Optional: Accepted MIME types
    "contentTypes": ["text/html"],
    
    // Whether to use streaming mode
    "stream": false,
    
    // Delay between requests in seconds
    "delay": 1.0,
    
    // Request timeout in seconds
    "timeout": 30,
    
    // Whether to render JavaScript
    "jsEnabled": true,
    
    // Optional: CSS selector to wait for before extracting
    "waitForSelector": "main",
    
    // Whether to respect robots.txt
    "respectRobots": true,
    
    // Optional: Custom HTTP headers
    "headers": {
      "User-Agent": "MCP-Docs-Server/1.0"
    },
    
    // Optional: Use lightweight crawler when possible
    "preferSimple": true
  },
  
  // Content extraction settings
  "extraction": {
    // CSS selector for main content
    "selector": "main",
    
    // CSS selectors to remove from content
    "excludeSelectors": [
      "nav",
      "header", 
      "footer",
      ".navbar",
      ".sidebar",
      ".navigation",
      ".breadcrumb",
      ".edit-page-link",
      ".docs-prevnext"
    ]
  },
  
  // Text processing pipeline
  "cleaners": [
    "removeEmptyLines",      // Remove empty lines
    "normalizeWhitespace",   // Normalize whitespace
    "extractCodeBlocks",     // Extract code blocks
    "removeExcessiveNewlines", // Remove excessive newlines
    "removeDuplicateHeaders", // Remove duplicate headers
    "extractMetadata"        // Extract metadata
  ],
  
  // Document chunking configuration
  "chunking": {
    // Strategy: "semantic", "fixed", or "sliding"
    "strategy": "semantic",
    // Maximum chunk size in tokens
    "maxSize": 800,
    // Overlapping tokens between chunks
    "overlap": 200,
    // Minimum chunk size in tokens
    "minSize": 10
  },
  
  // Embedding configuration
  "embedding": {
    // OpenAI model name
    "model": "text-embedding-3-small",
    // Vector dimensions
    "dimensions": 1536
  }
}
```

## state.json Structure

```jsonc
{
  // ISO timestamp of last crawl operation
  "lastCrawl": "2025-06-17T09:05:30.955Z",
  
  // ISO timestamp of last URL discovery
  "lastDiscovery": "2025-06-17T09:04:47.876Z",
  
  // Base URL of the site
  "baseUrl": "https://example.com/docs",
  
  // Map of URL to state object
  "urls": {
    "https://example.com/docs/intro": {
      // The URL
      "url": "https://example.com/docs/intro",
      // Status: "pending", "crawling", "completed", or "failed"
      "status": "completed",
      // Optional: When crawled
      "crawledAt": "2025-06-17T09:05:15.123Z",
      // Optional: Error message if failed
      "error": null,
      // Optional: Number of retry attempts
      "retries": 0,
      // Optional: Content hash for change detection
      "contentHash": "abc123...",
      // Optional: When embedded
      "embeddedAt": "2025-06-17T09:05:20.456Z"
    }
  },
  
  // Aggregated statistics
  "stats": {
    // Total URLs discovered
    "totalDiscovered": 150,
    // Successfully crawled URLs
    "totalCrawled": 145,
    // Failed URLs
    "totalFailed": 5,
    // Total pages processed
    "totalPages": 145,
    // Total chunks created
    "totalChunks": 823,
    // Optional: Last embedding run timestamp
    "lastEmbeddingRun": "2025-06-17T09:10:45.789Z"
  }
}
```

## Steps to Add a New Site

1. **Create directory structure:**
   ```bash
   mkdir -p sites/[site-name]/{raw,cleaned}
   ```

2. **Create config.json:**
   Copy the config.json template above and modify:
   - Set `name` to match directory name
   - Update `displayName` and `baseUrl`
   - Choose appropriate discovery strategy
   - Adjust crawl settings for the site
   - Modify extraction selectors if needed

3. **Create initial state.json:**
   ```json
   {
     "lastCrawl": null,
     "lastDiscovery": null,
     "baseUrl": "",
     "urls": {},
     "stats": {
       "totalDiscovered": 0,
       "totalCrawled": 0,
       "totalFailed": 0,
       "totalPages": 0,
       "totalChunks": 0,
       "lastEmbeddingRun": null
     }
   }
   ```

4. **Verify configuration:**
   - Ensure all required fields are present
   - Check URL patterns match site structure
   - Confirm extraction selectors capture content

5. **Run the crawler** to test your configuration

## Common Configurations

### Site with Sitemap
```jsonc
{
  "discovery": {
    "strategy": "sitemap",
    "sitemapUrl": "https://example.com/sitemap.xml"
  },
  // Limit crawling since sitemap provides all URLs
  "crawl": {
    "strategy": {
      "type": "bfs",
      "maxDepth": 1,
      "maxPages": 2000
    }
  }
}
```

### JavaScript-Heavy Site
```jsonc
{
  "crawl": {
    "jsEnabled": true,
    "waitForSelector": ".content-loaded",
    "timeout": 60,
    "preferSimple": false
  }
}
```

### API Documentation Site
```jsonc
{
  "crawl": {
    "includePatterns": ["/api/", "/reference/"],
    "excludePatterns": ["/blog/", "/community/"]
  },
  "chunking": {
    "strategy": "semantic",
    "maxSize": 1200,  // Larger chunks for API docs
    "overlap": 300
  }
}
```