#!/usr/bin/env python3
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

async def test_discovery():
    url = "https://infisical.com/docs/documentation/getting-started/introduction"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            html = await response.text()
            
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    
    for tag in soup.find_all('a'):
        href = tag.get('href')
        if not href:
            continue
            
        # Skip non-http links
        if href.startswith(('mailto:', 'javascript:', 'tel:', '#')):
            continue
            
        # Make absolute URL
        absolute_url = urljoin(url, href)
        
        # Parse URL
        parsed = urlparse(absolute_url)
        
        # Only include infisical.com/docs links
        if parsed.netloc == 'infisical.com' and '/docs/' in parsed.path:
            print(f"Found link: {absolute_url}")
            print(f"  Path: {parsed.path}")
            links.append(absolute_url)
    
    print(f"\nTotal docs links found: {len(links)}")

if __name__ == '__main__':
    asyncio.run(test_discovery())