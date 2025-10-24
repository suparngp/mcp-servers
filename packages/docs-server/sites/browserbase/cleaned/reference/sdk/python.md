[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Overview
 * [Introduction](/reference/introduction)
##### SDKs
 * [Overview](/reference/sdk/overview)
 * [Node.js SDK](/reference/sdk/nodejs)
 * [Python SDK](/reference/sdk/python)
##### APIs
 * [Overview](/reference/api/overview)
 * Sessions API
 * Projects API
 * Contexts API
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
SDKs
Python SDK
On this page
 * [Installation](#installation)
 * [Basic usage](#basic-usage)
If you are working with Python, the official `browserbase` package is the easiest way to connect and act upon headless browsers running on Browserbase.
## 
[​](#installation)
Installation
Copy
Ask AI
```
pip install browserbase
```
## 
[​](#basic-usage)
Basic usage
Here is an example using the Browserbase Python SDK to create and connect to a session using Playwright:
Copy
Ask AI
```
from playwright.sync_api import Playwright, sync_playwright
from browserbase import Browserbase
import os
bb = Browserbase(api_key=os.environ["BROWSERBASE_API_KEY"])
def run(playwright: Playwright) -> None:
 # Create a session on Browserbase
 session = bb.sessions.create(project_id=os.environ["BROWSERBASE_PROJECT_ID"])
 # Connect to the remote session
 chromium = playwright.chromium
 browser = chromium.connect_over_cdp(session.connect_url)
 context = browser.contexts[0]
 page = context.pages[0]
 try:
 # Execute Playwright actions on the remote browser tab
 page.goto("https://news.ycombinator.com/")
 page_title = page.title()
 print(f"Page title: {page_title}")
 page.screenshot(path="screenshot.png")
 finally:
 page.close()
 browser.close()
 print(f"Done! View replay at https://browserbase.com/sessions/{session.id}")
if __name__ == "__main__":
 with sync_playwright() as playwright:
 run(playwright)
```
## [Examples Quickstart examples using captcha solving, proxies, extensions, and more. ](https://github.com/browserbase/sdk-python/tree/main/examples)## [Migration Guide Guide for migrating from old versions of the Python SDK ](/reference/sdk/python_migration)## [PyPi Package View the package on PyPi ](https://pypi.org/project/browserbase/)## [SDK Reference View the complete SDK reference documentation ](https://github.com/browserbase/sdk-python/blob/main/api.md)
Was this page helpful?
YesNo
[Node.js SDK](/reference/sdk/nodejs)[Overview](/reference/api/overview)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.