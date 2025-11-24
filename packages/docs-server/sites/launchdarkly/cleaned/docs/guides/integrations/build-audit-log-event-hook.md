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
 * [Change history events](#change-history-events)
 * [Build an integration](#build-an-integration)
 * [Authentication](#authentication)
 * [Manifest.json example](#manifestjson-example)
 * [Default flag template file](#default-flag-template-file)
 * [Conclusion](#conclusion)
##### The LaunchDarkly change history used to be called the audit log
The LaunchDarkly change history event hook integration used to be called the audit log event hook integration, and still references the `auditLogEventsHook`.
## Overview
This guide explains how LaunchDarkly partners can use the integration framework to build a change history event hook integration. By the end of this guide, you as a LaunchDarkly partner should have the information you need to create a change history events hook integration that LaunchDarkly sends whenever an event happens inside of LaunchDarkly.
Each of these events results in an event being published to LaunchDarkly’s change history. You can use this capability to send data to or trigger an event in another service.
## Change history events
Every [resource](/docs/home/account/roles/role-resources#overview) you change in LaunchDarkly generates an associated [change history](/docs/home/releases/change-history) entry. Your integration can transform these events into a format that a POST endpoint can receive. Your team can configure the POST endpoint when they set up the integration.
A common use case for the events hook is associating feature flag changes with targeting changes in a specific environment. However, integrations are not limited to that resource only. For a full list of supported resources, read [About resource types and scopes](/docs/home/account/roles/role-resources#about-resource-types-and-scopes).
## Build an integration
To build an integration, make sure you meet the [prerequisites](/docs/integrations/partner-integrations/getting-started#prerequisites). Then follow the steps outlined on the [Getting started](/docs/integrations/partner-integrations/getting-started) page.
The Getting started page explains each of the following steps in detail:
 1. [Forking the LaunchDarkly Integration Framework repository](/docs/integrations/partner-integrations/getting-started#fork-the-launchdarkly-integration-framework-repository).
 2. [Creating a new directory](/docs/integrations/partner-integrations/getting-started#create-a-new-directory).
 3. [Creating an integration manifest](/docs/integrations/partner-integrations/getting-started#create-an-integration-manifest).
 * For an example of a completed manifest, read the [Manifest.json example](/docs/guides/integrations/build-audit-log-event-hook#manifestjson-example).
 1. [Collecting integration configuration data](/docs/integrations/partner-integrations/getting-started#collect-integration-configuration-data).
 2. [Defining the integration’s capabilities](/docs/integrations/partner-integrations/getting-started#define-the-integrations-capabilities).
 * For this integration, define an [`auditLogEventsHook`](/docs/integrations/partner-integrations/audit-log) integration.
 * To review the fields for the source payload, read [Sample Context](https://github.com/launchdarkly/integration-framework/tree/main/sample-context) which contains a directory of samples with pre-transformed contexts.
 1. [Validating the integration](/docs/integrations/partner-integrations/getting-started#validate-the-integration).
 2. [Creating end-user documentation and README](/docs/integrations/partner-integrations/getting-started#create-end-user-documentation-and-readme).
 3. [Submitting the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration).
The following sections provide configuration guidance specific to change history events hook integrations.
## Authentication
A change history event hook integration can use either API keys or OAuth for authentication:
 * Most integrations use API Keys. If you use API keys, configure them as outlined in the [Collecting integration configuration data step](/docs/integrations/partner-integrations/getting-started#collect-integration-configuration-data) on the Getting started page.
 * If you use OAuth, configure it in the root of the manifest. To learn more, read [Defining an integration manifest](/docs/integrations/partner-integrations/manifest) and [Registering a LaunchDarkly OAuth client](/docs/integrations/partner-integrations/oauth-client-registration).
For an example OAuth integration, read [AppDynamics Manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/appdynamics/manifest.json) under `requiresOAuth`. Integrations with require OAuth can still request additional `formVariables`.
The example below uses API Keys.
### Manifest.json example
This example is looking for a flag template file under `templates/flag.json`.
The `defaultPolicy` limits the events to flag targeting changes for targeting in all `production` environments of all `projects`:
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
| "author": "Example Dot Com",
7
| "supportEmail": "support@example.com",
8
| "links": {
9
| "site": "https://example.com",
10
| "privacyPolicy": "https://example.com/privacy"
11
| },
12
| "categories": ["monitoring"],
13
| "icons": {
14
| "square": "assets/images/square.svg",
15
| "horizontal": "assets/images/horizontal.svg"
16
| },
17
| "requiresOAuth": false,
18
| "formVariables": [{
19
| "key": "apiToken",
20
| "name": "API key",
21
| "type": "string",
22
| "description": "Enter your Example [API key](https://example.com).",
23
| "isSecret": true
24
| },
25
| {
26
| "key": "endpointUrl",
27
| "name": "Example host URL",
28
| "description": "Your Example host URL.",
29
| "type": "enum",
30
| "allowedValues": [
31
| "https://api.example.com",
32
| "https://api.example.eu"
33
| ],
34
| "isOptional": true,
35
| "defaultValue": "https://api.example.com"
36
| }
37
| ],
38
| "capabilities": {
39
| "auditLogEventsHook": {
40
| "includeErrorResponseBody": false,
41
| "endpoint": {
42
| "url": "{{endpointUrl}}",
43
| "method": "POST",
44
| "headers": [{
45
| "name": "Content-Type",
46
| "value": "application/json"
47
| },
48
| {
49
| "name": "Authorization",
50
| "value": "Bearer {{apiToken}}"
51
| }
52
| ]
53
| },
54
| "templates": {
55
| "flag": "templates/flag.json"
56
| },
57
| "defaultPolicy": [{
58
| "effect": "allow",
59
| "resources": ["proj/*:env/production:flag/*"],
60
| "actions": [
61
| "updateFlagVariations",
62
| "updateGlobalArchived"
63
| "updateOn",
64
| "updateRules"
65
| "updatePrerequisites",
66
| "updateTargets",
67
| "createFlag",
68
| "deleteFlag"
69
| ]
70
| },
71
| {
72
| "effect": "allow",
73
| "resources": ["proj/*:env/production:segment/*"],
74
| "actions": [
75
| "createSegment",
76
| "deleteSegment"
77
| "updateExcluded",
78
| "updateIncluded"
79
| "updateRules"
80
| ]
81
| },
82
| ]
83
| }
84
| }
85
| }
```
## Default flag template file
You can customize the flag template file as needed to control the rendering of your JSON payload to fit your expected output. If you don’t customize the template, then the webhook uses the default template.
Here is the default template:
JSON
```
1
| {
---|--- 
2
| "date": "{{timestamp.rfc3339}}",
3
| "event": {
4
| "kind": "{{kind}}",
5
| "action": "{{verbKind}}"
6
| },
7
| "tags": "{{tags}}",
8
| "message": "{{{title.plainText}}}",
9
| "details": "{{{details.plainText}}}",
10
| "comment": "{{#if comment}}{{{comment}}}{{/if}}"
11
| }
```
## Conclusion
This guide describes the process of building a change history event hook integration. To learn more about building your own integrations, read [Building partner integrations](/docs/integrations/partner-integrations).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs