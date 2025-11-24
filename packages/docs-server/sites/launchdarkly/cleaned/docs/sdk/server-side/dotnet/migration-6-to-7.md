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
 * [Identifying supported .NET platforms for the 7.0 SDK](#identifying-supported-net-platforms-for-the-70-sdk)
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
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains the changes in the .NET (server-side) SDK 7.0 release and how to adapt code that uses a 6.x version of the [.NET (server-side) SDK](/docs/sdk/server-side/dotnet) to use version 7.0 or later.
**Version 7.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 7.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 7.0, update to the latest 6.x version. Some of the changes that are mandatory in 7.0 were originally added in a 6.x version and made optional.
If you update to the latest 6.x version, deprecation warnings appear in areas of your code that need to be changed for 7.0. You can update them at your own pace while still using 6.x, rather than migrating everything simultaneously. To learn more about updating to the latest 6.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/dotnet-server-sdk).
## Identifying supported .NET platforms for the 7.0 SDK
The 7.0 version of the SDK is compatible with the following .NET platform versions:
 * .NET 6.0 and higher.
 * .NET Framework 4.6.2 and higher.
 * .NET Core 3.1.
 * Any other runtime that supports the .NET Standard 2.0 API. However, this SDK is not intended to be used for mobile or desktop applications. For those, use the [client-side .NET SDK](/docs/sdk/client-side/dotnet) instead.
LaunchDarkly no longer supports older .NET target frameworks, as stated in the [End of Life policy](https://launchdarkly.com/policies/end-of-life-policy/).
The .NET build tools automatically load the most appropriate build of the SDK for whatever platform your application or library is targeted to.
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
The 7.0 version of this SDK lets you use contexts. When you migrate from version 6.x, replace every instance of a user with a context. If there are any instances you do not replace, the 7.0 version of the .NET (server-side) SDK will convert each `User` parameter it receives to `Context` and call the `Context`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `Kind` attribute. When older versions of the .NET (server-side) SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `Kind` of “user.”
If a flag configuration specifies any context kinds other than “user,” older versions of the .NET (server-side) SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context kinds other than “user” in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to alias events](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. The 7.0 version of the SDK includes the following changes:
 * The `Variation` and `VariationDetail` methods now take a context, rather than a user, as a parameter. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating#net-server-side).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
7.0 syntax
```
1
| var value = client.BoolVariation("flag-key-123abc", context, false);
---|--- 
```
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
6.x syntax, user with key7.0 syntax, context with key
```
1
| var user1 = User.WithKey("user-key-123abc");
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
7.0 syntax, single context with key
```
1
| var context2 = Context.New(ContextKind.Of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
7.0 syntax, multi-context
```
1
| var userContext = Context.New("context-key-123abc");
---|--- 
2
| 
3
| var deviceContext = Context.Builder("device-key-123abc")
4
| .Kind("device")
5
| .Build();
6
| 
7
| var multiContext = Context.NewMulti(userContext, deviceContext);
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 7.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 7.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 7.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
6.x syntax, user with attributes7.0 syntax, context with attributes
```
1
| var user = User.Builder("user-key-123abc")
---|--- 
2
| .Name("Sandy")
3
| .Email("sandy@example.com")
4
| .Custom("groups", LdValue.ArrayOf(LdValue.Of("Google"), LdValue.Of("Microsoft")))
5
| .Build();
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 7.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
7.0 syntax, context with object attributes
```
1
| var address = LdValue.ObjectBuilder("address")
---|--- 
2
| .Add("street", "Main St")
3
| .Add("city", "Springfield")
4
| .Build();
5
| 
6
| var context = Context.Builder("context-key-123abc")
7
| .Set("address", address)
8
| .Build();
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set an optional secondary key for a user, using `Secondary()`. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 7.0, the secondary key attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 7.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. Only the context key and kind are sent to LaunchDarkly. In the second example, the “email” and “address” attributes are private for all contexts:
7.0 syntax, all attributes marked private7.0 syntax, two attributes marked private
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .Events(
3
| Components.SendEvents()
4
| .AllAttributesPrivate(true) // defaults to false
5
| )
6
| .Build();
7
| 
8
| var client = new LDClient(config);
```
To learn more, read [`AllAttributesPrivate`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Server_Integrations_EventProcessorBuilder_AllAttributesPrivate_) and [`PrivateAttributes`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Server_Integrations_EventProcessorBuilder_PrivateAttributes_).
Here’s how to mark an attribute as private for a particular context:
7.0 syntax, attribute marked private for one context
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Name("Sandy")
3
| .Set("email", "sandy@example.com")
4
| .Private("email")
5
| .Build();
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 7.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 7.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
7.0 syntax, associating two contexts
```
1
| var userContext = Context.New("context-key-123abc");
---|--- 
2
| 
3
| var deviceContext = Context.Builder("device-key-123abc")
4
| .Kind("device")
5
| .Build();
6
| 
7
| var multiContext = Context.NewMulti(userContext, deviceContext);
8
| 
9
| client.Identify(multiContext);
```
To learn more, read [`Identify`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_Identify_) and [`NewMulti`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Context.html#LaunchDarkly_Sdk_Context_NewMulti).
## Understanding changes to configuration options
In the 7.0 version of the SDK, several configuration options have changed:
 * The `PrivateAttributes` and `AllAttributesPrivate` configuration options both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/dotnet/migration-6-to-7#understanding-changes-to-private-attributes).
 * The `inlineUsersInEvents` option has been removed.
 * The `userKeysCapacity` and `userKeysFlushInterval` options are now deprecated. They have been replaced in this version with `contextKeysCapacity` and `contextKeysFlushInterval`, respectively. If both are provided, the newer context configuration options will take precedence.
To learn more, read [Configuration](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Configuration.html).
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 6.x release have been removed from the 7.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [Release notes in GitHub](https://github.com/launchdarkly/dotnet-server-sdk/releases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs