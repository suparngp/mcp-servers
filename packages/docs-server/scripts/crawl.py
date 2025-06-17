#!/usr/bin/env python3
"""
Crawl4AI-based crawler that reads configuration and outputs markdown/json
Supports both browser-based and HTTP-only crawling modes
Usage: python crawl.py <config_path> <output_format> [--no-browser] <url1> [url2 ...]
"""
import asyncio
import json
import logging
import sys
from typing import List
import aiohttp

# Suppress httpx and other logging output
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("httpcore").setLevel(logging.WARNING)
logging.getLogger("crawl4ai").setLevel(logging.WARNING)

from crawl4ai import AsyncWebCrawler
from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator


async def crawl_site(config_path: str, output_format: str, urls: List[str], use_browser: bool = True):
    """Crawl sites based on configuration"""
    # Load config
    with open(config_path) as f:
        config = json.load(f)
    
    # Configure browser (minimal for HTTP mode, full for browser mode)
    browser_config = BrowserConfig(
        headless=True,
        viewport_width=1920 if use_browser else 1,
        viewport_height=1080 if use_browser else 1,
        verbose=False,  # Suppress browser logs
    )
    
    # Configure crawler run
    extraction_config = config.get('extraction', {})
    crawl_config = config.get('crawl', {})
    
    # Build excluded tags list
    excluded_tags = extraction_config.get('excludeSelectors', [])
    # Convert CSS selectors to tag names where possible
    tag_exclusions = []
    for selector in excluded_tags:
        # Simple tag selectors like "nav", "header", etc.
        if selector and not selector.startswith('.') and not selector.startswith('#'):
            tag_exclusions.append(selector)
    
    run_config = CrawlerRunConfig(
        # Basic settings
        wait_until="domcontentloaded" if use_browser else "load",
        delay_before_return_html=crawl_config.get('delay', 1.0) if use_browser else 0,
        
        # Content extraction
        css_selector=extraction_config.get('selector', 'main'),
        word_count_threshold=extraction_config.get('minWordCount', 10),
        excluded_tags=tag_exclusions if tag_exclusions else None,
        
        # JavaScript handling (only for browser mode)
        wait_for=crawl_config.get('waitForSelector') if use_browser else None,
        
        # Markdown generation
        markdown_generator=DefaultMarkdownGenerator(),
        
        # Other options
        verbose=False,
    )
    
    # Create HTTP session for non-browser mode
    session = None
    if not use_browser:
        headers = {
            'User-Agent': crawl_config.get('headers', {}).get('User-Agent', 'Mozilla/5.0 (compatible; DocsCrawler/1.0)')
        }
        timeout = aiohttp.ClientTimeout(total=crawl_config.get('timeout', 30))
        session = aiohttp.ClientSession(headers=headers, timeout=timeout)
    
    try:
        async with AsyncWebCrawler(config=browser_config, verbose=False) as crawler:
            for url in urls:
                try:
                    if use_browser:
                        # Browser mode: crawl normally
                        result = await crawler.arun(
                            url=url,
                            config=run_config
                        )
                    else:
                        # HTTP mode: fetch HTML first, then process with raw://
                        async with session.get(url) as response:
                            response.raise_for_status()
                            html_content = await response.text()
                        
                        # Process HTML using crawler4ai with raw:// scheme
                        result = await crawler.arun(
                            url="raw://" + html_content,
                            config=run_config
                        )
                    
                    if not result.success:
                        raise Exception(f"Crawl failed: {result.error_message}")
                    
                    # Extract content based on format
                    if output_format == 'json':
                        content = {
                            'title': result.metadata.get('title', ''),
                            'description': result.metadata.get('description', ''),
                            'content': result.markdown.raw_markdown if result.markdown else result.cleaned_html,
                            'raw_markdown': result.markdown.raw_markdown if result.markdown else '',
                            'html': result.html,
                        }
                    else:
                        # Use raw_markdown if available, otherwise cleaned_html
                        content = result.markdown.raw_markdown if result.markdown else result.cleaned_html
                    
                    # Output result
                    output = {
                        'url': url,
                        'content': content,
                        'title': result.metadata.get('title', ''),
                        'metadata': result.metadata
                    }
                    print(json.dumps(output))
                    sys.stdout.flush()
                    
                except aiohttp.ClientError as e:
                    error_output = {
                        'error': f'HTTP error: {str(e)}',
                        'url': url,
                        'type': 'crawl_error'
                    }
                    print(json.dumps(error_output), file=sys.stderr)
                except Exception as e:
                    error_output = {
                        'error': str(e),
                        'url': url,
                        'type': 'crawl_error'
                    }
                    print(json.dumps(error_output), file=sys.stderr)
    finally:
        if session:
            await session.close()


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python crawl.py <config_path> <output_format> [--no-browser] <url1> [url2 ...]")
        print("Output formats: markdown (default), json")
        print("Options: --no-browser  Use HTTP fetch instead of browser")
        sys.exit(1)
    
    config_path = sys.argv[1]
    output_format = sys.argv[2].lower()
    
    # Check for --no-browser flag
    use_browser = True
    url_start_idx = 3
    if len(sys.argv) > 3 and sys.argv[3] == '--no-browser':
        use_browser = False
        url_start_idx = 4
    
    urls = sys.argv[url_start_idx:]
    
    if not urls:
        print("Error: No URLs provided")
        sys.exit(1)
    
    if output_format not in ['markdown', 'json']:
        output_format = 'markdown'
    
    asyncio.run(crawl_site(config_path, output_format, urls, use_browser))