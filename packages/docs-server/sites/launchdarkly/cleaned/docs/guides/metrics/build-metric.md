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
 * [About LaunchDarkly metrics](#about-launchdarkly-metrics)
 * [Build an integration](#build-an-integration)
 * [Format of a request](#format-of-a-request)
 * [HTTP User Agent for REST API requests](#http-user-agent-for-rest-api-requests)
 * [Authentication](#authentication)
 * [Creation](#creation)
 * [Manifest.json example](#manifestjson-example)
 * [Conclusion](#conclusion)
## Overview
This guide explains how LaunchDarkly partners can use the REST API to build an integration for [Creating and managing metrics](/docs/home/metrics). By the end of this guide, you as a LaunchDarkly partner should have the information you need to create an integration that can create metrics for our joint customers’ LaunchDarkly experiments.
## About LaunchDarkly metrics
Experimentation lets you validate the impact of features you roll out to your app or infrastructure. You can measure things like page views, clicks, load time, infrastructure costs, and more.
By connecting metrics you create to flags in your LaunchDarkly environment, you can measure the changes in your customer’s behavior based on what flags they evaluate. This helps you make more informed decisions, so the features your development team ships align with your business objectives.
You can use this integration method to create [custom conversion binary metrics](/docs/home/metrics/custom), [custom conversion count metrics](/docs/home/metrics/custom-count), and [custom numeric metrics](/docs/home/metrics/custom-numeric):
 * Custom conversion binary and custom conversion count metrics track events for any arbitrary event
 * Custom numeric metrics track increases or decreases in a numeric value against a baseline you set
To learn more, read [Metric events](/docs/home/metrics/metric-events).
## Build an integration
To build an integration, make sure you meet the [prerequisites](/docs/integrations/partner-integrations/getting-started#prerequisites). Then follow the steps outlined on the [Getting started](/docs/integrations/partner-integrations/getting-started) page.
The Getting started page explains each of the following steps in detail:
 1. [Forking the LaunchDarkly Integration Framework repository](/docs/integrations/partner-integrations/getting-started#fork-the-launchdarkly-integration-framework-repository).
 2. [Creating a new directory](/docs/integrations/partner-integrations/getting-started#create-a-new-directory).
 3. [Creating an integration manifest](/docs/integrations/partner-integrations/getting-started#create-an-integration-manifest).
 * For an example of a completed manifest, read the [Manifest.json example](/docs/guides/metrics/build-metric#manifestjson-example).
 1. [Defining the integration’s capabilities](/docs/integrations/partner-integrations/getting-started#define-the-integrations-capabilities).
 * No capability section is required for a metric creation integration. You can add a top-level key `"otherCapabilities"" ["external"]`.
 1. [Creating end-user documentation and README](/docs/integrations/partner-integrations/getting-started#create-end-user-documentation-and-readme).
 2. [Submitting the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration).
## Format of a request
For a custom metric integration, the following sections describe the required request format.
### HTTP User Agent for REST API requests
All API calls from LaunchDarkly partners should include a custom User-Agent:
JSON
```
1
| {launchdarkly product}-{source product}-int/{version}
---|--- 
```
### Authentication
Your integration can use either API keys or OAuth for authentication:
 * If you use API keys, your customers will need to create them in LaunchDarkly and provide them to your service.
 * If you use OAuth, configure it as described in [Registering a LaunchDarkly OAuth client](/docs/integrations/partner-integrations/oauth-client-registration).
LaunchDarkly has support for OAuth clients. The only two types of scoped permissions are currently `reader` and `writer`. A metric integration needs the `writer` scope so it can create metrics. However, your customers may not want to provide the level of access overall that this functionality would grant.
For a custom metric integration, we suggest that partners use an API key.
### Creation
The endpoint to create a new metric accepts a POST body in JSON format. The minimum set of required parameters is:
 * `key`: The metric key.
 * `kind`: This kind of event your metric will track. This should be `custom`.
 * `isNumeric`: Whether to track numeric changes in value against a baseline (`true`) or to track a conversion when users taken an action (`false`).
 * `unit`: The unit of measure for numeric custom metrics.
 * `eventKey`: This should be equal to the event key you’re using in your code.
##### Event keys and metric keys are different
Sending custom events to LaunchDarkly requires a unique **event key**. You can set the event key to anything you want. Adding this event key to your codebase lets your SDK track actions customers take in your app as events. To learn more, read [Sending custom events](/docs/sdk/features/events).
LaunchDarkly also automatically generates a **metric key** when you create a metric. You only use the metric key to identify the metric in API calls. To learn more, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Create a LaunchDarkly metric](/docs/api/metrics/post-metric)
### Manifest.json example
This manifest is required for an integration. It renders your integration metadata inside of the LaunchDarkly UI.
JSON
```
1
| {
---|--- 
2
| "name": "Sample Integration",
3
| "version": "1.0.0",
4
| "overview": "Short one-liner describing your integration.",
5
| "description": "Send flag data to space. Markdown-based description.",
6
| "author": "Acme Inc.",
7
| "supportEmail": "support@example.com",
8
| "links": {
9
| "site": "https://example.com",
10
| "supportWebsite": "https://docs.release.com/integrations/integrations-overview/launchdarkly-integration",
11
| "privacyPolicy": "https://example.com/privacy"
12
| },
13
| "categories": ["automation"],
14
| "icons": {
15
| "square": "assets/images/square.svg",
16
| "horizontal": "assets/images/horizontal.svg"
17
| },
18
| "otherCapabilities": ["external"]
19
| }
```
## Conclusion
This guide describes the process of building a metric integration. To learn more about building your own integrations, read [Building partner integrations](/docs/integrations/partner-integrations).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs