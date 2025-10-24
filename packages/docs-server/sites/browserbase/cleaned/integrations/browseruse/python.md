[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Introduction
 * [What is Browserbase?](/introduction/what-is-browserbase)
 * [What is a headless browser?](/introduction/what-is-headless-browser)
 * [Getting started](/introduction/getting-started)
 * [Stagehand](/introduction/stagehand)
 * [Playwright](/introduction/playwright)
 * [Puppeteer](/introduction/puppeteer)
 * [Selenium](/introduction/selenium)
##### Fundamentals
 * [Create a Browser Session](/fundamentals/create-browser-session)
 * [Using a Browser Session](/fundamentals/using-browser-session)
 * [Manage a Browser Session](/fundamentals/manage-browser-session)
##### Features
 * [Stealth Mode](/features/stealth-mode)
 * [Proxies](/features/proxies)
 * [Live View](/features/session-live-view)
 * [Viewports](/features/viewports)
 * [Session Replay](/features/session-replay)
 * [Session Inspector](/features/session-inspector)
 * [Downloads](/features/downloads)
 * [Uploads](/features/uploads)
 * [Screenshots & PDFs](/features/screenshots)
 * [Contexts](/features/contexts)
 * [Browser Extensions](/features/browser-extensions)
 * [Metadata](/features/session-metadata)
##### Use Cases
 * [Form Submissions](/use-cases/automating-form-submissions)
 * [Web Scraping](/use-cases/scraping-website)
 * [Automated Tests](/use-cases/building-automated-tests)
##### Guides
 * [Improving Performance](/guides/speed-optimization)
 * [Optimizing Cost](/guides/cost-optimization)
 * [Long Running Sessions](/guides/long-running-sessions)
 * [Browser Regions](/guides/multi-region)
 * [Measuring Usage](/guides/measuring-usage)
 * [Using Session Metadata](/guides/using-session-metadata)
 * [Plans and Pricing](/guides/plans-and-pricing)
 * [Concurrency & Rate Limits](/guides/concurrency-rate-limits)
 * [Handling Authentication](/guides/authentication)
 * [Single Sign-On (SSO)](/guides/sso-setup)
 * [Enterprise Security](/guides/security)
 * [Manage Account](/guides/manage-account)
 * [Allowlisted VPN Routing](/guides/vpn)
##### Integrations
 * [Get Started with Integrations](/integrations/get-started)
 * 1Password
 * AgentKit
 * Agno
 * Braintrust
 * Browser Use
 * [Introduction](/integrations/browseruse/introduction)
 * [Quickstart](/integrations/browseruse/python)
 * CrewAI
 * Langchain
 * Mastra
 * MCP Server
 * MongoDB
 * OpenAI CUA
 * Portia AI
 * Stripe
 * Temporal
 * Trigger
 * Val Town
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Browser Use
Add web browsing capabilities to Browser Use
1
### Get your API Key
Visit the [Dashboard’s Overview tab](https://www.browserbase.com/overview):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables in your `.env` file.
2
### Install and create a virtual environment with UV
[UV](https://docs.astral.sh/uv/getting-started/installation/) is a modern package manager for Python.
Copy
Ask AI
```
uv venv
```
3
### Install Browserbase and Browser Use
Copy
Ask AI
```
source .venv/bin/activate # follow the `uv venv` output
uv pip install browserbase browser-use langchain-anthropic python-dotenv
```
4
### Create the Managed Browser Session Class
We’ll create a session management class that handles proper browser lifecycle management following Browser Use best practices.
main.py
Copy
Ask AI
```
import asyncio
import os
from dotenv import load_dotenv
from browserbase import Browserbase
from browser_use import Agent
from browser_use.browser.session import BrowserSession
from browser_use.browser import BrowserProfile
from browser_use.llm import ChatOpenAI
class ManagedBrowserSession:
 """Context manager for proper BrowserSession lifecycle management"""
 def __init__(self, cdp_url: str, browser_profile: BrowserProfile):
 self.cdp_url = cdp_url
 self.browser_profile = browser_profile
 self.browser_session = None
 async def __aenter__(self) -> BrowserSession:
 try:
 self.browser_session = BrowserSession(
 cdp_url=self.cdp_url,
 browser_profile=self.browser_profile,
 keep_alive=False, # Essential for proper cleanup
 initialized=False,
 )
 await self.browser_session.start()
 print("✅ Browser session initialized successfully")
 return self.browser_session
 except Exception as e:
 print(f"❌ Failed to initialize browser session: {e}")
 await self._emergency_cleanup()
 raise
 async def __aexit__(self, exc_type, exc_val, exc_tb):
 await self._close_session_properly()
 async def _close_session_properly(self):
 playwright_instance = None
 try:
 if self.browser_session:
 # Get playwright instance before closing session
 if hasattr(self.browser_session, 'playwright'):
 playwright_instance = self.browser_session.playwright
 # Close browser session first
 if self.browser_session.initialized:
 await self.browser_session.stop()
 print("✅ Browser session closed successfully")
 except Exception as e:
 error_msg = str(e).lower()
 if "browser is closed" in error_msg or "disconnected" in error_msg:
 print("ℹ️ Browser session was already closed (expected behavior)")
 else:
 print(f"⚠️ Error during browser session closure: {e}")
 finally:
 # Stop playwright instance - critical for preventing hanging processes
 if playwright_instance:
 try:
 await playwright_instance.stop()
 print("✅ Playwright instance stopped successfully")
 except Exception as e:
 print(f"⚠️ Error stopping Playwright: {e}")
 await self._final_cleanup()
 async def _emergency_cleanup(self):
 try:
 if self.browser_session:
 if hasattr(self.browser_session, 'playwright'):
 await self.browser_session.playwright.stop()
 if self.browser_session.initialized:
 await self.browser_session.stop()
 except Exception as e:
 print(f"⚠️ Emergency cleanup error: {e}")
 finally:
 await self._final_cleanup()
 async def _final_cleanup(self):
 self.browser_session = None
```
5
### Create Helper Functions
Add helper functions for creating Browserbase sessions and configuring browser profiles:
main.py
Copy
Ask AI
```
async def create_browserbase_session():
 load_dotenv()
 bb = Browserbase(api_key=os.environ["BROWSERBASE_API_KEY"])
 session = bb.sessions.create(project_id=os.environ["BROWSERBASE_PROJECT_ID"])
 print(f"Session ID: {session.id}")
 print(f"Debug URL: https://www.browserbase.com/sessions/{session.id}")
 return session
def create_browser_profile() -> BrowserProfile:
 return BrowserProfile(
 keep_alive=False, # Essential for proper cleanup
 wait_between_actions=2.0,
 default_timeout=30000,
 default_navigation_timeout=30000,
 )
async def run_automation_task(browser_session: BrowserSession, task: str) -> str:
 llm = ChatOpenAI(model="gpt-4o", temperature=0.0)
 agent = Agent(
 task=task,
 llm=llm,
 browser_session=browser_session,
 enable_memory=False,
 max_failures=5,
 retry_delay=5,
 max_actions_per_step=1,
 )
 try:
 print("🚀 Starting agent task...")
 result = await agent.run(max_steps=20)
 print("🎉 Task completed successfully!")
 return str(result)
 except Exception as e:
 # Handle expected browser disconnection after successful completion
 error_msg = str(e).lower()
 if "browser is closed" in error_msg or "disconnected" in error_msg:
 print("✅ Task completed - Browser session ended normally")
 return "Task completed successfully (session ended normally)"
 else:
 print(f"❌ Agent execution error: {e}")
 raise
 finally:
 del agent
```
6
### Create the Main Function
Implement the main execution function with comprehensive error handling:
main.py
Copy
Ask AI
```
async def main():
 try:
 session = await create_browserbase_session()
 browser_profile = create_browser_profile()
 task = ("Go to https://www.macrumors.com/contact.php and fill in the form. "
 "Make sure to use the selectors and submit the form")
 async with ManagedBrowserSession(session.connect_url, browser_profile) as browser_session:
 result = await run_automation_task(browser_session, task)
 print(f"Final result: {result}")
 except KeyboardInterrupt:
 print("\n⏹️ Process interrupted by user")
 except Exception as e:
 print(f"💥 Fatal error: {e}")
 raise
 finally:
 print("🏁 Application shutdown complete")
if __name__ == "__main__":
 asyncio.run(main())
```
7
### Run your script
Run your script:
Copy
Ask AI
```
uv run main.py
```
You should see your Browserbase session start in [Browserbase](https://www.browserbase.com/sessions). The debug URL will be printed to console for real-time session monitoring.
**Important Environment Variables** Make sure you have these environment variables in your `.env` file:
 * `BROWSERBASE_API_KEY`
 * `BROWSERBASE_PROJECT_ID`
 * `OPENAI_API_KEY`
**Key Features of This Implementation**
 * **Clean Resource Management** : Context manager ensures proper cleanup without complexity
 * **Essential Error Handling** : Handles browser disconnections and cleanup failures gracefully
 * **Simplified Approach** : Focused on core functionality without unnecessary overhead
 * **Production Ready** : Robust enough for real-world applications
**Browser Use Best Practices Implemented**
 * Set `keep_alive=False` for proper session cleanup
 * Use reasonable timeouts to prevent hanging processes
 * Implement proper Playwright instance cleanup
 * Handle expected browser disconnections after task completion
 * Use structured error handling with clear logging
**Common Issues & Fixes**
 * Browser disconnection after successful form submission is expected behavior
 * The context manager ensures proper cleanup even if errors occur
 * Playwright instance cleanup prevents hanging processes
 * Emergency cleanup handles initialization failures gracefully
 * Reach out to us at support@browserbase.com for additional support
## [Browserbase & Browser Use Sample Code Configure Browserbase to add additional web-browsing capabilities to your Browser Use. ](https://github.com/browserbase/integrations/tree/master/examples/integrations/browser-use)
Was this page helpful?
YesNo
[Introduction](/integrations/browseruse/introduction)[Introduction](/integrations/crew-ai/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.