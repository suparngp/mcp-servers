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
 * [Configuration for contexts](#configuration-for-contexts)
 * [About built-in and custom attributes](#about-built-in-and-custom-attributes)
 * [About context size](#about-context-size)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [React Web](#react-web)
 * [Roku](#roku)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Apex](#apex)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Lua](#lua)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [Edge SDKs](#edge-sdks)
 * [Akamai](#akamai)
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
 * [AI SDKs](#ai-sdks)
 * [.NET AI](#net-ai)
 * [Go AI](#go-ai)
 * [Node.js (server-side) AI](#nodejs-server-side-ai)
 * [Python AI](#python-ai)
 * [Ruby AI](#ruby-ai)
## Overview
This topic explains how to configure contexts in LaunchDarkly SDKs. This feature is available for all SDKs.
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Feature flags use contexts during evaluation to determine which variation to use, based on your flag targeting rules.
Each context contains attributes that describe what you know about that context. Additionally, each context has a `kind`, so that you can group attributes together conceptually. For example, user contexts often include context attributes like name, email address, location, and so on. However, you can create other context kinds like organization or device. An organization context kind might include attributes like “name” or “address,” and a device context kind might include attributes like “type” or “operating system.” You can also create a context with a kind of “multi” and include several associated contexts together in a multi-context. To learn more, read [Contexts](/docs/home/flags/contexts).
## Configuration for contexts
Every LaunchDarkly SDK lets you configure contexts to return specific data to LaunchDarkly. Any attributes you pass to LaunchDarkly as part of a context become available on the **Contexts** list. The attribute values determine which variation of a feature flag, or which version and prompt from an AI Config, the customer receives.
Here is an image of the **Contexts** list:
![The "Contexts" list.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/406805a241c05c866b636d758bc76e78911ed05b07d0d80e3ad4bb0c097cd320/assets/images/auto/contexts-list.auto.png)
The "Contexts" list.
Every context is required to have a `key`. Keys are always transmitted to LaunchDarkly. Typically, you supply the key when you create the context. For some client-side SDKs, if you mark the context as anonymous then SDK can generate the key for you. To learn more, read [Anonymous contexts and users](/docs/sdk/features/anonymous).
Keys must be a string type. Keys must be unique, deterministic, and should not contain personally identifiable information (PII). Keys must be consistent, which means the same person must correspond to the same key across different services to contribute to consistent flag evaluations. You can use a primary key or a hash, as long as the same person always has the same key. We recommend using a hash if possible.
##### Only the context attributes you provide are available for targeting
The SDK only evaluates flags or customizes AI Configs based on the context you define and then provide in the call. The SDK does not use the attributes shown on the **Contexts** list, and context attributes are not synchronized across SDK instances. You must provide all applicable attributes for each evaluation in the SDK for your targeting rules to apply correctly.
### About built-in and custom attributes
Attributes other than the key are optional. There are two types of attributes: built-in attributes, which are LaunchDarkly names, and custom attributes, which you can name anything you choose.
The only built-in attributes for contexts are `key`, `kind`, `name`, and `anonymous`.
Only the `key` is required. It must be a string.
The value of `kind` can be:
 * the key of an existing context kind that is [already defined](/docs/home/flags/context-kinds-create)
 * the key for a new context kind, which will be automatically created when this context is [evaluated](/docs/sdk/features/evaluating) or [identified](/docs/sdk/features/identify)
 * the string `multi`, if this is a [multi-context](/docs/home/flags/multi-contexts)
 * omitted, in which case, it defaults to `user`
The value of `name` can be any string.
The value of `anonymous` can be `true` or `false`. If not specified, it defaults to `false`.
You can define additional attributes for a context by passing in a name and value for each. These additional attributes let you add targeting rules for your flags based on any data that you want to send to LaunchDarkly. Attribute values can be any JSON type, including boolean, number, string, array, or object. To learn more, read [Context attributes](/docs/home/flags/context-attributes).
##### Custom and built-in attributes cannot share names
If you create an attribute with a name already in use by a built-in attribute, the SDK will behave unpredictably.
The only built-in attributes for contexts are `kind`, `key`, `name`, and `anonymous`. If you work with an older SDK that only supports users, there are several additional built-in attributes.
To learn how to configure private attributes in your SDK, read [Private attributes](/docs/sdk/features/private-attributes).
### About context size
The SDK only evaluates flags or customizes AI Configs based on the context you define and then provide in the call. You must provide all applicable attributes for each evaluation in the SDK for your targeting rules to apply correctly.
The context can include as many attributes as you like. However, we recommend that you take the following considerations into account:
 * SDKs send [events](/docs/sdk/concepts/events) back to LaunchDarkly at flag evaluation. The size of the context affects the size of the event. This may be a concern on mobile devices, where bandwidth can be costly.
 * For JavaScript-based client-side SDKs, if the context is large enough that it cannot be encoded in the URL, you’ll need to enable the [`useReport` option](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#useReport). URLs in some browsers cannot exceed 2k characters in length.
 * As a general rule, if your context object ends up exceeding 1kb, we strongly recommend that you [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new) to discuss your targeting use cases. Most customers do not need this amount of attribute data to target at their desired granularity.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/context-config#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/context-config#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/context-config#edge-sdks)
 * [AI SDKs](/docs/sdk/features/context-config#ai-sdks)
## Client-side SDKs
Here are the configuration options for contexts in client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/context-config#net-client-side)
 * [Android](/docs/sdk/features/context-config#android)
 * [C++ (client-side)](/docs/sdk/features/context-config#c-client-side)
 * [Electron](/docs/sdk/features/context-config#electron)
 * [Flutter](/docs/sdk/features/context-config#flutter)
 * [iOS](/docs/sdk/features/context-config#ios)
 * [JavaScript](/docs/sdk/features/context-config#javascript)
 * [Node.js (client-side)](/docs/sdk/features/context-config#nodejs-client-side)
 * [React Native](/docs/sdk/features/context-config#react-native)
 * [React Web](/docs/sdk/features/context-config#javascript): The React Web SDK relies on the JavaScript SDK for context-related functionality.
 * [Roku](/docs/sdk/features/context-config#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
In the client-side .NET SDK, you can construct a `Context` that only has a key by calling `Context.New`. The context kind defaults to “user,” or you can supply a different context kind. Alternatively, you can use `Context.Builder`, which allows setting all properties.
The argument to `Builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
.NET SDK v3.0+ (C#)
```
1
| Context context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("firstName", "Sandy")
3
| .Set("lastName", "Smith")
4
| .Set("email", "sandy@example.com")
5
| .Set("group", "microsoft")
6
| .Build();
```
Here’s how to construct a context with a context kind of something other than “user”:
.NET SDK v3.0+ (C#)
```
1
| var context = Context.New(ContextKind.Of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
.NET SDK v3.0+ (C#)
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
##### Interpreting custom attribute types
The optional name and kind attributes, which you can set with `.Name()` and `.Kind()`, expect string values. If the kind attribute is not specified, it is assumed to be “user.” Other attribute values can be any JSON type, including booleans, numbers, strings, arrays, or objects. The SDK uses the [`LdValue`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.LdValue.html) type to represent arrays and objects. The client-side .NET SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the .NET (client-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#net-client-side).
To learn how to configure anonymous contexts in the .NET (client-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#net-client-side).
### Android
###### Expand Android code sample
In the Android SDK, use a [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to construct contexts. The argument to `builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Android SDK v4.0+ (Java)Android SDK v4.0+ (Kotlin)
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .set("email", "sandy@example.com")
3
| .set("firstName", "Sandy")
4
| .set("lastName", "Smith")
5
| .set("group", "Microsoft")
6
| .build();
```
Here’s how to construct a context with a context kind of something other than “user”:
Android SDK v4.0+
```
1
| LDContext context1 = LDContext.create(ContextKind.of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Android SDK v4.0+
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
##### Interpreting custom attribute types
The optional name and kind attributes, which you can set with `.name()` and `.kind()`, expect string values. If the kind attribute is not specified, it is assumed to be “user.” Other attribute values can be any JSON type, including boolean, number, string, array, or object. The Android SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Android SDK, read [Private attributes](/docs/sdk/features/private-attributes#android).
To learn how to configure anonymous contexts in the Android SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#android).
`LDUser` removal
Version 4 of the Android SDK replaced users with contexts. Starting in version 5, the deprecated `LDUser` is removed. To learn more about replacing users with contexts, read the [Android SDK 3.x to 4.0 migration guide](/docs/sdk/client-side/android/migration-3-to-4) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### C++ (client-side)
###### Expand C++ (client-side) code sample
In the C++ (client-side) SDK, you can construct a context using the `ContextBuilder`. The arguments to `.Kind()` are the context kind and key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key, an email address, or a hash for the key, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Set("firstName", "Sandy")
4
| .Set("lastName", "Smith")
5
| .Set("groups", {"Google", "Microsoft"})
6
| .Build();
```
Here’s how to construct a context with a context kind of something other than “user”:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
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
C++ SDK v3.0 (native)
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
##### Interpreting custom attribute types
The name and kind attributes, which you can set with `.Name()` and `.Kind()`, expect string values. Other attribute values can be any JSON type, including boolean, number, string, array, or object.
To learn how to configure private attributes in the C++ (client-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#c-client-side).
To learn how to configure anonymous contexts in the C++ (client-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#c-client-side).
### Electron
###### Expand Electron code sample
##### Electron SDK does not support contexts
The Electron SDK does not support contexts. Instead, it supports users. You can think of these as contexts with a context kind of “user.” Other context kinds are not supported.
Here’s an example of a user:
JavaScriptTypeScript
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
The `key` property is the user’s key. The key should uniquely identify each user. You can use a primary key or a hash, as long as the same user always has the same key. We recommend using a hash if possible. In this example, the hash is `"user-key-123abc"`.
##### Personally-identifying user keys
By default, when the SDK requests feature flags from LaunchDarkly, it makes an HTTP GET request with the user properties encoded in the URL. If you do not want user keys or other properties to be in request URLs, enable the `useReport` option in your client configuration. The SDK sends user data in the body of an HTTP REPORT request instead.
##### Interpreting custom attribute types
Most of the built-in attributes, like names and email addresses, expect string values. Custom attribute values can be booleans, numbers, strings, or arrays. If you enter a custom value on the **Users** list that looks like a number or a boolean, the SDK interprets it that way.
To learn how to configure private attributes in the Electron SDK, read [Private attributes](/docs/sdk/features/private-attributes#electron).
To learn how to configure anonymous users in the Electron SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#electron).
### Flutter
###### Expand Flutter code sample
In the Flutter SDK, use a [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to construct contexts. The arguments to `LDContextBuilder` are the context’s kind and key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Flutter SDK v4Flutter SDK v2.x+Flutter SDK v1.x
```
1
| final context = LDContextBuilder()
---|--- 
2
| .kind('user', 'user-key-123abc')
3
| .setString('email', 'sandy@example.com')
4
| .setString('firstName', 'Sandy')
5
| .setString('lastName', 'Smith')
6
| .setString('group', 'microsoft')
7
| .build();
```
Here’s how to construct a context with a context kind of something other than “user”:
Flutter SDK v4Flutter SDK v2.x+
```
1
| final context = LDContextBuilder()
---|--- 
2
| .kind('device', 'device-key-123abc')
3
| .build();
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Flutter SDK v4Flutter SDK v2.x+
```
1
| LDContextBuilder builder = LDContextBuilder();
---|--- 
2
| builder.kind('user', 'user-key-123abc')
3
| .name('Sandy');
4
| builder.kind('organization', 'org-key-123abc')
5
| .name('Global Health Services');
6
| LDContext context = builder.build();
```
##### Interpreting custom attribute types
The required `kind` and optional `name` attributes expect string values. Other attribute values can be any JSON type, including boolean, number, string, array, or object. Attribute values in the Flutter SDK use the `LDValue` class to support the various underlying types for the values. The Flutter SDK is strongly-typed, so be aware of this distinction.
Starting in version 4, the Flutter SDK provides setters so that you do not have to create an `LDValue` yourself. Instead, you can use `setBool`, `setNum`, and `setString` when adding attributes to a context.
To learn how to configure private attributes in the Flutter SDK, read [Private attributes](/docs/sdk/features/private-attributes#flutter).
To learn how to configure anonymous contexts in the Flutter SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#flutter).
### iOS
###### Expand iOS code sample
In the iOS SDK, you can construct a context using `LDContextBuilder`. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| var contextBuilder = LDContextBuilder(key: "user-key-123abc")
---|--- 
2
| contextBuilder.trySetValue("name", .string("Sandy"))
3
| contextBuilder.trySetValue("email", .string("sandy@example.com"))
4
| 
5
| let context = try? contextBuilder.build().get()
```
Here’s how to construct a context with a context kind of something other than “user”:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| var contextBuilder = LDContextBuilder(key: "org-key-123abc")
---|--- 
2
| contextBuilder.kind("organization")
3
| 
4
| let context = try? contextBuilder.build().get()
```
Here’s how to construct a multi-context, which includes multiple context kinds:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| var userBuilder = LDContextBuilder(key: "user-key-123abc")
---|--- 
2
| var deviceBuilder = LDContextBuilder(key: "device-key-123abc")
3
| deviceBuilder.kind("device")
4
| 
5
| var multiBuilder = LDMultiContextBuilder()
6
| multiBuilder.addContext(try userBuilder.build().get())
7
| multiBuilder.addContext(try deviceBuilder.build().get())
8
| 
9
| let context = try multiBuilder.build().get()
```
You can define additional attributes for a context by passing in a name and value for each. Additional attributes can be any JSON type, including boolean, number, string, array, or object.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn more about the specific context properties that are available in this SDK, read [`LDContextBuilder`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDContextBuilder.html).
To learn how to configure private attributes in the iOS SDK, read [Private attributes](/docs/sdk/features/private-attributes#ios).
To learn how to configure anonymous contexts in the iOS SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#ios).
`LDUser` removal
Version 8 of the iOS SDK replaced users with contexts. Starting in version 9, the deprecated `LDUser` is removed. To learn more about replacing users with contexts, read the iOS SDK 7.x to 8.0 migration guides for [Swift](/docs/sdk/client-side/ios/migration-7-to-8-swift) or [Objective-C](/docs/sdk/client-side/ios/migration-7-to-8-objc) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
### JavaScript
###### Expand JavaScript code sample
In the JavaScript SDK, construct a context using key/value pairs for the context attributes. Contexts use the `LDContext` type. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example of a context:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
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
| groups: ['Google', 'Microsoft']
8
| };
```
Here’s how to construct a context with a context kind of something other than “user”:
JavaScript SDK v3.x
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
6
| 
7
| try {
8
| await client.waitForInitialization(5);
9
| proceedWithSuccessfullyInitializedClient();
10
| } catch(err) {
11
| // Client failed to initialized or timed out
12
| // variation() calls return fallback values until initialization completes
13
| }
```
Here’s how to construct a multi-context, which includes multiple context kinds:
JavaScript SDK v3.x
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
21
| 
22
| try {
23
| await client.waitForInitialization(5);
24
| proceedWithSuccessfullyInitializedClient();
25
| } catch(err) {
26
| // Client failed to initialized or timed out
27
| // variation() calls return fallback values until initialization completes
28
| }
```
##### Interpreting custom attribute types
The optional `name` and `kind` attributes expect string values. If the `kind` attribute is not specified, it is assumed to be “user.” Other attributes can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
##### Personally-identifying context keys
We recommend against using personally identifiable information (PII) in context keys. If the `key` attribute you rely on in your context JSON does contain PII, you should enable the `useReport` option by sending the evaluation context as a JSON base64 URL-encoded path parameter. When you enable `useReport`, the SDK fetches flag settings by sending the context JSON in the body of a REPORT request instead, hiding that information from request logs.
To learn how to configure private attributes in the JavaScript SDK, read [Private attributes](/docs/sdk/features/private-attributes#javascript).
To learn how to configure anonymous contexts in the JavaScript SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#javascript).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
In the Node.js (client-side) SDK, construct a context using key/value pairs for the context attributes. Contexts use the `LDContext` type. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example of a context:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
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
| groups: ['Google', 'Microsoft']
8
| };
```
Here’s how to construct a context with a context kind of something other than “user”:
Node.js SDK v3.0 (JavaScript)
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
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Node.js SDK v3.0 (JavaScript)
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
```
The `kind` and `name` attributes expect string values. Other attribute values can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
##### Personally-identifying keys
By default, when the SDK requests feature flags from LaunchDarkly, it makes an HTTP GET request with the user properties encoded in the URL. If you do not want keys or other properties to be in request URLs, enable the `useReport` option in your client configuration. The SDK sends data in the body of an HTTP REPORT request instead.
To learn how to configure private attributes in the Node.js (client-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#nodejs-client-side).
To learn how to configure anonymous contexts in the Node.js (client-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#nodejs-client-side).
### React Native
###### Expand React Native code sample
In the React Native SDK, construct a context using key/value pairs for the context attributes. Contexts use the `LDContext` type.
The first attribute in the object is the `key`. In the React Native SDK, both `key` and `kind` are required. They are the only mandatory attributes. The combination of key and kind must uniquely identify each context. You can use any value for the key, such as a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
React Native SDK v10
```
1
| import { type LDContext } '@launchdarkly/react-native-client-sdk';
---|--- 
2
| 
3
| // key and kind are the only required attributes
4
| 
5
| let context: LDContext = {
6
| key: 'user-key-123abc',
7
| kind: 'user',
8
| firstName: 'Sandy',
9
| lastName: 'Smith',
10
| email: 'sandy@example.com',
11
| address: {
12
| street: '123 Main St',
13
| city: 'Springfield'
14
| }
15
| };
```
Here’s how to construct a context with a context kind of something other than “user”:
React Native SDK v10
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
```
Here’s how to construct a multi-context, which includes multiple context kinds:
React Native SDK v10
```
1
| const deviceContext = {
---|--- 
2
| kind: 'device',
3
| key: 'device-key-123abc'
4
| };
5
| 
6
| const userContext = {
7
| kind: 'user',
8
| key: 'user-key-123abc',
9
| name: 'Sandy',
10
| role: 'doctor'
11
| };
12
| 
13
| const multiContext = {
14
| kind: 'multi',
15
| user: userContext,
16
| device: deviceContext
17
| }
```
If the context is anonymous, you should set the `key` to an empty string. The SDK will automatically set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
Other attributes can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the React Native SDK, read [Private attributes](/docs/sdk/features/private-attributes#react-native).
To learn how to configure anonymous contexts in the React Native SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#react-native).
### React Web
All context-related functionality provided by the [JavaScript SDK](/docs/sdk/features/context-config#javascript) is also available in the React Web SDK.
Unlike the JavaScript SDK, the React Web SDK does not require a context object for initialization. If you do not specify one, the React SDK uses an anonymous context by default.
### Roku
###### Expand Roku code sample
In the Roku SDK, use `LaunchDarklyCreateContext` to construct a context. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Roku SDK v2.0 (BrightScript)Roku SDK v1.x (BrightScript)
```
1
| context = LaunchDarklyCreateContext({"key": "user-key-123abc", "kind": "user"})
---|--- 
```
Here’s how to construct a context with a context kind of something other than “user”:
Roku SDK v2.0 (BrightScript)
```
1
| context = LaunchDarklyCreateContext({"key": "org-key-123abc", "kind": "organization"})
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Roku SDK v2.0 (BrightScript)
```
1
| context = LaunchDarklyCreateContext({
---|--- 
2
| "kind": "multi",
3
| "user": { "key": "user-key-123abc", "name": "Sandy" },
4
| "org": { "key": "org-key-789xyz", "name": "LaunchDarkly" }
5
| })
```
##### Interpreting custom attribute types
The optional `name` and `kind` attributes expect string values. If the `kind` attribute is not specified, it is assumed to be “user.” Other attributes can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Roku SDK, read [Private attributes](/docs/sdk/features/private-attributes#roku).
To learn how to configure anonymous contexts in the Roku SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#roku).
## Server-side SDKs
Here are the configuration options for contexts in server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/context-config#net-server-side)
 * [Apex](/docs/sdk/features/context-config#apex)
 * [C++ (server-side)](/docs/sdk/features/context-config#c-server-side)
 * [Erlang](/docs/sdk/features/context-config#erlang)
 * [Go](/docs/sdk/features/context-config#go)
 * [Haskell](/docs/sdk/features/context-config#haskell)
 * [Java](/docs/sdk/features/context-config#java)
 * [Lua](/docs/sdk/features/context-config#lua)
 * [Node.js (server-side)](/docs/sdk/features/context-config#nodejs-server-side)
 * [PHP](/docs/sdk/features/context-config#php)
 * [Python](/docs/sdk/features/context-config#python)
 * [Ruby](/docs/sdk/features/context-config#ruby)
 * [Rust](/docs/sdk/features/context-config#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
In the server-side .NET SDK, you can construct a [`Context`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Context.html) that only has a key by calling `Context.New`. The context kind defaults to “user,” or you can supply a different context kind. Alternatively, you can use the `Context.Builder` method for building a context with other properties.
The argument to `Builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
.NET SDK v7.0 (C#)
```
1
| LDContext context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("firstName", "Sandy")
3
| .Set("lastName", "Smith")
4
| .Set("email", "sandy@example.com")
5
| .Set("groups", LdValue.ArrayOf(LdValue.Of("Google"), LdValue.Of("Microsoft")))
6
| .Build();
```
Here’s how to construct a context with a context kind of something other than “user”:
.NET SDK v7.0 (C#)
```
1
| var context2 = Context.New(ContextKind.Of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
.NET SDK v7.0 (C#)
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
##### Interpreting custom attribute types
The optional name and kind attributes, which you can set with `.Name()` and `.Kind()`, expect string values. If the kind attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects. The SDK uses the [`LdValue`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.LdValue.html) type to represent arrays and objects. The .NET SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the .NET (server-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#net-server-side).
To learn how to configure anonymous contexts in the .NET (server-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#net-server-side).
### Apex
###### Expand Apex code sample
##### Apex SDK does not support contexts
The Apex SDK does not support contexts. Instead, it supports users. You can think of these as contexts with a context kind of “user.” Other context kinds are not supported.
Here’s an example of a user:
Java
```
1
| LDUser user = new LDUser.Builder('user-key-123abc')
---|--- 
2
| .setFirstName('Sandy')
3
| .setLastName('Smith')
4
| .setEmail('sandy@example.com')
5
| .setCustom(new LDValueObject.Builder()
6
| .set('groups', new LDValueArray.Builder()
7
| .add(LDValue.of('Google'))
8
| .add(LDValue.of('Microsoft'))
9
| .build()
10
| )
11
| .build()
12
| )
13
| .build();
```
The argument to `Builder` is the user’s key. The key should uniquely identify each user. You can use a primary key or a hash, as long as the same user always has the same key. We recommend using a hash if possible. In this example, the hash is `"user-key-123abc"`.
To learn how to configure private attributes in the Apex SDK, read [Private attributes](/docs/sdk/features/private-attributes#apex).
To learn how to configure anonymous users in the Apex SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#apex).
### C++ (server-side)
###### Expand C++ (server-side) code sample
In the C++ (server-side) SDK, you can construct a context using the `ContextBuilder`. The arguments to `.Kind()` are the context kind and key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash for the key, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Set("firstName", "Sandy")
4
| .Set("lastName", "Smith")
5
| .Set("groups", {"Google", "Microsoft"})
6
| .Build();
```
Here’s how to construct a context with context kind of something other than “user”:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
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
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
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
If you are working in C, when you are done with the context ensure that you free the structure:
C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| LDContext_Free(context);
---|--- 
```
To learn how to configure private attributes in the C++ (server-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#c-server-side).
To learn how to configure anonymous contexts in the C++ (server-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#c-server-side).
### Erlang
###### Expand Erlang code sample
In the Erlang SDK, use `ldclient_context:set` and `ldclient_context:new` to define and construct a context.
The `key` property is the context’s key. The key is the only mandatory context attribute. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
You can set the kind, or, if you do not set it, LaunchDarkly assumes that the context kind is “user.”
Here’s an example of a context:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| Context = ldclient_context:set(<<"name">>, <<"Sandy Smith">>,
---|--- 
2
| ldclient_context:set(<<"email">>, <<"sandy@example.com">>,
3
| ldclient_context:set(<<"group">>, [<<"microsoft">>, <<"google">>],
4
| ldclient_context:new(<<"user-key-abc123">>, <<"user">>)))),
```
Here’s how to construct a context with a context kind of something other than “user”:
Erlang SDK v2.0+
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
Erlang SDK v2.0+
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
To learn how to configure private attributes in the Erlang SDK, read [Private attributes](/docs/sdk/features/private-attributes#erlang).
To learn how to configure anonymous contexts in the Erlang SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#erlang).
### Go
###### Expand Go code sample
In the Go SDK, you have two options for how you want to manage contexts:
 * Create a context and pass it in when you initialize an [`LDScopedClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient). This is a wrapper around `LDClient` that lets you specify the [evaluation context](/docs/home/flags/contexts#about-contexts) to use for all operations. The scoped client’s context is a [multi-context](/docs/home/flags/multi-contexts), and you can update the multi-context with additional associated contexts at any time.
 * Create a context and pass it in to each method call, such as when you [evaluate a flag](/docs/sdk/features/evaluating). To use this option, create a single, shared instance of [`LDClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient).
##### LDScopedClient is in beta
`LDScopedClient` is in beta. It is still undergoing testing and active development. Its functionality may change without notice, including becoming backwards incompatible.
The Go SDK defines a `Context` struct and a `Builder`. The context `key` is the only mandatory context attribute. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Go SDK v6+
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| "github.com/launchdarkly/go-sdk-common/v3/ldvalue"
4
| )
5
| 
6
| // Context with only a key
7
| // by default, the context kind is "user"
8
| context1 := ldcontext.New("context-key-123abc")
9
| 
10
| // Context with a key plus other attributes
11
| context2 := ldcontext.NewBuilder("context-key-456def").
12
| Kind("organization").
13
| Name("Global Health Services").
14
| SetString("email", "info@globalhealthexample.com").
15
| SetValue("address", ldvalue.ObjectBuild().
16
| SetString("street", "123 Main Street").
17
| SetString("city", "Springfield")).
18
| SetValue("groups", ldvalue.ArrayOf(
19
| ldvalue.String("Google"), ldvalue.String("Microsoft"))).
20
| Build()
```
Here’s how to construct a context with a context kind of something other than “user”:
Go SDK v6+
```
1
| context1 := ldcontext.NewWithKind("organization", "org-key-123abc")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Go SDK v6+
```
1
| multiContext := ldcontext.NewMulti(
---|--- 
2
| ldcontext.New("user-key-123abc"),
3
| ldcontext.NewWithKind("device", "device-key-123abc")
4
| )
```
You can also use the context builder to create each of the individual contexts:
Go SDK v6+
```
1
| multiContext := ldcontext.NewMulti(
---|--- 
2
| ldcontext.NewBuilder("user-key-123abc").Name("Sandy").Build(),
3
| ldcontext.NewBuilder("device-key-123abc").Kind("device").Name("iPad").Build(),
4
| )
```
Each individual context within a multi-context can have the same attributes. The only restriction is that each context has to have a different context `kind` from the others within the multi-context.
If you’re working with `LDScopedClient`, you don’t need to manually create the multi-context. Instead, you can add new contexts to the scoped client’s multi-context as they become available, or update existing contexts:
Go SDK v7.13.4+, add contexts to scoped clientGo SDK v7.13.4+, update contexts in scoped client
```
1
| userContext := ldcontext.New("user-key-123abc")
---|--- 
2
| 
3
| scopedClient := ld.NewScopedClient(client, userContext)
4
| scopedClient.CurrentContext() // returns the single "user" context
5
| 
6
| scopedClient.AddContext(ldcontext.NewWithKind("device", "device-key-123abc"))
7
| scopedClient.CurrentContext() // returns a multi-context with "user" and "device" contexts
8
| 
9
| scopedClient.BoolVariation("example-flag-key", false) // evaluates the flag using a multi-context with "user" and "device" contexts
```
After you create a scoped client, we recommend adding it your Go context. Another advantage of using `LDScopedClient` is that you can pass the scoped client to any logic that already takes a Go context (`context.Context`), using utility methods provided in the SDK. This means the scoped client is implicitly passed around through all of your code that uses `context.Context`, and you can access the scoped client anywhere in your application logic. To learn more, read [Use Go contexts with LDScopedClient](/docs/sdk/server-side/go#use-go-contexts-with-ldscopedclient).
To learn more about the available LaunchDarkly context attributes, read [`Context`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3@v3.0.0/ldcontext#Context) and [`Builder`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3@v3.0.0/ldcontext#Builder).
##### Interpreting attribute types
The kind and name attributes expect string values. You can set the kind, or, if you do not set it, LaunchDarkly assumes that the context kind is “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects. These types are all represented by the [`ldvalue.Value`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3@v3.0.0/ldvalue#Value) type. The Go SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Go SDK, read [Private attributes](/docs/sdk/features/private-attributes#go).
To learn how to configure anonymous contexts in the Go SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#go).
### Haskell
###### Expand Haskell code sample
In the Haskell SDK, use `makeContext` to create a new context. The argument to `makeContext` is the context’s key. The key is the only mandatory attribute. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example of a context:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| {-# LANGUAGE OverloadedStrings #-}
---|--- 
2
| 
3
| import LaunchDarkly.Server.Context
4
| 
5
| import Data.Function ((&))
6
| 
7
| -- Context with key and kind
8
| context1 :: Context
9
| context1 = makeContext "context-key-123abc" "user"
10
| 
11
| -- Context with a key plus other attributes
12
| context2 :: Context
13
| context2 = makeContext "context-key-456def" "organization"
14
| & withAttribute "name" "Global Health Services"
15
| & withAttribute "email" "info@globalhealthexample.com"
16
| & withAttribute "address" $ Object $ fromList [("street", "123 Main St"), ("city", "Springfield")]
```
Here’s how to construct a context with a context kind of something other than “user”:
Haskell SDK v4.0
```
1
| makeContext "context-key-123abc" "organization"
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Haskell SDK v4.0
```
1
| makeMultiContext [ makeContext "user-key-123abc" "user"
---|--- 
2
| , makeContext "device-key-123abc" "device"
3
| ]
```
To learn how to configure private attributes in the Haskell SDK, read [Private attributes](/docs/sdk/features/private-attributes#haskell).
To learn how to configure anonymous contexts in the Haskell SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#haskell).
### Java
###### Expand Java code sample
In the Java SDK, use a [builder pattern](http://en.wikipedia.org/wiki/Builder_pattern) to construct contexts. The argument to `Builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Java SDK v6.0
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .set("firstName", "Sandy")
3
| .set("lastName", "Smith")
4
| .set("email", "sandy@example.com")
5
| .set("groups",
6
| LDValue.buildArray().add("Google").add("Microsoft").build())
7
| .build();
```
Here’s how to construct a context with a context kind of something other than “user”:
Java SDK v6.0
```
1
| LDContext context1 = LDContext.create(ContextKind.of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Java SDK v6.0
```
1
| LDContext multiContext = LDContext.createMulti(
---|--- 
2
| LDContext.create("user-key-123abc"),
3
| LDContext.create(ContextKind.of("device"), "device-key-123abc")
4
| );
```
The documentation for [`ContextBuilder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/ContextBuilder.html) shows you all the attributes that LaunchDarkly supports by default.
##### Interpreting custom attribute types
The optional name and kind attributes expect string values. If the “kind” attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or objects. If you pass a value that looks like a number or a boolean, the SDK interprets it that way. The Java SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Java SDK, read [Private attributes](/docs/sdk/features/private-attributes#java).
To learn how to configure anonymous contexts in the Java SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#java).
### Lua
###### Expand Lua code sample
In the Lua SDK, use `makeContext` to construct a context of any kind. This requires a context `key`. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible. The context attributes are defined as part of the context `kind`.
To construct a user context specifically, you can use `makeUser`. Both `makeUser` and `makeContext` require a context key. You can omit the `kind` option if you construct your context with `makeUser`. This method is a convenience to make upgrading from the Lua SDK version 1.x to version 2.0 easier. It is deprecated and may be removed in future versions.
Here’s an example of a context:
Lua SDK v2Lua SDK v1.x
```
1
| -- using makeContext
---|--- 
2
| local user1 = ld.makeContext({
3
| user = {
4
| key = "user1-key-123abc",
5
| attributes = {
6
| firstName = "Sandy",
7
| lastName = "Smith",
8
| email = "sandy@example.com",
9
| groups = { "Google", "Microsoft" }
10
| }
11
| }
12
| })
13
| 
14
| -- using makeUser, which is deprecated,
15
| -- to create an identical context (with unique key)
16
| local user2 = ld.makeUser({
17
| key = "user2-key-123abc",
18
| firstName = "Sandy",
19
| lastName = "Smith",
20
| email = "sandy@example.com",
21
| custom = {
22
| groups = { "Google", "Microsoft" }
23
| }
24
| })
25
| 
26
| -- using makeContext to create a different kind of context
27
| local orgContext = ld.makeContext({
28
| organization = {
29
| key = "org-key-123abc",
30
| name = "Global Health Services"
31
| }
32
| })
```
Here’s how to construct a context with a context kind of something other than “user”:
Lua SDK v2
```
1
| -- using makeContext to create a different kind of context
---|--- 
2
| local orgContext = ld.makeContext({
3
| organization = {
4
| key = "org-key-123abc",
5
| name = "Global Health Services"
6
| }
7
| })
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Lua SDK v2
```
1
| -- using makeContext to create a multi-context
---|--- 
2
| local context = ld.makeContext({
3
| user = {
4
| key = "user-key-123abc"
5
| },
6
| org = {
7
| key = "org-key-123abc"
8
| }
9
| })
```
To learn more, read [`makeUser`](https://launchdarkly.github.io/lua-server-sdk/index.html#makeUser) and [`makeContext`](https://launchdarkly.github.io/lua-server-sdk/index.html#makeContext).
To learn how to configure private attributes in the Lua SDK, read [Private attributes](/docs/sdk/features/private-attributes#lua).
To learn how to configure anonymous contexts in the Lua SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#lua).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In the Node.js (server-side) SDK, contexts are JSON objects. The `key` property is the context key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x and later (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| 
3
| const context: ld.LDContext = {
4
| kind: 'user',
5
| key: 'user-key-123abc',
6
| firstName: 'Sandy',
7
| lastName: 'Smith',
8
| email: 'sandy@example.com',
9
| groups: ['Google', 'Microsoft'],
10
| };
```
Here’s how to construct a context with a context kind of something other than “user”:
Node.js SDK v7.x and later (JavaScript)Node.js SDK v7.x and later (TypeScript)
```
1
| const context = {
---|--- 
2
| kind: 'device',
3
| key: 'device-key-123abc'
4
| }
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Node.js SDK v7.x and later (JavaScript)Node.js SDK v7.x and later (TypeScript)
```
1
| const context = {
---|--- 
2
| kind: 'multi',
3
| user: { key: 'user-key-123abc' },
4
| device: { key: 'device-key-123abc' }
5
| }
```
##### Interpreting custom attribute types
The optional `name` and `kind` attributes expect string values. If the `kind` attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Node.js (server-side) SDK, read [Private attributes](/docs/sdk/features/private-attributes#nodejs-server-side).
To learn how to configure anonymous contexts in the Node.js (server-side) SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#nodejs-server-side).
### PHP
###### Expand PHP code sample
In the PHP SDK, use a [builder pattern](http://en.wikipedia.org/wiki/Builder_pattern) to construct contexts. The first argument to [`LDContextBuilder`](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDContextBuilder.html) is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
PHP SDK v5.0
```
1
| $context = LDContext::builder("context-key-123abc")
---|--- 
2
| ->set("firstName", "Sandy")
3
| ->set("lastName", "Smith")
4
| ->set("email", "sandy@example.com")
5
| ->set("groups", ["Google", "Microsoft"])
6
| ->build();
```
Here’s how to construct a context with a context kind of something other than “user”:
PHP SDK v5.0
```
1
| $context = LDContext::create("context-key-123abc", "organization");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
PHP SDK v5.0
```
1
| $deviceContext = LDContext::create("device-key-123abc", "device");
---|--- 
2
| $orgContext = LDContext::create("org-key-123abc", "org");
3
| $multiContext = LDContext::createMulti($deviceContext, $orgContext);
```
##### Interpreting custom attribute types
The kind and name attributes expect string values. Other attribute values can be booleans, numbers, strings, or arrays. If you enter a custom value on the **Contexts** list that looks like a number or a boolean, the SDK interprets it that way. The PHP SDK is strongly-typed, so be aware of this distinction.
To learn how to configure private attributes in the PHP SDK, read [Private attributes](/docs/sdk/features/private-attributes#php).
To learn how to configure anonymous contexts in the PHP SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#php).
### Python
###### Expand Python code sample
In version 8.0 and higher of the Python SDK, the [`Context`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.Context) class has a `create` method for creating a context with a context kind of “user” and with only a key. It has a `builder` method for building a context with other properties.
The argument to `Context.builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Python SDK v8.0
```
1
| context = Context.builder("context-key-123abc") \
---|--- 
2
| .set("firstName", "Sandy") \
3
| .set("lastName", "Smith") \
4
| .set("email", "sandy@example.com") \
5
| .set("groups", ["Google", "Microsoft"]) \
6
| .build()
```
Here’s how to construct a context with a context kind of something other than “user”:
Python SDK v8.0
```
1
| context1 = Context.create("org-key-123abc", "organization")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Python SDK v8.0
```
1
| multi_context = Context.create_multi(
---|--- 
2
| Context.create("user-key-123abc"),
3
| Context.create("device-key-123abc", "device")
4
| )
```
If you have many attributes to set, you can also create a context from a dictionary:
Python SDK v8.0+
```
1
| pre_existing_dict = {
---|--- 
2
| 'key': 'context-key-123abc',
3
| 'kind': 'user',
4
| 'firstName': 'Sandy',
5
| 'lastName': 'Smith',
6
| 'email': 'sandy@example.com',
7
| 'groups': ['Google', 'Microsoft'],
8
| }
9
| 
10
| context = Context.from_dict(pre_existing_dict)
```
##### Interpreting custom attribute types
The optional name and kind attributes expect string values. If the “kind” attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn more, read [`from_dict`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.Context.from_dict).
To learn how to configure private attributes in the Python SDK, read [Private attributes](/docs/sdk/features/private-attributes#python).
To learn how to configure anonymous contexts in the Python SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#python).
### Ruby
###### Expand Ruby code sample
In the Ruby SDK, contexts are instances of `LaunchDarkly::LDContext`. Legacy users can continue to be provided as simple hashes.
The `key` property is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key, an email address, or a hash string, as long as the same context always has the same key. We recommend using a hash string if possible.
Here’s an example:
Ruby SDK v7.0
```
1
| context = LaunchDarkly::LDContext.create({
---|--- 
2
| key: "user-key-123abc",
3
| kind: "user",
4
| firstName: "Sandy",
5
| lastName: "Smith",
6
| email: "sandy@example.com",
7
| groups: ["Google", "Microsoft"]
8
| })
```
Here’s how to construct a context with a context kind of something other than “user”:
Ruby SDK v7.0
```
1
| context = LaunchDarkly::LDContext.with_key("context-key-123abc", "organization")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Ruby SDK v7.0
```
1
| multi_context = LaunchDarkly::LDContext.create_multi([
---|--- 
2
| LaunchDarkly::LDContext.with_key("user-key-123abc"),
3
| LaunchDarkly::LDContext.with_key("device-key-123abc", "device"),
4
| ])
```
##### Context attribute keys must be symbols
All context attribute keys, for both built-in and custom attributes, must be symbols and not strings.
##### Interpreting custom attribute types
The optional name and kind attributes expect string values. If the “kind” attribute is not specified, it is assumed to be “user” and the hash is assumed to be in the legacy user format. Other attribute values can be booleans, numbers, strings, arrays, or objects. If you enter a custom value on the **Contexts** list that looks like a number or a boolean, the SDK interprets it that way.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Ruby SDK, read [Private attributes](/docs/sdk/features/private-attributes#ruby).
To learn how to configure anonymous contexts in the Ruby SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#ruby).
### Rust
###### Expand Rust code sample
The Rust SDK defines a [`Context`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Context.html) struct and a [`ContextBuilder`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.ContextBuilder.html).
The context `key` is the only mandatory context attribute. You can set the kind, or, if you do not set it, LaunchDarkly assumes that the context kind is “user.” The combination of key and kind must uniquely identify each context. For the key, you can use a primary key, a hash string, or some other value, as long as the same context always has the same key. We recommend using a hash string if possible.
Here’s an example:
Rust SDK v1
```
1
| // Context with only a key
---|--- 
2
| let context = ContextBuilder::new("context-key-123abc").build()?;
3
| 
4
| // Context with a key plus other attributes
5
| let custom = hashmap! {
6
| "groups".into() => vec!["Google", "Microsoft"].into(),
7
| };
8
| let context = ContextBuilder::new("context-key-123abc")
9
| .set_value("first_name", "Sandy".into())
10
| .set_value("last_name", "Smith".into())
11
| .set_value("email", "sandy@example.com".into())
12
| .set_value("Google", "groups".into())
13
| .set_value("Microsoft", "groups".into())
14
| .build();
```
Here’s how to construct a context with a context kind of something other than “user”:
Rust SDK v1
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
Rust SDK v1
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
To learn more about the available attributes, read [`Context`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Context.html) and [`ContextBuilder`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.ContextBuilder.html).
##### Interpreting custom attribute types
The optional name and kind attributes, which you can set with `.name()` and `.kind()`, expect string values. Other attribute values can be any JSON type, including booleans, numbers, strings, arrays, or objects. These types are all represented by the [`AttributeValue`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/enum.AttributeValue.html) type. The Rust SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
To learn how to configure private attributes in the Rust SDK, read [Private attributes](/docs/sdk/features/private-attributes#rust).
To learn how to configure anonymous contexts in the Rust SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#rust).
## Edge SDKs
Here are the configuration options for contexts in edge SDKs.
 * [Akamai](/docs/sdk/features/context-config#akamai)
 * [Cloudflare](/docs/sdk/features/context-config#cloudflare)
 * [Fastly](/docs/sdk/features/context-config#fastly)
 * [Vercel](/docs/sdk/features/context-config#vercel)
### Akamai
###### Expand Akamai code sample
To configure contexts, the Akamai SDK uses the same code as the [Node.js server-side SDK](/docs/sdk/features/context-config#nodejs-server-side).
The Akamai SDK does not support sending events, so [private attributes](/docs/sdk/features/private-attributes) are not supported.
### Cloudflare
###### Expand Cloudflare code sample
To configure contexts, the Cloudflare SDK uses the same code as the [Node.js server-side SDK](/docs/sdk/features/context-config#nodejs-server-side).
### Fastly
###### Expand Fastly code sample
To configure contexts, the Fastly SDK uses the same code as the [Node.js server-side SDK](/docs/sdk/features/context-config#nodejs-server-side).
### Vercel
###### Expand Vercel code sample
To configure contexts, the Vercel SDK uses the same code as the [Node.js server-side SDK](/docs/sdk/features/context-config#nodejs-server-side).
## AI SDKs
Here are the configuration options for contexts in AI SDKs:
 * [.NET AI](/docs/sdk/features/context-config#net-ai)
 * [Go AI](/docs/sdk/features/context-config#go-ai)
 * [Node.js (server-side) AI](/docs/sdk/features/context-config#nodejs-server-side-ai)
 * [Python AI](/docs/sdk/features/context-config#python-ai)
 * [Ruby AI](/docs/sdk/features/context-config#ruby-ai)
### .NET AI
###### Expand .NET AI SDK code sample
In the .NET AI SDK, you can construct a `Context` that only has a key by calling `Context.New`. The context kind defaults to “user,” or you can supply a different context kind. Alternatively, you can use the `Context.Builder` method for building a context with other properties.
The argument to `Builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
.NET AI SDK
```
1
| LDContext context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("firstName", "Sandy")
3
| .Set("lastName", "Smith")
4
| .Set("email", "sandy@example.com")
5
| .Set("groups", LdValue.ArrayOf(LdValue.Of("Google"), LdValue.Of("Microsoft")))
6
| .Build();
```
Here’s how to construct a context with a context kind of something other than “user”:
.NET AI SDK
```
1
| var context2 = Context.New(ContextKind.Of("organization"), "org-key-123abc");
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
.NET AI SDK
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
##### Interpreting custom attribute types
The optional name and kind attributes, which you can set with `.Name()` and `.Kind()`, expect string values. If the kind attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects. The SDK uses the [`LdValue`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.LdValue.html) type to represent arrays and objects. The .NET SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your AI Config targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting rules. You can use `.` as a delimiter in your AI Config message. Continuing the same example, you could use `{{ldctx.address.city}}` in your message, and the value of the “city” field will be substituted when you customize the AI Config. To learn more, read [Target with flags](/docs/home/flags/target) and [Customizing AI Configs](/docs/sdk/features/ai-config#net-ai).
To learn how to configure private attributes in the .NET AI SDK, read [Private attributes](/docs/sdk/features/private-attributes#net-ai).
To learn how to configure anonymous contexts in the .NET AI SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#net-ai).
### Go AI
###### Expand Go AI SDK code sample
The Go AI SDK defines a `Context` struct and a `Builder`. The context `key` is the only mandatory context attribute. The combination of `key` and `kind` must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Go AI SDK
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| "github.com/launchdarkly/go-sdk-common/v3/ldvalue"
4
| )
5
| 
6
| // Context with only a key
7
| // by default, the context kind is "user"
8
| context1 := ldcontext.New("context-key-123abc")
9
| 
10
| // Context with a key plus other attributes
11
| context2 := ldcontext.NewBuilder("context-key-456def").
12
| Kind("organization").
13
| Name("Global Health Services").
14
| SetString("email", "info@globalhealthexample.com").
15
| SetValue("address", ldvalue.ObjectBuild().
16
| SetString("street", "123 Main Street").
17
| SetString("city", "Springfield")).
18
| SetValue("groups", ldvalue.ArrayOf(
19
| ldvalue.String("Google"), ldvalue.String("Microsoft"))).
20
| Build()
```
Here’s how to construct a context with a context kind of something other than “user”:
Go AI SDK
```
1
| context1 := ldcontext.NewWithKind("organization", "org-key-123abc")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Go AI SDK
```
1
| multiContext := ldcontext.NewMulti(
---|--- 
2
| ldcontext.New("user-key-123abc"),
3
| ldcontext.NewWithKind("device", "device-key-123abc")
4
| )
```
Each individual context within a multi-context can have the same attributes. The only restriction is that each context has to have a different context `kind` from the others within the multi-context.
You can also use the context builder to create each of the individual contexts:
Go AI SDK
```
1
| multiContext := ldcontext.NewMulti(
---|--- 
2
| ldcontext.NewBuilder("user-key-123abc").Name("Sandy").Build(),
3
| ldcontext.NewBuilder("device-key-123abc").Kind("device").Name("iPad").Build(),
4
| )
```
##### Interpreting custom attribute types
The kind and name attributes expect string values. You can set the kind, or, if you do not set it, LaunchDarkly assumes that the context kind is “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects. These types are all represented by the [`ldvalue.Value`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3@v3.0.0/ldvalue#Value) type. The Go SDK is strongly-typed, so be aware of this distinction.
If an attribute is a JSON object, then in your AI Config targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting rules. You can use `.` as a delimiter in your AI Config message. Continuing the same example, you could use `{{ldctx.address.city}}` in your message, and the value of the “city” field will be substituted when you customize the AI Config. To learn more, read [Target with flags](/docs/home/flags/target) and [Customizing AI Configs](/docs/sdk/features/ai-config#go-ai).
To learn how to configure private attributes in the Go AI SDK, read [Private attributes](/docs/sdk/features/private-attributes#go-ai).
To learn how to configure anonymous contexts in the Go AI SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#go-ai).
### Node.js (server-side) AI
###### Expand Node.js (server-side) AI SDK code sample
In the Node.js (server-side) AI SDK, contexts are JSON objects. The `key` property is the context key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Node.js (server-side) AI SDK (TypeScript)Node.js (server-side) AI SDK (JavaScript)
```
1
| const context: LDContext = {
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
| groups: ['Google', 'Microsoft'],
8
| };
```
Here’s how to construct a context with a context kind of something other than “user”:
Node.js (server-side) AI SDK (TypeScript)
```
1
| const context: LDContext = {
---|--- 
2
| kind: 'device',
3
| key: 'device-key-123abc'
4
| }
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Node.js (server-side) AI SDK (TypeScript)
```
1
| const context: LDContext = {
---|--- 
2
| kind: 'multi',
3
| user: { key: 'user-key-123abc' },
4
| device: { key: 'device-key-123abc' }
5
| }
```
##### Interpreting custom attribute types
The optional `name` and `kind` attributes expect string values. If the `kind` attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or JSON objects.
If an attribute is a JSON object, then in your AI Config targeting, you can use `/` as a delimiter to refer to specific fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting rules. You can use `.` as a delimiter in your AI Config message. Continuing the same example, you could use `{{ldctx.address.city}}` in your message, and the value of the “city” field will be substituted when you customize the AI Config. To learn more, read [Target with AI Configs](/docs/home/ai-configs/target) and [Customizing AI Configs](/docs/sdk/features/ai-config#nodejs-server-side-ai).
To learn how to configure private attributes in the Node.js (server-side) AI SDK, read [Private attributes](/docs/sdk/features/private-attributes#nodejs-server-side-ai).
To learn how to configure anonymous contexts in the Node.js (server-side) AI SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#nodejs-server-side-ai).
### Python AI
###### Expand Python AI SDK code sample
In the Python AI SDK, the `Context` class has a `create` method for creating a context with a context kind of “user” and with only a key. It has a `builder` method for building a context with other properties.
The argument to `Context.builder` is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
Here’s an example:
Python AI SDK
```
1
| context = Context.builder("context-key-123abc") \
---|--- 
2
| .set("firstName", "Sandy") \
3
| .set("lastName", "Smith") \
4
| .set("email", "sandy@example.com") \
5
| .set("groups", ["Google", "Microsoft"]) \
6
| .build()
```
Here’s how to construct a context with a context kind of something other than “user”:
Python AI SDK
```
1
| context1 = Context.create("org-key-123abc", "organization")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Python AI SDK
```
1
| multi_context = Context.create_multi(
---|--- 
2
| Context.create("user-key-123abc"),
3
| Context.create("device-key-123abc", "device")
4
| )
```
If you have many attributes to set, you can also create a context from a dictionary:
Python AI SDK
```
1
| pre_existing_dict = {
---|--- 
2
| 'key': 'context-key-123abc',
3
| 'kind': 'user',
4
| 'firstName': 'Sandy',
5
| 'lastName': 'Smith',
6
| 'email': 'sandy@example.com',
7
| 'groups': ['Google', 'Microsoft'],
8
| }
9
| 
10
| context = Context.from_dict(pre_existing_dict)
```
##### Interpreting custom attribute types
The optional name and kind attributes expect string values. If the “kind” attribute is not specified, it is assumed to be “user.” Other attribute values can be booleans, numbers, strings, arrays, or objects.
If an attribute is a JSON object, then in your AI Config targeting, you can use `/` as a delimiter to refer to specific fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting rules. You can use `.` as a delimiter in your AI Config message. Continuing the same example, you could use `{{LDCTX.address.city}}` in your message, and the value of the “city” field will be substituted when you customize the AI Config. To learn more, read [Target with AI Configs](/docs/home/ai-configs/target) and [Customizing AI Configs](/docs/sdk/features/ai-config#python-ai).
To learn how to configure private attributes in the Python AI SDK, read [Private attributes](/docs/sdk/features/private-attributes#python-ai).
To learn how to configure anonymous contexts in the Python AI SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#python-ai).
### Ruby AI
###### Expand Ruby AI SDK code sample
In the Ruby AI SDK, contexts are instances of `LaunchDarkly::LDContext`.
The `key` property is the context’s key. The combination of key and kind must uniquely identify each context. For the key, you can use a primary key, an email address, or a hash string, as long as the same context always has the same key. We recommend using a hash string if possible.
Here’s an example:
Ruby AI SDK
```
1
| context = LaunchDarkly::LDContext.create({
---|--- 
2
| key: "user-key-123abc",
3
| kind: "user",
4
| firstName: "Sandy",
5
| lastName: "Smith",
6
| email: "sandy@example.com",
7
| groups: ["Google", "Microsoft"]
8
| })
```
Here’s how to construct a context with a context kind of something other than “user”:
Ruby AI SDK
```
1
| context = LaunchDarkly::LDContext.with_key("context-key-123abc", "organization")
---|--- 
```
Here’s how to construct a multi-context, which includes multiple context kinds:
Ruby AI SDK
```
1
| multi_context = LaunchDarkly::LDContext.create_multi([
---|--- 
2
| LaunchDarkly::LDContext.with_key("user-key-123abc"),
3
| LaunchDarkly::LDContext.with_key("device-key-123abc", "device"),
4
| ])
```
##### Interpreting custom attribute types
The optional name and kind attributes expect string values. If the “kind” attribute is not specified, it is assumed to be “user” and the hash is assumed to be in the legacy user format. Other attribute values can be booleans, numbers, strings, arrays, or objects.
If an attribute is a JSON object, then in your flag or segment targeting, you can use `/` as a delimiter to refer to specific object fields. For example, if you have an “address” attribute that includes several fields, then you could use `/address/city` in your targeting. To learn more, read [Target with flags](/docs/home/flags/target).
You can use `.` as a delimiter in your AI Config message. Continuing the same example, you could use `{{LDCTX.address.city}}` in your message, and the value of the “city” field will be substituted when you customize the AI Config. To learn more, read [Target with AI Configs](/docs/home/ai-configs/target) and [Customizing AI Configs](/docs/sdk/features/ai-config#ruby-ai).
To learn how to configure private attributes in the Ruby AI SDK, read [Private attributes](/docs/sdk/features/private-attributes#ruby-ai).
To learn how to configure anonymous contexts in the Ruby AI SDK, read [Anonymous contexts and users](/docs/sdk/features/anonymous#ruby-ai).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs