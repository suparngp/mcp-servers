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
 * [Version compatibility](#version-compatibility)
 * [Install the provider](#install-the-provider)
 * [Initialize the provider](#initialize-the-provider)
 * [Construct a context](#construct-a-context)
 * [Evaluate a context](#evaluate-a-context)
 * [Track metrics](#track-metrics)
 * [Access the LaunchDarkly client](#access-the-launchdarkly-client)
## Overview
This topic documents how to get started with the LaunchDarkly OpenFeature provider for the Node.js (server-side) SDK.
##### Provider quick links
LaunchDarkly’s OpenFeature providers are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
OpenFeature Provider API documentation | [Provider API docs](https://launchdarkly.github.io/openfeature-node-server/) 
GitHub repository | [openfeature-node-server](https://github.com/launchdarkly/openfeature-node-server) 
Sample application | [Sample OpenFeature Node.js (server-side) provider application](https://github.com/launchdarkly/hello-openfeature-node-server) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/openfeature-node-server) 
## Get started
The LaunchDarkly OpenFeature provider for the Node.js (server-side) SDK is intended for use in multi-user systems such as web servers and application. It is not intended for use in desktop and embedded systems applications.
Follow these instructions to start using the LaunchDarkly OpenFeature provider for the Node.js (server-side) SDK in your application.
### Version compatibility
The LaunchDarkly OpenFeature provider for the Node.js (server-side) SDK is compatible with the [OpenFeature Node.js SDK v1.x](https://openfeature.dev/docs/reference/technologies/server/javascript).
The provider is compatible with Node.js 18 and above.
## Install the provider
First, install the LaunchDarkly and OpenFeature packages:
Shell
```
$
| npm install @openfeature/server-sdk
---|--- 
>
| npm install @launchdarkly/node-server-sdk
>
| npm install @launchdarkly/openfeature-node-server
```
Next, import the OpenFeature and LaunchDarkly namespaces in your application code:
LaunchDarkly Node.js (server-side) provider
```
1
| import { OpenFeature } from '@openfeature/server-sdk';
---|--- 
2
| import { LaunchDarklyProvider } from '@launchdarkly/openfeature-node-server';
```
## Initialize the provider
After you install and import the provider, create a single, shared instance of [`LaunchDarklyProvider`](https://launchdarkly.github.io/openfeature-node-server/classes/LaunchDarklyProvider.html). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
JavaScript
```
1
| await OpenFeature.setProviderAndWait(new LaunchDarklyProvider("sdk-key-123abc"));
---|--- 
2
| 
3
| const client = OpenFeature.getClient();
```
##### The Node.js provider uses an SDK key
The LaunchDarkly Node.js (server-side) provider uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
## Construct a context
A [context](/docs/home/getting-started/vocabulary#context) is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. The OpenFeature specification calls these [evaluation contexts](https://openfeature.dev/docs/reference/concepts/evaluation-context).
In the LaunchDarkly provider, contexts:
 * always have a particular [context kind](/docs/home/getting-started/vocabulary#context-kind). If you do not specify a kind, the provider treats the context as having a “user” kind. To specify a different kind, including a multi-context, you must include a `kind` attribute.
 * must have a targeting key. This is optional in the OpenFeature specification, but LaunchDarkly requires a key for evaluation. You can specify this using `targetingKey`, as in the OpenFeature specification, or `key`, which is the typical LaunchDarkly identifier for the targeting key.
Here are examples of a context:
Example user contextExample organization context
```
1
| const context = {
---|--- 
2
| targetingKey: "user-key-123abc", // Could also use "key" instead of "targetingKey".
3
| };
```
For additional examples, read [OpenFeature specific considerations](https://github.com/launchdarkly/openfeature-node-server?tab=readme-ov-file#openfeature-specific-considerations) in the provider GitHub repository.
## Evaluate a context
To evaluate feature flags for a context, use the OpenFeature [Evaluation API](https://openfeature.dev/docs/reference/concepts/evaluation-api). For example:
Evaluate a context
```
1
| const flagValue = await client.getBooleanValue("flag-key-123abc", false, context);
---|--- 
```
## Track metrics
To associate metrics with actions customers take in your application, use the OpenFeature [Tracking API](https://openfeature.dev/docs/reference/concepts/tracking). For example:
Track a customer action
```
1
| client.track('example-event-key', context, { "optionalCustomData": "optionalCustomValue"});
---|--- 
```
To learn more, read [`track`](https://launchdarkly.github.io/openfeature-node-server/classes/LaunchDarklyProvider.html#track).
## Access the LaunchDarkly client
You may need access to the `LDClient` from within the [LaunchDarkly Node.js (server-side) SDK](/docs/sdk/server-side/node-js) if you are working on use cases not supported by OpenFeature, such as [migration flags](/docs/sdk/features/migrations) or [sending custom events](/docs/sdk/features/events).
To access the `LDClient`, use `getClient()`:
JavaScript
```
1
| const ldClient = provider.getClient();
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs