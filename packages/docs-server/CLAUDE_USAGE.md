# Using docs-pipeline with Claude

After installing the package globally with `npm link`, you can use the `docs-pipeline` command in Claude conversations.

## Quick Start

```bash
# Run the pipeline (concurrent by default)
docs-pipeline run myproject

# For static documentation sites (faster, no browser)
docs-pipeline run myproject --http

# Process specific URLs
docs-pipeline run myproject -u https://example.com/docs/api https://example.com/docs/guide

# Run with higher concurrency
docs-pipeline run myproject -c 10

# Force re-process everything
docs-pipeline run myproject --force
```

## Individual Steps

```bash
# Just crawl
docs-pipeline crawl myproject --http

# Just clean
docs-pipeline clean myproject

# Just embed
docs-pipeline embed myproject
```

## Examples

### SuperTokens (static docs, use HTTP mode)
```bash
docs-pipeline run supertokens --http
```

### React/Next.js (may need JavaScript, use browser mode)
```bash
docs-pipeline run react
```

### Sequential Mode (if you encounter issues with concurrent)
```bash
docs-pipeline run myproject --sequential
```

## Notes

- The pipeline runs concurrently by default for better performance
- Use `--http` flag for static documentation sites (much faster)
- Use `--sequential` only if you encounter issues with concurrent mode
- API key can be set via `--api-key` flag or `OPENAI_API_KEY` environment variable