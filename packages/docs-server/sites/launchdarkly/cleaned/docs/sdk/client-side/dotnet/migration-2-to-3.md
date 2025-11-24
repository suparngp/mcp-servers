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
 * [Understanding differences between users and contexts](#understanding-differences-between-users-and-contexts)
 * [Understanding changes to built-in and custom attributes](#understanding-changes-to-built-in-and-custom-attributes)
 * [Working with built-in and custom attributes](#working-with-built-in-and-custom-attributes)
 * [Referencing properties of an attribute object](#referencing-properties-of-an-attribute-object)
 * [Removing the secondary attribute](#removing-the-secondary-attribute)
 * [Understanding changes to private attributes](#understanding-changes-to-private-attributes)
 * [Understanding changes to anonymous users](#understanding-changes-to-anonymous-users)
 * [Understanding changes to alias events](#understanding-changes-to-alias-events)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains the changes in the .NET (client-side) SDK 3.0 release and how to adapt code that uses a 2.x version of the [.NET (client-side) SDK](/docs/sdk/client-side/dotnet) to use version 3.0 or later.
**Version 3.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 3.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 3.0, update to the latest 2.x version. Some of the changes that are mandatory in 3.0 were originally added in a 2.x version and made optional.
If you update to the latest 2.x version, deprecation warnings appear in areas of your code that need to be changed for 3.0. You can update them at your own pace while still using 2.x, rather than migrating everything simultaneously. To learn more about updating to the latest 2.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/dotnet-client-sdk).
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
The 3.0 version of this SDK lets you use contexts. When you migrate from version 2.x, replace every instance of a user with a context. If there are any instances you do not replace, the 3.0 version of the .NET (client-side) SDK will convert each `User` parameter it receives to `Context` and call the `Context`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a “kind” attribute. When older versions of the .NET (client-side) SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a kind of “user.”
If a flag configuration specifies any context kinds other than “user,” older versions of the .NET (client-side) SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context kinds other than “user” in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Create contexts, not users](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within an object.
 * [Changes to private attributes](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to anonymous users](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-changes-to-anonymous-users): Client-side SDKs no longer automatically populate the device ID.
 * [Changes to alias events](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-changes-to-alias-events): The alias method has been removed.
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
2.x syntax, user with key3.0 syntax, context with key
```
1
| var user = User.WithKey("user-key-123abc");
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
3.0 syntax, context shortcut
```
1
| var context = Context.New(ContextKind.Of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
3.0 syntax, multi-context
```
1
| var userContext = Context.New("user-key-123abc");
---|--- 
2
| 
3
| var orgContext = Context.New(ContextKind.Of("organization"), "org-key-123abc");
4
| 
5
| var multiContext = Context.NewMulti(userContext, orgContext);
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 3.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 3.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 3.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
2.x syntax, user with attributes3.x, context with attributes
```
1
| var user = User.Builder("user-key-123abc")
---|--- 
2
| .Name("Sandy")
3
| .Email("sandy@example.com")
4
| .Custom("group", "Microsoft")
5
| .Build();
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 3.0, if a context attribute’s value is an object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s one way to add object attributes to a context:
3.0 syntax, context with object attributes
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
There are multiple ways you can construct attribute values. To learn more about additional methods, read [LDValue](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.LdValue.html).
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `Secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 3.0, the `Secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 3.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. In the second example, the “email” and “address” attributes are private for all contexts:
3.0 syntax, all attributes marked private3.0 syntax, two attributes marked private
```
1
| var config = Configuration.Builder("mobile-key-123abc")
---|--- 
2
| .AllAttributesPrivate(true)
3
| .Build();
4
| LdClient client = LdClient.Init(config, context);
```
To learn more, read [`AllAttributesPrivate`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Client_Integrations_EventProcessorBuilder_AllAttributesPrivate_System_Boolean_) and [`PrivateAttributes`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Client_Integrations_EventProcessorBuilder_PrivateAttributes_System_String___).
Here’s how to mark an attribute as private for a particular context:
3.0 syntax, attribute marked private for one context
```
1
| var context = Context.Builder("context-key-123-abc")
---|--- 
2
| .Set("email", "sandy@example.com")
3
| .Private("email")
4
| .Build();
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
### Understanding changes to anonymous users
In previous versions of the SDK, setting a user’s `key` attribute to `null` and its `anonymous` attribute to `true` caused the SDK to generate a unique identifier to use as a key.
In the 3.0 version of the SDK, this behavior works differently. The SDK will not generate keys for anonymous contexts unless you set a new configuration option.
Here’s how:
3.0 syntax, configuring the SDK to generate keys
```
1
| var config = Configuration.Builder("mobile-key-123abc")
---|--- 
2
| .GenerateAnonymousKeys(true)
3
| .Build();
```
If you set this option, the SDK will generate a key for any context whose `anonymous` attribute is true. You must still specify a non-null key as a placeholder when you construct the `Context`, because the SDK does not allow a `Context` to exist with a null key. When you pass this context to SDK methods like `Init` or `Identify`, the SDK replaces the placeholder key with a generated key.
In this example, the placeholder key is “unknown-context-key”, but it could be any non-empty string:
3.0 syntax, building an anonymous context
```
1
| Context.Builder("unknown-context-key")
---|--- 
2
| .Anonymous(true)
3
| .Build();
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 3.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 3.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
3.0 syntax, associating two contexts
```
1
| var userContext = Context.New("user-key-123abc");
---|--- 
2
| 
3
| var deviceContext = Context.New(ContextKind.Of("device"), "device-key-123abc");
4
| 
5
| var multiContext = Context.NewMulti(userContext, deviceContext);
6
| 
7
| await client.IdentifyAsync(multiContext); // or, use synchronous Identify
```
To learn more, read [`NewMulti`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Context.html#LaunchDarkly_Sdk_Context_NewMulti_LaunchDarkly_Sdk_Context_Context__).
## Understanding changes to configuration options
In the 3.0 version of the SDK, several configuration options have changed:
 * `PrivateAttributeNames` is now called `PrivateAttributes`. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/dotnet/migration-2-to-3#understanding-changes-to-private-attributes).
 * The `AutoAliasingOptOut` option has been removed.
 * The `InlineUsersInEvents` option has been removed.
 * The `UserKeysCapacity` and `UserKeysFlushInterval` options are renamed to `ContextKeysCapacity` and `ContextKeysFlushInterval`, respectively.
To learn more, read the [release notes on GitHub](https://github.com/launchdarkly/dotnet-client-sdk/releases).
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 2.x release have been removed from the 3.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [release notes on GitHub](https://github.com/launchdarkly/dotnet-client-sdk/releases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs