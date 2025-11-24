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
 * [Understanding changes to data source methods](#understanding-changes-to-data-source-methods)
 * [Understanding changes to events](#understanding-changes-to-events)
 * [Understanding changes to networking](#understanding-changes-to-networking)
 * [Understanding changes to service URI configuration](#understanding-changes-to-service-uri-configuration)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains the changes in the Android 4.0 release and how to migrate to that version.
**Version 4.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 4.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 4.0, update to the latest 3.x version. Some of the changes that are mandatory in 4.0 were originally added in a 3.x version and made optional.
If you update to the latest 3.x version, deprecation warnings appear in areas of your code that need to be changed for 4.0. You can update them at your own pace while still using 3.x, rather than migrating everything simultaneously. To learn more about updating to the latest 3.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/android-client-sdk).
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
The 4.0 version of this SDK lets you use contexts. When you migrate from version 3.x, replace every instance of a user with a context. If there are any instances you do not replace, the 4.0 version of the Android SDK will convert each `LDUser` parameter it receives to `LDContext` and call the `LDContext`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Android SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Create contexts, not users](/docs/sdk/client-side/android/migration-3-to-4#understanding-differences-between-users-and-contexts): Where you previously created users, now you must create contexts.
 * [Changes to attributes](/docs/sdk/client-side/android/migration-3-to-4#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/client-side/android/migration-3-to-4#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to automatic attribute population](/docs/sdk/client-side/android/migration-3-to-4#understanding-changes-to-automatic-custom-property-population): The SDK no longer automatically populates the “device” and “os” properties.
 * [Changes to anonymous users](/docs/sdk/client-side/android/migration-3-to-4#understanding-changes-to-anonymous-users): The SDK must be configured to automatically generate a context key.
 * [Changes to alias events](/docs/sdk/client-side/android/migration-3-to-4#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
3.x syntax, user with key4.0 syntax, context with key
```
1
| LDUser user = new LDUser("user-key-123abc");
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
4.0 syntax, context shortcut
```
1
| LDContext context1 = LDContext.create(ContextKind.of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
4.0 syntax
```
1
| LDContext userContext = LDContext.create("user-key-123abc");
---|--- 
2
| LDContext deviceContext = LDContext.create(ContextKind.of("device"), "device-key-123abc");
3
| 
4
| LDContext multiContext = LDContext.createMulti(
5
| userContext,
6
| deviceContext
7
| );
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 4.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 4.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 4.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
3.x syntax, user with attributes4.0 syntax, context with attributes
```
1
| LDUser user = new LDUser.Builder("user-key-123abc")
---|--- 
2
| .name("Sandy")
3
| .email("sandy@example.com")
4
| .custom("group", "Microsoft")
5
| .build();
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 4.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s one way to add object attributes to a context:
4.0 syntax, context with object attributes
```
1
| LDValue addressData = LDValue.buildObject()
---|--- 
2
| .put("street", "Main St")
3
| .put("city", "Springfield")
4
| .build();
5
| LDContext context = LDContext.builder("user-key-123abc")
6
| .set("address", addressData)
7
| .build();
```
There are multiple ways you can construct attribute values. To learn more about additional methods, read [`LDValue`](https://launchdarkly.github.io/java-server-sdk/com/launchdarkly/sdk/LDValue.html).
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 4.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 4.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. In the second example, the “email” and “address” attributes are private for all contexts:
4.0 syntax, all attributes private4.0 syntax, two attributes private
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .events(
3
| Components.sendEvents().allAttributesPrivate(true)
4
| )
5
| .build();
```
To learn more, read [EventProcessorBuilder](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/EventProcessorBuilder.html).
Here’s how to mark an attribute as private for a particular context:
4.0 syntax, attribute marked private for one context
```
1
| LDContext context = LDContext.builder("key")
---|--- 
2
| .name("Sandy")
3
| .set("email", "sandy@example.com")
4
| .privateAttributes("email")
5
| .build();
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
The `privateAttributeNames` attribute that existed in a user object in version 3.x has been renamed to `privateAttributes` in `LDContext`. To learn more, read [`privateAttributes`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/ContextBuilder.html#privateAttributes\(java.lang.String...\)).
### Understanding changes to automatic custom property population
In the 3.x version, the SDK automatically populated the `device` and `os` built-in attributes of a user. In version 4.0, the SDK will not automatically create or populate these attributes for contexts.
If you currently have feature flags that target these attributes, you will need to determine what context you want them to be part of, and populate them yourself.
Here’s how:
4.0 syntax, setting device and os
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .set("os", "25")
3
| .set("device", "Pixel XL marlin")
4
| .build();
```
### Understanding changes to anonymous users
In previous versions of the SDK, setting a user’s `key` attribute to `null` and its `anonymous` attribute to `true` caused the SDK to generate a unique identifier to use as a key.
In the 4.0 version of the SDK, this behavior works differently. The SDK will not generate keys for anonymous contexts unless you set a new configuration option.
Here’s how:
4.0 syntax, configuring the SDK to generate keys
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .generateAnonymousKeys(true)
3
| .build();
```
If you set this option, the SDK will generate a key for any context whose `anonymous` attribute is `true`. You must still specify a non-null key as a placeholder when you construct the `LDContext`, because the SDK does not allow an `LDContext` to exist with a null key. When you pass this context to SDK methods like `init` or `identify`, the SDK replaces the placeholder key with a generated key.
In this example, the placeholder key is “unknown-context-key”, but it could be any non-empty string:
4.0 syntax, building an anonymous context
```
1
| LDContext context = LDContext.builder("unknown-context-key")
---|--- 
2
| .anonymous(true)
3
| .build();
```
If you use multi-contexts, this feature applies to each individual context separately. Only the contexts that have the `anonymous` attribute set to `true` will receive a generated key, and there will be a different generated key for each context kind.
In this example, `userContext` will receive a generated key, but `orgContext` will still have the key `“org-key-123abc”:
4.0 syntax, anonymous context in a multi-context
```
1
| LDContext userContext = LDContext.builder("unknown-context-key")
---|--- 
2
| .anonymous(true)
3
| .build();
4
| LDContext orgContext = LDContext.create(ContextKind.of("organization"), "org-key-123abc");
5
| LDContext multiContext = LDContext.createMulti(userContext, orgContext);
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 4.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 4.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
4.0 syntax, associating two contexts
```
1
| LDContext context1 = LDContext.create("user-key-123abc");
---|--- 
2
| LDContext context2 = LDContext.create(ContextKind.of("device"), "device-key-123abc");
3
| LDContext multiContext = LDContext.createMulti(context1, context2);
4
| client.identify(multiContext);
```
To learn more, read [`ContextMultiBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/ContextMultiBuilder.html).
## Understanding changes to SDK configuration
Android SDK [3.3.0](https://github.com/launchdarkly/android-client-sdk/releases/tag/3.3.0) added newer ways to use [`LDConfig.Builder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html). As of 4.0, those ways are mandatory. They are the only way to use `LDConfig.Builder`.
Instead of having many unrelated properties, each with their own [`LDConfig.Builder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html) method, most of the properties are now grouped into areas of functionality, each of which has its own builder class that is only available if you are using that functionality. For instance, if you use streaming mode, there are options you can set to control streaming mode, and if you use polling mode, you use a different builder that does not have the streaming options. Similarly, if you have disabled analytics events, the event-related options are not accessible.
The basic areas of functionality are “data source,” events, networking, and service URIs. Data source refers to polling, streaming, or test data.
If your code was already using the newer model, you should not need to change it.
### Understanding changes to data source methods
For each data source type, there is a factory method whose name ends in `DataSource`. These methods give you a builder object with methods for whatever options are appropriate. Pass that object to [`LDConfig.Builder.dataSource()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#dataSource\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)).
Here is an example:
3.x syntax4.0 syntax
```
1
| // Setting custom options for streaming mode
---|--- 
2
| LDConfig config = new LDConfig.Builder()
3
| .stream(true)
4
| .backgroundPollingIntervalMillis(120000)
5
| .build();
6
| 
7
| // Specifying polling mode and setting custom polling options
8
| LDConfig config = new LDConfig.Builder()
9
| .stream(false)
10
| .pollingIntervalMillis(60000)
11
| .backgroundPollingIntervalMillis(120000)
12
| .build();
```
The default is to use streaming mode. Unlike the earlier model, it is no longer possible to construct a meaningless configuration such as “use streaming mode, but set the polling interval to 1 minute.”
To learn more, read [`StreamingDataSourceBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/StreamingDataSourceBuilder.html) and [`PollingDataSourceBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/PollingDataSourceBuilder.html).
Another data source option is the test data source. To learn more, read the API documentation for [`com.launchdarkly.sdk.android.integrations.TestData`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/TestData.html).
### Understanding changes to events
Analytics events are enabled by default. To customize their behavior, call [`Components.sendEvents()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/Components.html#sendEvents\(\)) to get an [`EventProcessorBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/EventProcessorBuilder.html) object with event-related options, and then pass that object to [`LDConfig.Builder.events()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#events\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)).
To completely disable events, set [`LDConfig.Builder.events()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#events\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)) to [`Components.noEvents()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/Components.html#noEvents\(\)). This was not possible in previous SDK versions.
Here is an example:
3.x syntax4.0 syntax
```
1
| // Customizing event behavior
---|--- 
2
| LDConfig config = new LDConfig.Builder()
3
| .capacity(20000)
4
| .flushIntervalMillis(10000)
5
| .privateAttributes("email", "name", "myCustomAttribute")
6
| .build();
7
| 
8
| // Disabling events is not possible in 3.x
```
It is no longer possible to construct a meaningless configuration like “disable events, but set the flush interval to 10 seconds.”
[`EventProcessorBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/EventProcessorBuilder.html) does not have methods that correspond to the previous configuration options `autoAliasingOptOut` and `inlineUsersInEvents`. Updates to the LaunchDarkly event model have made those options obsolete.
### Understanding changes to networking
Options in this category affect how the SDK communicates with LaunchDarkly over HTTP/HTTPS, such as connection timeout and custom headers. If you need to customize these, get an [`HttpConfigurationBuilder`](http://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/HttpConfigurationBuilder.html) object by calling [`Components.httpConfiguration()`](http://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/Components.html#httpConfiguration\(\)), configure it, and then pass it to [`LDConfig.Builder.http()`](http://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#http\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)).
To learn more, read [`HttpConfigurationBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/HttpConfigurationBuilder.html).
Here is an example:
3.x syntax4.0 syntax
```
1
| // Setting connection timeout
---|--- 
2
| LDConfig config = new LDConfig.Builder()
3
| .connectTimeoutMillis(3000)
4
| .build();
```
### Understanding changes to service URI configuration
Previous versions of the SDK had `pollUri`, `streamUri`, and `eventsUri` options for using custom service URIs instead of the standard LaunchDarkly service URIs. This is normally only necessary if you are using the LaunchDarkly Relay Proxy, or if your company uses a special LaunchDarkly domain that is not `launchdarkly.com`.
To customize these options in the new SDK, call [`Components.serviceEndpoints()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/Components.html#serviceEndpoints\(\)) to get a [`ServiceEndpointsBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/ServiceEndpointsBuilder.html) object, configure this builder, and then pass it to [`LDConfig.Builder.serviceEndpoints()`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#serviceEndpoints\(com.launchdarkly.sdk.android.integrations.ServiceEndpointsBuilder\)).
Here is an example:
3.x syntax, federal4.0 syntax, federal3.x syntax, EU4.0 syntax, EU
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .pollUri(Uri.parse("https://clientsdk.launchdarkly.us"))
3
| .streamUri(Uri.parse("https://clientstream.launchdarkly.us"))
4
| .eventsUri(Uri.parse("https://events.launchdarkly.us"))
5
| .build();
```
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 3.x release have been removed from the 4.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [release notes for 4.0.0](https://github.com/launchdarkly/android-client-sdk/releases/tag/4.0.0).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs