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
 * [LaunchDarkly environments](#launchdarkly-environments)
 * [Build an integration](#build-an-integration)
 * [Format of a request](#format-of-a-request)
 * [HTTP User Agent for REST API requests](#http-user-agent-for-rest-api-requests)
 * [Authentication](#authentication)
 * [Creation](#creation)
 * [Deletion](#deletion)
 * [Manifest.json example](#manifestjson-example)
 * [Conclusion](#conclusion)
## Overview
This guide explains how LaunchDarkly partners can use the REST API to build an Environment as a Service (EaaS) integration. By the end of this guide, you as a LaunchDarkly partner should have the information you need to create an integration that can manage the full lifecycle of on-demand LaunchDarkly environments.
LaunchDarkly feature management gives customers the ability to enable certain features only for specific application environments, or for specific end users within those environments.
Organizations that use ephemeral environments for development and testing need feature management specific to their ephemeral environment. This gives developers control of application features independent of other environments. It minimizes the risk of toggling features impacting other development efforts.
If you are a LaunchDarkly partner providing EaaS, you can use the LaunchDarkly REST API as part of your integration to create, and then delete, a separate LaunchDarkly environment that is specific to the ephemeral environment you’re providing for development and testing.
## LaunchDarkly environments
In LaunchDarkly, environments are organizational units contained within [projects](/docs/home/account/project). LaunchDarkly customers will already have a configured project that they are looking to use.
Environments allow LaunchDarkly customers to manage feature flags throughout the entire development lifecycle, from local development through production. Examples of LaunchDarkly environments within a project could be `Production`, `QA`, `Staging`, or individual environments. The exact naming is left to LaunchDarkly customers to configure.
To learn more, read [Environments](/docs/home/account/environment).
Environments are nested under projects and contain environment-specific metadata. When you create a new environment, all feature flag targeting is set to [default values](/docs/home/flags/new#set-default-values) for the environment, or, if you specify a `source` parameter during creation, feature flag targeting is set to match that source environment.
Here’s a visualization:
Project layout
```
project - My test project 
--- 
└── environments 
 ├── dev 
 ├── prod 
 └── test 
```
## Build an integration
To build an integration, make sure you meet the [prerequisites](/docs/integrations/partner-integrations/getting-started#prerequisites). Then follow the steps outlined on the [Getting started](/docs/integrations/partner-integrations/getting-started) page.
The Getting started page explains each of the following steps in detail:
 1. [Forking the LaunchDarkly Integration Framework repository](/docs/integrations/partner-integrations/getting-started#fork-the-launchdarkly-integration-framework-repository).
 2. [Creating a new directory](/docs/integrations/partner-integrations/getting-started#create-a-new-directory).
 3. [Creating an integration manifest](/docs/integrations/partner-integrations/getting-started#create-an-integration-manifest).
 * For an example of a completed manifest, read the [Manifest.json example](/docs/guides/integrations/build-eaas#manifestjson-example).
 1. [Defining the integration’s capabilities](/docs/integrations/partner-integrations/getting-started#define-the-integrations-capabilities).
 * No capability section is required for an EaaS integration. You can add a top-level key `"otherCapabilities"" ["external"]`.
 1. [Creating end-user documentation and README](/docs/integrations/partner-integrations/getting-started#create-end-user-documentation-and-readme).
 2. [Submitting the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration).
## Format of a request
For an EaaS integration, include requests to create and delete a LaunchDarkly environment each time you spin up and shut down an ephemeral environment. The following sections describe the required request format.
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
LaunchDarkly has support for OAuth clients. The only two types of scoped permissions are currently `reader` and `writer`. An EaaS integration needs the `writer` scope so it can create and delete environments. However, your customers may not want to provide the level of access overall that this functionality would grant.
### Creation
The endpoint to create a new environment accepts a POST body in JSON format. The minimum set of required parameters is:
 * `key`: The environment key
 * `name`: The environment name
 * `color`: The HTML hex color code for the environment when viewed in the LaunchDarkly user interface (UI)
Most EaaS integrations will want to leverage the `source` parameter to use another environment’s targeting to clone. There are no hard-coded environment keys in LaunchDarkly.
If a customer creates a project in LaunchDarkly without specifying environments, by default LaunchDarkly creates two environments, `prod` and `test`. If the customer creates a project and does specify environments, then those defaults will not be used.
Optionally you, the partner, may want to tag environments with a consistent value so it is easier to query the LaunchDarkly API for a list of those environments.
As a partner you will have to allow your end users to provide a LaunchDarkly Environment key that they want to use as the value of the `source` parameter.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Create a LaunchDarkly environment](/docs/api/environments/post-environment)
### Deletion
In your EaaS integration, you should clean up any LaunchDarkly environments that you create when the associated ephemeral environment no longer exists. If you need to recreate the LaunchDarkly environment later, you can recreate it on demand using the `source` environment to get the latest flags. This also helps your customers experience less drift between LaunchDarkly environments if they have been in existence for an extended period of time.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Delete a LaunchDarkly environment](/docs/api/environments/delete-environment)
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
This guide describes the process of building an ephemeral Environments as a Service (EaaS) integration. The crucial step is to have your integration create, and then delete, a LaunchDarkly environment each time you spin up and shut down an ephemeral environment. To learn more about building your own integrations, read [Building partner integrations](/docs/integrations/partner-integrations).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs