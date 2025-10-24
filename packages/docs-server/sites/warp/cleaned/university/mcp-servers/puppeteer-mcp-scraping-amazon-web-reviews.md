[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [Testing & Security](/university/developer-workflows/testing-and-security)
 * End-To-End Builds
 * [Building a Real-time Chat App (Github MCP + Railway )](/university/end-to-end-builds/building-a-real-time-chat-app-github-mcp-+-railway)
 * [Building a Chrome Extension (D3.js + Javascript + HTML + CSS)](/university/end-to-end-builds/building-a-chrome-extension-d3.js-+-javascript-+-html-+-css)
 * MCP Servers
 * [Puppeteer MCP: Scraping Amazon Web Reviews ](/university/mcp-servers/puppeteer-mcp-scraping-amazon-web-reviews)
 * [Sentry MCP: Fix Sentry Error in Empower Website](/university/mcp-servers/sentry-mcp-fix-sentry-error-in-empower-website)
 * [Context7 MCP: Update Astro Project with Best Practices](/university/mcp-servers/context7-mcp-update-astro-project-with-best-practices)
 * [Figma Remote MCP: Create a Website from a Figma File from Scratch](/university/mcp-servers/figma-remote-mcp-create-a-website-from-a-figma-file-from-scratch)
 * [Linear MCP: Retrieve issue data](/university/mcp-servers/linear-mcp-retrieve-issue-data)
 * [Linear MCP: Updating Tickets with a Lean Build Approach](/university/mcp-servers/linear-mcp-updating-tickets-with-a-lean-build-approach)
 * [SQLite and Stripe MCP: Basic Queries You Can Make After Set Up](/university/mcp-servers/sqlite-and-stripe-mcp-basic-queries-you-can-make-after-set-up)
 * Terminal / Command Line Tips
 * [Improve Your Kubernetes Workflow (kubectl + helm)](/university/terminal-command-line-tips/improve-your-kubernetes-workflow-kubectl-+-helm)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=c5dAwvMCRiTxUOdDicqy)
 * [🧠 Overview](#overview)
 * [Configure the Puppeteer MCP Server](#configure-the-puppeteer-mcp-server)
 * [Use Voice Input to Trigger Automation](#use-voice-input-to-trigger-automation)
 * [Watch Puppeteer Automate the Workflow](#watch-puppeteer-automate-the-workflow)
 * [Analyze and Summarize Results](#analyze-and-summarize-results)
 * [Apply Puppeteer MCP to Other Scenarios](#apply-puppeteer-mcp-to-other-scenarios)
Was this helpful?
This tutorial demonstrates how to configure and use the **Puppeteer MCP server** inside Warp to scrape Amazon web reviews.
* * *
### 
[](#overview)
🧠 Overview
**Puppeteer MCP** integrates Warp’s agents with the browser, letting you automate tasks such as navigation, form filling, screenshotting, and scraping content. Once configured, Warp can issue Puppeteer commands directly from prompts, enabling full **browser automation** without manual scripting.
You’ll learn how to:
 * Set up the Puppeteer MCP server.
 * Use Warp’s voice input and AI to describe automation tasks.
 * Execute browser workflows hands-free.
 * Capture, scrape, and analyze web data programmatically.
* * *
1
### 
[](#configure-the-puppeteer-mcp-server)
Configure the Puppeteer MCP Server
Open the MCP panel in Warp:
 * Press **Cmd + Shift + P** (Mac) or **Ctrl + Shift + P** (Windows/Linux) to open the **Command Palette**.
 * Search for `MCP` and open the **MCP Panel**.
Add the Puppeteer MCP config:
 * Click **Add** , then paste in the provided JSON configuration for Puppeteer:
puppeteer-mcp-config.json
Copy```
{
 "puppeteer": {
 "command": "npx",
 "args": [
 "-y",
 "@modelcontextprotocol/server-puppeteer"
 ],
 "env": {},
 "working_directory": null
 }
}
```
Save your configuration. Available endpoints will include:
 * `puppeteer.navigate`
 * `puppeteer.fill`
 * `puppeteer.screenshot`
 * `puppeteer.evaluate`
2
### 
[](#use-voice-input-to-trigger-automation)
Use Voice Input to Trigger Automation
Enable **voice input** by clicking the microphone icon in Warp. Then speak your automation prompt naturally.
Copy```
Can you go to Amazon search for "white t-short women?"
Scrape the results so the titles, prices, and links are extracted.
Then open each product link and summarize the product reviews.
Finally, give me a recommendation for which shirt to buy based on the combination of the pricing and review quality.
```
### 
[](#watch-puppeteer-automate-the-workflow)
Watch Puppeteer Automate the Workflow
Behind the scenes, Puppeteer:
 * Navigates to Amazon.
 * Fills the search bar with “white t-shirt woman.”
 * Scrapes the product results — capturing titles, prices, and product links.
 * Clicks into each product and extracts review data using JavaScript selectors.
 * Takes screenshots of the pages for reference.
You can see the browser (Amazon) and Warp side-by-side as Puppeteer performs these steps autonomously.
Puppeteer runs fully headless or in visible browser mode — you don’t need to touch your mouse or keyboard.
### 
[](#analyze-and-summarize-results)
Analyze and Summarize Results
Once the scrape is complete, Warp compiles the data and provides a ranked list of products. Example output (from transcript):
Product
Price
Rating
Summary
Cozy T-Shirt
$8
⭐ 4.5
Soft fabric, good fit
Comfy Cotton Tee
$10
⭐ 4.2
Slightly looser fit
Basic White Top
$6
⭐ 3.8
Mixed quality reviews
Warp’s recommendation:
> “The Cozy T‑Shirt — $8, 4.5 stars, good fit, and soft fabric.”
### 
[](#apply-puppeteer-mcp-to-other-scenarios)
Apply Puppeteer MCP to Other Scenarios
The same setup works for:
 * Product research – Compare reviews or specs across multiple sites.
 * Competitive analysis – Scrape competitors’ pricing or product data.
 * Web testing – Automate user flows like login or checkout.
 * Repetitive data tasks – Periodic scraping or screenshot capture.
Puppeteer MCP lets Warp act like your hands in the browser — navigating, scraping, and summarizing data while you focus on analysis.
[PreviousBuilding a Chrome Extension (D3.js + Javascript + HTML + CSS)](/university/end-to-end-builds/building-a-chrome-extension-d3.js-+-javascript-+-html-+-css)[NextSentry MCP: Fix Sentry Error in Empower Website](/university/mcp-servers/sentry-mcp-fix-sentry-error-in-empower-website)
Last updated 15 days ago
Was this helpful?