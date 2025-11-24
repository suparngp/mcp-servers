`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Flagship Blog](/docs/blog)
 * [5 takeaways from my first PyCon JP conference](/docs/blog/pyconjp-25-takeaways)
 * [Dungeons & Downtimes: XP gained from our adventure](/docs/blog/dungeons-downtimes)
 * [Reverse Proxy for custom domains](/docs/blog/reverse-proxy-custom-domains)
 * [Adventures in dogfooding: Guarded Releases](/docs/blog/dogfooding-guardian-edition)
 * [A quick tool for npm package scanning](/docs/blog/npm-breach-supply-chain-security)
 * [My DEF CON 33 experience](/docs/blog/defcon-33-takeaways)
 * [Make every launch a big deal](/docs/blog/celebrating-every-launch)
 * [A tale of three rate limiters](/docs/blog/rate-limiters)
 * [My good friend Claude](/docs/blog/my-good-friend-claude)
 * [My approach to React app architecture in 2025](/docs/blog/react-architecture-2025)
 * [Fun with JS streams](/docs/blog/fun-js-streams)
 * [Moonshots XXII: Hack to the Future recap](/docs/blog/2025-hackathon-recap)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [The problem: corporate networks demand their custom domain(s)](#the-problem-corporate-networks-demand-their-custom-domains)
 * [Also consider the following use cases:](#also-consider-the-following-use-cases)
 * [We’ve seen this before](#weve-seen-this-before)
 * [What’s a simple way to satisfy the requirement?](#whats-a-simple-way-to-satisfy-the-requirement)
 * [How simple is it?](#how-simple-is-it)
 * [One-Click Cleanup](#one-click-cleanup)
 * [Why Reverse Proxy wins: The case for simplicity](#why-reverse-proxy-wins-the-case-for-simplicity)
 * [Performance and reliability considerations](#performance-and-reliability-considerations)
 * [Consider a targeted approach](#consider-a-targeted-approach)
 * [Cost Estimates](#cost-estimates)
 * [When NOT to use a Reverse Proxy](#when-not-to-use-a-reverse-proxy)
 * [Implementing the Reverse Proxy in code](#implementing-the-reverse-proxy-in-code)
 * [React SDK (React applications)](#react-sdk-react-applications)
 * [Verify that the application is using the Reverse Proxy](#verify-that-the-application-is-using-the-reverse-proxy)
 * [Get started with Reverse Proxy](#get-started-with-reverse-proxy)
_Published October 9th, 2025_
![Portrait of Dina Muscanell.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8b46f6b6dc8c34e2165d2769954310af4bdaee058429f6d74a16a60ac634a6a6/assets/images/authors/dina-muscanell.jpeg)
by Dina Muscanell, LaunchDarkly Staff Solutions Architect
### The problem: corporate networks demand their custom domain(s)
Picture this: you’re implementing feature flags with LaunchDarkly in a large enterprise environment. The Security team reviews the network traffic and raises a concern:
> _“Why are our applications making requests to launchdarkly.com?”_
> _Our Enterprise needs all external requests to come from our own domain for compliance and monitoring._
Sound familiar? This is not a new request. Many organizations have network policies that require custom domains for external API calls.
#### Also consider the following use cases:
 * Ad blocker
 * For organizations that have a very technical user base (although, generally, this seems to be a declining discussion).
 * Split horizon DNS
 * Cruise ships, need the domain to resolve to a public endpoint off-ship and require a LaunchDarkly relay instance on-ship.
 * You would need to make sure you have valid certs on both sides of the split for the same domain.
### We’ve seen this before
We collaborate closely with our support team, so we know that this discussion arises frequently.
Now, the question becomes one of implementation.
### What’s a simple way to satisfy the requirement?
There are many ways to solve the same problem. Many teams prefer a “keep it short and simple” (KISS) approach to avoid unnecessary complexity. Since we know our time is rarely spent on a single task, building something simple and functional that incurs low ownership and maintenace costs often wins in design reviews.
### How simple is it?
You can use the one-click deploy below or in the GitHub `README`: [_cloudfront-reverse-proxy_](https://github.com/launchdarkly-labs/cloudfront-reverse-proxy). If you have an AWS account, you can use the one-click deploy. (A one-click cleanup also exists, and is described below.)
Deploy the CloudFront reverse proxy directly from the AWS Console with pre-configured settings. If you want to use a custom domain, set the parameter `UseCustomDomain` to `true` and ensure you use a domain that already exists in Route 53. Setting `UseCustomDomain` to `false` will give you an auto-generated CloudFront domain url.
NOTE: Only one sub-domain address was tested ex: `flags.mydomain.com` behavior may be different or not work if you’re trying to use multiple sub-domains such as `my.flags.mydomain.com`
Region-specific information is listed in the [README](https://github.com/launchdarkly-labs/cloudfront-reverse-proxy?tab=readme-ov-file#-one-click-deploy).
Configuration Options
Parameter | Default | Options | Description 
---|---|---|--- 
`UseCustomDomain` | `false` | `true`/`false` | Use your own domain instead of CloudFront default 
DomainName | `""` | Your domain | Required if UseCustomDomain=true (e.g., `flags.my-company.com`) - will auto-create certificate and DNS records 
`PriceClass` | `PriceClass_100` | `PriceClass_100`/`200`/`All` | Coverage: US/Canada/Europe/Asia (100) vs Global (All) 
c`LoggingBucket` | `""` | S3 bucket name | Required if EnableLogging=true 
### One-Click Cleanup
When you’re done testing your reverse proxy, you can spin down all your resources with one-click cleanup. Remove your CloudFront proxy deployment and clean up all associated resources including DNS records and certificates.
> **⚠️ Warning:** This will permanently delete your CloudFront proxy and all associated resources. Make sure you’re ready before proceeding!
### Why Reverse Proxy wins: The case for simplicity
A reverse proxy is designed for the exact concern the security team has raised. It ensures that requests appear to come from your domain. The single responsibility a reverse proxy has it to route traffic through your domain to upstream services like LaunchDarkly.
Why rebuild what already exists, not to mention requiring the effort needed to maintain such a global system? That said, there are tradeoffs to consider.
### Performance and reliability considerations
You’re stepping away from LaunchDarkly’s optimized Flag Delivery Network (FDN). LaunchDarkly’s infrastructure is built for low-latency flag delivery with global edge locations optimized specifically for feature flag traffic patterns.
When you introduce a reverse proxy:
 * Latency may increase due to the additional network hop through your CloudFront distribution
 * Availability becomes your responsibility; you now own another piece of critical infrastructure in your flag delivery chain
 * You inherit CloudFront’s regional availability (SLA of 99.9) characteristics rather than LaunchDarkly’s FDN optimizations
### Consider a targeted approach
Consider the ad blocker use case, where this could be only a small percentage of clients. You could limit the reverse proxy functionality to only the events endpoint.
If we don’t have data from our requirements, we should measure and quantify how many users are affected before introducing a reverse proxy. When we have our data. we could even perform experiments and progressive or guarded rollouts when implementing the reverse proxy configuration.
### Cost Estimates
Using an AWS CloudFront proxy over 12 months, we should consider the following for total cost of ownership:
 * Setup Cost
 * Monthly Cost
 * Maintenance
For example, the first year may look something like:
Task | Cost 
---|--- 
Initial Setup | ~ 2 hours of engineer time 
Monthly | $20–100 (based on request volume) 
Estimated Maintenance | ~ 1 hour per quarter 
**Estimated cost: $1,500 (year 1)** 
### When NOT to use a Reverse Proxy
We should always evaluate our approach against the full set of requirements. There are times when a simple solution like the reverse proxy is not the right choice.
A [relay proxy](/docs/sdk/relay-proxy) is the better choice when we start to discuss things like:
 * Air gapped environments
 * Server side SDK optimization
 * Any manipulation of data, payload, etc.
 * Extreme data or security requirements
### Implementing the Reverse Proxy in code
After deploying, configure your LaunchDarkly SDKs to use your CloudFront proxy by specifying the options with the reverse proxy URL.
### React SDK (React applications)
```
1
| const LDProvider = await asyncWithLDProvider({
---|--- 
2
| clientSideID: 'your-client-side-id',
3
| context: {
4
| kind: "device",
5
| key: "unique-device-id"
6
| },
7
| options: {
8
| baseUrl: 'https://flags.my-company-domain.com',
9
| eventsUrl: 'https://flags.my-company-domain.com',
10
| streamUrl: 'https://flags.my-company-domain.com'
11
| }
12
| });
```
### Verify that the application is using the Reverse Proxy
Open DevTools from your browser and go to the **Network** tab. Find a LaunchDarkly network event and verify that the request URL matches the one from the reverse proxy deployed.
## Get started with Reverse Proxy
In this post you learned a simple yet effective approach to satisfying your organization’s network policies requirements for custom domains.
Get started with Reverse Proxy in [this GitHub repo](https://github.com/launchdarkly-labs/cloudfront-reverse-proxy), or [sign up for a free LaunchDarkly account here](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs