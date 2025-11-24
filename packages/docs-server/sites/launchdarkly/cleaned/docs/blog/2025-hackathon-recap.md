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
 * [evals evals evals evals evals](#evals-evals-evals-evals-evals)
 * [Dark Skies: The SDK Odyssey](#dark-skies-the-sdk-odyssey)
 * [FeaturePilot](#featurepilot)
 * [DeLorean Test Runner](#delorean-test-runner)
 * [BrunchDarkly](#brunchdarkly)
 * [Conclusion: “It works! It works!”](#conclusion-it-works-it-works)
_Published August 28th, 2025_
![Portrait of Tilde Thurium.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76588f82673e369503c4e8f33cb7280539b2251c25bb4cff7dec2047757115fa/assets/images/authors/tilde-thurium.png)
Tilde Thurium, LaunchDarkly Developer Relations Manager
**Why hackathons?** Because where we’re going, we don’t need boring meetings! Hackathons spark creativity, forge connections across time zones and teams, and supercharge learning by doing. Builders are kinesthetic learners who learn by creating, so we foster a place for them to create. After all, the best way to invent the future is to build it.
In keeping with LaunchDarkly’s general space theming and penchant for puns, our hackathons are called Moonshots. This year we celebrated our 22nd official Moonshot — **Moonshots XXII: Hack to the Future.**
![Gif of the Hack to the Future illustrated poster. It's flashing alternating green and purple.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/63df342339c682003601c33a1b4a38e6771358fec5fc7ce730312b38148dae9e/assets/images/blog/2025-hackathon-recap/hack-to-the-future.gif)
In the future, all fliers are animated.
Great Scott! The projects (and puns) abounded. Over 50 demos were submitted, 14 projects named winners, and ~40 people awarded prizes. I can’t possibly cover them all in enough detail to do the event justice, so here’s a quick recap of five of my favorites, in no particular order:
## evals evals evals evals evals
_Problem_ : LaunchDarkly developers want to roll back poorly behaving models before their customers experience problems. [AI models in production can fail in subtle or unexpected ways](https://launchdarkly.com/blog/catch-ai-hallucinations/) that are hard to catch before users are impacted. Unlike traditional software, generative AI is non-deterministic and environment-sensitive – a prompt or model change that seemed fine in staging can behave very differently in production.
_Solution_ : Eval Configs. In practice, an Eval Config can be attached alongside a primary [AI Config](/docs/home/ai-configs/quickstart) (the one generating content) as a sub-agent to automatically score each output on quality dimensions such as factual accuracy, contextual grounding (hallucination detection), and relevance.
When using an Eval Config, any application can make evaluation-driven decisions live, including whether or not to guardrail or otherwise action on model behavior within a live exposure (e.g. before a customer sees the result). Did someone say live hallucination detection in production?
## Dark Skies: The SDK Odyssey
_Tired_ : corporate certifications. _Wired_ : joyful, gamified learning. A cross functional team of engineers, designers, and marketers converged on a wayward pixellated bus with a chiptune soundtrack. The goal of this project is to teach new users about [LaunchDarkly SDKs](/docs/sdk) by flying a VW camper van through space, dodging misconfigured SDKs. The prototype was built with [Pygame](https://github.com/pygame/pygame), as well as custom sprites and sound assets.
![Gif of an 8-bit bus bouncing up and down.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/56f7f34b046919d98c5e979a2be1c0e120d85d2960150f264f9e96ced65a1ea8/assets/images/blog/2025-hackathon-recap/dark-skies.gif)
It's giving Twilio Quest.
Roll your bus over to GitHub and see if you can beat our high score: <https://github.com/launchdarkly-labs/dark-skies-sdk-odyssey>
## FeaturePilot
It’s important to consider feature management at all stages of the software development lifecycle. Long term maintenance, such as feature flag cleanup, is less exciting than new launches. Ignoring maintenance risks piling up technical debt that will ultimately slow you down.
FeaturePilot integrates AI agents with LaunchDarkly’s feature management platform. It enables one-click automation of code changes and routine tasks directly from the LaunchDarkly UI.
Your choice of agent is flexible: with [Devin](https://devin.ai/), [Cursor](/docs/tutorials/cursor-tips-and-tricks) or something home grown, LaunchDarkly users can trigger workflows such as cleaning up deprecated feature flags, scaffolding SDK integration code, and implementing flags in code with minimal effort.
This integration aims to accelerate development, reduce technical debt, and make feature releases even more seamless for all LaunchDarkly users.
## DeLorean Test Runner
Even though unit and integration tests pass in CI, subtle UI regressions and workflow hiccups frequently slip through after a merge. Manual spot-checking of every pull request doesn’t scale when dozens of PRs land each day, leading to broken user flows in staging or production.
This hacking team built a GitHub App–driven test runner to automatically run each PR’s real-world test scenarios in a headless browser and detect anomalies before merge. Here’s the steps it follows:
 1. **Scenario Extraction**
 * Parse test steps from the PR description.
 2. **Headless Browser Execution**
 * Launch a Chromium instance via Puppeteer/Playwright on AWS EC2.
 * Replay clicks, form-fills, navigations exactly as human tests would.
 3. **Anomaly Detection**
 * Capture console errors, JavaScript exceptions, and HTTP 4xx/5xx failures.
 * Take visual snapshots at key steps and compare against baselines to spot occlusions or layout shifts.
 4. **Report Posting**
 * Compose a concise Markdown report of pass/fail statuses, error logs, and diff images.
 * Post the report as a GitHub Check run or PR comment, giving instant feedback to the author.
With the DeLorean Test Runner in place, every PR _“time-travels”_ through a simulated browser QA check at 88 MPH — catching UX bugs long before they reach staging or production.
## BrunchDarkly
If avocado toast and $6 lattes are the problem (to the millennial housing crisis, obviously), then BrunchDarkly may be the solution! Find out for yourself at brunchdarkly.com. Try toggling the flags on the Admin modal to change the website’s UI in real time: filtering by dietary restrictions, modifying dynamic pricing, showing and hiding personalized recommendations, and more. It’s fun to expose flag flipping on the front end.
![Screenshot of the menu section of BrunchDarkly. There are photos of a delicious-looking acai bowl \(32.68\) and Avocado Toast \(32.98\). I live in San Francisco. These prices seem about right TBH.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/69917424830f24c76a614cb1cccf8ebfb6765f45c58564e44936b74a691530ed/assets/images/blog/2025-hackathon-recap/brunchdarkly-menu.png)
Stahp, you're making me hungry.
![Screenshot of the admin panel for BrunchDarkly. There are various toggles which can be flipped, such as Allergen Warning and Limited Time Offer.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/27fbe7f9247cf2a31e8992ca9b10a28beeba2076ee17de7565b23d5a38edeb0f/assets/images/blog/2025-hackathon-recap/brunchdarkly-admin.png)
If only dietary restriction filters existed for all restaurant menus in real life.
## Conclusion: _“It works! It works!”_
If you still can’t get enough of the Moonshots vibes, listen to [our collaborative playlist](https://open.spotify.com/playlist/47ncMQMpXiw6IpYiLXKJ1z?si=3a21a96f129c4b5c&nd=1&dlsi=646faa06eaa74c62) or [sign up for our newsletter](https://launchdarkly.com/blog/) to get updates on what we’re shipping into production.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs