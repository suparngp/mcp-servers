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
 * [Changes to package namespace](#changes-to-package-namespace)
 * [Changes to Node.js dependencies](#changes-to-nodejs-dependencies)
 * [Changes to init function](#changes-to-init-function)
 * [Changes to polyfill requirements](#changes-to-polyfill-requirements)
 * [Understanding contexts](#understanding-contexts)
 * [Migrating from users to contexts](#migrating-from-users-to-contexts)
 * [Understanding changes to flag evaluation](#understanding-changes-to-flag-evaluation)
 * [Understanding differences between users and contexts](#understanding-differences-between-users-and-contexts)
 * [Understanding changes to built-in and custom attributes](#understanding-changes-to-built-in-and-custom-attributes)
 * [Working with built-in and custom attributes](#working-with-built-in-and-custom-attributes)
 * [Referencing properties of an attribute object](#referencing-properties-of-an-attribute-object)
 * [Removing the secondary attribute](#removing-the-secondary-attribute)
## Overview
This topic explains the changes in the Cloudflare SDK 2.0 release and how to adapt code that uses a 1.0 version of the [Cloudflare SDK](/docs/sdk/edge/cloudflare) to use version 2.0 or later.
**Version 2.0 includes several breaking changes**.
## Changes to package namespace
The Cloudflare SDK is now published under a new npm namespace.
1.02.0
```
$
| yarn add launchdarkly-cloudflare-edge-sdk
---|--- 
```
## Changes to Node.js dependencies
The Cloudflare SDK uses `node:events` which needs to be enabled in your Worker configuration. To do this, add the `nodejs_compat` flag to `wrangler.toml`.
wrangler.toml
```
1
| compatibility_flags = [ "nodejs_compat" ]
---|--- 
```
To learn more, read [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/#enable-nodejs-with-workers).
## Changes to init function
The function signature for the `init` function has changed.
1.x2.0
```
1
| const client = init(env.LD_KV, sdkKey);
---|--- 
```
To learn more, read [`SDK API Documentation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/functions/init.html).
## Changes to polyfill requirements
The Cloudflare Edge SDK v1.x is a wrapper of the LaunchDarkly Node.js (server-side) SDK. A bundler is needed to polyfill Node.js dependencies that are not supported in the Cloudflare Worker runtime.
The Cloudflare SDK v2.0 is not a wrapper of the LaunchDarkly Node.js (server-side) SDK. It uses only Node.js dependencies which are supported in the Cloudflare Worker runtime. You no longer need to use a bundler like webpack or esbuild to polyfill unsupported Node.js dependencies.
## Understanding contexts
Many LaunchDarkly customers create targeting rules for feature flags based on a variety of different information, including attributes pertaining to users, organizations, devices, and more. In previous versions of the LaunchDarkly SDK, you could define this information in a user object, using a combination of built-in and custom attributes. Now you can define this information in a more structured way, using **contexts**.
Each context has a required attribute called `kind` that you can use to categorize context instances for targeting and Experimentation. You can also add other attributes. Attributes can be strings, booleans, numbers, arrays, or JSON objects.
When you evaluate a feature flag within your application, the flag’s targeting rules use information from one or more kinds of contexts. For example, you may know:
 * the username, first name, last name, and email address of a person, as part of a context with `kind` of “user”
 * the company, department, and location of an organization, as part of a context with `kind` of “organization”
 * the device, model, and operating system of an environment, as part of a context with `kind` of “device”
This new version of the LaunchDarkly SDK requires you to evaluate feature flags using an **evaluation context** , which is an object containing one or more contexts.
To learn more about contexts, read [Contexts](/docs/home/flags/contexts).
## Migrating from users to contexts
The 2.0 version of this SDK lets you use contexts. When you migrate from version 1.0, replace every instance of a user with a context. If there are any instances you do not replace, the 2.0 version of the Cloudflare SDK will convert each `LDUser` parameter it receives to `LDContext` and call the `LDContext`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the Cloudflare SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Cloudflare SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/edge/cloudflare/migration-1-to-2#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/edge/cloudflare/migration-1-to-2#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/edge/cloudflare/migration-1-to-2#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. The 2.0 version of the SDK includes the following changes:
 * The `variation` and `variationDetail` methods now take a context, rather than a user, as a parameter. To learn more, read [variation](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#variation) and [variationDetail](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#variationDetail).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
2.0 syntax
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
| };
6
| 
7
| const flagValue = await client.variation('flag-key-123abc', context, false);
```
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
1.0 syntax, user with key2.0 syntax, context with key
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc',
3
| }
```
Omitting the kind creates a user object, not a context
If you omit the `kind` attribute when you create a context, then LaunchDarkly will assume the context kind is “user” when evaluating flags. Additionally, the SDK will assume you are working with a user object, rather than a context.
Overall, this should make your upgrade easier, because your existing code will continue to work, as long as you don’t make changes to your flag configuration or [bucket users based on the “secondary” attribute](/docs/sdk/edge/cloudflare/migration-1-to-2#removing-the-secondary-attribute).
However, if you are using version 2.0 of the SDK and you are omitting the `kind` attribute, then the following caveats apply:
 * The fields in your user object must be `LDUser` fields, not `LDContext` fields. For example, to mark an attribute as private, you must use `privateAttributeNames` in the user object, not `_meta.privateAttributes` as you would for a context object.
 * Any additional attributes in your user object need to be inside the `custom` property of the `LDUser`, not at the top-level as they would in a context object. To learn more, read [Working with built-in and custom attributes](/docs/sdk/edge/cloudflare/migration-1-to-2#working-with-built-in-and-custom-attributes).
We strongly recommend upgrading your SDK to take advantage of the context functionality.
Here’s how to construct a basic context, with a context kind of something other than “user”:
2.0 syntax, single context with key
```
1
| const context = {
---|--- 
2
| kind: 'organization',
3
| key: 'org-key-123abc',
4
| }
```
Here’s how to construct a multi-context, which includes multiple context kinds:
2.0 syntax, multi-context
```
1
| const deviceContext = {
---|--- 
2
| kind: 'device',
3
| type: 'iPad',
4
| key: 'device-key-123abc'
5
| }
6
| 
7
| const userContext = {
8
| kind: 'user',
9
| key: 'user-key-123abc',
10
| name: 'Sandy',
11
| role: 'doctor'
12
| }
13
| 
14
| const multiContext = {
15
| kind: 'multi',
16
| user: userContext,
17
| device: deviceContext
18
| }
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 2.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 2.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 2.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
1.x syntax, user with attributes2.0 syntax, context with attributes
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc',
3
| firstName: 'Sandy',
4
| lastName: 'Smith',
5
| email: 'sandy@example.com',
6
| custom: {
7
| groups: ['Google', 'Microsoft']
8
| }
9
| };
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 2.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
2.0 syntax, context with object attributes
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| firstName: 'Sandy',
5
| lastName: 'Smith',
6
| email: 'sandy@example.com',
7
| address: {
8
| street: '123 Main St',
9
| city: 'Springfield'
10
| }
11
| };
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 2.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs