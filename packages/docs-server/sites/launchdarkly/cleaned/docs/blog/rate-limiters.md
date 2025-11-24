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
 * [Centralized Rate Limiter](#centralized-rate-limiter)
 * [Floodgate Rate Limiter](#floodgate-rate-limiter)
 * [Poisson Rate Limiter](#poisson-rate-limiter)
 * [Conclusion](#conclusion)
_Published August 27th, 2025_
![Portrait of Mike Zorn.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f47ed06ad44190584a09b1be3abe3175b7d67b030fc7f6c71370d77ab4a17e67/assets/images/authors/mike-zorn.png)
by Mike Zorn, LaunchDarkly Engineer
It was an available service, it was a deluge of requests, it was an age of reliability, it was an age of DDoS and abuse, it was the epoch of uptime, it was the epoch of 429s – in short, it was rate limiting.
Sometimes our customers will accidentally send us absurd data volumes and request rates due to misconfigurations of our SDKs. Instead of building our system to handle an unbounded workload, we use rate limits to prevent these requests from affecting our service’s health. Implementing rate limits at scale across a fleet of servers is a distributed systems problem and like all distributed systems problems, there are trade-offs between approaches.
This has led to 3 distinct approaches to rate limits emerging at LaunchDarkly: the Centralized rate limiter, the Floodgate rate limiter and the Poisson rate limiter. Here, we’ll survey these 3 rate limiters and consider the approaches of each one.
## Centralized Rate Limiter
The Centralized Rate Limiter limits requests to the APIs hosted at app.launchdarkly.com. It is designed to be exact and to fail dangerously. It is exact because we return 429 errors to API clients that indicate when they can retry their request and be within their rate limit. It fails dangerously: when Redis is unavailable and we cannot check the rates, all traffic is allowed.
It uses Redis to store the current counts of requests. When a new request comes in, we read that count and check to see if the count is smaller than the limit applied to that request (as determined by a feature flag, of course). If the limit is exceeded we return a 429 response. We also increment the current count of requests in Redis.
## Floodgate Rate Limiter
The Floodgate rate limiter is used to limit traffic to events.launchdarkly.com. It’s allowed us to scale from ingesting 1 TB of events per day to hundreds of TBs of events per day while enduring very high volumes of low-signal traffic from some misconfigured SDKs. It is very similar to the central rate limiter: written in Go and uses Redis; however, it is approximate and fails safe.
Floodgate works similarly to the centralized rate limiter: it evaluates the current count, applies the limit, and increments the counter based on the request. However, all that happens locally on the machine that is servicing the request. There’s no coordination with centralized storage during request processing. Instead, we periodically synchronize a node count, and an overall count from centralized storage. This keeps our rate limit application mostly correct even as our system auto-scales. This is mostly correct, not just correct, because node counts and overall counts may drift between polls. Auto-scaling typically happens in small increments and this rate limiter is typically used for high limits, so these drifts aren’t material.
## Poisson Rate Limiter
The Poisson rate limiter limits the rate at which we index contexts within a Flink pipeline. It uses the [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution) to give us 95% confidence that we aren’t excessively limiting traffic without any coordination. It is approximate and since it requires no coordination, it isn’t actually a distributed system, so it can’t fail.
Like the Floodgate Rate Limiter, this option does not interact with any centralized storage during request processing, in fact, it doesn’t interact with external storage at all! This rate limiter relies on the fact that there are a fixed number of shards that we’re applying our rate limit across. Traffic is distributed randomly across shards, so as traffic arrives at each shard, each customer’s traffic should be approximately Poisson distributed. This fact allows us to apply a rate limit within each shard and quantify the confidence that we aren’t excessively applying the overall rate limit. Essentially, we add a “fudge factor” to our limit, but we choose the factor very carefully.
We choose that factor by pre-computing the 95% inverse CDF of the poisson distribution for each limit value & shard count and using that as the limit. For example, if we want to enforce a global limit of 1,000 requests per second across 10 shards, we compute the 95th percentile of the expected per-shard Poisson distribution and use that as the shard-local limit. That works out to 117: on each shard, we’d accept up to 117 requests/sec and we’d have a 95% chance that we wouldn’t over enforce the limit.
## Conclusion
We described three different approaches to rate limiting in a distributed system. It’s worth noting that these mechanisms are all used to limit traffic that has already been authenticated. If you’re needing to apply coarse grained rate limits to unauthenticated traffic, you’ll want to use other techniques. The approaches balanced simplicity, resiliency and accuracy differently. The Poisson Rate Limiter is great if you have a constant amount of nodes that you’re applying a rate limit across. The Floodgate Rate Limiter is great if you have a high throughput system that needs to be reliable, but rate limits enforcement can be imperfect. The Centralized Rate Limiter is good when you need exact accuracy of limit enforcement and can risk reliability in the event the centralized storage is unavailable. If you’re writing your own rate limiter, you might even combine the Poisson Rate Limiter with the Floodgate Rate Limiter to improve the accuracy of the Floodgate approach.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs