# Documentation Pipeline Flow

## Overview
The pipeline processes documentation in 4 phases: Discover → Crawl → Clean → Embed

## State Management
- State is stored in `sites/{project}/state.json`
- Each URL has a state object with:
  - `url`: The URL
  - `status`: pending | crawling | completed | failed
  - `crawledAt`: Timestamp when crawled
  - `contentHash`: SHA-256 hash of cleaned content
  - `embeddedAt`: Timestamp when embedded
  - `error`: Error message if failed
  - `retries`: Number of retry attempts

## Phase 1: Discovery
1. Uses the Python `discover.py` script to find all documentation URLs
2. Updates state with discovered URLs as 'pending'
3. Sets `lastDiscovery` timestamp

## Phase 2: Crawl
1. Selects URLs to crawl:
   - With `--force`: All URLs
   - Without force: Only 'pending' or 'failed' status
   - Respects `maxPages` limit
2. Uses Python `crawl.py` to fetch content
3. Saves raw markdown to `sites/{project}/raw/`
4. Updates URL state:
   - Preserves existing fields (contentHash, embeddedAt)
   - Sets status to 'completed'
   - Updates `crawledAt` timestamp
5. Failed URLs marked as 'failed' with retry count

## Phase 3: Clean
1. Reads all raw markdown files
2. Applies configured cleaners
3. Saves cleaned documents to `sites/{project}/cleaned/`
4. **Calculates content hash** for each document
5. Updates URL state with `contentHash`
6. Saves state with all content hashes

## Phase 4: Embed
1. Reads all cleaned documents
2. For each document:
   - Calculates current content hash
   - Compares with stored `contentHash`
   - **Skips if hash matches AND `embeddedAt` exists** (unless --force)
3. For changed/new documents:
   - Chunks the content
   - Replaces existing chunks in ChromaDB
   - Updates state with new `embeddedAt` and `contentHash`
4. Updates total chunk count:
   - With force: Replaces total
   - Without force: Adds to existing total

## Key Features
- **Incremental Updates**: Only processes changed content
- **Content Hashing**: Detects actual content changes
- **State Preservation**: Crawling preserves embedding info
- **Force Option**: Can re-process everything with --force
- **Efficient Storage**: ChromaDB only stores unique content

## Common Commands
```bash
# Full pipeline
npm run pipeline:run myproject

# Individual phases
npm run pipeline:crawl myproject
npm run pipeline:clean myproject
npm run pipeline:embed myproject

# Force re-embed all
npm run pipeline:embed myproject -- --force
```