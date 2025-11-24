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
## Overview
This topic explains the changes in the Rust SDK and how to adapt code that uses a beta version of the [Rust](/docs/sdk/server-side/rust) SDK to use version 1 (v1).
**Version 1 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to v1. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
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
Version 1 of this SDK only operates on contexts. When you migrate to v1, you must replace every instance of a user with a context. This means changing each use of `User` to `Context`.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, the beta version of the Rust SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/server-side/rust/implementation-v1#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/server-side/rust/implementation-v1#understanding-differences-between-users-and-contexts): Where you previously created users, now you must create contexts.
 * [Changes to attributes](/docs/sdk/server-side/rust/implementation-v1#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/server-side/rust/implementation-v1#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to alias events](/docs/sdk/server-side/rust/implementation-v1#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. Version 1 of the SDK includes the following changes:
 * The `*_variation` and `*_variation_detail` methods now take a context, rather than a user, as a parameter. To learn more, read [the SDK’s API documentation](https://docs.rs/launchdarkly-server-sdk/1.0.0/launchdarkly_server_sdk/struct.Client.html#method.bool_variation).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
1.0 syntax
```
1
| let value = client.bool_variation(&context, "flag-key-123abc", false);
---|--- 
```
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
Beta syntax, user with key1.0 syntax, context with key
```
1
| let user1 = User::with_key("user-key-123abc").build();
---|--- 
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
1.0 syntax, single context builder
```
1
| let context = ContextBuilder::new("context-key-123abc")
---|--- 
2
| .kind("organization")
3
| .build()?;
```
Here’s how to construct a multi-context, which includes multiple context kinds:
1.0 syntax, multi-context
```
1
| let user_context = ContextBuilder::new("user-key-123abc").build()?;
---|--- 
2
| client.identify(user_context.clone());
3
| 
4
| let device_context = ContextBuilder::new("device-key-123abc").kind("device").build()?;
5
| client.identify(device_context.clone());
6
| 
7
| let multi_context = MultiContextBuilder::new()
8
| .add_context(user_context)
9
| .add_context(device_context)
10
| .build()?;
11
| 
12
| client.identify(multi_context);
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 1.0 version of the SDK.
#### Working with built-in and custom attributes
In the beta Rust SDK, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 1, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 1, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
Beta syntax, user with attributes1.0 syntax, context with attributes
```
1
| // User with only a key
---|--- 
2
| let user1 = User::with_key("user-key-123abc").build();
3
| 
4
| // User with a key plus other attributes
5
| let custom = hashmap! {
6
| "groups".into() => vec!["Google", "Microsoft"].into(),
7
| };
8
| let mut builder = User::with_key("user-key-456def");
9
| builder.first_name("Sandy");
10
| builder.last_name("Smith");
11
| builder.email("sandy@example.com");
12
| builder.custom(custom);
13
| let user2 = builder.build();
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 1.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
1.0 syntax
```
1
| let context = ContextBuilder::new("context-key123abc")
---|--- 
2
| .set_value(
3
| "address",
4
| AttributeValue::Object(HashMap::from([
5
| ("street".into(), "Main St".into()),
6
| ("city".into(), "Springfield".into()),
7
| ])),
8
| )
9
| .build()?;
```
In your flag or segment targeting, use `/` as the delimiter to refer to specific object fields. For example, you can use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
#### Removing the secondary attribute
In previous versions of the SDK, you could set the value of a user’s `secondary` attribute, as an optional secondary key for a user. The SDK would incorporate this attribute into the variation bucket assignment hash.
In version 1.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 1, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never sends an “email” attribute to LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In version 1, you can make all attributes private with the same configuration as in previous versions of the SDK. That behavior has not changed between SDK versions. Making select attributes private has changed. An example appears below.
In this example, the “email” and “address” attributes are private for all contexts:
1.0 syntax, two attributes marked private for all contexts
```
1
| let config_builder = ConfigBuilder::new("sdk-key-123abc");
---|--- 
2
| let mut processor_builder = EventProcessorBuilder::new();
3
| processor_builder.private_attributes(
4
| vec!["email".into(), "address".into()]
5
| .into_iter()
6
| .collect(),
7
| );
8
| config_builder.event_processor(&processor_builder);
```
To learn more, read [the SDK’s API documentation](https://docs.rs/launchdarkly-server-sdk/1.0.0).
Here’s how to mark an attribute as private for a particular context:
1.0 syntax, attribute marked private for one context
```
1
| ContextBuilder::new("context-key-123abc").add_private_attribute(Reference::new("/address/street"))
---|--- 
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
Version 1 of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 1.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Add multiple contexts together with a MultiContextBuilder. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
1.0 syntax
```
1
| let user_context = ContextBuilder::new("user-key-123abc").build()?;
---|--- 
2
| client.identify(user_context.clone());
3
| 
4
| let device_context = ContextBuilder::new("device-key-123abc").kind("device").build()?;
5
| client.identify(device_context.clone());
6
| 
7
| let multi_context = MultiContextBuilder::new()
8
| .add_context(user_context)
9
| .add_context(device_context)
10
| .build()?;
11
| client.identify(multi_context);
```
To learn more, read [the SDK’s API documentation](https://docs.rs/launchdarkly-server-sdk/1.0.0).
## Understanding changes to configuration options
In version 1 of the SDK, several configuration options have changed:
 * The `private_attribute_names` and `all_attributes_private` configuration options both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/rust/implementation-v1#understanding-changes-to-private-attributes).
 * The `inline_users_in_events` option has been removed.
 * The `userKeysCapacity` and `userKeysFlushInterval` options have been renamed to `context_keys_capacity` and `context_keys_flush_interval`, respectively.
To learn more, read [the SDK’s API documentation](https://docs.rs/launchdarkly-server-sdk/1.0.0).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs