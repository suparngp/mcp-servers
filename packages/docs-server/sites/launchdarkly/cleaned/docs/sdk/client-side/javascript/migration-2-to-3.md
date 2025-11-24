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
 * [Dependencies for the v3 SDK](#dependencies-for-the-v3-sdk)
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
This topic explains the changes in the JavaScript SDK 3.0 release and how to adapt code that uses a 2.x version of the [JavaScript SDK](/docs/sdk/client-side/javascript) to use version 3.0 or later.
**Version 3.0 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 3.0. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 3.0, update to the latest 2.x version. If you update to the latest 2.x version, deprecation warnings appear in areas of your code that need to be changed for 3.0. You can update them at your own pace while still using 2.x, rather than migrating everything simultaneously. To learn more about updating to the latest 2.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/js-client-sdk).
## Dependencies for the v3 SDK
The JavaScript SDK versions 3.0.0 and 3.1.0 use optional chaining. If you encounter an error related to optional chaining during transpiling, bundling, or running tests, updating to version 3.1.1 should resolve the error.
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
The 3.0 version of this SDK lets you use contexts. When you migrate from version 2.x, you should replace every instance of a user with a context. If there are any instances of user you do not replace, the 3.0 version of the JavaScript SDK will convert each `LDUser` parameter it receives to `LDContext` and call the `LDContext`-specific version of the method.
LaunchDarkly assumes older versions of the SDK use user contexts
A context always has a `kind` attribute. When older versions of the JavaScript SDK send events to LaunchDarkly, LaunchDarkly will convert the users in those events to contexts with a `kind` of `user`.
If a flag configuration specifies any context `kind`s other than `user`, older versions of the JavaScript SDK will not evaluate the flag correctly. You must upgrade your SDK if you are going to use context `kind`s other than `user` in your flag configurations.
The primary differences between working with users and working with contexts include the following:
 * [Create contexts, not users](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-differences-between-users-and-contexts): Where you previously created users, now you must create contexts.
 * [Changes to attributes](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-built-in-and-custom-attributes): There are now fewer built-in attributes. You can still add as many custom attributes as you like, although the format has changed slightly. A flag’s targeting rules can now address fields within a JSON object.
 * [Changes to private attributes](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-private-attributes): You can mark specific attributes of a context as private, either across all contexts of any kind, or within a particular context or context kind.
 * [Changes to anonymous users](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-anonymous-users): Client-side SDKs no longer automatically populate the device ID.
 * [Changes to alias events](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-alias-events): The alias method has been removed.
To learn more about upgrading to contexts, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### Understanding differences between users and contexts
Where you previously created users, now you must create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
2.x syntax, user with key3.0 syntax, context with key
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc'
3
| };
4
| const client = LDClient.initialize('client-side-id-123abc', user);
```
Omitting the kind creates a user object, not a context
If you omit the `kind` attribute when you create a context, then LaunchDarkly will assume the context kind is “user” when evaluating flags. Additionally, the SDK will assume you are working with a user object, rather than a context.
Overall, this should make your upgrade easier, because your existing code will continue to work, as long as you don’t make changes to your flag configuration or [bucket users based on the “secondary” attribute](/docs/sdk/client-side/javascript/migration-2-to-3#removing-the-secondary-attribute).
However, if you are using version 3 of the SDK and you are omitting the `kind` attribute, then the following caveats apply:
 * The fields in your user object must be `LDUser` fields, not `LDContext` fields. For example, to mark an attribute as private, you must use `privateAttributeNames` in the user object, not `_meta.privateAttributes` as you would for a context object. Nested JSON, such as is used in `_meta.privateAttributes`, is not supported by older versions of the SDK. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-private-attributes).
 * Any additional attributes in your user object need to be inside the `custom` property of the `LDUser`, not at the top-level as they would in a context object. To learn more, read [Working with built-in and custom attributes](/docs/sdk/client-side/javascript/migration-2-to-3#working-with-built-in-and-custom-attributes).
We strongly recommend upgrading your SDK to take advantage of the context functionality.
Here’s how to construct a basic context, with a context kind of something other than “user”:
3.0 syntax, single context with key
```
1
| const context = {
---|--- 
2
| kind: 'organization',
3
| key: 'org-key-123abc'
4
| };
5
| const client = LDClient.initialize('client-side-id-123abc', context);
```
Here’s how to construct a multi-context, which includes multiple context kinds:
3.0 syntax, multi-context
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
19
| 
20
| const client = LDClient.initialize('client-side-id-123abc', multiContext)
```
### Understanding changes to built-in and custom attributes
This section describes the changes to built-in and custom attributes in the 3.0 version of the SDK.
#### Working with built-in and custom attributes
In previous SDK versions, the user object included several built-in attributes for describing the user. It also included optional custom attributes, which you could add to a `custom` object within the user object and then populate.
In version 3.0, the only built-in attributes are `kind`, `key`, `name`, and `anonymous`. `Kind`, `key`, and `name` are strings, and `anonymous` is a boolean.
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object. In version 3.0, you do not need to add custom attributes within a `custom` object.
Here’s how to construct a context with additional attributes, as compared with constructing a similar user:
2.x syntax, user with attributes3.0 syntax, context with attributes
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
In previous versions of the SDK, if you set the value of a user’s custom attribute to an object, you could not reference that object in evaluations. In version 3.0, if a context attribute’s value is a JSON object, you can reference properties of that object as the attribute in the targeting rules for a flag or segment.
Here’s how to add object attributes to a context:
3.0 syntax, context with object attributes
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
In version 3.0, the `secondary` attribute has been removed. If you were previously using this attribute as part of distinguishing [percentage rollouts](/docs/home/releases/percentage-rollouts#percentage-rollout-logic), that will no longer work for your users.
### Understanding changes to private attributes
As in previous versions of the SDK, you can mark specific attributes of a context as private. This restricts the context data your application sends to LaunchDarkly, while still using that data for flag targeting.
In version 3.0, there are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want to ensure that the SDK never stores an “email” attribute in LaunchDarkly, no matter whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
In the first example, all attributes are marked private for all contexts. In the second example, the “email” and “address” attributes are private for all contexts:
3.0 syntax, all attributes marked private3.0 syntax, two attributes marked private
```
1
| const options = { allAttributesPrivate: true };
---|--- 
2
| 
3
| const client = ld.initialize('client-side-id-123abc', context, options);
```
To learn more, read [`allAttributesPrivate`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#allAttributesPrivate) and [`privateAttributes`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#privateAttributes).
Here’s how to mark an attribute as private for a particular context:
3.0 syntax, attributes marked private for particular context
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
| },
11
| _meta: {
12
| privateAttributes: ['email', '/address/street']
13
| }
14
| };
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value.
In the example above, for the attribute `/address`, only the `/address/street` as marked as private.
The `privateAttributeNames` attribute that existed in a user object in version 2.x has been renamed to `privateAttributes` in version 3.0. It has moved from the top level of a user object into the `_meta` object within a context. To learn more, read [`privateAttributes`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDContextMeta.html#privateAttributes).
### Understanding changes to anonymous users
In 2.x versions of the SDK, you could omit the user key when building an anonymous user, and the SDK would set the user key to a generated UUID.
Similarly, in the 3.0 version of the SDK, you can omit the context key when building an anonymous context, and the SDK sets the context key to a generated UUID. If you omit the context key and do not mark the context as anonymous, the SDK gives a usage error.
If you are working with a multi-context, you can mark some contexts anonymous and not others. Here’s an example:
3.0 syntax, working with anonymous contexts
```
1
| // This user context is not anonymous
---|--- 
2
| const userContext = {
3
| kind: 'user',
4
| key: 'user-key-123abc'
5
| }
6
| 
7
| // This device context is anonymous
8
| // The key is omitted, and the SDK will automatically generate one
9
| const deviceContext = {
10
| kind: 'device',
11
| deviceId: '12345',
12
| anonymous: true
13
| }
14
| 
15
| // The multi-context contains one anonymous context
16
| // and one non-anonymous context
17
| const multiContext = {
18
| kind: 'multi',
19
| user: userContext,
20
| device: deviceContext
21
| }
```
### Understanding changes to alias events
In previous versions of the SDK, multiple user objects could represent one person. For example, this could happen the first time a person logged in to your application. The person might be represented by an anonymous user before they logged in, and a different user after they logged in. You could associate these two LaunchDarkly users by sending an `alias` event in the SDK.
With the introduction of contexts, the person in this scenario is represented by two different context kinds. For example, before they log in, they might be represented by a device context. After they log in, they might be represented by a multi-context, for example, by one context kind based on their device and simultaneously by another context kind based on their user information.
The 3.0 version of the SDK removes the ability to send an `alias` event. If you currently [alias users](/docs/sdk/features/aliasing-users), you will need to remove this code when you migrate to version 3.0.
If you want to continue associating two contexts with each other, you can use two different context kinds, and then identify a multi-context that includes both individual contexts when you want the association to occur. Unlike the aliasing method, the association doesn’t persist between calls. You must send the contexts you want to associate in each `variation` or `identify` call and each `track` call.
Here’s how:
3.0 syntax, identifying a multi-context
```
1
| const deviceContext = {
---|--- 
2
| kind: 'device',
3
| key: 'device-key-123abc',
4
| type: 'iPad'
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
19
| 
20
| client.identify(multiContext, hash, function() {
21
| console.log("Multi-context's flags available");
22
| });
```
To learn more, read [`identify`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#identify).
## Understanding changes to configuration options
In the 3.0 version of the SDK, several configuration options have changed:
 * The `privateAttributes` and `allAttributesPrivate` configuration options both now apply to all contexts of any context kind. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-private-attributes).
 * `privateAttributeNames` is now called `privateAttributes`. To learn more, read [Understanding changes to private attributes](/docs/sdk/client-side/javascript/migration-2-to-3#understanding-changes-to-private-attributes).
 * The `autoAliasingOptOut` option has been removed.
 * The `inlineUsersInEvents` option has been removed.
To learn more, read [`LDOptions`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html).
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 2.x release have been removed from the 3.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about their recommended replacements.
For a full list of deprecated types and methods, read the [release notes in GitHub](https://github.com/launchdarkly/js-client-sdk/releases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs