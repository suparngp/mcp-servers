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
 * [Maps without “kind” create users, not contexts](#maps-without-kind-create-users-not-contexts)
 * [Understanding differences between users and contexts](#understanding-differences-between-users-and-contexts)
 * [Understanding changes to built-in and custom attributes](#understanding-changes-to-built-in-and-custom-attributes)
 * [Working with built-in and custom attributes](#working-with-built-in-and-custom-attributes)
 * [Referencing properties of an attribute object](#referencing-properties-of-an-attribute-object)
 * [Removing the secondary attribute](#removing-the-secondary-attribute)
 * [Understanding changes to private attributes](#understanding-changes-to-private-attributes)
 * [Understanding changes to alias events](#understanding-changes-to-alias-events)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
## Overview
This topic explains the changes in the Erlang (server-side) SDK 2.0 release and how to adapt code that uses a 1.x version of the [Erlang (server-side) SDK](https://hexdocs.pm/launchdarkly_server_sdk/index.html) to use version 2.0 or later.
**Version 2.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 2.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
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
The 2.0 version of this SDK lets you use contexts. When you migrate from version 1.x, replace every instance of a user with a context. If there are any instances you do not replace, the 2.0 version of the Erlang SDK will convert each `ldclient_user:user()` parameter it receives to a `ldclient_context:context()`.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the Erlang SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the Erlang SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Changes to flag evaluation](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-changes-to-flag-evaluation): The methods for evaluating flags now require contexts, rather than users.
 * [Create contexts, not users](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-differences-between-users-and-contexts): Where you previously created users, now you can create contexts.
 * [Changes to attributes](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to alias events](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-changes-to-alias-events): The alias method has been removed.
### Understanding changes to flag evaluation
The methods for [evaluating flags](/docs/sdk/features/evaluating) and determining [flag evaluation reasons](/docs/sdk/features/evaluation-reasons) have changed slightly. The 2.0 version of the SDK includes the following changes:
 * The `variation` and `variation_detail` methods now take a context, rather than a user, as a parameter. To learn more, read [`ldclient:variation/3` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient.html#variation-3) and [`ldclient:variation_detail/3` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient.html#variation_detail-3).
 * The `USER_NOT_SPECIFIED` evaluation error code was previously defined as, the user object or user key was not provided. It has been redefined to mean that the context was not provided or was invalid.
Here’s how to evaluate a flag using a context:
2.0 syntax
```
1
| Value = ldclient:variation(<<"flag-key-123abc">>, context, false).
---|--- 
```
#### Maps without “kind” create users, not contexts
If you use a map directly as a context, omitting the kind will cause the SDK to treat the map as a user.
The SDK will then apply automatic conversion, treating the map as an `ldclient_user:user()` and transforming it to an `ldclient_context:context()`.
If you include the `kind` attribute, then the SDK will treat the map as an `ldclient_context:context()`, and not a `ldclient_user:user()`. If you create the context with `ldclient_context:new/1`, no conversion is required.
Impact of context kind
```
1
| %% The SDK is still capable of evaluating user maps, for instance:
---|--- 
2
| #{
3
| key => <<"user-key-123abc">>,
4
| first_name => <<"Sandy">>
5
| }
6
| 
7
| %% If you add a kind to your map, then it will NOT be valid,
8
| %% because `first_name` is no longer a built-in attribute for contexts.
9
| %% Instead, create your context using ldclient_context:new
10
| Context = ldclient_context:set(<<"firstName">>, <<"Sandy">>,
11
| ldclient_context:new(<<"user-key-123abc">>))
12
| %% Or, use a map
13
| Context = #{
14
| key => <<"user-key-123abc">>,
15
| kind => <<"user">>
16
| attributes => #{
17
| <<"firstName">> => <<"Sandy">>
18
| }
19
| }
```
When converting maps for `ldclient_user:user()` to `ldclient_context:context()` make sure you update all fields to comply with the `ldclient_context:context()` typing.
### Understanding differences between users and contexts
Where you previously created users, now you can create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
1.x syntax, user with key2.0 syntax, context with key
```
1
| User = ldclient_user:new(<<"user-key-123abc">>),
---|--- 
2
| %% Or as a map
3
| User = #{key => <<"user-key-123abc">>}
```
Here’s how to construct a basic context, with a context kind of something other than “user”:
2.0 syntax, single context with key
```
1
| Context = ldclient_context:new(<<"org-key-123abc">>, <<"organization">>)
---|--- 
2
| %% Or as a map
3
| Context = #{kind => <<"organization">>, key => <<"org-key-123abc">>}
```
Here’s how to construct a multi-context, which includes multiple context kinds:
2.0 syntax, multi-context
```
1
| Context = ldclient_context:new_multi_from([
---|--- 
2
| %% Using `new/1` creates a context with a kind of <<"user">>.
3
| ldclient_context:new(<<"user-key-123abc">>),
4
| %% Using `new/2` creates a context of the specified kind (<<"device">>).
5
| ldclient_context:new(<<"device-key-123abc">>, <<"device">>)]). %% kind = device
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 2.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 2.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. The Erlang SDK does not do any casing or binary conversion for atoms when you define attributes. For example, `first_name` will not match the `firstName` attribute.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
1.x syntax, user with attributes2.0 syntax, context with attributes
```
1
| User = ldclient_user:set(first_name, <<"Sandy">>,
---|--- 
2
| ldclient_user:set(last_name, <<"Smith">>,
3
| ldclient_user:set(email, <<"sandy@example.com">>,
4
| ldclient_user:new(<<"user-key-123abc">>))))
5
| 
6
| %% Or as a map
7
| 
8
| User = #{
9
| key => <<"user-key-123abc">>,
10
| first_name => <<"Sandy">>,
11
| last_name => <<"Smith">>,
12
| email => <<"sandy@example.com">>
13
| },
```
#### Referencing properties of an attribute object
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 2.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
2.0 syntax, context with object attributes
```
1
| Context =
---|--- 
2
| ldclient_context:set(<<"address">>, #{
3
| <<"street">> => <<"123 Main Street">>,
4
| <<"city">> => <<"Springfield">>
5
| },
6
| ldclient_context:new(<<"context-key-456def">>, <<"organization">>)),
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
In the first example, all attributes are marked private for all contexts. Only the context key and kind are sent to LaunchDarkly. In the second example, the “email” and “address” attributes are private for all contexts:
2.0 syntax, all attributes marked private2.0 syntax, two attributes marked private
```
1
| ldclient:start_instance("sdk-key-123abc", #{private_attributes => all}).
---|--- 
```
To learn more, read [`ldclient_context:set_private_attributes/2` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_context.html#set_private_attributes-2) and [`ldclient_config` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_config.html).
Here’s how to mark an attribute as private for a particular context:
2.0 syntax, attribute marked private for one context
```
1
| ContextWithPrivateAttributes = ldclient_context:set_private_attributes([<<"name">>, <<"/address/street">>],
---|--- 
2
| ldclient_context:set(<<"name">>, <<"Global Health Services">>,
3
| ldclient_context:set(<<"email">>, <<"info@globalhealthexample.com">>,
4
| ldclient_context:set(<<"address">>, #{
5
| <<"street">> => <<"123 Main Street">>,
6
| <<"city">> => <<"Springfield">>
7
| },
8
| ldclient_context:new(<<"context-key-456def">>, <<"organization">>))))),
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
For example, for the attribute `"address": { "street": "Main St", "city": "Springfield" }`, you could set just the `/address/street` as private.
The `private_attribute_names` attribute that existed in a user object in version 1.x has been renamed to `private_attribute` in version 2.0. To learn more, read [`ldclient_context` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_context.html).
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 2.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 2.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
2.0 syntax, associating two contexts
```
1
| Context = ldclient_context:new_multi_from([
---|--- 
2
| ldclient_context:new(<<"user-key-123abc">>),
3
| ldclient_context:new(<<"device-key-123abc">>, <<"device">>)]),
4
| ldclient_identify(Context).
```
To learn more, read [`ldclient_context:new_multi_from/1 API docs`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_context.html#new_multi_from-1).
## Understanding changes to configuration options
In the 2.0 version of the SDK, several configuration options have changed:
 * The `private_attributes` configuration option now applies to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/server-side/erlang/migration-1-to-2#understanding-changes-to-private-attributes).
 * The `inline_users_in_events` option has been removed.
 * The `user_keys_capacity` option has been removed. It has been been replaced in this version with `context_keys_capacity`.
To learn more, read [`ldclient_config` API docs](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_config.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs