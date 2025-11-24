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
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains the changes in the iOS SDK 8.0 release and how to adapt Objective-C code that currently uses a 6.x or 7.x version of the [iOS client-side SDK](/docs/sdk/client-side/ios) to use version 8.0 or later.
**Version 8.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 8.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
You do not need to upgrade to the 7.x version of the SDK before upgrading to 8.0. We released version 7.0 of the SDK when Apple released Xcode 14, which dropped support for some older OS targets. Functionally 7.x is exactly like 6.x except for minimum supported platforms.
If you update to the 6.x or 7.x version, deprecation warnings appear in areas of your code that need to be changed for 8.0. You can update them at your own pace while still using 6.x or 7.x, rather than migrating everything simultaneously. To learn more about updating to the latest 7.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/ios-client-sdk).
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
The 8.0 version of this SDK lets you use contexts. When you migrate from version 6.x or 7.x, replace every instance of a user with a context. If there are any instances you do not replace, the 8.0 version of the iOS SDK will convert each `LDUser` parameter it receives to `LDContext` and call the `LDContext`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the iOS SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Create contexts, not users](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-differences-between-users-and-contexts): Where you previously created users, now you must create contexts.
 * [Changes to attributes](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to automatic attribute population](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-automatic-custom-property-population): The SDK no longer automatically populates the “device” and “os” properties.
 * [Changes to anonymous users](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-anonymous-users): Client-side SDKs no longer automatically populate the device ID.
 * [Changes to alias events](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
7.x syntax, user with key8.0 syntax, context with key
```
1
| LDUser *user = [[LDUser alloc] initWithKey:@"user-key-123abc"];
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
8.0 syntax, multi-context
```
1
| LDContextBuilder *userBuilder = [[LDContextBuilder alloc] initWithKey:@"user-key-123abc"];
---|--- 
2
| LDContextBuilder *deviceBuilder = [[LDContextBuilder alloc] initWithKey:@"device-key-123abc"];
3
| [deviceBuilder kindWithKind:@"device"];
4
| 
5
| LDMultiContextBuilder *multiBuilder = [[LDMultiContextBuilder alloc] init];
6
| [multiBuilder addContextWithContext:userBuilder.build.success];
7
| [multiBuilder addContextWithContext:deviceBuilder.build.success];
8
| 
9
| LDContext *multiContext = multiBuilder.build.success;
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 8.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 8.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
7.x syntax, user with attributes8.0 syntax, context with attributes
```
1
| LDUser *user = [[LDUser alloc] initWithKey:@"user-key-123abc"];
---|--- 
2
| user.name = @"Sandy Smith";
3
| user.email = @"sandy@example.com";
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 8.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
8.0 syntax, context with object attributes
```
1
| LDContextBuilder *builder = [[LDContextBuilder alloc] initWithKey:@"context-key-123abc"];
---|--- 
2
| NSDictionary<NSString *, LDValue *> *address = @{
3
| @"street": [LDValue ofString:@"Main St"],
4
| @"city": [LDValue ofString:@"Springfield"]
5
| };
6
| [builder trySetValueWithName:@"address" value:[LDValue ofDict:address]];
7
| 
8
| LDContext *context = builder.build.success;
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 8.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 8.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. In the second example, the “email” and “address” attributes are private for all contexts:
8.0 syntax, all attributes marked private8.0 syntax, two attributes marked private
```
1
| LDConfig *config = [[LDConfig alloc] initWithMobileKey:@"mobile-key-123abc"];
---|--- 
2
| [config setAllContextAttributesPrivate:YES];
3
| [LDClient startWithConfiguration:config context:context completion:nil];
```
To learn more, read [`privateContextAttributes`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html#/s:12LaunchDarkly8LDConfigV24privateContextAttributesSayAA9ReferenceVGvp).
Here’s how to mark an attribute as private for a particular context:
8.0 syntax, attribute marked private for one context
```
1
| LDContextBuilder *builder = [[LDContextBuilder alloc] initWithKey:@"context-key-123abc"];
---|--- 
2
| [builder nameWithName:@"name"];
3
| [builder trySetValueWithName:@"email" value:[LDValue ofString:@"example@email.com"]];
4
| NSDictionary<NSString *, LDValue *> *address = @{
5
| @"street": [LDValue ofString:@"Main St"],
6
| @"city": [LDValue ofString:@"Springfield"]
7
| };
8
| [builder addPrivateAttributeWithReference:[[Reference alloc] initWithValue:@"email"]];
9
| [builder addPrivateAttributeWithReference:[[Reference alloc] initWithValue:@"address"]];
10
| LDContext *context = builder.build.success;
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
The `privateAttributeNames` attribute that existed in a user object in versions 6.x and 7.x has been removed in version 8.0. In 8.0, you must use `addPrivateAttribute` and `removePrivateAttribute` within the builder. To learn more, read [`addPrivateAttribute`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDContextBuilder.html#/s:12LaunchDarkly16LDContextBuilderV19addPrivateAttributeyyAA9ReferenceVF).
### Understanding changes to automatic custom property population
In the 6.x and 7.x versions, the SDK automatically populated the `device` and `os` built-in attributes of a user. In version 8.0, the SDK will not automatically create or populate these attributes for contexts.
If you currently have feature flags that target these attributes, you will need to determine what context you want them to be part of, and populate them yourself.
Here’s how:
8.0 syntax, setting the device and operating system
```
1
| LDContextBuilder *builder = [[LDContextBuilder alloc] initWithKey:@"context-key-123abc"];
---|--- 
2
| [builder kindWithKind:@"device"];
3
| [builder trySetValueWithName:@"device" value:[LDValue ofString:@"device"]];
4
| [builder trySetValueWithName:@"os" value:[LDValue ofString:@"os"]];
5
| LDContext *context = builder.build.success;
```
### Understanding changes to anonymous users
In 6.x and 7.x versions of the SDK, you could omit the user key when building an anonymous user. On mobile devices, the SDK set the user key to the device ID. On non-mobile platforms, the SDK set the user key to a generated UUID.
In the 8.0 version of the SDK, the SDK sets the context `key` for each context kind to a generated UUID for all platforms and devices.
If you currently have feature flags that target the device ID, you will need to determine what context you want the device ID to be part of, and populate the device ID attribute yourself.
Here’s how:
8.0 syntax, setting the device ID
```
1
| NSString *key = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
---|--- 
2
| LDContextBuilder *builder = [[LDContextBuilder alloc] initWithKey:key];
3
| [builder kindWithKind:@"device"];
4
| LDContext *context = builder.build.success;
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 8.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 8.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
8.0 syntax, associating two contexts
```
1
| LDContextBuilder *userBuilder = [[LDContextBuilder alloc] initWithKey:@"user-key-123abc"];
---|--- 
2
| LDContextBuilder *deviceBuilder = [[LDContextBuilder alloc] initWithKey:@"device-key-123abc"];
3
| [deviceBuilder kindWithKind:@"device"];
4
| 
5
| LDMultiContextBuilder *multiBuilder = [[LDMultiContextBuilder alloc] init];
6
| [multiBuilder addContextWithContext:userBuilder.build.success];
7
| [multiBuilder addContextWithContext:deviceBuilder.build.success];
8
| 
9
| LDContext *multiContext = multiBuilder.build.success;
10
| 
11
| [[LDClient get] identifyWithContext:multiContext];
```
To learn more, read [`identify`](https://launchdarkly.github.io/ios-client-sdk/Classes/ObjcLDClient.html#/c:@M@LaunchDarkly@objc\(cs\)LDClient\(im\)identifyWithContext:).
## Understanding changes to configuration options
In the 8.0 version of the SDK, several configuration options have changed:
 * The `privateUserAttributes` and `allUserAttributesPrivate` LDConfig variables are now called `privateContextAttributes` and `allContextAttributesPrivate`. Both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-private-attributes).
 * `privateAttributeNames` is now called `privateAttributes`. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/ios/migration-7-to-8-objc#understanding-changes-to-private-attributes).
 * The `autoAliasingOptOut` option has been removed.
 * The `inlineUsersInEvents` option has been removed.
To learn more, read [`LDConfig`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html).
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 7.x release have been removed from the 8.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [release notes in GitHub](https://github.com/launchdarkly/ios-client-sdk/releases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs