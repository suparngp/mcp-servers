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
 * Stripe
 * Temporal
 * Trigger
 * Val Town
 * [Introduction](/integrations/val-town/introduction)
 * [Tutorial: Slack Scout](/integrations/val-town/slack-scout)
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Val Town
Tutorial: Slack Scout
On this page
 * [What this tutorial covers](#what-this-tutorial-covers)
 * [Getting Started](#getting-started)
 * [Browserbase](#browserbase)
 * [Val Town](#val-town)
 * [Twitter (X)](#twitter-x)
 * [Creating our APIs](#creating-our-apis)
 * [Creating the Cron Function](#creating-the-cron-function)
 * [And that’s it!](#and-that%E2%80%99s-it)
Slack scout sends a slack notification every time your keywords are mentioned on Twitter, Hacker News, or Reddit. Get notified whenever you, your company, or topics of interest are mentioned online. Built with [Browserbase](https://browserbase.com) and [Val Town](https://val.town). Inspired by [f5bot.com](https://f5bot.com).
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/val-town/slack-scout.gif?s=0c944aa685f7b24056fba5f24343e65c)
## 
[​](#what-this-tutorial-covers)
What this tutorial covers
 * Access and scrape website posts and contents using Browserbase
 * Write scheduled functions and APIs with Val Town
 * Send automated Slack messages via webhooks
# 
[​](#getting-started)
Getting Started
In this tutorial, you’ll need a
 * Browserbase [API key](https://www.browserbase.com/settings)
 * Val Town account
 * Slack Webhook URL: create it [here](https://docs.val.town/integrations/slack/send-messages-to-slack/)
### 
[​](#browserbase)
Browserbase
[Browserbase](https://www.browserbase.com) is a developer platform to run, manage, and monitor headless browsers at scale. We’ll utilize Browserbase to navigate and scrape different news sources. We’ll also use [Browserbase’s Proxies](/features/stealth-mode) to ensure we simulate authentic user interactions across multiple browser sessions. [Sign up for free](https://www.browserbase.com/sign-up) to get started!
### 
[​](#val-town)
Val Town
[Val Town](http://val.town/) is a platform to write and deploy JavaScript. We’ll use Val Town for three things.
 1. Create [HTTP scripts](https://docs.val.town/types/http/) that run Browserbase sessions. These Browserbase sessions will execute web automation tasks, such as navigating Hacker News and Reddit.
 2. Write [Cron Functions](https://docs.val.town/types/cron/) (like Cron Jobs, but more flexible) that periodically run our HTTP scripts.
 3. Store persistent data in the Val Town provided [SQLite database](https://docs.val.town/std/sqlite/). This built-in database allows us to track search results, so we only send Slack notifications for new, unrecorded keyword mentions.
[Sign up for free](https://www.val.town/auth/signup?next=%2F) to get started!
### 
[​](#twitter-x)
Twitter (X)
For this tutorial, we’ll use the Twitter API to include Twitter post results.
You’ll need to create a new Twitter account to use the API. It costs $100 / month to have a Basic Twitter Developer account.
Once you have the `SLACK_WEBHOOK_URL`, `BROWSERBASE_API_KEY`, and `TWITTER_BEARER_TOKEN`, input all of these as [Val Town Environment Variables](https://www.val.town/settings/environment-variables).
## 
[​](#creating-our-apis)
Creating our APIs
We’ll use a similar method to create scripts to search and scrape Reddit, Hacker News, and Twitter. First, let’s start with Reddit. To create a new script, go to [Val Town](http://val.town/) → New → HTTP Val. Our script will take in a keyword, and return all Reddit posts from the last day that include our keyword. For each Reddit post, we want the output to include the URL, date_published, and post title. For example:
Copy
Ask AI
```
{
 source: 'Reddit', // or 'Hacker News' or 'Twitter'
 url: '<https://www.reddit.com/r/browsers/comments/vdhge5/browserbase_launched/>';
 date_published: 'Aug 30, 2024';
 title: 'Browserbase just launched';
}
```
In our new `redditSearch` script, we start by importing Puppeteer and creating a Browserbase session with proxies enabled (`enableProxy=true`). Be sure to get your `BROWSERBASE_API_KEY` from your [Browserbase settings](https://www.browserbase.com/settings).
Copy
Ask AI
```
import { PuppeteerDeno } from "<https://deno.land/x/puppeteer@16.2.0/src/deno/Puppeteer.ts>";
const puppeteer = new PuppeteerDeno({ productName: "chrome" });
const browser = await puppeteer.connect({
 browserWSEndpoint: `wss://connect.browserbase.com?apiKey=${apiKey}&enableProxy=true`,
 ignoreHTTPSErrors: true,
});
```
Next, we want to
 1. Navigate to Reddit and do a keyword search
 2. Scrape each resulting post
To navigate to a Reddit URL that already has our keyword and search time frame encoded, let’s write a helper function that encodes the query and sets search parameters for data collection.
Copy
Ask AI
```
function constructSearchUrl(query: string): string {
 const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");
 return `https://www.reddit.com/search/?q=${encodedQuery}&type=link&t=day`;
}
const url = constructSearchUrl(query);
await page.goto(url, { waitUntil: "networkidle0" });
```
Once we’ve navigated to the constructed URL, we can scrape each search result. For each post, we select the `title`, `date_published`, and `url`.
Copy
Ask AI
```
const posts = document.querySelectorAll("div[data-testid=\"search-post-unit\"]");
 return Array.from(posts).map(post => {
 const titleElement = post.querySelector("a[id^=\"search-post-title\"]");
 const timeElement = post.querySelector("faceplate-timeago");
 return {
 source: "Reddit",
 title: titleElement?.textContent?.trim() || "",
 url: titleElement?.href || "",
 date_published: timeElement?.textContent?.trim() || "",
 };
 });
// Example
{
 source: 'Reddit', // or 'Hacker News' or 'Twitter'
 url: '<https://www.reddit.com/r/browsers/comments/vdhge5/browserbase_launched/>';
 date_published: '1 day ago';
 title: 'Browserbase just launched';
}
```
You’ll notice that Reddit posts return the date_published in the format of ‘1 day ago’ instead of ‘Aug 29, 2024.’ To make date handling more consistent, we create a reusable helper script, `convertRelativeDatetoString`, to convert dates to a uniform date format. We import this at the top of our redditSearch script.
Copy
Ask AI
```
import { convertRelativeDateToString } from "<https://esm.town/v/sarahxc/convertRelativeDateToString>";
const date_published = await convertRelativeDateToString({
 relativeDate: post.date_published,
});
```
You can see the finished redditSearch code [here](https://www.val.town/v/sarahxc/redditSearch). We follow a similar process to create `hackerNewsSearch`, and use the Twitter API to create `twitterSearch`. **See all three scripts here:** _Reddit_ → [redditSearch](https://www.val.town/v/sarahxc/redditSearch) _Hacker News_ → [hackerNewsSearch](https://www.val.town/v/alexdphan/hackerNewsSearch) _Twitter_ → [twitterSearch](https://www.val.town/v/alexdphan/twitterSearch)
## 
[​](#creating-the-cron-function)
Creating the Cron Function
For our last step, we create a `slackScout` cron job that calls `redditSearch`, `hackerNewsSearch`, and `twitterSearch` that runs every hour. To create the cron file, go to [Val Town](http://val.town/) → New → Cron Val. In our new slackScout file, let’s import our HTTP scripts.
Copy
Ask AI
```
import { hackerNewsSearch } from "https://esm.town/v/alexdphan/hackerNewsSearch";
import { twitterSearch } from "https://esm.town/v/alexdphan/twitterSearch";
import { redditSearch } from "https://esm.town/v/sarahxc/redditSearch";
```
And create helper functions that call our Reddit, Hacker News, and Twitter HTTP scripts.
Copy
Ask AI
```
// Fetch Reddit, Hacker News, and Twitter results
async function fetchRedditResults(topic: string): Promise<Website[]> {
 return redditSearch({ query: topic });
}
async function fetchHackerNewsResults(topic: string): Promise<Website[]> {
 return hackerNewsSearch({
 query: topic,
 pages: 2,
 apiKey: Deno.env.get("BROWSERBASE_API_KEY") ?? "",
 });
}
async function fetchTwitterResults(topic: string): Promise<Website[]> {
 return twitterSearch({
 query: topic,
 maxResults: 10,
 daysBack: 1,
 apiKey: Deno.env.get("TWITTER_BEARER_TOKEN") ?? "",
 });
}
```
Next, to store our website results, let’s setup Val Town’s SQLite database. To do this, we import SQLite and write three helper functions.
 1. `createTable`: creates the new SQLite table
 2. `isURLInTable`: for each new website returned, checks if the website is already in our table
 3. `addWebsiteToTable`: if `isURLInTable` is `False`, we add the new website to our table
Copy
Ask AI
```
const { sqlite } = await import("https://esm.town/v/std/sqlite");
const TABLE_NAME = "slack_scout_browserbase";
// Create an SQLite table
async function createTable(): Promise<void> {
 await sqlite.execute(`
 CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
 source TEXT NOT NULL,
 url TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 date_published TEXT NOT NULL
 )
 `);
}
async function isURLInTable(url: string): Promise<boolean> {
 const result = await sqlite.execute({
 sql: `SELECT 1 FROM ${TABLE_NAME} WHERE url = :url LIMIT 1`,
 args: { url },
 });
 return result.rows.length > 0;
}
async function addWebsiteToTable(website: Website): Promise<void> {
 await sqlite.execute({
 sql: `INSERT INTO ${TABLE_NAME} (source, url, title, date_published)
 VALUES (:source, :url, :title, :date_published)`,
 args: website,
 });
}
```
Finally, we write a function to send a Slack notification for each new website.
Copy
Ask AI
```
async function sendSlackMessage(message: string): Promise<Response> {
 const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
 if (!slackWebhookUrl) {
 throw new Error("SLACK_WEBHOOK_URL environment variable is not set");
 }
 const response = await fetch(slackWebhookUrl, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 blocks: [
 {
 type: "section",
 text: { type: "mrkdwn", text: message },
 },
 ],
 }),
 });
 if (!response.ok) {
 throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
 }
 return response;
}
```
The main function initiates our workflow, calling helper functions to fetch and process data from multiple sources.
Copy
Ask AI
```
export default async function(interval: Interval): Promise<void> {
 try {
 await createTable();
 for (const topic of KEYWORDS) {
 const results = await Promise.allSettled([
 fetchHackerNewsResults(topic),
 fetchTwitterResults(topic),
 fetchRedditResults(topic),
 ]);
 const validResults = results
 .filter((result): result is PromiseFulfilledResult<Website[]> => result.status === "fulfilled")
 .flatMap(result => result.value);
 await processResults(validResults);
 }
 console.log("Cron job completed successfully.");
 } catch (error) {
 console.error("An error occurred during the cron job:", error);
 }
}
```
And we’re done! You can see the final `slackScout` [here](https://www.val.town/v/sarahxc/slackScout).
## 
[​](#and-that%E2%80%99s-it)
And that’s it!
Optionally, you can use [Browserbase](https://www.browserbase.com) and [Val Town](http://val.town/) to create additional HTTP scripts that can monitor additional websites like Substack, Medium, WSJ, etc. Browserbase has a [list of Vals](https://www.val.town/u/browserbase) you can get started with in your own projects. If you have any questions, concerns, or feedback, please let us know :) support@browserbase.com
Was this page helpful?
YesNo
[Introduction](/integrations/val-town/introduction)[Introduction](/integrations/vercel/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.