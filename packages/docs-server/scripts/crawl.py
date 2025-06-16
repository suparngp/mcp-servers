#!/usr/bin/env python3
"""
Crawl4AI-based crawler that reads configuration and outputs markdown/json
Usage: python crawl.py <config_path> <output_format> <url1> [url2 ...]
"""
import asyncio
import json
import sys
from typing import List

from crawl4ai import AsyncWebCrawler
from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator


async def crawl_site(config_path: str, output_format: str, urls: List[str]):
    """Crawl sites based on configuration"""
    # Load config
    with open(config_path) as f:
        config = json.load(f)
    
    # Configure browser
    browser_config = BrowserConfig(
        headless=True,
        viewport_width=1920,
        viewport_height=1080,
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
        wait_until="domcontentloaded",
        delay_before_return_html=crawl_config.get('delay', 1.0),
        
        # Content extraction
        css_selector=extraction_config.get('selector', 'main'),
        word_count_threshold=extraction_config.get('minWordCount', 10),
        excluded_tags=tag_exclusions if tag_exclusions else None,
        
        # JavaScript handling
        wait_for=crawl_config.get('waitForSelector'),
        
        # Markdown generation
        markdown_generator=DefaultMarkdownGenerator(),
        
        # Other options
        verbose=False,
    )
    
    async with AsyncWebCrawler(config=browser_config) as crawler:
        for url in urls:
            try:
                result = await crawler.arun(
                    url=url,
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
                
            except Exception as e:
                error_output = {
                    'error': str(e),
                    'url': url,
                    'type': 'crawl_error'
                }
                print(json.dumps(error_output), file=sys.stderr)


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python crawl.py <config_path> <output_format> <url1> [url2 ...]")
        print("Output formats: markdown (default), json")
        sys.exit(1)
    
    config_path = sys.argv[1]
    output_format = sys.argv[2].lower()
    urls = sys.argv[3:]
    
    if output_format not in ['markdown', 'json']:
        output_format = 'markdown'
    
    asyncio.run(crawl_site(config_path, output_format, urls))