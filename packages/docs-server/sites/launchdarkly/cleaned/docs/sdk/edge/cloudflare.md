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
 * [Example Worker](#example-worker)
 * [Promises and async](#promises-and-async)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
 * [Use in Cloudflare Workers only](#use-in-cloudflare-workers-only)
## Overview
This topic documents how to get started with the Cloudflare SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/) 
GitHub repository | [js-core/packages/sdk/cloudflare](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/cloudflare) 
Sample application | [Example app](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/cloudflare/example) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/cloudflare-server-sdk), [jsr](https://jsr.io/@launchdarkly/cloudflare-server-sdk) 
If you are using Cloudflare SDK version 2.3.0 or later, you can use the Cloudflare SDK by itself. The Cloudflare SDK sends events back to LaunchDarkly, however, you do need to configure the SDK to enable sending events. To learn more, read [Configuration](/docs/sdk/features/config#cloudflare).
If you are using an older version of the Cloudflare SDK, it is designed to be used with one of the LaunchDarkly [client-side SDKs](/docs/sdk/client-side) as follows:
 * The Cloudflare SDK gets all flags at the edge for a given context, and bootstraps them onto a cached payload
 * The client-side SDK initializes the bootstrapped payload
 * The client-side SDK evaluates the flags and sends events back to LaunchDarkly
##### This SDK requires LaunchDarkly's Cloudflare integration
Configure the Cloudflare integration to use this SDK successfully. To learn more, read [Cloudflare](/docs/integrations/cloudflare).
The Cloudflare integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
The Cloudflare SDK uses the Cloudflare KV as a [persistent feature store](/docs/sdk/concepts/data-stores#using-a-persistent-feature-store-without-connecting-to-launchdarkly), without connecting to LaunchDarkly for each flag evaluation. The Cloudflare SDK uses the flag configuration in the Cloudflare KV to evaluate flags. The latency for this evaluation is similar to the latency for any other request to the Cloudflare KV, that is, extremely low. LaunchDarkly sends flag configuration changes to the Cloudflare KV as they occur.
If you are using Cloudflare SDK version 2.3.0 or later, then the Cloudflare SDK does send events back to LaunchDarkly if you configure it to do so. To learn more, read [Configuration](/docs/sdk/features/config#cloudflare).
## Get started
After you configure the [Cloudflare integration](/docs/integrations/cloudflare) process in an [existing project](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Cloudflare Worker:
 * [Install the SDK](/docs/sdk/edge/cloudflare#install-the-sdk)
 * [Initialize the client](/docs/sdk/edge/cloudflare#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/edge/cloudflare#evaluate-a-flag)
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application using your application’s dependency manager.
Here’s how:
yarnnpmjsr
```
$
| yarn add @launchdarkly/cloudflare-server-sdk
---|--- 
```
Then turn on the Node.js compatibility flag in your `wrangler.toml` to allow the SDK to use `node:events`. Specify a build command in your `wrangler.toml` to use a bundler. Using a bundler to build your edge worker is recommended by [Cloudflare](https://developers.cloudflare.com/workers/wrangler/bundling/#disable-bundling).
wrangler.toml
```
$
| compatibility_flags = [ "nodejs_compat" ]
---|--- 
>
| 
>
| [build]
>
| command = "node build.js"
```
Next, import the LaunchDarkly client in your application code:
TypeScript/JavaScript ES6JavaScript CJS
```
1
| import { init } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
```
### Initialize the client
After you install and import the SDK, create an instance of `LDClient`. Specify your client-side ID and Cloudflare KV namespace here. The client-side ID is only used to query the KV namespace, not to connect with LaunchDarkly servers.
Here’s how:
TypeScript
```
1
| const client = init('client-side-id-123abc', env.LD_KV);
---|--- 
2
| await client.waitForInitialization();
```
If you are using the Cloudflare SDK version 2.3.0 or later, you can optionally configure sending events during initialization. This enables [Experimentation](/docs/home/experimentation) and [metrics](/docs/home/metrics) use cases. To learn more, read [Experimentation and metric events](/docs/home/experimentation/events).
Here’s how:
TypeScript
```
1
| const client = init('client-side-id-123abc', env.LD_KV, { sendEvents: true });
---|--- 
2
| await client.waitForInitialization();
```
##### Cloudflare SDK credentials
The Cloudflare SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in code. Do not embed a server-side SDK key into an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Evaluate a flag
Await the `waitForInitialization` function after you initialize the client. When `waitForInitialization` is resolved the client can serve feature flags.
Using `client`, you can check which variation a particular context will receive for a given feature flag. In your Cloudflare Worker application, place the `client.variation` code so that it is invoked as needed.
Here is an example:
TypeScript
```
1
| const context = {
---|--- 
2
| "kind": 'user',
3
| "key": 'user-key-123abc',
4
| "name": 'Sandy'
5
| };
6
| 
7
| const flagValue = await client.variation('flag-key-123abc', context, false);
```
## Example Worker
This is an example Cloudflare Worker application that initializes the ldClient and evaluates a feature flag for a context:
TypeScript
```
1
| import { init } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
2
| 
3
| export default {
4
| async fetch(request: Request, env: Bindings): Promise<Response> {
5
| const context = { kind: 'user', key: 'test-user-key-1' };
6
| 
7
| // init the ldClient, wait and finally evaluate
8
| const client = init('client-side-id-123abc', env.LD_KV);
9
| await client.waitForInitialization();
10
| const flagValue = await client.variation('flag-key', context, false);
11
| 
12
| return new Response(`${flagValue}`);
13
| },
14
| };
```
Read the full example in [GitHub](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/cloudflare/example).
## Promises and async
All asynchronous SDK methods that return a `Promise` are compatible with `then/catch` or `async/await`. You can use either.
## Shut down the client
If you send events, you must flush those events before your worker exits to ensure that they are sent back to LaunchDarkly. To learn more, read [Flushing events](/docs/sdk/features/events#cloudflare).
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#cloudflare).
## Supported features
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#cloudflare)
 * [Configuration](/docs/sdk/features/config#cloudflare), including
 * [Migration configuration](/docs/sdk/features/migration-config#cloudflare)
 * [Context configuration](/docs/sdk/features/context-config#cloudflare)
 * [Evaluating flags](/docs/sdk/features/evaluating#cloudflare)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#cloudflare)
 * [Flushing events](/docs/sdk/features/flush#cloudflare)
 * [Getting all flags](/docs/sdk/features/all-flags#cloudflare)
 * [Logging configuration](/docs/sdk/features/logging#cloudflare)
 * [Migrations](/docs/sdk/features/migrations#cloudflare)
 * [Secure mode](/docs/sdk/features/secure-mode#cloudflare)
 * [Sending custom events](/docs/sdk/features/events#cloudflare)
 * [Shutting down](/docs/sdk/features/shutdown#cloudflare)
## Use in Cloudflare Workers only
This SDK is intended only for use in multi-user Cloudflare Workers only. Choose one of the other JavaScript-based SDKs for browser, server, or mobile environments.
Client-side browser environments:
 * For React applications, read the [React Web SDK reference](/docs/sdk/client-side/react/react-web).
 * For Vue applications, read the [Vue SDK reference](/docs/sdk/client-side/vue).
 * For all other client-side browser JavaScript applications, read the [JavaScript SDK reference](/docs/sdk/client-side/javascript).
Non-browser environments:
 * For server-side Node applications, read the [Node.js SDK reference (server-side)](/docs/sdk/server-side/node-js).
 * For client-side Node applications, read the [Node.js SDK reference (client-side)](/docs/sdk/client-side/node-js).
 * For React Native mobile applications read the [React Native SDK reference](/docs/sdk/client-side/react/react-native).
 * For Electron desktop applications, read the [Electron SDK reference](/docs/sdk/client-side/electron).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs