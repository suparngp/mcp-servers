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
 * [Understand resource limits and caching options](#understand-resource-limits-and-caching-options)
 * [Using Akamai EdgeWorkers with your own feature store](#using-akamai-edgeworkers-with-your-own-feature-store)
 * [Promises and async](#promises-and-async)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Akamai SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs) 
GitHub repository | [LaunchDarkly Akamai SDK](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/akamai-edgekv) 
The Akamai SDK is designed to be used with one of the LaunchDarkly [client-side SDKs](/docs/sdk/client-side) as follows:
 * The Akamai SDK gets all flags at the edge for a given context, and bootstraps them onto a cached payload
 * The client-side SDK initializes the bootstrapped payload
 * The client-side SDK evaluates the flags and sends events back to LaunchDarkly
##### Using this SDK with Akamai EdgeKV requires LaunchDarkly's Akamai integration
If you are using Akamai EdgeKV, configure the Akamai integration to use this SDK successfully. To learn more, read [Akamai](/docs/integrations/akamai).
The Akamai integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
If you are using Akamai’s EdgeWorkers, but not using the Akamai EdgeKV, the Akamai integration is not required.
## Get started
After you complete the [Create an Akamai integration](/docs/integrations/akamai#create-an-akamai-integration) process in an [existing project](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly Akamai SDK if you are using Akamai EdgeKV:
 * [Install the SDK](/docs/sdk/edge/akamai#install-the-sdk)
 * [Initialize the client](/docs/sdk/edge/akamai#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/edge/akamai#evaluate-a-flag)
 * [Understand resource limits and caching options](/docs/sdk/edge/akamai#understand-resource-limits-and-caching-options)
Most customers use the Akamai EdgeKV and the Akamai integration. If you are using Akamai’s EdgeWorkers, but not using the Akamai EdgeKV store, you can use the LaunchDarkly Akamai SDK to access your own feature store instead. If you are using your own feature store, skip to [Using Akamai EdgeWorkers with your own feature store](/docs/sdk/edge/akamai#using-akamai-edgeworkers-with-your-own-feature-store), below.
### Install the SDK
Install the Akamai SDK as a dependency in your application using your application’s dependency manager:
yarnnpm
```
$
| yarn add @launchdarkly/akamai-server-edgekv-sdk
---|--- 
```
Then, import the `init` method in your application code:
TypeScript
```
1
| import { init } from '@launchdarkly/akamai-server-edgekv-sdk';
---|--- 
```
### Initialize the client
After you install and import the SDK, initialize the client with your LaunchDarkly SDK client-side ID and the namespace and group from your Akamai EdgeKV. These should be the same namespace and group that you used to [configure the Akamai integration](/docs/integrations/akamai).
##### Akamai SDK credentials
The Akamai SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in code. Do not embed a server-side SDK key into an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how to initialize the client:
TypeScript
```
1
| const ldClient = init({
---|--- 
2
| sdkKey: 'client-side-id-123abc',
3
| namespace: 'your-edgekv-namespace',
4
| group: 'your-edgekv-group-id'
5
| });
```
### Evaluate a flag
Using the client, check which variation a particular context will receive for a given feature flag:
TypeScript
```
1
| import { LDContext } from '@launchdarkly/akamai-server-edgekv-sdk';
---|--- 
2
| 
3
| const context: LDContext = {
4
| kind: 'org',
5
| key: 'org-key-123abc',
6
| someAttribute: 'example-attribute-value',
7
| };
8
| 
9
| const flagValue = await ldClient.variation('flag-key-123abc', context, false);
```
### Understand resource limits and caching options
Every time you evaluate a flag, the SDK fetches the flag data from the EdgeKV store.
Your Akamai resource tier may limit how many of these queries you can make while a single worker handler is being executed.
To help alleviate this limit, the Akamai SDK includes a cache, which it checks before fetching flag data from the EdgeKV store. This cache is populated on the initial usage of the SDK, and then periodically as it expires. By default, the cache time to live (TTL) is 100ms, but you can configure this using the `cacheTtlMs` option in [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/types/LDOptions.html). You can also choose:
 * a different value, by specifying the duration in ms,
 * an indefinite cache by specifying `0`, or
 * no cache, by specifying a negative value.
If you choose no cache, make sure that you are not evaluating flags more than the maximum number of times that your Akamai resource tier allows you query the EdgeKV store.
We recommend [initializing the SDK client](/docs/sdk/edge/akamai#initialize-the-client) outside of your worker handler, and then setting the cache duration based on the tolerance of your application. You could also choose to initialize the client each time within the worker handler. An indefinite cache makes sense in the situation, because the client will only be instantiated for the lifetime of the request.
### Using Akamai EdgeWorkers with your own feature store
###### Expand for instructions if you are using Akamai EdgeWorkers with a non-EdgeKV store
Most customers use the Akamai EdgeKV and the Akamai integration. If you are using Akamai’s EdgeWorkers, but not using the Akamai EdgeKV store, you can use the LaunchDarkly Akamai SDK to access your own feature store instead. However, the package and method names are slightly different. Additionally, you are responsible for putting flag data into your EdgeWorker. LaunchDarkly does not provide an integration for this.
To install and configure the Akamai SDK if you are using Akamai EdgeWorkers with a non-EdgeKV store:
 1. Install the Akamai SDK as a dependency in your application using your application’s dependency manager:
yarnnpm
```
$
| yarn add @launchdarkly/akamai-server-base-sdk
---|--- 
```
 2. Import the `init` method in your application code:
TypeScript
```
1
| import { init } from '@launchdarkly/akamai-server-base-sdk';
---|--- 
```
 3. Create a new class that implements `EdgeProvider`. It should take a key, formatted as `LD-Env-{your LaunchDarkly client-side ID for this environment}`. It should return a promise to return flag data. To learn more about how to retrieve and store flag data, read [Create a flag data file](/docs/sdk/features/flags-from-files#create-a-flag-data-file). To learn more, read [`EdgeProvider`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-base/docs/interfaces/EdgeProvider.html).
Here’s an example:
TypeScript
```
1
| import { EdgeProvider } from '@launchdarkly/akamai-server-base-sdk';
---|--- 
2
| 
3
| class FeatureStore implements EdgeProvider {
4
| // rootKey is formatted as LD-Env-{LaunchDarkly client-side ID}
5
| async get(rootKey: string): Promise<string> {
6
| // You should provide an implementation to retrieve your flags from
7
| // LaunchDarkly's https://sdk.launchdarkly.com/sdk/latest-all endpoint.
8
| // Read https://docs.launchdarkly.com/sdk/features/flags-from-files for more information.
9
| return flagData;
10
| }
11
| }
```
 4. After you install and import the SDK, initialize the client with your LaunchDarkly SDK client-side ID and an instance of the class you created in the previous step.
Here’s how:
TypeScript
```
1
| const ldClient = init({
---|--- 
2
| sdkKey: 'client-side-id-123abc',
3
| featureStoreProvider: new FeatureStore(),
4
| });
```
 5. Using the client, check which variation a particular context will receive for a given feature flag:
TypeScript
```
1
| import { LDContext } from '@launchdarkly/akamai-server-base-sdk';
---|--- 
2
| 
3
| const context: LDContext = {
4
| kind: 'org',
5
| key: 'org-key-123abc',
6
| someAttribute: 'example-attribute-value',
7
| };
8
| 
9
| const flagValue = await ldClient.variation('flag-key-123abc', context, false);
```
## Promises and async
All asynchronous SDK methods that return a `Promise` are compatible with `then/catch` or `async/await`. You can use either.
## Shut down the client
In the Akamai SDK, the client will be automatically closed when your application terminates.
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#akamai)
 * [Configuration](/docs/sdk/features/config#akamai), including
 * [Migration configuration](/docs/sdk/features/migration-config#akamai)
 * [Context configuration](/docs/sdk/features/context-config#akamai)
 * [Evaluating flags](/docs/sdk/features/evaluating#akamai)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#akamai)
 * [Migrations](/docs/sdk/features/migrations#akamai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs