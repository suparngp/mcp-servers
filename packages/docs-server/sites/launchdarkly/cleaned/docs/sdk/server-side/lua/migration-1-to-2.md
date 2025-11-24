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
 * [Understanding contexts](#understanding-contexts)
 * [Migrating from users to contexts](#migrating-from-users-to-contexts)
 * [Understanding changes to flag evaluation](#understanding-changes-to-flag-evaluation)
 * [Understanding differences between users and contexts](#understanding-differences-between-users-and-contexts)
 * [Understanding changes to built-in and custom attributes](#understanding-changes-to-built-in-and-custom-attributes)
 * [Working with built-in and custom attributes](#working-with-built-in-and-custom-attributes)
 * [Referencing properties of an attribute object](#referencing-properties-of-an-attribute-object)
 * [Removing the secondary attribute](#removing-the-secondary-attribute)
 * [Understanding changes to private attributes](#understanding-changes-to-private-attributes)
 * [Understanding changes to alias events](#understanding-changes-to-alias-events)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding changes to storing data](#understanding-changes-to-storing-data)
## Overview
This topic explains the changes in the Lua SDK 2.0 release and how to adapt code that uses a 1.x version of the [Lua SDK](/docs/sdk/server-side/lua) to use version 2.0 or later.
**Version 2.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 2.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
## Understanding contexts
Many LaunchDarkly customers create targeting rules for feature flags based on a variety of different information, including attributes pertaining to users, organizations, devices, and more. In previous versions of the LaunchDarkly SDK, you could define this information in a user object, using a combination of built-in and custom attributes. Now you can define this information in a more structured way, using **contexts**.
Each context has a required attribute called `kind` that you can use to categorize context instances for targeting and Experimentation. You can also add other attributes. Attributes can be strings, booleans, numbers, arrays, or JSON objects.
When you evaluate a feature flag within your application, the flag’s targeting rules use information from one or more kinds of contexts. For example, you may know:
 * the username, first name, last name, and email address of a person, as part of a context with `kind` of “user”
 * the company, department, and location of an organization, as part of a context with `kind` of “organization”
 * the device, model, and operating system of an environment, as part of a context with `kind` of “device”
This new version of the LaunchDarkly SDK requires you to evaluate feature flags using an **evaluation context** , which is an object containing one or more contexts.
To learn more about contexts, read [Contexts and segments](/docs/home/flags/contexts).
## Migrating from users to contexts
The 2.0 version of this SDK lets you use contexts. When you migrate from version 1.x, replace every instance of a user with a context. If there are any instances you do not replace, the 2.0 version of the Lua SDK will convert the result of each `makeUser` call into a context with a context kind of “user.”
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the Lua SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Lua SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/server-side/lua/migration-1-to-2#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/server-side/lua/migration-1-to-2#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/server-side/lua/migration-1-to-2#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/server-side/lua/migration-1-to-2#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to alias events](/docs/sdk/server-side/lua/migration-1-to-2#understanding-changes-to-alias-events): The alias method has been removed.
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. The 2.0 version of the SDK includes the following changes:
 * The `*Variation` and `*VariationDetail` methods now take a context, rather than a user, as a parameter. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating#lua) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#lua).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
2.0 syntax
```
1
| local value = client:boolVariation(context, 'flag-key-123abc', false);
---|--- 
```
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
In version 2, there are two ways to create contexts: `makeContext` and `makeUser`. `makeUser` is a convenience to make upgrading from the Lua SDK version 1.x to version 2.0 easier. It is deprecated and may be removed in future versions.
Here’s how to construct a basic context, as compared with constructing a user:
1.x syntax, user with key2.0 syntax, context with key
```
1
| local user = ld.makeUser({
---|--- 
2
| key = "user-key-123abc"
3
| })
```
The `kind` attribute is required when you use `makeContext`. You can omit the `kind` attribute when you use `makeUser`, and LaunchDarkly will assume the context kind is “user” when evaluating flags.
Overall, this should make your upgrade easier, because your existing code will continue to work, as long as you don’t make changes to your flag configuration or [bucket users based on the “secondary” attribute](/docs/sdk/server-side/lua/migration-1-to-2#removing-the-secondary-attribute).
Here’s how to construct a basic context, with a context kind of something other than “user”:
2.0 syntax, single context with key
```
1
| local organization = ld.makeContext({
---|--- 
2
| organization = {
3
| key = "org-key-123abc"
4
| }
5
| })
```
Here’s how to construct a multi-context, which includes multiple context kinds:
2.0 syntax, multi-context
```
1
| local context = ld.makeContext({
---|--- 
2
| user = {
3
| key = "user-key-123abc"
4
| },
5
| org = {
6
| key = "org-key-123abc"
7
| }
8
| })
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 2.0 version of the SDK.
#### Working with built-in and custom attributes
In the previous SDK version, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 2.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 2.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
1.x syntax, user with attributes2.0 syntax, context with attributes
```
1
| local user = ld.makeUser({
---|--- 
2
| key = "user-key-123abc",
3
| custom = {
4
| address = { "123 Main St" }
5
| }
6
| })
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 2.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
2.0 syntax, context with object attributes
```
1
| local context = ld.makeContext({
---|--- 
2
| user = {
3
| key = "user2-key-123abc",
4
| attributes = {
5
| address = {
6
| street = "123 Main St",
7
| city = "Springfield"
8
| }
9
| }
10
| }
11
| })
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 2.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your customers.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 2.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. Only the context key and kind are sent to LaunchDarkly. In the second example, the “email” and “address” attributes are private for all contexts:
2.0 syntax, all attributes marked private2.0 syntax, two attributes marked private
```
1
| local configAllPrivate = {
---|--- 
2
| events = {
3
| allAttributesPrivate = true
4
| }
5
| }
```
To learn more, read [Private attributes](/docs/sdk/features/private-attributes#lua).
Here’s how to mark an attribute as private for a particular context:
2.0 syntax, attribute marked private for one context
```
1
| local user = ld.makeContext({
---|--- 
2
| user = {
3
| key = "user-key-123abc",
4
| attributes = {
5
| firstName = "Sandy",
6
| lastName = "Smith",
7
| email = "sandy@example.com",
8
| },
9
| privateAttributes = { "email" }
10
| }
11
| })
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 2.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 2.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
2.0 syntax, working with associated contexts
```
1
| -- create tables with the context attribute information
---|--- 
2
| local device = {
3
| key = "device-key-123abc"
4
| }
5
| 
6
| local user = {
7
| key = "user-key-123abc",
8
| attributes = {
9
| name = "Sandy"
10
| }
11
| }
12
| 
13
| -- use them to create contexts at different points in your application
14
| 
15
| local deviceContext = ld.makeContext({
16
| device = device
17
| })
18
| 
19
| client:identify(deviceContext)
20
| 
21
| local multiContext = ld.makeContext({
22
| device = device,
23
| user = user
24
| })
25
| 
26
| client:identify(multiContext)
```
To learn more, read [`makeContext`](https://launchdarkly.github.io/lua-server-sdk/index.html#makeContext).
## Understanding changes to configuration options
In the 2.0 version of the SDK, several configuration options have changed:
 * The `privateAttributes` and `allAttributesPrivate` configuration options both now apply to all contexts of any context kind. They are part of the broader `events` option. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/lua/migration-1-to-2#understanding-changes-to-private-attributes).
 * The `inlineUsersInEvents` option has been removed.
 * The `userKeysCapacity` and `userKeysFlushInterval` options are removed. The `userKeysCapacity` option is replaced with `contextKeysCapacity`. There is no replacement for `userKeysFlushInterval` as the algorithm now evicts keys only when necessary.
 * The configuration options for the streaming, polling, and events URLs have changed: `streamURI`, `baseURI`, and `eventsURI` are replaced with the `serviceEndpoints` endpoints property, which has options for `streamingBaseURL`, `pollingBaseURL`, and `eventsBaseURL`. It is rare to set these configuration options. To learn more, read [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#lua).
 * The configuration options for setting up logging have changed. The `registerLogger` has been removed. Instead, use the `logging` configuration to set options for the default logger, or replace the default logger with a custom one. To learn more, read [Logging](/docs/sdk/features/logging#lua).
To learn more about configuration options, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
## Understanding changes to storing data
If you use a persistent feature store without connecting to LaunchDarkly, you must update how you configure the SDK for this situation. In the 2.0 version of the SDK, this configuration is now set through the `lazyLoad` config option. The functionality has changed: the SDK reads flag data from the persistent store lazily, in the background, but it does not write to it. The data must be updated by an external process such as Relay Proxy.
Here’s how:
Lua SDK v2
```
1
| local config = {
---|--- 
2
| dataSystem = {
3
| lazyLoad = {
4
| source = makeYourSource()
5
| }
6
| }
7
| }
```
If you currently use a persistent feature store and also have the SDK connect to LaunchDarkly, you can no longer do so in version 2.0. This is an uncommon configuration.
You could consider either using the Relay Proxy to populate a persistent feature store, or populating the store with another SDK that is capable of this. Then, configure the Lua SDK to use lazy loading.
To learn more, read [Storing data](/docs/sdk/features/storing-data#lua).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs