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
 * [Concepts](#concepts)
 * [Logged-out end users](#logged-out-end-users)
 * [Custom attributes](#custom-attributes)
 * [Custom numeric metrics](#custom-numeric-metrics)
 * [Consistency during end-user sessions](#consistency-during-end-user-sessions)
 * [Build an experiment with logged-out and logged-in states](#build-an-experiment-with-logged-out-and-logged-in-states)
 * [Hypothesis](#hypothesis)
 * [Randomization unit](#randomization-unit)
 * [Sample size](#sample-size)
 * [Metric](#metric)
 * [Variations](#variations)
 * [Audience](#audience)
 * [Experiment design](#experiment-design)
 * [Conclusion](#conclusion)
## Overview
This guide provides strategies and best practices to manage experiments that include both logged-out and logged-in end users.
You may want to run experiments on end-user behavior within apps or websites that have both a logged-out and logged-in state, such as an online store where customers can check out either as a guest or as a logged-in end user.
You could compare two variations of your site, a one-click checkout experience versus a two-click checkout experience, and track a metric such as time to check out. The most important thing for your experiment to measure is whether one click or two clicks affects the time customers spend checking out of your store, so the primary metric you will use is checkout time. If you want to also track whether or not the end user was logged in, you can add their logged-in state as a custom attribute. To learn more, read [Custom attributes](/docs/home/flags/custom-attributes).
## Concepts
In order to use this guide, you should understand the following concepts:
### Logged-out end users
Logged-out end users are people that LaunchDarkly has not yet identified. When you’re using Experimentation with logged-out end users, you should assign each logged-out end user a unique key. To learn more, read [Anonymous contexts](/docs/home/flags/anonymous-contexts).
### Custom attributes
You can create custom attributes to track and target contexts based on any data you want to track. To learn more, read [Custom attributes](/docs/home/flags/custom-attributes).
### Custom numeric metrics
You can use numeric metrics to track the changes in a value against a baseline value. To learn more, read [Custom numeric metrics](/docs/home/metrics/custom-numeric).
## Consistency during end-user sessions
When conducting an experiment on an app or website with both logged-out and logged-in states, it feels intuitive to want the end user to receive the same variation every time they log in. However, if you prioritize giving the end user the same variation every time they log in, that end user might see a different variation before and after they log in within the same session. Having the variation change mid-session can be more confusing than seeing different variations between sessions.
For example, imagine Anna visits your website on her phone before she logs in. She sees variation A, the one-click checkout option. She adds some items to her cart, remembers to log in, continues to see variation A, adds a few more items, then gets interrupted. She decides to finish checking out later.
That evening, Anna visits your website from her laptop. Because she is not logged in yet and is on a different device, your experiment has no way to know she is the same person from earlier in the day. The experiment serves variation B, the two-click checkout option. Anna then logs in. If you insist on Anna’s logged-in state always seeing variation A, that means Anna will suddenly see her variation change from B to A in the middle of her session. This is confusing to Anna, and she wonders if there is a bug in the checkout process. Anna decides not to enter her credit card information until she’s sure there’s not a problem with the site, and leaves the store without checking out.
Contrast this with Miguel’s experience. Miguel visits your website on his phone and does not log in. He sees variation A, the one-click checkout option. He adds some items to his cart, remembers to log in, continues to see variation A, adds a few more items, then gets interrupted. He decides to finish checking out later.
That evening, Miguel visits your website from his laptop. Because he is not logged in yet, and is on a different device, your experiment has no way to know he is the same person from earlier in the day. The experiment serves variation B, the two-click checkout option. Miguel then logs in and looks at his cart. Miguel continues to see variation B, experiences no interruption in user experience, and completes his transaction.
In either scenario, if your metric is tracking time to check out, it will properly track the end user’s behavior and correlate it to the correct variation. This is because the experiment is comparing checkout buttons, not logged-in states. However, Miguel had a better user experience than Anna.
The approach you choose when designing experiments for logged-out and logged-in end users should balance your experiment’s objectives and the end user’s experience. For the above example, one way you could ensure a more consistent end-user experience is to limit the experiment to mobile-only or desktop-only, or to run two mutually exclusive concurrent experiments, one for each platform. To learn how, read [Mutually exclusive experiments](/docs/home/experimentation/mutually-exclusive).
## Build an experiment with logged-out and logged-in states
Even when you design your experiment for consistency within sessions, you can still track whether someone was logged in using a custom attribute. In this example, we will show you how to build a checkout experience experiment for an app with logged-out and logged-in states, and how to track time to checkout as a primary metric.
### Hypothesis
To begin, create a hypothesis for your experiment. Here is an example:
> If we implement a one-click checkout experience, then customers will spend less time in the checkout process than customers who encounter a two-click checkout experience, because it requires fewer clicks.
### Randomization unit
Choose a randomization unit context kind that is mapped to the standard randomization unit of `Guest`. If you don’t have a context kind that is mapped to the standard randomization unit of `Guest`, you will need to create one. To learn how, read [Creating context kinds](/docs/home/flags/context-kinds-create). In this example, we’re also calling the custom context kind `guest`.
If you wanted to run a version of this experiment only on logged in users, you would instead choose a randomization unit context kind that is mapped to the standard randomization unit of `User`.
To learn more, read [Randomization units](/docs/home/experimentation/randomization).
### Sample size
Next, determine the sample size you need for your experiment.
If you are running a [frequentist](/docs/guides/experimentation/bayesian-frequentist) experiment, we recommend you use LaunchDarkly’s [sample size calculator](https://launchdarkly.com/sample-size-calculator/) to determine your sample size and run time.
If you are running a Bayesian experiment, we generally recommend you run experiments for at least one week. After you begin running an experiment, the experiment’s **Results** tab displays a sample size estimator in the “Summary” section that gives an estimate of how much more traffic needs to encounter your experiment before reaching your chosen probability to be best.
In this example, you know that about 2000 customers check out per day, and you’d like to have at least 15,000 customers in your experiment. So, you will run this experiment on 50% of your customer base for 15 days to include about 15,000 customers.
Here is the sample size calculation:
`2000 customers x 15 days x 50% of customers = 15,000 contexts in experiment`
As you decide on the sample size, you may want to consider the number of Experimentation keys you have available in the LaunchDarkly plan you subscribe to. For example, if you have 50,000 Experimentation keys per month included in your plan, and you run ten experiments per month, you may want to limit your experiment audiences to no more than 5,000 keys each. To learn more, read [Experimentation keys](/docs/home/account/calculating-billing#experimentation-keys).
### Metric
Use a custom numeric metric to track time to checkout. To learn how to create a custom numeric metric, read [Custom numeric metrics](/docs/home/metrics/custom-numeric).
Use the following settings for the metric:
 * Unit of measure: “ms”
 * Success criterion: “Lower is better”
 * Unit aggregation method: “Average”
 * Analysis method: “Average”
 * Randomization unit: `guest`
 * Success criteria: “lower is better”
 * Units without events: “Exclude units that did not send any events from the analysis”
Here is an example of this metric:
![The "Metric definition" section for a custom numeric metric.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3c29804e705d6b1f1d1ed44db04793c5f17b67a1c6ad5f7856334023304a431e/assets/images/auto/experiment-guide-logged-in-metric.auto.png)
The "Metric definition" section for a custom numeric metric.
When you create the metric, enter the appropriate event key from your codebase. In this example, the event key is `time-to-checkout`.
##### Event keys and metric keys are different
Sending custom events to LaunchDarkly requires a unique **event key**. You can set the event key to anything you want. Adding this event key to your codebase lets your SDK track actions customers take in your app as events. To learn more, read [Sending custom events](/docs/sdk/features/events).
LaunchDarkly also automatically generates a **metric key** when you create a metric. You only use the metric key to identify the metric in API calls. To learn more, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
### Variations
The boolean flag you use in your experiment will have two variations:
 * A two-click checkout, which acts as the control
 * A one-click checkout
Here is what your flag’s variations will look like:
![A flag with two variations.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f43134b3f8d5cdecc453ef6a8bedae637e9230895c03375c4e9bc98c6ea254c5/assets/images/auto/experiment-logged-in-flag.auto.png)
A flag with two variations.
### Audience
In this experiment, you want a random sample of your entire user base in the experiment, so you will not create any targeting rules for the flag.
### Experiment design
Finally, combine your hypothesis, metric, flag, and audience into an experiment. To learn how, read [Creating experiments](/docs/home/experimentation/create).
Here is an example of the finished experiment in LaunchDarkly:
![A complete trial period length experiment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3eeedecb503784c6f7e8bf0b5de6a00bd89c3939672c72528d883cb492ab2f5d/assets/images/auto/experiment-logged-in-design.auto.png)
A complete trial period length experiment.
## Conclusion
When running experiments on sites with logged-out and logged-in states, you do not need to serve the same variation to a particular end user every time they log in. Instead, maintaining a consistent experience before and after log in throughout a single session is a better user experience, and ensures that you still record the Experimentation data you need to make improvements to your site.
To get started building your own experiment, follow our [Quickstart for Experimentation](/docs/home/experimentation/quickstart).
##### You can also send data to and run experiments with Snowflake
Snowflake users who want to explore this data more in-depth can send all of the experiment data to a Snowflake database using the Snowflake Data Export integration. By exporting your LaunchDarkly experiment data to the same Snowflake warehouse as your other data, you can build custom reports in Snowflake to answer product behavior questions. To learn more, read [Snowflake Data Export](/docs/integrations/data-export/snowflake).
You can also run warehouse native experiments in LaunchDarkly using data coming directly from your Snowflake warehouse. To learn more, read [Snowflake native Experimentation](/docs/home/warehouse-native/snowflake).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs