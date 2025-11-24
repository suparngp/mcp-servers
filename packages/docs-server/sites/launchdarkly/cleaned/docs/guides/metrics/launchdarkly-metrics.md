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
 * [How to find the right metric for your needs](#how-to-find-the-right-metric-for-your-needs)
 * [Experimentation and guarded rollout metrics](#experimentation-and-guarded-rollout-metrics)
 * [Experimentation](#experimentation)
 * [Guarded rollouts](#guarded-rollouts)
 * [Migration flag metrics](#migration-flag-metrics)
 * [AI Config metrics](#ai-config-metrics)
 * [Application adoption metrics](#application-adoption-metrics)
 * [Account metrics](#account-metrics)
 * [Launch Insights](#launch-insights)
 * [Conclusion](#conclusion)
## Overview
This guide explains the different kinds of LaunchDarkly metrics and what you can use them for. LaunchDarkly uses different kinds of metrics to do things like measure flag change impact, gauge application performance, track account usage, and more.
The different kinds of metrics within LaunchDarkly include:
 * [Experimentation and guarded rollout metrics](/docs/guides/metrics/launchdarkly-metrics#experimentation-and-guarded-rollout-metrics)
 * [Migration flag metrics](/docs/guides/metrics/launchdarkly-metrics#migration-flag-metrics)
 * [AI Config metrics](/docs/guides/metrics/launchdarkly-metrics#ai-config-metrics)
 * [Application adoption metrics](/docs/guides/metrics/launchdarkly-metrics#application-adoption-metrics)
 * [Account metrics](/docs/guides/metrics/launchdarkly-metrics#account-metrics)
 * [Launch Insights](/docs/guides/metrics/launchdarkly-metrics#launch-insights)
Continue reading to learn more about each kind of metric and how you can use metrics to help meet your business needs throughout the software development, deployment, and release cycle.
## How to find the right metric for your needs
Most LaunchDarkly capabilities that use metrics automatically include metrics as part of the feature. Launch insights, AI Configs, migration flags, applications, and account usage all include metrics ready for you to use. Flag impact metrics are different in that they require you to do some initial metric setup before you can use them. You can read more about flag impact metrics in the next section.
If you’re confused about which metric to use for a particular business purpose, use the LaunchDarkly docs site search function to search for “metric + [use]”. For example, you might search for “metric deployment” for documentation on engineering insights metrics, or “metric migration” for migration flag metrics.
If you still are unsure what metric to use for your needs after reading this guide, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
## Experimentation and guarded rollout metrics
Experimentation and guarded rollout metrics measure changes in audience or system behaviors affected by different flag variations. These metrics are unique from other LaunchDarkly metrics in that they are not pre-defined for you. You must first create and define what you want a metric to measure before you can use it. You can then use the metric with [guarded rollouts](/docs/home/releases/guarded-rollouts) and [experiments](/docs/home/experimentation).
Experimentation and guarded rollout metrics can measure things like:
 * how often customers access a URL
 * how long a URL takes to load a page
 * how often customer payments succeed
 * how many items customers purchase per transaction
 * how long it takes for a server to respond to a request
 * how long until the time to first byte
There are five types of flag impact metrics: clicked or tapped conversion, custom conversion binary, custom conversion count, custom numeric, and page viewed conversion metrics. For examples of what each type of flag impact metric can measure, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
LaunchDarkly records metric data through metric events. You can export metric event information to other applications to perform analysis in third-party tools. For a full list of available metric integrations, read [Experimentation and metric integrations](/docs/integrations/experimentation).
You can also import metric events from third-party applications to use with LaunchDarkly. To learn how, read [Importing metric events](/docs/home/metrics/import-events).
### Experimentation
Experimentation lets you track single metrics or metric groups on multiple variations of the same flag to find out which performs best over time. When you have enough data from your Experimentation metrics to make a decision, you can then roll out the winning variation to the rest of your audience. To learn more, read [Experimentation](/docs/home/experimentation).
### Guarded rollouts
Guarded rollouts let you attach single metrics or metric groups to a targeting rule on a flag.
If those metrics detect regressions, or negative impact, after you start serving the flag variation, LaunchDarkly can notify you or automatically roll back the flag change. To learn more, read [Guarded rollouts](/docs/home/releases/guarded-rollouts).
## Migration flag metrics
A migration feature flag is a temporary flag you can use to migrate data or systems while keeping your application available and disruption free. Migration flags break the transition from an old to a new implementation into a series of two to six stages. You can use migration flag metrics to track the progress of a migration flag. To learn more, read [Migration flags](/docs/home/flags/migration).
Migration flag metrics include:
 * consistency rate: this metric shows how often two sets of compared data match each other
 * p99 latency: this metric measures custom latency rates as reported by your SDK
 * error rate: this metric measures errors as reported by your SDK
To learn more, read [Migration flag metrics](/docs/home/flags/migration-metrics).
![Three charts, each displaying a healthy migration metric.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7963566359dd8c85e957159e45d3ad0fb60daece8f7c65132f3c94df8864af5d/assets/images/__LD_UI_no_test/migration-metrics-charts.png)
Three charts, each displaying a healthy migration metric.
You can configure migration flag metrics in your SDK. To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
## AI Config metrics
An AI Config is a resource that you create in LaunchDarkly. You can use AI Configs to customize, test, and roll out new large language models (LLMs) within your generative AI applications.
To learn more, read [AI Configs](/docs/home/ai-configs).
AI Config metrics include:
 * **Output satisfaction rate** is the percentage of “thumbs up” ratings provided by end users who have encountered the AI Config in this environment.
 * **Generation count** is the number of successful generations completed using the AI Config in this environment.
 * **Input tokens used** is the total input tokens used by the AI Config in this environment.
 * **Output tokens used** is the total output tokens used by the AI Config in this environment.
 * **Average output tokens per generation** is the total output tokens used divided by the number of successful generations completed by the AI Config in this environment.
 * **Average duration per generation (ms)** is the total duration of calls to your LLM provider divided by the number of total generations using the AI Config in this environment.
 * **Error rate** is the percentage of errors out of the total number of generations attempted.
 * **Average time to first token (ms)** is the mean time it takes to generate the initial token.
AI Config metrics are split by variation, so you can compare the performance of different variations. To learn more, read [Monitor AI Configs](/docs/home/ai-configs/monitor).
## Application adoption metrics
When you are developing a mobile app, you can use applications to track version adoption and to evaluate flags differently for supported or unsupported app versions. To learn more, read [Applications and application versions](/docs/home/releases/apps-and-app-versions).
You can use application adoption metrics to understand the adoption percentage for an application version. To learn more, read [Adoption metrics](/docs/home/releases/apps-and-app-versions#adoption-metrics).
![The "Versions" tab for an application.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f0bc7d025a942f7981d9a0e0bba50734429a64af11758d14d2c4697fa9b4a0dc/assets/images/auto/application-versions-tab.auto.png)
The "Versions" tab for an application.
## Account metrics
You can use account metrics to understand your monthly active users (MAU) usage, Experimentation key usage, Data Export usage, and server usage for billing purposes. To learn more, read [Account usage metrics](/docs/home/account/metrics).
## Launch Insights
Launch Insights is an executive-level dashboard that summarizes how your organization is adopting the best practices associated with risk-free releases. The dashboard updates with new scores, trends, and activity automatically. To learn more, read [Launch Insights](/docs/home/getting-started/launch-insights).
## Conclusion
LaunchDarkly provides a variety of metrics to provide you with the information you need to make informed business decisions. For more help deciding which metrics to use for your needs, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs