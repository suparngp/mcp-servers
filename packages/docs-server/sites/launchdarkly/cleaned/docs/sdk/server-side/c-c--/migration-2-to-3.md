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
 * [Introducing the C++ (server-side) SDK as a replacement for the C (server-side) SDK](#introducing-the-c-server-side-sdk-as-a-replacement-for-the-c-server-side-sdk)
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
 * [Understanding changes to storing data](#understanding-changes-to-storing-data)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
## Overview
This topic explains the changes in the C++ SDK 3.0 release and how to adapt code that uses a 2.x version of the [C++ (server-side) SDK](/docs/sdk/server-side/c-c--) to use version 3.0 or later.
**Version 3.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to at least version 7.0 before you update your SDK to version 3.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
## Introducing the C++ (server-side) SDK as a replacement for the C (server-side) SDK
In the 2.x versions of the C (server-side) SDK, LaunchDarkly provided a C SDK with a C++ wrapper. To work in C++, you needed to build and install the C SDK and then use the provided C++ bindings.
Starting with the 3.0 version of the C++ (server-side) SDK, LaunchDarkly is providing a C++ SDK and a C wrapper. You can build the SDK from source or incorporate prebuilt artifacts. To work in C, you need to use the provided C bindings. The C wrapper is included in the release binaries.
How to make the transition between the 2.x C SDK and the 3.0 C++ SDK depends on whether your application is in C or C++.
###### Expand for steps if you are working in C
If you are currently working in C, you’ll need to upgrade to the C++ v3.0 SDK and then work with the new C bindings.
Here’s how:
 1. Decide whether to incorporate the SDK by building from source or by using prebuilt artifacts. The repository location has changed from version 2.x.
To build from source, read [Incorporating the SDK using cmake](/docs/sdk/server-side/c-c--#incorporate-the-sdk-using-cmake).
To incorporate the SDK using prebuilt artifacts, read [Incorporating the SDK using prebuilt artifacts](/docs/sdk/server-side/c-c--#incorporate-the-sdk-using-prebuilt-artifacts).
 2. Then, include the LaunchDarkly SDK headers for version 3:
C++ SDK v3.0 (C binding)
```
1
| #include <launchdarkly/server_side/bindings/c/sdk.h>
---|--- 
```
The C wrapper is included in the release binaries.
 3. Update your configuration code that specifies your SDK key. In version 2.x, you specified configuration details using the `LDConfig` struct. In version 3.0, you must use the `LDClientConfigBuilder` instead. Here’s how:
C/C++ SDK v2.xC++ SDK v3.0 (C binding)
```
1
| struct LDConfig *config = LDConfigNew("sdk-key-123abc");
---|--- 
```
 4. Update your code that creates the client. In version 2.x, you created a client using the `LDClient` struct. In version 3.0, you must use the `LDServerSDK` object instead. Here’s how:
C/C++ SDK v2.xC++ SDK v3.0 (C binding)
```
1
| struct LDClient *client = LDClientInit(config, maxwait);
---|--- 
```
The third parameter to `LDServerSDK_Start` is new. If you pass `NULL`, the call will block for `maxwait` milliseconds for the client to initialize. If you pass a pointer to a `bool`, you can also determine whether initialization succeeded.
Here’s how:
C++ SDK v3.0 (C binding)
```
1
| bool initialized_successfully;
---|--- 
2
| if (LDServerSDK_Start(client, maxwait, &initialized_successfully)) {
3
| /* The client's attempt to initialize succeeded or failed in the specified amount of time. */
4
| if (initialized_successfully) {
5
| /* Initialization succeeded. */
6
| else {
7
| /* Initialization failed. */
8
| }
9
| } else {
10
| /* The specified timeout was reached, but the client is still initializing. */
11
| }
```
###### Expand for steps if you are working in C++
If you are currently working in C++, you’ll need to upgrade to the C++ v3.0 SDK. You’ll be able to work in version 3.0 of the SDK natively. You will no longer need a C++ binding.
Here’s how:
 1. Decide whether to incorporate the SDK by building from source or by using prebuilt artifacts. The repository location has changed from version 2.x.
To build from source, read [Incorporating the SDK using cmake](/docs/sdk/server-side/c-c--#incorporate-the-sdk-using-cmake).
To incorporate the SDK using prebuilt artifacts, read [Incorporating the SDK using prebuilt artifacts](/docs/sdk/server-side/c-c--#incorporate-the-sdk-using-prebuilt-artifacts).
 1. Then, include the LaunchDarkly SDK headers for version 3:
C++ SDK v3.0
```
1
| #include <launchdarkly/server_side/client.hpp>
---|--- 
```
 2. Update your configuration code that specifies your SDK key. In version 2.x, you specified configuration details using the `LDConfig` struct. In version 3.0, you must use the `ConfigBuilder` instead. Here’s how:
C/C++ SDK v2.xC++ SDK v3.0 (native)
```
1
| struct LDConfig *config = LDConfigNew("sdk-key-123abc");
---|--- 
```
 3. Update your code that creates a single shared instance of the client. In version 2.x, you created a client using the `LDClient` struct. In version 3.0, you must use the `Client` object instead. Here’s how:
C/C++ SDK v2.xC++ SDK v3.0 (native)
```
1
| struct LDClient *client = LDClientInit(config, maxwait);
---|--- 
```
You can also examine the result to determine if initialization succeeded. Here’s how:
C++ SDK v3.0 (native)
```
1
| if (auto const status = start_result.wait_for(maxwait); status == std::future_status::ready) {
---|--- 
2
| /* The client's attempt to initialize succeeded or failed in the specified amount of time. */
3
| if (start_result.get()) {
4
| /* Initialization succeeded. */
5
| } else {
6
| /* Initialization failed. */
7
| }
8
| } else {
9
| /* The specified timeout was reached, but the client is still initializing. */
10
| }
```
For a complete example of setting up the version 3.0 SDK, read [Get started](/docs/sdk/client-side/c-c--#get-started).
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
The 3.0 version of this SDK lets you use contexts. When you migrate from version 2.x, you must replace every instance of a user with a context. For the 3.0 version of the C++ SDK, this means changing each use of `LDUser` with the `ContextBuilder`.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the C++ SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the C++ SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to alias events](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-alias-events): The alias method has been removed.
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. The 3.0 version of the SDK includes the following changes:
 * The `*Variation` methods now take a context, rather than a user, as a parameter. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating#c-server-side) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#c-server-side).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
3.0 syntax
```
1
| bool value = client.BoolVariation(context, "flag-key-123abc", false);
---|--- 
```
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
2.x syntax, user with key3.0 syntax, context with key
```
1
| struct LDUser *user = LDUserNew("user-key-123abc");
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
3.0 syntax, single context with key
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("organization", "org-key-123abc")
3
| .Build();
```
Here’s how to construct a multi-context, which includes multiple context kinds:
3.0 syntax, multi-context
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Name("Sandy")
4
| .Kind("organization", "org-key-123abc")
5
| .Name("Global Health Services")
6
| .Build();
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 3.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 3.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
2.x syntax, user with attributes3.0 syntax, context with attributes
```
1
| struct LDUser *user = LDUserNew("user-key-123abc");
---|--- 
2
| LDUserSetName(user, "Sandy");
3
| LDUserSetEmail(user, "sandy@example.com");
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 3.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
3.0 syntax, context with object attributes
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Set("address", Value::Object({{"street", "123 Main St"}, {"city", "Springfield"}}))
4
| .Build();
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Targeting with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user, using `LDUserSetSecondary`. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 3.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 3.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. Only the context key and kind are sent to LaunchDarkly. In the second example, the “email” and “address” attributes are private for all contexts:
3.0 syntax, all attributes marked private3.0 syntax, two attributes marked private
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.Events().AllAttributesPrivate(true);
3
| auto config = config_builder.Build();
```
To learn more, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html).
Here’s how to mark an attribute as private for a particular context:
3.0 syntax, attribute marked private for one context
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Name("Sandy Smith")
4
| .SetPrivate("email", "sandy@example.com")
5
| .Build();
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private:
3.0 syntax, specific fields of an attribute marked private
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Name("Sandy Smith")
4
| .Set("address", Value::Object({{"street", "Main St"}, {"city", "Springfield"}}))
5
| .AddPrivateAttribute("/address/street")
6
| .Build()
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 3.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 3.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
3.0 syntax, working with associated contexts
```
1
| /* before end user logs in */
---|--- 
2
| auto context = ContextBuilder()
3
| .Kind("device", "device-key-123abc")
4
| .Build();
5
| 
6
| /* after end user logs in */
7
| auto updated_context = ContextBuilder(context)
8
| .Kind("user", "user-key-123abc")
9
| .Name("Sandy")
10
| .Build();
11
| 
12
| client.Identify(updated_context);
```
To learn more, read `Identify()` in [`Client`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1server__side_1_1Client.html).
## Understanding changes to storing data
If you use a persistent feature store without connecting to LaunchDarkly, you must update how you configure the SDK for this situation. In the 3.0 version of the SDK, this configuration is now set through a `LazyLoadBuilder`. The functionality remains the same: the SDK reads flag data from the persistent store lazily, in the background.
Here’s how:
2.x syntax, use daemon mode3.0 syntax, use lazy loading
```
1
| struct LDConfig *config = LDConfigNew("sdk-key-123abc");
---|--- 
2
| 
3
| struct LDStoreInterface *store = ConstructYourFeatureStoreInterface();
4
| 
5
| LDConfigSetFeatureStoreBackend(config, store);
6
| LDConfigSetUseLDD(config, true);
```
If you currently use a persistent feature store and also have the SDK connect to LaunchDarkly, you can no longer do so in version 3.0. This is an uncommon configuration.
You could consider either using the Relay Proxy to populate a persistent feature store, or populating the store with another SDK that is capable of this. Then, configure the C++ SDK to use lazy loading.
To learn more, read [Storing data](/docs/sdk/features/storing-data#c-server-side).
## Understanding changes to configuration options
In the 3.0 version of the SDK, several configuration options have changed:
 * The `PrivateAttributes` and `AllAttributesPrivate` configuration options both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-private-attributes).
 * `PrivateAttributeNames` is now called `PrivateAttributes`. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/c-c--/migration-2-to-3#understanding-changes-to-private-attributes).
 * The `inlineUsersInEvents` option has been removed.
 * The `LDConfigSetUserKeysCapacity` and `LDConfigSetUserKeysFlushInterval` options are now deprecated. They have been replaced in this version with `contextKeysCapacity`.
To learn more, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs