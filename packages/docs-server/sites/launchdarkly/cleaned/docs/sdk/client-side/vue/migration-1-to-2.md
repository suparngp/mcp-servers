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
 * [Identifying supported Vue versions for the 2.0 SDK](#identifying-supported-vue-versions-for-the-20-sdk)
 * [Understanding contexts](#understanding-contexts)
 * [Migrating from users to contexts](#migrating-from-users-to-contexts)
 * [Understanding differences between users and contexts](#understanding-differences-between-users-and-contexts)
 * [Using this migration guide](#using-this-migration-guide)
## Overview
This topic explains the changes in the Vue SDK 2.0 release and how to adapt code that uses a 1.x version of the [Vue SDK](/docs/sdk/client-side/vue) to use version 2.0 or later.
**Version 2.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 2.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 2.0, update to the latest 1.x version. Some of the changes that are mandatory in 2.0 were originally added in a 1.x version and made optional.
If you update to the latest 1.x version, deprecation warnings appear in areas of your code that need to be changed for 2.0. You can update them at your own pace while still using 1.x, rather than migrating everything simultaneously. To learn more about updating to the latest 1.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/vue-client-sdk).
## Identifying supported Vue versions for the 2.0 SDK
The LaunchDarkly Vue SDK 2.0 supports Vue 3.2 and newer.
## Understanding contexts
Many LaunchDarkly customers create targeting rules for feature flags based on a variety of different information, including attributes pertaining to users, organizations, devices, and more. In previous versions of the LaunchDarkly SDK, you could define this information in a user object, using a combination of built-in and custom attributes. Now you can define this information in a more structured way, using **contexts**.
Each context has a required attribute called `kind` that describes the type of attributes it contains. You can also add other attributes. Attributes can be strings, booleans, numbers, arrays, or JSON objects.
When you evaluate a feature flag within your application, the flag’s targeting rules use information from one or more kinds of contexts. For example, you may know:
 * the username, first name, last name, and email address of a person, as part of a context with `kind` of “user”
 * the organization, department, and location of a person, as part of a context with `kind` of “organization”
 * the device, model, and operating system of an environment, as part of a context with `kind` of “device”
This new version of the LaunchDarkly SDK requires you to evaluate feature flags using an **evaluation context** , which is an object containing one or more contexts.
To learn more about contexts, read [Contexts](/docs/home/flags/contexts).
## Migrating from users to contexts
The 2.0 version of this SDK only operates on contexts. When you migrate from version 1.x, you must replace every instance of a user with a context. For the 2.0 version of the Vue SDK, this means changing each use of `LDUser` to `LDContext`.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the Vue SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Vue SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary difference between working with users and working with contexts is that now you must create contexts, not users.
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
In the Vue SDK, you specify the context as a configuration option. You can pass configuration options to the `LDPlugin` when it loads, or to the `ldInit` function if you are using the `deferInitialization` option. Here’s how:
Setting LDPluginOptions
```
1
| const [ldReady, ldClient] = ldInit({ clientSideID, context })
---|--- 
```
Omitting the context creates a user object, not a context
If you omit the `context` object when you specify the `LDPluginOptions`, then LaunchDarkly will assume that the context kind is “user”, and that the `anonymous` attribute is “true” when evaluating flags. Additionally, the SDK will assume you are working with a user object, rather than a context.
We strongly recommend upgrading your SDK to take advantage of the context functionality, and specifying a `context` in your `LDPluginOptions`.
Here’s how to construct a basic context, as compared with constructing a user:
Single context with keyVersion 1.x, user with key
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| name: 'Sandy'
5
| }
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
Single context with key
```
1
| const context = { kind: 'organization', key: 'org-key-123abc', name: 'Global Health Services' }
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Multi-context
```
1
| const deviceContext = { kind: 'device', key: 'device-key-123abc', type: 'iPad' }
---|--- 
2
| const userContext = { kind: 'user', key: 'user-key-123abc', name: 'Sandy' }
3
| 
4
| const multiContext = {
5
| kind: 'multi',
6
| user: userContext,
7
| device: deviceContext
8
| }
```
## Using this migration guide
The Vue SDK is a wrapper of LaunchDarkly’s [JavaScript SDK](/docs/sdk/client-side/javascript). For information on shared changes, read the [JavaScript SDK migration guide](/docs/sdk/client-side/javascript/migration-2-to-3).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs