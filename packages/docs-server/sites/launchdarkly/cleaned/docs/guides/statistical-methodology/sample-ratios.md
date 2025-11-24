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
 * [How to fix SRMs in JavaScript-based SDKs](#how-to-fix-srms-in-javascript-based-sdks)
 * [Update your SDKs](#update-your-sdks)
 * [Allow duplicate events](#allow-duplicate-events)
 * [Adjust for event loss](#adjust-for-event-loss)
 * [How SRMs occur](#how-srms-occur)
## Overview
This guide explains what sample ratios are and how to detect a sample ratio mismatch (SRM).
In your experiments and guarded rollouts, the sample ratio is the ratio between end users receiving each of your experiment or rollout variations. An SRM is a mismatch between the number of users expected and the actual number of users included in each variation.
SRMs can occur if you are using JavaScript-based client-side SDKs. If LaunchDarkly alerts you of an SRM in one of your experiments or guarded rollouts, there are actions you can take to correct it.
Here is how to tell if your experiment or guarded rollout has an SRM:
 * When an experiment has an SRM, there will be a message above the [Exposures section](/docs/home/experimentation/analyze#exposures) on the experiment’s **Results** tab.
 * When a guarded rollout has an SRM, there will be a message on the flag’s **Monitoring** tab in the guarded rollout section.
## How to fix SRMs in JavaScript-based SDKs
SRMs are most commonly caused by outdated SDKs, event deduplication, and problematic application behavior.
### Update your SDKs
Outdated SDKs are the most common cause of SRMs. If you observe an SRM and are using any of the LaunchDarkly JavaScript-based client-side SDKs, you may need to update your SDK.
If you are using JavaScript or React Web, confirm that you are using at least these versions:
 * Version 2.23.0 or newer of the [JavaScript SDK](/docs/sdk/client-side/javascript)
 * Version 2.28.0 or newer of the [React Web SDK](/docs/sdk/client-side/react/react-web)
These versions send the correct versions of events that LaunchDarkly needs for experimentation tracking. To learn more, read [Experimentation and metric events](/docs/home/experimentation/events).
### Allow duplicate events
Older versions of the JavaScript SDK, prior to version 2.23.0, deduplicate events by default. This can cause an SRM in the case where you evaluate the same flag before and after a call to `identify`.
###### Expand for an example of event deduplication with identify
If you add attributes to your user object after initialization and then call `identify`, event deduplication can cause a non-random loss of experimentation events.
Here’s how this can happen:
 1. Your code initializes the JavaScript SDK.
 2. An end user encounters a flag in your application. The user does not match your experiment rule, and LaunchDarkly serves a flag variation to the user.
 3. Your application learns more about the end user. Your code adds attributes to the user object, without changing the user key, and calls `identify`.
 4. Because of the `identify` call, LaunchDarkly re-evaluates the flag for the same user. Based on the additional attributes, the user now matches your experiment rule and is eligible for the experiment.
 5. The user is randomly assigned to the same flag variation that they were previously served.
If these steps happen within the SDK’s deduplication window of five minutes, the user will not be counted as part of the experiment. If, in step 5, the user is randomly assigned to a different flag variation than they were previously served, then they will be counted correctly as part of the experiment. Because some users are being counted and some users are not, you will have an SRM.
Older versions of the React Web SDK, prior to version 2.28.0, have a similar issue. Furthermore, in the React Web SDK `LDProvider` calls `allFlags` after initializing the client. This can potentially exacerbate issues with event deduplication.
To fix this, we strongly recommend upgrading your SDK version. If you can’t upgrade your SDK version, you can set the `allowFrequentDuplicateEvents` option to `true`.
###### Expand for allowFrequentDuplicateEvents code sample
Here’s how to set the `allowFrequentDuplicateEvents` option in your JavaScript SDK to `true`:
JavaScriptTypeScript
```
1
| const options = { allowFrequentDuplicateEvents: true };
---|--- 
2
| const client = LDClient.initialize('client-side-id-123abc', user, options);
```
The `allowFrequentDuplicateEvents` option has been deprecated in the JavaScript SDK version 2.23.0 and React Web SDK version 2.28.0. It has been removed in version 3 of the JavaScript and React Web SDKs.
### Adjust for event loss
Some experiment and guarded rollout implementations can lose events disproportionally for JavaScript-based client-side SDKs. For example, if an experiment is an A/B test where the “A” does nothing and the “B” immediately redirects your end users to another page, it’s possible that more events from the “B” variation will be lost.
The LaunchDarkly SDKs send events immediately when the page unloads. However, some browsers, such as Safari on iOS, do not respect asynchronous calls on unload. If LaunchDarkly cannot record all of the events for your experiment or guarded rollout, then it will have an SRM.
Check if one of your treatment variations causes users to leave the page more quickly than the control variation. If so, you may need to adjust your treatment variations to correct this behavior.
## How SRMs occur
There are many ways an SRM can occur, but the most common is that the randomization method is incorrect.
Imagine you have an experiment or guarded rollout with 50% of users assigned to control variation A and 50% assigned to treatment variation B. You should expect that with a sufficient sample size, the split is roughly 50/50. Because the sampling is random, this split will not be exact. However, it should be close. You should not have 40% of users in variation A and 60% of users in variation B.
LaunchDarkly uses statistics to determine if the sample ratio is more different than what you should expect from a random sampling. If there’s a 99% or greater probability that the units, or users, in the experiment or guarded rollout are not arriving at the same rate as expected given how you’ve allocated the traffic, then LaunchDarkly displays a warning noting that your results are likely invalid.
For more troubleshooting guidance, read [Troubleshooting SRM errors with experiments](https://support.launchdarkly.com/hc/en-us/articles/16743658874395-Troubleshooting-SRM-errors-with-experiments).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs