`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Use bulk targeting when possible](#use-bulk-targeting-when-possible)
 * [Acceptable uses for individual targeting](#acceptable-uses-for-individual-targeting)
## Overview
This guide describes when individual targeting is appropriate and why LaunchDarkly recommends bulk targeting. It also explains how the SDK uses big segments to support scalable and efficient targeting.
## Use bulk targeting when possible
Do not target individual contexts unless absolutely necessary. This approach can create outdated rules and add to flag debt.
Targeting more than 10,000 individual contexts in an environment can also affect performance. Large targeting payloads increase SDK initialization time.
Instead, we recommend using big segments or attribute-based targeting. Those options are simpler and more efficient than maintaining and scaling other types of targeting.
To learn more, read [SDK and integration configuration for segments](/docs/home/flags/segment-config), [How big segment caching works](/docs/sdk/features/big-segments#how-big-segment-caching-works), and [Targeting rules](/docs/home/flags/target-rules).
## Acceptable uses for individual targeting
There are three scenarios where individual targeting may be preferable to other types of targeting:
 1. **Edge cases** : Occasionally, a customer might fall into an edge case that requires a feature flag to be toggled just for them. This is acceptable. However, if you’re a large organization with hundreds or thousands of such users, you’ll likely have dozens or hundreds of flags, too. In these cases, it’s better to use big segments or target by attribute to ensure scalability.
 2. **Short-lived troubleshooting** : It’s common to enable a flag for a specific customer to troubleshoot an issue or provide temporary access to a gated aspect of your app. Scheduled flag removal helps ensure that the targeting settings don’t exist longer than necessary. This use case typically doesn’t require large-scale targeting, and can be addressed with targeting by attribute instead. Even if you exceed the 10,000 individual targets limit, this type of targeting is usually so short-lived it rarely justifies switching to big segments.
 3. **Facilitating early adoption** : Individual targeting can address the needs of teams that are still setting up their infrastructure. Teams that are still setting up their infrastructure may use individual targeting as an interim measure until they can implement a scalable solution.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs