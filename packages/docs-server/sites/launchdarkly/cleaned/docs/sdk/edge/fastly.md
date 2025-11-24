`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Flush events](#flush-events)
 * [Supported features](#supported-features)
##### This SDK is in beta
Development work on the Fastly SDK is ongoing. The SDK is fully tested and we consider it production-ready, however, we are actively soliciting feedback on its usage. Some external APIs could change prior to the v1 release.
## Overview
This topic documents how to get started with the Fastly SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/) 
GitHub repository | [LaunchDarkly Fastly SDK](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/fastly) 
Sample application | [Example app](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/fastly/example) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/fastly-server-sdk) 
##### This SDK requires LaunchDarkly's Fastly integration
Configure the Fastly integration to use this SDK successfully. To learn more, read [Fastly](/docs/integrations/fastly).
The Fastly integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Get started
After you complete the [Create a Fastly integration](/docs/integrations/fastly#create-a-fastly-integration) process in an [existing project](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly Fastly SDK:
 * [Install the SDK](/docs/sdk/edge/fastly#install-the-sdk)
 * [Initialize the client](/docs/sdk/edge/fastly#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/edge/fastly#evaluate-a-flag)
### Install the SDK
First, install the Fastly SDK as a dependency in your application using your application’s dependency manager.
Here’s how:
yarnnpm
```
$
| yarn add @launchdarkly/fastly-server-sdk
---|--- 
```
Next, import the LaunchDarkly client in your application code:
Import
```
1
| import { KVStore } from 'fastly:kv-store';
---|--- 
2
| import { init } from '@launchdarkly/fastly-server-sdk';
```
### Initialize the client
After you install and import the SDK, [configure a Fastly KV Store](/docs/integrations/fastly#configure-a-fastly-kv-store-for-launchdarkly). Then, initialize an `LDClient` using your LaunchDarkly client-side ID, the Fastly KV store name, and the Fastly events backend name. The client must be initialized when processing requests.
Here’s how:
Initialize the client
```
1
| const KV_STORE_NAME = 'launchdarkly';
---|--- 
2
| const EVENTS_BACKEND_NAME = 'launchdarkly';
3
| const store = new KVStore(KV_STORE_NAME);
4
| 
5
| async function handleRequest(event: FetchEvent) {
6
| const ldClient = init('client-side-id-123abc', store, {
7
| eventsBackendName: EVENTS_BACKEND_NAME,
8
| });
9
| 
10
| await ldClient.waitForInitialization();
11
| 
12
| // The rest of your handler code goes here
13
| }
```
The client must be initialized and used when processing requests, not during built-time initialization.
##### Fastly SDK credentials
The Fastly SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in code. Do not embed a server-side SDK key into an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Events are enabled by default in the Fastly SDK, which means the Fastly SDK supports [Experimentation](/docs/home/experimentation) and [metrics](/docs/home/metrics) use cases by default. To learn more, read [Experimentation and metric events](/docs/home/experimentation/events).
### Evaluate a flag
After you initialize the client, wait for the `waitForInitialization` function to resolve. When `waitForInitialization` is resolved, the client can serve feature flags.
Using the client, you can check which variation a particular context will receive for a given feature flag. In your Fastly application, place the `variation` code so that it is invoked as needed.
Here is an example:
Evaluate a flag
```
1
| import type { LDContext } from '@launchdarkly/js-server-sdk-common';
---|--- 
2
| 
3
| const ldContext: LDContext = {
4
| kind: 'org',
5
| key: 'org-key-123abc',
6
| someAttribute: 'example-attribute-value',
7
| }
8
| const flagValue = await ldClient.variation('flag-key-123abc', ldContext, false)
```
The SDK caches all KV data during initialization to reduce the number of backend requests needed to fetch KV data. This means changes to feature flags or segments will not be picked up during the lifecycle of a single request instance.
## Flush events
You must flush events before your worker exits to ensure that they are sent back to LaunchDarkly. To learn more, read [Flushing events](/docs/sdk/features/flush#fastly).
## Supported features
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#fastly)
 * [Configuration](/docs/sdk/features/config#fastly)
 * [Context configuration](/docs/sdk/features/context-config#fastly)
 * [Evaluating flags](/docs/sdk/features/evaluating#fastly)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#fastly)
 * [Flushing events](/docs/sdk/features/flush#fastly)
 * [Getting all flags](/docs/sdk/features/all-flags#fastly)
 * [Logging configuration](/docs/sdk/features/logging#fastly)
 * [Secure mode](/docs/sdk/features/secure-mode#fastly)
 * [Sending custom events](/docs/sdk/features/events#fastly)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs