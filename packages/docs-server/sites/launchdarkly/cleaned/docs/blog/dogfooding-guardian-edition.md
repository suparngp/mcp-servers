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
 * [🐥 🐥 🐥 Splitting releases reduces risk](#----splitting-releases-reduces-risk)
 * [Using multiple flags](#using-multiple-flags)
 * [Guarded releases 🤝 Frontend observability = 💪](#guarded-releases--frontend-observability--)
 * [From mitigating risk to increasing confidence](#from-mitigating-risk-to-increasing-confidence)
 * [There’s always more to learn 🌈](#theres-always-more-to-learn-)
_Published September 25th, 2025_
![Portrait of Valerie Roske.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9048dbdf91ea94fb4cbaf8296d4509cdc0cdad5dc9753fbbfbca9e9a5d7ac7d0/assets/images/authors/valerie-roske.jpeg)
Valerie Roske, LaunchDarkly Engineer
Some time ago, we were working on adding support for [approvals](/docs/home/releases/approvals) to [segments](/docs/home/flags/segments) in LaunchDarkly. Up to that point, only changes to flags utilized our approval system, and the system was unfortunately not resource-agnostic. This meant that in addition to introducing a new product feature, we also had to make some technical upgrades to support a future where approvals could work for any resource.
This also meant that our release became inherently riskier as a result of our project goals. We didn’t want to mess with flag approvals, nor disrupt the current segment workflows, while still advancing the product to meet our customers’ needs. At LaunchDarkly, we are also our own customers! Here’s how we used guarded releases to de-risk our release of segment approvals.
## 🐥 🐥 🐥 Splitting releases reduces risk
Larger changesets increase risk. That’s why we strive to keep pull requests as small as possible, and why we work so hard to keep our deployment pipeline unblocked and continuously deploying. In that same vein, we can also avoid big-bang releases in order to de-risk the overall rollout of a feature. We often tend to approach this by releasing to multiple segments over time as a way to reduce the blast radius, but that’s not the only lever we have available to us!
### Using multiple flags
Our approval system relies on [semantic patch operations](/docs/guides/api/rest-api#using-semantic-patch-in-the-launchdarkly-api) in order to explain the set of instructions we must execute at a later time. Semantic patch allows us to capture the actual intent of the change rather than being specifically tied to the current state of a given resource; as a result, we can show users richer details in the UI for a pending approval request.
![Example approval request: a flag named turn on refreshed dropdown for catfood was approved by Valerie Roske.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f5ac1ce3a5abdd6cbcbd0aba406d579f5996185b95cfeb3db1cb7f8346dd4ff8/assets/images/blog/dogfooding-guardian-edition/flag-approvals.png)
Screenshot of the UI for approval requests.
Segment updates didn’t utilize semantic patch in the product, so transitioning away from JSONPatch became a technical prerequisite for enabling approvals. This change was invisible to users, but was a big part of why our overall release was so risky, as literally every interaction on segments was impacted.
So, we decided to introduce two main flags: one for the semantic patch transition, and another to enable required approvals for segments. This allowed us to run separate guarded releases on each flag. (We actually had even more flags than this for additional extensions such as optional approvals!)
## Guarded releases 🤝 Frontend observability = 💪
Successful [guarded releases](/docs/home/releases/guarded-rollouts) need metrics to monitor. With the semantic patch transition, it was clear we needed to monitor the API error rate and latency, but we also wanted to assuage our concerns that the change wouldn’t impact the UI at all, so it was important for us to include frontend observability metrics in our guarded release configuration.
And it was a good thing we did, too! After detecting only _five instances_ of a particular UI error, the guarded release automatically rolled back the semantic patch flag. We were able to fix the issue quickly and restart the rollout as if nothing happened. It was super nice to know that LaunchDarkly took care of the auto-rollback for us so we could focus on the investigation and remediation.
But the real ✨magic✨ was using our same error taxonomy for the metrics the guarded release was monitoring. Drawing a direct line from “regression detected” to the exact issue that stopped the rollout is such a super power. 💪
## From mitigating risk to increasing confidence
Having an initial rollout for the semantic patch flag greatly increased our confidence that the subsequent rollout to the segment approvals flag would go smoothly, because we knew that with a smaller surface area being released to users, isolating the root cause of any errors would be significantly easier. This also worked well as a way to break up the change because the semantic patch change was both technically complex and invisible to users.
When we actually did catch an issue early, that was especially validating. We wouldn’t have been able to use auto-rollback on the segment approvals flag for a variety of technical reasons, so the potential disruption to customers could have been far greater.
When it finally came to rolling out the real deal segment approvals flag, it was a non-event, which is often the dream for any release! The guarded release confirmed that introducing a new feature wasn’t disruptive to users’ existing workflows.
## There’s always more to learn 🌈
Guarded rollouts are especially great for existing workflows in your product to ensure you haven’t introduced a regression. But this is rarely the end of the story for most releases; there’s more to learn about the positive impact your feature might have for customers. What else can you learn? How else can you improve your product and practices to understand and celebrate the impact of your releases? ✨
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs