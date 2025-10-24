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
 * CrewAI
 * Langchain
 * Mastra
 * MCP Server
 * MongoDB
 * OpenAI CUA
 * Portia AI
 * [Introduction](/integrations/portia/introduction)
 * [Quickstart](/integrations/portia/quickstart)
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
Portia AI
Portia AI Quickstart
On this page
 * [1. Get your API key](#1-get-your-api-key)
 * [2. Install Portia with Browserbase](#2-install-portia-with-browserbase)
 * [3. Create a simple agent](#3-create-a-simple-agent)
 * [4. Create an agent with authentication!](#4-create-an-agent-with-authentication)
## 
[​](#1-get-your-api-key)
1. Get your API key
Go over the [Dashboard’s Settings tab](https://www.browserbase.com/settings):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key directly from the input and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables. You will also need an API key for an LLM. The below example uses Anthropic by setting ANTHROPIC_API_KEY, but you can add OPENAI_API_KEY, GOOGLE_API_KEY or your own [local LLM](https://docs.portialabs.ai/manage-config#api-keys).
## 
[​](#2-install-portia-with-browserbase)
2. Install Portia with Browserbase
`pip install portia-sdk-python[tools-browser-browserbase]`
## 
[​](#3-create-a-simple-agent)
3. Create a simple agent
The below simple agent examples works with the free trial version of Browserbase to retrieve the headlines from a news website.
Copy
Ask AI
```
# type: ignore
# ruff: noqa
from dotenv import load_dotenv
from portia import (
 Config,
 LLMProvider,
 Portia,
 PortiaToolRegistry,
 StorageClass,
)
from portia.cli import CLIExecutionHooks
from portia.open_source_tools.browser_tool import BrowserTool, BrowserInfrastructureOption
load_dotenv(override=True)
task = "Go to https://www.npr.org and get the headline news story"
my_config = Config.from_default(storage_class=StorageClass.MEMORY,
 llm_provider=LLMProvider.ANTHROPIC)
portia = Portia(config=my_config,
 tools=PortiaToolRegistry(my_config) + [BrowserTool(infrastructure_option=BrowserInfrastructureOption.REMOTE)],
 execution_hooks=CLIExecutionHooks())
plan_run = portia.run(task, end_user="end_user1")
```
## 
[​](#4-create-an-agent-with-authentication)
4. Create an agent with authentication!
Whenever a browser tool encounters a page that requires authentication, it will raise a clarification request to the user. The user will need to provide the necessary credentials or authentication information into the website displayed via a Browserbase live link to proceed. The cookies for that authentication can then be reused for future agent plan runs until they expire (and the user will be asked to authenticate again). To use authentication within Portia and Browserbase, a paid version of Browserbase is required. The below diagram shows how the system works when authentication is required: ![Browser authentication with clarifications](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/portia/browser_auth.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=9e21894a410ecce788de7cf12b17d429) The below example shows a basic agent run which requires authentication to complete.
Copy
Ask AI
```
from dotenv import load_dotenv
from portia import (
 Config,
 LLMProvider,
 Portia,
 PortiaToolRegistry,
 StorageClass,
)
from portia.cli import CLIExecutionHooks
from portia.open_source_tools.browser_tool import BrowserToolForUrl, BrowserInfrastructureOption
load_dotenv(override=True)
# The task that you want the agent to do
task = ("Find the github repo for portia-sdk-python and star it if it's not already starred.")
# Requires an anthropic API key, ANTHROPIC_API_KEY or use any other LLM.
my_config = Config.from_default(storage_class=StorageClass.MEMORY,
 llm_provider=LLMProvider.ANTHROPIC)
# Requires a paid browserbase subscription for authentication handling
portia = Portia(config=my_config,
 tools=PortiaToolRegistry(my_config) + [
 BrowserToolForUrl(url="https://www.github.com",
 infrastructure_option=BrowserInfrastructureOption.REMOTE)],
 # CLI execution hooks mean authentication requests will be output to the CLI. You can customise these in your application.
 execution_hooks=CLIExecutionHooks())
plan_run = portia.run(task, end_user="end_user")
```
Was this page helpful?
YesNo
[Introduction](/integrations/portia/introduction)[Introduction](/integrations/stripe/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.