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
 * [Understanding changes to automatic custom property population](#understanding-changes-to-automatic-custom-property-population)
 * [Understanding changes to anonymous users](#understanding-changes-to-anonymous-users)
 * [Understanding changes to alias events](#understanding-changes-to-alias-events)
 * [Understanding changes to SDK configuration](#understanding-changes-to-sdk-configuration)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains the changes in the Flutter 2.0 release and how to migrate to that version.
**Version 2.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 2.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 2.0, update to the latest 1.x version. Some of the changes that are mandatory in 2.0 were originally added in a 1.x version and made optional.
If you update to the latest 1.x version, deprecation warnings may appear in areas of your code that need to be changed for 2.0. You can update them at your own pace while still using 1.x, rather than migrating everything simultaneously. To learn more about updating to the latest 1.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/flutter-client-sdk).
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
The 2.0 version of this SDK lets you use contexts. When you migrate from version 1.x, replace every instance of a user with a context. If there are any instances you do not replace, the 2.0 version of the Flutter SDK will convert each `LDUser` parameter it receives to `LDContext` and call the `LDContext`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Flutter SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Create contexts, not users](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-differences-between-users-and-contexts): Where you previously created users, now you must create contexts.
 * [Changes to attributes](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to automatic attribute population](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-automatic-custom-property-population): The SDK no longer automatically populates the “device” and “os” properties.
 * [Changes to anonymous users](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-anonymous-users): The SDK must be configured to automatically generate a context key.
 * [Changes to alias events](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
1.x syntax, user with key2.0 syntax, context for user
```
1
| LDUser user = new LDUser('user-key-123abc');
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
2.0 syntax, context with another kind
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| builder.kind('device', 'device-key-123abc');
3
| LDContext context = builder.build();
```
Here’s how to construct a multi-context, which includes multiple context kinds:
2.0 syntax, multi-context
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| builder.kind('user', 'user-key-123abc');
3
| builder.kind('device', 'device-key-123abc');
4
| LDContext context = builder.build();
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 2.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 2.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 2.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
1.x syntax, user with attributes2.0 syntax, context with attributes
```
1
| LDUser user = LDUserBuilder('user-key-123abc')
---|--- 
2
| .email('sandy@example.com')
3
| .firstName('Sandy')
4
| .lastName('Smith')
5
| .custom('group', LDValue.ofString('Microsoft'))
6
| .build();
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 2.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
2.0 syntax, context with object attributes
```
1
| LDValue addressData = LDValueObjectBuilder()
---|--- 
2
| .addValue('street', LDValue.ofString('Main St'))
3
| .addValue('city', LDValue.ofString('Springfield'))
4
| .build();
5
| 
6
| LDContextBuilder builder = LDContextBuilder();
7
| builder.kind('user', 'user-key-123abc')
8
| .set('address', addressData);
9
| 
10
| LDContext context = builder.build();
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 2.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 2.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. In the second example, the “email” and “address” attributes are private for all contexts:
2.0 syntax, all attributes private2.0 syntax, two attributes private
```
1
| LDConfig config = LDConfigBuilder('mobile-key-123abc')
---|--- 
2
| .allAttributesPrivate(true)
3
| .build();
```
Here’s how to mark an attribute as private for a particular context:
2.0 syntax, attribute marked private for one context
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| builder.kind('user', 'user-key-123abc')
3
| .name('Sandy')
4
| .set('email', LDValue.ofString('sandy@example.com'))
5
| .set('group', LDValue.ofString('microsoft'))
6
| .privateAttributes(['name', 'group']);
7
| LDContext context = builder.build();
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
### Understanding changes to automatic custom property population
In the 1.x version, the SDK automatically populated the `device` and `os` built-in attributes of a user. In version 2.0, the SDK will not automatically create or populate these attributes for contexts.
If you currently have feature flags that target these attributes, you will need to determine what context you want them to be part of, and populate them yourself.
Here’s an example:
2.0 syntax, setting os and device
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| 
3
| builder.kind('user', 'user-key-123abc')
4
| .name('Sandy');
5
| 
6
| builder.kind('device', 'device-key-123abc')
7
| .set('os', LDValue.ofString('Android 25'))
8
| .set('device', LDValue.ofString('Pixel XL marlin'));
9
| 
10
| LDContext context = builder.build();
```
### Understanding changes to anonymous users
In 1.x versions of the SDK, you could not omit the user key when building an anonymous user.
In the 2.0 version of the SDK, if you omit the key the SDK will generate a key for you and set the context to anonymous. This applies to all platforms and devices.
1.0 syntax, key required2.0 syntax, omitting key
```
1
| LDUser user = LDUserBuilder('user-key-123abc')
---|--- 
2
| .anonymous(true)
3
| .build();
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 2.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 2.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
2.0 syntax, associating two contexts
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| builder.kind('user', 'user-key-123abc');
3
| builder.kind('device', 'device-key-123abc');
4
| 
5
| LDContext updatedMultiContext = builder.build();
6
| 
7
| await LDClient.identifyWithContext(updatedMultiContext);
```
## Understanding changes to SDK configuration
In the 2.0 version of the SDK, several configuration options have changed:
 * The `privateAttributes` and `allAttributesPrivate` configuration options both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-private-attributes).
 * `privateAttributeNames` is now called `privateAttributes`. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/flutter/migration-1-to-2#understanding-changes-to-private-attributes).
 * The `autoAliasingOptOut` option has been removed.
 * The `inlineUsersInEvents` option has been removed.
To learn more, read [`LDConfig`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig-class.html)
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 1.x release have been removed from the 2.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [release notes in GitHub](https://github.com/launchdarkly/flutter-client-sdk/releases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs