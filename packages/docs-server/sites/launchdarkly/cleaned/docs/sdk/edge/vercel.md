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
 * [Bootstrap flags with Next.js](#bootstrap-flags-with-nextjs)
 * [Promises and async](#promises-and-async)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Vercel SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/) 
GitHub repository | [LaunchDarkly Vercel SDK](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/vercel) 
If you are using Vercel SDK version 1.2.0 or later, you can use the Vercel SDK by itself. The Vercel SDK sends events back to LaunchDarkly directly, however, you do need to configure the SDK to enable sending events. To learn more, read [Configuration](/docs/sdk/features/config#vercel).
If you are using an older version of the Vercel SDK, it is designed to be used with one of the LaunchDarkly [client-side SDKs](/docs/sdk/client-side) as follows:
 * The Vercel SDK gets all flags at the edge for a given context, and bootstraps them onto a cached payload
 * The client-side SDK initializes the bootstrapped payload
 * The client-side SDK evaluates the flags and sends events back to LaunchDarkly
##### This SDK requires LaunchDarkly's Vercel integration
Configure the Vercel integration to use this SDK successfully. To learn more, read [Vercel](/docs/integrations/vercel).
The Vercel integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
This topic covers how to get started with LaunchDarkly’s Vercel SDK.
## Get started
After you complete the [Install a Vercel integration](/docs/integrations/vercel#install-a-vercel-integration) process in an [existing project](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly Vercel SDK:
 * [Install the SDK](/docs/sdk/edge/vercel#install-the-sdk)
 * [Initialize the client](/docs/sdk/edge/vercel#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/edge/vercel#evaluate-a-flag)
##### You can also use Vercel's Flags SDK
If you are already using [Vercel’s Flags SDK](https://flags-sdk.dev/), you can use that with your LaunchDarkly feature flags, your [Vercel integration](/docs/integrations/vercel#install-a-vercel-integration), and Vercel’s `@flags-sdk/launchdarkly` LaunchDarkly adapter. To learn how, read [LaunchDarkly Flags SDK Example](https://vercel.com/templates/edge-config/launchdarkly-flags-sdk) in Vercel’s documentation.
### Install the SDK
First, install the Vercel SDK as a dependency in your application using your application’s dependency manager.
Here’s how:
yarnnpm
```
$
| yarn add @launchdarkly/vercel-server-sdk
---|--- 
```
Next, import the LaunchDarkly client in your application code:
TypeScript/JavaScript ES6JavaScript CJS
```
1
| import { init } from '@launchdarkly/vercel-server-sdk'
---|--- 
2
| import { createClient } from '@vercel/edge-config'
```
### Initialize the client
After you install and import the SDK, create an edge client using your [Edge Config ID](https://vercel.com/docs/storage/edge-config). Then, initialize an `LDClient` using your LaunchDarkly client-side ID and this edge client.
Here’s how:
TypeScript
```
1
| const edgeConfigClient = createClient(process.env.EDGE_CONFIG)
---|--- 
2
| const ldClient = init('<client-side-id-123abc>', edgeConfigClient)
3
| 
4
| await ldClient.waitForInitialization()
```
##### Vercel SDK credentials
The Vercel SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in code. Do not embed a server-side SDK key into an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you are using the Vercel SDK version 1.2.0 or later, you can optionally configure sending events during initialization. This enables [Experimentation](/docs/home/experimentation) and [metrics](/docs/home/metrics) use cases. To learn more, read [Experimentation and metric events](/docs/home/experimentation/events).
Here’s how:
TypeScript
```
1
| const ldClient = init('<client-side-id-123abc>', edgeConfigClient, { sendEvents: true });
---|--- 
2
| await ldClient.waitForInitialization();
```
### Evaluate a flag
After you initialize the client, wait for the `waitForInitialization` function to resolve. When `waitForInitialization` is resolved, the client can serve feature flags.
Using the client, you can check which variation a particular context will receive for a given feature flag. In your Vercel Edge application, place the `variation` code so that it is invoked as needed.
Here is an example:
TypeScript
```
1
| const ldContext = {
---|--- 
2
| kind: 'org',
3
| key: 'org-key-123abc',
4
| someAttribute: 'example-attribute-value',
5
| }
6
| const flagValue = await ldClient.variation('flag-key-123abc', ldContext, true)
```
## Bootstrap flags with Next.js
If you are using [Next.js](https://nextjs.org/) with Vercel, you can bootstrap feature flags on the [Root Layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required) for use in the LaunchDarkly React Web SDK. To bootstrap flags, specify the root layout’s runtime with a value of `edge` and pass the flags to a [client component](https://nextjs.org/docs/app/building-your-application/rendering/client-components) that initializes the LaunchDarkly React SDK.
The Vercel SDK’s GitHub repository contains an [example application](https://github.com/launchdarkly/js-core/blob/main/packages/sdk/vercel/examples/complete/README.md) that takes advantage of bootstrapping flags from the edge for use in the LaunchDarkly React Web SDK.
## Promises and async
All asynchronous SDK methods that return a `Promise` are compatible with `then/catch` or `async/await`. You can use either.
## Shut down the client
If you send events, you must flush those events before your worker exits to ensure that they are sent back to LaunchDarkly. To learn more, read [Flushing events](/docs/sdk/features/events#vercel).
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#vercel).
## Supported features
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#vercel)
 * [Configuration](/docs/sdk/features/config#vercel), including
 * [Migration configuration](/docs/sdk/features/migration-config#vercel)
 * [Context configuration](/docs/sdk/features/context-config#vercel)
 * [Evaluating flags](/docs/sdk/features/evaluating#vercel)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#vercel)
 * [Flushing events](/docs/sdk/features/flush#vercel)
 * [Getting all flags](/docs/sdk/features/all-flags#vercel)
 * [Logging configuration](/docs/sdk/features/logging#vercel)
 * [Migrations](/docs/sdk/features/migrations#vercel)
 * [Secure mode](/docs/sdk/features/secure-mode#vercel)
 * [Sending custom events](/docs/sdk/features/events#vercel)
 * [Shutting down](/docs/sdk/features/shutdown#vercel)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs