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
 * [Using a shared key between anonymous contexts in React Native for Android](#using-a-shared-key-between-anonymous-contexts-in-react-native-for-android)
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
This topic explains how to configure contexts as anonymous in LaunchDarkly SDKs. These features are available for all SDKs.
Each SDK lets you designate anonymous contexts. Anonymous contexts don’t appear on your **Contexts** list, so you can’t search for them, and you can’t search for or autocomplete by their keys. If you use multi-contexts, you can choose to make only some contexts anonymous. To learn more, read [Multi-contexts](/docs/home/flags/multi-contexts).
In some client-side SDKs, if you don’t provide a key or set it to null, and set `anonymous` to `true`, then the SDK generates a random key for you. If you generate keys for anonymous contexts, session IDs or UUIDs work best.
To learn more, read [Anonymous contexts](/docs/home/flags/anonymous-contexts).
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/anonymous#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/anonymous#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/anonymous#edge-sdks)
 * [AI SDKs](/docs/sdk/features/anonymous#ai-sdks)
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
## Client-side SDKs
Here are the configuration options for anonymous contexts in client-side SDKs.
 * [.NET (client-side)](/docs/sdk/features/anonymous#net-client-side)
 * [Android](/docs/sdk/features/anonymous#android)
 * [C++ (client-side)](/docs/sdk/features/anonymous#c-client-side)
 * [Electron](/docs/sdk/features/anonymous#electron)
 * [Flutter](/docs/sdk/features/anonymous#flutter)
 * [iOS](/docs/sdk/features/anonymous#ios)
 * [JavaScript](/docs/sdk/features/anonymous#javascript)
 * [Node.js (client-side)](/docs/sdk/features/anonymous#nodejs-client-side)
 * [React Native](/docs/sdk/features/anonymous#react-native)
 * [React Web](/docs/sdk/features/anonymous#javascript): The React Web SDK relies on the JavaScript SDK for context-related functionality.
 * [Roku](/docs/sdk/features/anonymous#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
.NET SDK v3.0+ (C#)
```
1
| Context context = Context.Builder("context-key-123abc")
---|--- 
2
| .Anonymous(true)
3
| .Build();
```
To auto-generate a key for any context whose `anonymous` attribute is true:
.NET SDK v4.0 (C#).NET SDK v3.0 (C#)
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .GenerateAnonymousKeys(true)
4
| .Build();
```
If you set this option, you must still specify a non-null key as a placeholder when you construct the `Context`, because the SDK does not allow a `Context` to exist with a null key. When you pass this context to SDK methods like `Init` or `Identify`, the SDK replaces the placeholder key with a generated key.
In this example, the placeholder key is “placeholder-key”, but it could be any non-empty string:
.NET SDK v3.0+ (C#)
```
1
| Context context = Context.Builder("placeholder-key")
---|--- 
2
| .Anonymous(true)
3
| .Build();
```
### Android
###### Expand Android code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Android SDK v4.0+ (Java)Android SDK v4.0+ (Kotlin)
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .anonymous(true)
3
| .build();
```
If you set this option, you must still specify a non-null key as a placeholder when you construct the `LDContext`, because this SDK does not allow a Context to exist with a null key. When you pass this context to SDK methods like `Init` or `Identify`, the SDK replaces the placeholder key with a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
### C++ (client-side)
###### Expand C++ (client-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Anonymous(true)
4
| .Build();
```
To learn more, read [`ContextBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1ContextBuilder.html).
### Electron
###### Expand Electron code sample
To distinguish logged-in end users from anonymous end users in the SDK:
JavaScriptTypeScript
```
1
| const anonymousUser = { key: 'user-key-123abc', anonymous: true };
---|--- 
```
To create an anonymous user with an auto-generated key, specify the “anonymous” property and omit the “key” property. The LaunchDarkly client creates a unique key for this user and caches it locally:
JavaScriptTypeScript
```
1
| const anonymousUser = { anonymous: true };
---|--- 
```
### Flutter
###### Expand Flutter code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Flutter SDK v4Flutter SDK v2.x+Flutter SDK v1.x
```
1
| final context = LDContextBuilder()
---|--- 
2
| .kind('user', 'user-key-123abc')
3
| .anonymous(true)
4
| .build();
```
To learn more, read [`anonymous`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDAttributesBuilder/anonymous.html).
### iOS
###### Expand iOS code sample
To distinguish logged-in end users from anonymous end users in the SDK:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| var contextBuilder = LDContextBuilder(key: "context-key-123abc")
---|--- 
2
| contextBuilder.anonymous(true)
3
| 
4
| let context = contextBuilder.build().get()
```
Alternatively, you can omit the key parameter. The client will automatically set the `isAnonymous` property for the context, and set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
Here’s how:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| // Have the SDK use a device persistent key.
---|--- 
2
| // This sets `isAnonymous` by default.
3
| let context = try LDContextBuilder().build().get()
```
### JavaScript
###### Expand JavaScript code sample
To create an anonymous context, specify the `anonymous` property and omit the `key` property. The client will automatically set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
Here’s how:
JavaScript SDK v3.0JavaScript SDK v3.0 (TypeScript)JavaScript SDK v2.xJavaScript SDK v2.x (TypeScript)
```
1
| const anonymousUserContext = {
---|--- 
2
| kind: 'user',
3
| anonymous: true
4
| };
5
| 
6
| // A multi-context can contain both anonymous and non-anonymous contexts.
7
| // Here, the organization is not anonymous.
8
| const multiContext = {
9
| kind: 'multi',
10
| user: anonymousUserContext,
11
| org: {
12
| key: 'org-key-123abc',
13
| name: 'Acme, Inc.'
14
| }
15
| }
```
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
```
1
| const anonymousContext = { kind: 'user', key: 'user-key-123abc', anonymous: true };
---|--- 
```
You can also have the SDK generate the key for you. Specify the `anonymous` property and omit the `key` property. The client will automatically set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
Here’s how:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
```
1
| const anonymousContext = { kind: 'user', anonymous: true };
---|--- 
```
### React Native
###### Expand React Native code sample
To create an create an anonymous context, specify the `anonymous` property and set the context `key` to an empty string.
Here’s how:
React Native SDK v10
```
1
| // This device context is anonymous
---|--- 
2
| const deviceContext = {
3
| // The key attribute is required and should be empty
4
| // The SDK will automatically generate a unique, stable key
5
| key: '',
6
| kind: 'device',
7
| deviceId: '12345',
8
| anonymous: true
9
| }
10
| 
11
| // This user context is not anonymous
12
| const userContext = {
13
| kind: 'user',
14
| key: 'user-key-123abc'
15
| }
16
| 
17
| // The multi-context contains one anonymous context
18
| // and one non-anonymous context
19
| const multiContext = {
20
| kind: 'multi',
21
| user: userContext,
22
| device: deviceContext
23
| }
```
In version 10 of the SDK, you must include the `key` attribute when building the anonymous context. If you set the key to an empty string, the client will automatically set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots. We strongly recommend having the client manage the key for anonymous contexts. If you set the key to a non-empty string, the client uses that value as the key. However, the key may not be stable across restarts or reboots.
The SDK gives a usage error if you omit the `key` attribute. It also gives a usage error if you set the key to an empty string and do not mark the context as anonymous.
In versions 7 through 9 of the SDK, you may omit the context key when building an anonymous context, and the client will automatically set it to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
#### Using a shared key between anonymous contexts in React Native for Android
It is possible to use one, shared key between anonymous contexts. However, we do not recommend this. Using a shared key between anonymous contexts means that some features will be limited or will not work as expected. To learn more, read [Use a shared key between anonymous contexts](/docs/home/flags/anonymous-contexts#use-a-shared-key-between-anonymous-contexts).
If you are using an older version of the React Native SDK on Android, there is some additional configuration required if you want to use a shared key between anonymous contexts.
###### Expand React Native v7.x-v9.x for Android code sample
If you do choose to use a shared key between anonymous contexts, and you:
 * have an Android application
 * are using the React Native SDK in versions 7.x through 9.x
then you must also explicitly configure the SDK to allow using a shared key between anonymous contexts. The `generateAnonymousKeysAndroid` configuration option defaults to `true`, which means that the SDK will automatically generate unique keys for anonymous contexts. If you need to use a shared key between anonymous contexts, then you must set this option to `false`.
To learn more, read [`generateAnonymousKeys`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#generateAnonymousKeys\(boolean\)).
The React Native SDK for iOS generates a context key for anonymous contexts only if you do not supply one. No additional SDK configuration is required if you are using a shared key for anonymous contexts with the React Native SDK for iOS.
### React Web
All context-related functionality provided by the [JavaScript SDK](/docs/sdk/features/anonymous#javascript) is also available in the React Web SDK.
### Roku
###### Expand Roku code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Roku SDK v2.0 (BrightScript)Roku SDK v1.x (BrightScript)
```
1
| context = LaunchDarklyCreateContext({"key": "user-key-123abc", "kind": "user", "anonymous": true})
---|--- 
```
## Server-side SDKs
Here are the configuration options for anonymous contexts in server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/anonymous#net-server-side)
 * [Apex](/docs/sdk/features/anonymous#apex)
 * [C++ (server-side)](/docs/sdk/features/anonymous#c-server-side)
 * [Erlang](/docs/sdk/features/anonymous#erlang)
 * [Go](/docs/sdk/features/anonymous#go)
 * [Haskell](/docs/sdk/features/anonymous#haskell)
 * [Java](/docs/sdk/features/anonymous#java)
 * [Lua](/docs/sdk/features/anonymous#lua)
 * [Node.js (server-side)](/docs/sdk/features/anonymous#nodejs-server-side)
 * [PHP](/docs/sdk/features/anonymous#php)
 * [Python](/docs/sdk/features/anonymous#python)
 * [Ruby](/docs/sdk/features/anonymous#ruby)
 * [Rust](/docs/sdk/features/anonymous#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
.NET SDK v7.0 (C#)
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Anonymous(true)
3
| .Build();
```
### Apex
###### Expand Apex code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Java
```
1
| LDUser user = new LDUser.Builder('abc123')
---|--- 
2
| .setAnonymous(true)
3
| .build();
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Anonymous(true)
4
| .Build();
```
To learn more, read [`ContextBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1ContextBuilder.html).
### Erlang
###### Expand Erlang code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| Context = ldclient_context:set(anonymous, true,
---|--- 
2
| ldclient_context:new(<<"user-key-123abc">>))
```
### Go
###### Expand Go code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Go SDK v6.0
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| )
4
| 
5
| // Anonymous context with only a key
6
| context1 := ldcontext.NewBuilder("context-key-123abc").Anonymous(true)
7
| 
8
| // Anonymous context with a key plus other attributes
9
| context2 := ldcontext.NewBuilder("context-key-456def").
10
| Anonymous(true).
11
| SetString("country", "Canada").
12
| Build()
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`EventsConfiguration`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-events/v3#EventsConfiguration).
### Haskell
###### Expand Haskell code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| makeContext "user-key-123abc" "user"
---|--- 
2
| & withAnonymous True
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`configSetOmitAnonymousContexts`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Config.html#v:configSetOmitAnonymousContexts).
### Java
###### Expand Java code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Java SDK v6.0
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .anonymous(true)
3
| .build();
```
### Lua
###### Expand Lua code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Lua SDK v2Lua SDK v1.x
```
1
| -- to create an anonymous user context
---|--- 
2
| local userContext = ld.makeContext({
3
| user = {
4
| key = "user-key-123abc",
5
| anonymous = true
6
| }
7
| })
8
| 
9
| -- to create an anonymous context of a different kind
10
| local deviceContext = ld.makeContext({
11
| device = {
12
| key = "device-key-123abc",
13
| anonymous = true
14
| }
15
| })
```
To learn more, read [`makeContext`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#makeContext).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
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
| anonymous: true,
7
| }
```
### PHP
###### Expand PHP code sample
To distinguish logged-in end users from anonymous end users in the SDK:
PHP SDK v5.0
```
1
| $context = LDContext::builder("context-key-123abc")->anonymous(true)->build();
---|--- 
```
### Python
###### Expand Python code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Python SDK v8.0Python SDK v7.x
```
1
| context = Context.builder("context-key-123abc").anonymous(True).build()
---|--- 
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`omit_anonymous_contexts`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.Config.omit_anonymous_contexts).
### Ruby
###### Expand Ruby code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Ruby SDK v7.0
```
1
| context = LaunchDarkly::LDContext.create({ key: "context-key-123abc", anonymous: true })
---|--- 
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`omit_anonymous_contexts`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Config.html#omit_anonymous_contexts-instance_method).
### Rust
###### Expand Rust code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Rust SDK v1
```
1
| // Anonymous context with only a key
---|--- 
2
| let context = ContextBuilder::new("context-key-123abc").anonymous(true).build();
3
| 
4
| // Anonymous context with a key plus other attributes
5
| let context = ContextBuilder::new("context-key-123abc").
6
| anonymous(true).
7
| set_value("country", "US".into()).
8
| build();
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`omit_anonymous_contexts`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.EventProcessorBuilder.html#method.omit_anonymous_contexts).
## Edge SDKs
Here are the configuration options for anonymous contexts in edge SDKs.
 * [Akamai](/docs/sdk/features/anonymous#akamai)
 * [Cloudflare](/docs/sdk/features/anonymous#cloudflare)
 * [Fastly](/docs/sdk/features/anonymous#fastly)
 * [Vercel](/docs/sdk/features/anonymous#vercel)
### Akamai
###### Expand Akamai code sample
To distinguish logged-in end users from anonymous end users in the SDK:
TypeScript
```
1
| import { LDContext } from '@launchdarkly/akamai-edgeworker-sdk-common';
---|--- 
2
| 
3
| const anonymousContext: LDContext = { kind: 'user', key: 'user-key-123abc', anonymous: true };
```
### Cloudflare
###### Expand Cloudflare code sample
To distinguish logged-in end users from anonymous end users in the SDK:
TypeScript
```
1
| import type { LDContext } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
2
| 
3
| const anonymousContext: LDContext = { kind: 'user', key: 'user-key-123abc', anonymous: true };
```
### Fastly
###### Expand Fastly code sample
To distinguish logged-in end users from anonymous end users in the SDK:
TypeScript
```
1
| import type { LDContext } from '@launchdarkly/js-server-sdk-common';
---|--- 
2
| 
3
| const anonymousContext: LDContext = { kind: 'user', key: 'user-key-123abc', anonymous: true };
```
### Vercel
###### Expand Vercel code sample
To distinguish logged-in end users from anonymous end users in the SDK:
TypeScript
```
1
| import type { LDContext } from '@launchdarkly/vercel-server-sdk';
---|--- 
2
| 
3
| const anonymousContext: LDContext = { kind: 'user', key: 'user-key-123abc', anonymous: true };
```
## AI SDKs
Here are the configuration options for anonymous contexts in AI SDKs.
 * [.NET AI](/docs/sdk/features/anonymous#net-ai)
 * [Go AI](/docs/sdk/features/anonymous#go-ai)
 * [Node.js (server-side) AI](/docs/sdk/features/anonymous#nodejs-server-side-ai)
 * [Python AI](/docs/sdk/features/anonymous#python-ai)
 * [Ruby AI](/docs/sdk/features/anonymous#ruby-ai)
### .NET AI
###### Expand .NET AI SDK code sample
To distinguish logged-in end users from anonymous end users in the SDK:
.NET AI SDK
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Anonymous(true)
3
| .Build();
```
### Go AI
###### Expand Go AI SDK code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Go AI SDK
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| )
4
| 
5
| // Anonymous context with only a key
6
| context1 := ldcontext.NewBuilder("context-key-123abc").Anonymous(true)
7
| 
8
| // Anonymous context with a key plus other attributes
9
| context2 := ldcontext.NewBuilder("context-key-456def").
10
| Anonymous(true).
11
| SetString("country", "Canada").
12
| Build()
```
### Node.js (server-side) AI
###### Expand Node.js (server-side) AI SDK code sample
To distinguish logged-in end users from anonymous end users in the SDK:
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
| anonymous: true,
5
| }
```
Anonymous contexts do not appear on the **Contexts** list.
### Python AI
###### Expand Python AI SDK code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Python AI SDK
```
1
| context = Context.builder("context-key-123abc").anonymous(True).build()
---|--- 
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`omit_anonymous_contexts`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.Config.omit_anonymous_contexts).
### Ruby AI
###### Expand Ruby AI SDK code sample
To distinguish logged-in end users from anonymous end users in the SDK:
Ruby AI SDK
```
1
| context = LaunchDarkly::LDContext.create({ key: "context-key-123abc", anonymous: true })
---|--- 
```
Anonymous contexts do not appear on the **Contexts** list. Optionally, you can configure the SDK to omit data from anonymous contexts when sending related [events](/docs/sdk/concepts/events#omit-anonymous-contexts-from-events) to LaunchDarkly. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly. To learn more, read [`omit_anonymous_contexts`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Config.html#omit_anonymous_contexts-instance_method).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs