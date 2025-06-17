#!/usr/bin/env python3
"""
URL discovery for documentation sites
Supports two strategies:
1. Crawl: Discovers pages by following links from a starting URL
2. Sitemap: Discovers pages from sitemap.xml
"""
import asyncio
import json
import sys
from urllib.parse import urljoin, urlparse
import re
import xml.etree.ElementTree as ET
import aiohttp
from bs4 import BeautifulSoup


class UrlDiscoverer:
    def __init__(self, config, base_url, max_depth=3, max_concurrent=10):
        self.config = config
        self.base_url = base_url.rstrip('/')
        self.max_depth = max_depth
        self.max_concurrent = max_concurrent
        
        # Parse base URL
        parsed = urlparse(self.base_url)
        self.base_domain = parsed.netloc
        self.base_path = parsed.path.rstrip('/')
        
        # For discovery, we often want to explore a broader path than the exact base URL
        # Extract the common prefix from base_path for sites with nested documentation
        # e.g., /docs/documentation/getting-started/introduction -> /docs/
        path_parts = self.base_path.split('/')
        if len(path_parts) > 2 and 'docs' in path_parts:
            # Find the 'docs' part and use everything up to and including it
            docs_index = path_parts.index('docs')
            self.discovery_base_path = '/'.join(path_parts[:docs_index+1])
        else:
            self.discovery_base_path = self.base_path
        
        # Patterns from config
        self.include_patterns = [
            re.compile(p) for p in config.get('crawl', {}).get('includePatterns', [])
        ]
        self.exclude_patterns = [
            re.compile(p) for p in config.get('crawl', {}).get('excludePatterns', [])
        ]
        
        # Track discovered URLs
        self.discovered_urls = {}
        self.to_visit = asyncio.Queue()
        self.visited = set()
        self.session = None
    
    def should_include_url(self, url):
        """Check if URL matches include/exclude patterns"""
        parsed = urlparse(url)
        path = parsed.path
        
        # Check exclude patterns first
        for pattern in self.exclude_patterns:
            if pattern.search(path):
                return False
        
        # If no include patterns, include all (except excluded)
        if not self.include_patterns:
            return True
        
        # Check include patterns
        for pattern in self.include_patterns:
            if pattern.search(path):
                return True
        
        return False
    
    def normalize_url(self, url):
        """Normalize URL for consistency"""
        # Remove fragments
        if '#' in url:
            url = url.split('#')[0]
        
        # Remove trailing slashes
        url = url.rstrip('/')
        
        # Remove query parameters for now (could be configurable)
        if '?' in url:
            url = url.split('?')[0]
        
        return url
    
    async def extract_links(self, html, from_url):
        """Extract all links from HTML"""
        try:
            soup = BeautifulSoup(html, 'html.parser')
            links = []
            
            for tag in soup.find_all('a'):
                href = tag.get('href')
                if not href:
                    continue
                
                # Skip non-http links
                if href.startswith(('mailto:', 'javascript:', 'tel:', '#')):
                    continue
                
                # Skip common non-HTML resources
                if href.endswith(('.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.xml')):
                    continue
                
                # Make absolute URL
                absolute_url = urljoin(from_url, href)
                absolute_url = self.normalize_url(absolute_url)
                
                # Check if same domain
                parsed = urlparse(absolute_url)
                if parsed.netloc != self.base_domain:
                    continue
                
                # Check if within discovery base path
                if not parsed.path.startswith(self.discovery_base_path):
                    continue
                
                # Check patterns
                if not self.should_include_url(absolute_url):
                    continue
                
                links.append(absolute_url)
            
            return links
        except Exception as e:
            print(json.dumps({
                'type': 'error',
                'url': from_url,
                'error': f'Failed to parse HTML: {str(e)}'
            }), file=sys.stderr)
            return []
    
    async def fetch_page(self, url):
        """Fetch a single page"""
        try:
            async with self.session.get(url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                if response.status != 200:
                    return None
                return await response.text()
        except Exception as e:
            print(json.dumps({
                'type': 'error',
                'url': url,
                'error': str(e)
            }), file=sys.stderr)
            return None
    
    async def worker(self):
        """Worker coroutine to process URLs from the queue"""
        while True:
            try:
                # Get URL from queue with timeout
                url, depth = await asyncio.wait_for(self.to_visit.get(), timeout=1.0)
                
                # Skip if already visited
                if url in self.visited:
                    continue
                
                self.visited.add(url)
                
                # Skip if max depth reached
                if depth > self.max_depth:
                    continue
                
                # Fetch page
                html = await self.fetch_page(url)
                if not html:
                    continue
                
                # Extract links
                links = await self.extract_links(html, url)
                
                # Add new links to queue
                for link in links:
                    if link not in self.discovered_urls:
                        self.discovered_urls[link] = {
                            'depth': depth + 1,
                            'from_page': url
                        }
                        
                        # Output discovered URL
                        print(json.dumps({
                            'type': 'url',
                            'url': link,
                            'depth': depth + 1,
                            'from_page': url
                        }))
                        sys.stdout.flush()
                        
                        # Add to queue if within depth limit
                        if depth + 1 <= self.max_depth:
                            await self.to_visit.put((link, depth + 1))
                
            except asyncio.TimeoutError:
                # No more URLs to process
                break
            except Exception as e:
                print(json.dumps({
                    'type': 'error',
                    'url': url if 'url' in locals() else 'unknown',
                    'error': f'Worker error: {str(e)}'
                }), file=sys.stderr)
    
    async def discover_from_sitemap(self, sitemap_url):
        """Discover URLs from sitemap.xml"""
        headers = {
            'User-Agent': self.config.get('crawl', {}).get('headers', {}).get('User-Agent', 
                         'Mozilla/5.0 (compatible; DocsCrawler/1.0)')
        }
        self.session = aiohttp.ClientSession(headers=headers)
        
        try:
            # Fetch sitemap
            async with self.session.get(sitemap_url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                if response.status != 200:
                    raise Exception(f"Failed to fetch sitemap: HTTP {response.status}")
                sitemap_content = await response.text()
            
            # Parse XML
            root = ET.fromstring(sitemap_content)
            
            # Handle different sitemap namespaces
            namespaces = {'': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            # Extract URLs
            urls = []
            for url_elem in root.findall('.//url', namespaces):
                loc_elem = url_elem.find('loc', namespaces)
                if loc_elem is not None and loc_elem.text:
                    url = loc_elem.text.strip()
                    # Check if URL should be included
                    if self.should_include_url(url):
                        urls.append(url)
            
            # Also check for plain <loc> tags without namespace
            for loc_elem in root.findall('.//loc'):
                if loc_elem.text:
                    url = loc_elem.text.strip()
                    if url not in urls and self.should_include_url(url):
                        urls.append(url)
            
            # Output discovered URLs
            for url in urls:
                self.discovered_urls[url] = {
                    'depth': 0,
                    'from_page': 'sitemap'
                }
                
                print(json.dumps({
                    'type': 'url',
                    'url': url,
                    'depth': 0,
                    'from_page': 'sitemap'
                }))
                sys.stdout.flush()
            
            # Output summary
            print(json.dumps({
                'type': 'complete',
                'total_discovered': len(urls),
                'source': 'sitemap'
            }), file=sys.stderr)
            
        finally:
            await self.session.close()
    
    async def discover_all(self):
        """Discover all URLs starting from base URL"""
        # Create session
        headers = {
            'User-Agent': self.config.get('crawl', {}).get('headers', {}).get('User-Agent', 
                         'Mozilla/5.0 (compatible; DocsCrawler/1.0)')
        }
        self.session = aiohttp.ClientSession(headers=headers)
        
        try:
            # Start with base URL
            await self.to_visit.put((self.base_url, 0))
            
            # Add base URL to discovered
            self.discovered_urls[self.base_url] = {
                'depth': 0,
                'from_page': None
            }
            
            print(json.dumps({
                'type': 'url',
                'url': self.base_url,
                'depth': 0,
                'from_page': None
            }))
            sys.stdout.flush()
            
            # Start concurrent workers
            workers = [asyncio.create_task(self.worker()) for _ in range(self.max_concurrent)]
            
            # Wait for all workers to complete
            await asyncio.gather(*workers)
            
            # Output summary
            print(json.dumps({
                'type': 'complete',
                'total_discovered': len(self.discovered_urls),
                'total_visited': len(self.visited)
            }), file=sys.stderr)
            
        finally:
            await self.session.close()


async def main():
    if len(sys.argv) < 3:
        print("Usage: python discover.py <config_path> <base_url> [max_depth]")
        sys.exit(1)
    
    config_path = sys.argv[1]
    base_url = sys.argv[2]
    max_depth = int(sys.argv[3]) if len(sys.argv) > 3 else 3
    
    # Load configuration
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
    except Exception as e:
        print(json.dumps({
            'type': 'error',
            'error': f'Failed to load config: {str(e)}'
        }), file=sys.stderr)
        sys.exit(1)
    
    # Check discovery strategy
    discovery_config = config.get('discovery', {})
    strategy = discovery_config.get('strategy', 'crawl')
    
    # Create discoverer
    discoverer = UrlDiscoverer(config, base_url, max_depth)
    
    if strategy == 'sitemap':
        # Get sitemap URL
        sitemap_url = discovery_config.get('sitemapUrl')
        if not sitemap_url:
            # Try common sitemap locations
            parsed = urlparse(base_url)
            sitemap_url = f"{parsed.scheme}://{parsed.netloc}/sitemap.xml"
        
        print(json.dumps({
            'type': 'info',
            'message': f'Using sitemap discovery from: {sitemap_url}'
        }), file=sys.stderr)
        
        await discoverer.discover_from_sitemap(sitemap_url)
    else:
        # Default to crawl strategy
        await discoverer.discover_all()


if __name__ == '__main__':
    asyncio.run(main())