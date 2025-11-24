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
 * [Integration requirements](#integration-requirements)
 * [Build an integration](#build-an-integration)
 * [API details](#api-details)
 * [Methods of sending cohort payload](#methods-of-sending-cohort-payload)
 * [Manifest details](#manifest-details)
 * [Image assets](#image-assets)
 * [Conclusion](#conclusion)
## Overview
This guide explains how LaunchDarkly partners can use the integration framework to build a synced segments integration.
Synced segments allow partners to sync a segment, or set of contexts, to LaunchDarkly. Contexts are people, services, machines, or other resources that encounter feature flags. LaunchDarkly members use segments to perform targeted rollouts of features. To learn more, read [Contexts](/docs/home/flags/contexts) and [Segments](/docs/home/flags/segments).
As a partner, a segment may be called a “cohort” or similar in your application. You can develop an integration that syncs cohort members from your application to LaunchDarkly, using a LaunchDarkly REST API endpoint. The endpoint receives a JSON payload with the unique identifiers of the cohort members and performs data translation using a specified parser.
With this endpoint, you can add or remove a list of contexts from a cohort, using any of three different options for a JSON payload. You will need the cohort name and ID, and configuration details, such as the LaunchDarkly client-side ID.
By the end of this guide, you as a LaunchDarkly partner should have the information you need to create a synced segments integration.
## Integration requirements
To complete your integration, you will need:
 * An integration framework manifest listing, that you will create as part of this guide
 * Publicly hosted documentation of your integration, that includes how a LaunchDarkly member should [scope their API access token](/docs/home/account/api)
 * A private Loom video or other recorded walkthrough of the integration
 * A grayscale SVG logo that will be displayed in the [LaunchDarkly Integrations documentation](/docs/integrations) and in the LaunchDarkly [user interface](/docs/integrations/partner-integrations/getting-started#svg-logo-files)
## Build an integration
To build an integration, make sure you meet the [prerequisites](/docs/integrations/partner-integrations/getting-started#prerequisites). Then follow the steps outlined on the [Getting started](/docs/integrations/partner-integrations/getting-started) page.
The Getting started page explains many of the following steps in detail:
 1. [Fork the LaunchDarkly Integration Framework repository](/docs/integrations/partner-integrations/getting-started#fork-the-launchdarkly-integration-framework-repository).
 2. [Create a new directory](/docs/integrations/partner-integrations/getting-started#create-a-new-directory).
 3. Determine how to send your cohort payload to LaunchDarkly, and what response you require.
 * This step is unique to creating a synced segment integration. To learn more, read [Methods of sending cohort payload](/docs/guides/integrations/build-synced-segments#methods-of-sending-cohort-payload), below.
 1. [Create an integration manifest](/docs/integrations/partner-integrations/getting-started#create-an-integration-manifest) and add image assets.
 * Include details of your cohort request and response payload in the `capabilities/syncedSegments` section of the manifest. For an example of a completed manifest, read the [Amplitude synced segment manifest](https://github.com/launchdarkly/integration-framework/tree/main/integrations/amplitude/manifest.json#L19-L33). To learn more about the image assets, read [Image assets](/docs/guides/integrations/build-synced-segments#image-assets), below.
 1. [Collect integration configuration data](/docs/integrations/partner-integrations/getting-started#collect-integration-configuration-data).
 2. [Define the integration’s capabilities](/docs/integrations/partner-integrations/getting-started#define-the-integrations-capabilities).
 * For this integration, define the `syncedSegment` capability. To learn more, read [Manifest details](/docs/guides/integrations/build-synced-segments#manifest-details), below.
 1. [Validate the integration](/docs/integrations/partner-integrations/getting-started#validate-the-integration).
 * For this integration, you can test locally using the [LaunchDarkly integration validation server](/docs/integrations/partner-integrations/validating).
 1. [Create end-user documentation and README](/docs/integrations/partner-integrations/getting-started#create-end-user-documentation-and-readme).
 2. [Submit the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration).
 * Email ecosystem@launchdarkly.com to schedule a final walkthrough.
The following sections provide configuration guidance specific to synced segments integrations.
## API details
To sync cohort members from your application to LaunchDarkly, use this LaunchDarkly REST API endpoint that receives a JSON payload and performs data translation using a specified parser.
Here’s how to structure your request to sync cohort members:
Request element | Description 
---|--- 
Base URL | `https://app.launchdarkly.com[](https://app.launchdarkly.com/)` 
Resource | `/api/v2/segment-targets/YOUR_INTEGRATION_KEY` 
Replace `YOUR_INTEGRATION_KEY` with the directory name of your integration in the [integration framework GitHub repository](https://github.com/launchdarkly/integration-framework/tree/main/integrations). 
REST method | `POST` 
Headers | 
 * `Authorization: YOUR_ACCESS_TOKEN`, required. This can be either a personal or service token.
 * `Content-Type: application/json`, required
Request body | The format for the request body depends on how you’ve defined the [cohort payload](/docs/guides/integrations/build-synced-segments#methods-of-sending-cohort-payload) in your integration manifest. 
Response | By default, LaunchDarkly returns one of the following response codes: `204`, success; `400`, parsing problem; `403`, unauthorized; `500`, internal error. You can configure a [custom response](/docs/integrations/partner-integrations/synced-segments#response-codes-and-custom-responses) by adding a `jsonResponseBody` specification to the request parser. 
## Methods of sending cohort payload
As a partner, you have three options for how to send the cohort or audience payload to LaunchDarkly:
 * **Boolean property** : send a single cohort member. Use a `boolean` property to indicate whether a member is added or removed. When the property is `true`, it means a member should be added. When the property is `false`, it means the member should be removed. To review an example, read [Boolean property](/docs/integrations/partner-integrations/synced-segments#boolean-property).
 * **Named arrays of cohort entries** : send `add` and `remove` arrays containing a list of cohort members to add and remove. The same `memberArrayParser` will be used to parse information from both arrays. To review an example, read [Separate named arrays](/docs/integrations/partner-integrations/synced-segments#separate-named-arrays).
 * **Single property** : send a single `action` property for the entire batch of cohort members, indicating whether they should all be added or removed. To review an example, read [Single property](/docs/integrations/partner-integrations/synced-segments#single-property).
To learn more, read [Synced segments capability](/docs/integrations/partner-integrations/synced-segments).
## Manifest details
Each LaunchDarkly partner integration requires an integration manifest. For general information on how to create this, read [Defining an integration manifest](/docs/integrations/partner-integrations/manifest).
When you create a synced segment integration, your manifest must also include a `capabilities` key with a nested object with the key `syncedSegment`:
Synced segment integration manifest (excerpt)
```
1
| "capabilities": {
---|--- 
2
| "syncedSegment": {
3
| ...
4
| }
5
| }
```
To review an example, read the [Amplitude synced segment manifest](https://github.com/launchdarkly/integration-framework/tree/main/integrations/amplitude/manifest.json#L19-L33).
To learn more about the supported fields, read the [Synced segments capability](/docs/integrations/partner-integrations/synced-segments) documentation. You can also find information on the fields supported by the `requestParser` directly in the [Integration Framework manifest schema](https://github.com/launchdarkly/integration-framework/blob/208a9f4e3ac0779beac70488a3351f28c2e912c8/manifest.schema.json#L4101-L4244).
## Image assets
All partner integrations have the partner logos appear in the [LaunchDarkly Integrations documentation](/docs/integrations) and in the LaunchDarkly user interface on the **Integrations** list. To learn more, read [SVG logo files](/docs/integrations/partner-integrations/getting-started#svg-logo-files).
Additionally, all synced segment partner integrations have the partner logos appear in the LaunchDarkly **Segments** list and on the segment details page. The logo is pulled from the `square` key of the `icons` object in your integration manifest.
## Conclusion
This guide describes the process of building a synced segment integration. To learn more about building your own integrations, read [Building partner integrations](/docs/integrations/partner-integrations).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs