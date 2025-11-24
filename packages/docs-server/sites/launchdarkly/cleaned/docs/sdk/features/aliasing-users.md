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
 * [Aliased users](#aliased-users)
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
##### This feature is deprecated for SDKs that use contexts
LaunchDarkly no longer supports `alias` events for SDKs upgraded for contexts. LaunchDarkly continues to support sending and receiving alias events for older SDK versions. To learn more, read about our [SDKs that support contexts](/docs/sdk).
To learn how to associate contexts without using the `alias` method, read [Associate anonymous contexts with logged-in end users](/docs/home/flags/anonymous-contexts#associate-anonymous-contexts-with-logged-in-end-users).
## Overview
This topic explains how to alias the users of various LaunchDarkly SDKs. This feature is available for both client-side and server-side SDKs, although its behavior differs between client-side and server-side SDKs.
## Aliased users
There are situations in which multiple LaunchDarkly users can represent one person. For example, this can happen when a person initially logs into an application. The person might be represented by an anonymous user before they log in, and a different user after they log in. In that case, that one person is identified by two different users as denoted by different user keys. Our SDKs can associate these two LaunchDarkly users by sending an `alias` event.
Only some LaunchDarkly SDKs offer the ability to manually send an `alias` event. Some client-side SDKs automatically send an `alias` event when identifying a known user if the previous user was anonymous. You can disable this behavior if necessary. To learn how, read [Configuration](/docs/sdk/features/config).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/aliasing-users#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/aliasing-users#server-side-sdks)
## Client-side SDKs
This feature is no longer supported or required in any client-side SDKs. To learn more, read [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts), and consult the [custom contexts migration guide](/docs/sdk) for each client-side SDK.
Older versions of these SDKs still support aliasing. Details for these older versions are included below.
### .NET (client-side)
In version 3 and newer of the .NET (client-side) SDK, aliasing is no longer supported or required. To learn more, read [.NET (client-side) SDK 2.x to 3.0 migration guide](/docs/sdk/client-side/dotnet/migration-2-to-3).
###### Expand .NET (client-side) code sample for older versions
To manually send an `alias` event:
.NET SDK 2.x (C#)
```
1
| client.Alias(newUser, previousUser);
---|--- 
```
To learn more, read [`LdClient.Alias`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_LdClient_Alias_) and [`ConfigurationBuilder.AutoAliasingOptOut`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_ConfigurationBuilder_AutoAliasingOptOut_).
### Android
In version 4.0 and newer of the Android SDK, aliasing is no longer supported or required. To learn more, read the [Android SDK 3.x to 4.0 migration guide](/docs/sdk/client-side/android/migration-3-to-4).
###### Expand Android code sample for older versions
To manually send an `alias` event:
JavaKotlin
```
1
| client.alias(newUser, previousUser);
---|--- 
```
### C++ (client-side)
In version 3 and newer of the C++ (client-side) SDK, aliasing is no longer supported or required. To learn more, read [C++ (client-side) SDK 2.x to 3.0 migration guide](/docs/sdk/client-side/c-c--/migration-2-to-3).
###### Expand C/C++ (client-side) code sample for older versions
To manually send an `alias` event:
C SDK v2.0 (native)
```
1
| LDClientAlias(client, newUser, previousUser);
---|--- 
```
### Electron
###### Expand Electron code sample
To manually send an `alias` event:
JavaScript
```
1
| client.alias(newUser, previousUser);
---|--- 
```
### Flutter
In version 2 and newer of the Flutter SDK, aliasing is no longer supported or required. To learn more, read the [Flutter SDK 1.x to 2.0 migration guide](/docs/sdk/client-side/flutter/migration-1-to-2).
###### Expand Flutter code sample for older versions
To manually send an `alias` event:
Dart
```
1
| await LDClient.alias(newUser, previousUser);
---|--- 
```
### iOS
In version 8 and newer of the iOS SDK, aliasing is no longer supported or required. To learn more, read the [iOS SDK 7.x to 8.0 migration guide for Objective-C](/docs/sdk/client-side/ios/migration-7-to-8-objc) or for [Swift](/docs/sdk/client-side/ios/migration-7-to-8-swift).
###### Expand iOS code sample for older versions
To manually send an `alias` event:
SwiftObjective-C
```
1
| LDClient.get()!.alias(context: newUser, previousContext: previousUser)
---|--- 
```
### JavaScript
In version 3 and newer of the JavaScript SDK, aliasing is no longer supported or required. To learn more, read [JavaScript SDK 2.x to 3.0 migration guide](/docs/sdk/client-side/javascript/migration-2-to-3).
###### Expand JavaScript code sample for older versions
Both `alias` parameters must have `key` attributes. If the LaunchDarkly client auto-generated a unique identifier for one of your users, you can access the user’s complete object with the `getUser` method.
To manually send an `alias` event:
JavaScript SDK v2.x
```
1
| const previousUser = client.getUser();
---|--- 
2
| client.alias(newUser, previousUser);
```
### Node.js (client-side)
In version 3 and newer of the Node.js SDK, aliasing is no longer supported or required. To learn more, read [Node.js (client-side) SDK 2.x to 3.0 migration guide](/docs/sdk/client-side/node-js/migration-2-to-3).
###### Expand Node.js (client-side) code sample for older versions
To manually send an `alias` event:
JavaScript
```
1
| client.alias(newUser, previousUser);
---|--- 
```
### React Native
In version 7 and newer of the React Native SDK, aliasing is no longer supported or required. To learn more, read [React Native SDK 6.x to 7.0 migration guide](/docs/sdk/client-side/react/migration-6-to-7-react-native).
###### Expand React Native code sample for older versions
To manually send an `alias` event:
JavaScript
```
1
| client.alias(user, previousUser);
---|--- 
2
| 
3
| // to send an alias event in a different environment than the default,
4
| // pass in the environment key (optional)
5
| client.alias(user, previousUser, environment);
```
### Roku
In version 2 and newer of the Roku SDK, aliasing is no longer supported or required. To learn more, read [Roku SDK 1.x to 2.0 migration guide](/docs/sdk/client-side/roku/migration-1-to-2).
###### Expand Roku code sample for older versions
To manually send an `alias` event:
BrightScript
```
1
| client.alias(user, previousUser)
---|--- 
```
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [Apex](/docs/sdk/features/aliasing-users#apex)
### .NET (server-side)
In version 7.0 and newer of the .NET (server-side) SDK, aliasing is no longer supported or required. To learn more, read [.NET (server-side) SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/dotnet/migration-6-to-7).
###### Expand .NET (server-side) code sample for older versions
To manually send an `alias` event:
.NET SDK v7.0 and earlier (C#)
```
1
| client.Alias(newUser, previousUser);
---|--- 
```
### Apex
###### Expand Apex code sample
To manually send an `alias` event:
Apex
```
1
| client.alias(newUser, previousUser)
---|--- 
```
### C++ (server-side)
In version 3.0 and newer of the C++ (server-side) SDK, aliasing is no longer supported or required. To learn more, read [C++ (server-side) SDK 2.x to 3.0 migration guide](/docs/sdk/server-side/c-c--/migration-2-to-3).
###### Expand C++ (server-side) code sample for older versions
To manually send an `alias` event:
C/C++
```
1
| LDClientAlias(client, newUser, previousUser);
---|--- 
```
### Erlang
In version 2 and newer of the Erlang SDK, aliasing is no longer supported or required. To learn more, read [Erlang SDK 1.x to 2.0 migration guide](/docs/sdk/server-side/erlang/migration-1-to-2).
###### Expand Erlang code sample for older versions
To manually send an `alias` event:
Erlang
```
1
| ldclient:alias(User, PreviousUser)
---|--- 
```
### Go
In version 6.0 and newer of the Go SDK, aliasing is no longer supported or required. To learn more, read [Go SDK 5.x to 6.0 migration guide](/docs/sdk/server-side/go/migration-5-to-6).
###### Expand Go code sample for older versions
To manually send an `alias` event in older versions of the Go SDK:
Go SDK v5.x and earlier
```
1
| client.Alias(newUser, previousUser)
---|--- 
```
### Haskell
In version 4 and newer of the Haskell SDK, aliasing is no longer supported or required. To learn more, read [Haskell SDK 3.x to 4.0 migration guide](/docs/sdk/server-side/haskell/migration-3-to-4).
###### Expand Haskell code sample for older versions
To manually send an `alias` event:
Haskell
```
1
| alias client newUser previousUser
---|--- 
```
### Java
In version 6 and newer of the Java SDK, aliasing is no longer supported or required. To learn more, read [Java SDK 5.x to 6.0 migration guide](/docs/sdk/server-side/java/migration-5-to-6).
###### Expand Java code sample for older versions
To manually send an `alias` event:
Java SDK v5.x and earlier
```
1
| client.alias(user, previousUser);
---|--- 
```
### Lua
In version 2.0 and newer of the Lua SDK, aliasing is no longer supported or required. To learn more, read [Lua (server-side) SDK 1.x to 2.0 migration guide](/docs/sdk/server-side/lua/migration-1-to-2).
###### Expand Lua code sample for older versions
To manually send an `alias` event:
Lua SDK v1.x
```
1
| client:alias(newUser, previousUser)
---|--- 
```
### Node.js (server-side)
In version 7.0 and newer of the Node.js (server-side) SDK, aliasing is no longer supported or required. To learn more, read [Node.js (server-side) SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/node-js/migration-6-to-7).
###### Expand Node.js (server-side) code sample for older versions
To manually send an `alias` event:
JavaScript
```
1
| client.alias(newUser, previousUser);
---|--- 
```
### PHP
In version 5.0 and newer of the PHP SDK, aliasing is no longer supported or required. To learn more, read [PHP SDK 4.x to 5.0 migration guide](/docs/sdk/server-side/php/migration-4-to-5).
###### Expand PHP code sample for older versions
To manually send an `alias` event:
PHP
```
1
| $client->alias($user, $previousUser);
---|--- 
```
### Python
In version 8 and newer of the Python SDK, aliasing is no longer supported or required. To learn more, read [Python SDK 7.x to 8.0 migration guide](/docs/sdk/server-side/python/migration-7-to-8).
###### Expand Python code sample for older versions
To manually send an `alias` event:
Python SDK v7.x and earlier
```
1
| ldclient.get().alias(new_user, previous_user)
---|--- 
```
### Ruby
In version 7 and newer of the Ruby SDK, aliasing is no longer supported or required. To learn more, read [Ruby SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/ruby/migration-6-to-7).
###### Expand Ruby code sample for older versions
To manually send an `alias` event:
Ruby SDK v6.x and earlier
```
1
| client.alias(new_user, previous_user)
---|--- 
```
### Rust
In version 1 and newer of the Rust SDK, aliasing is not supported or required. To learn more, read [Rust SDK v1 implementation guide](/docs/sdk/server-side/rust/implementation-v1).
###### Expand Rust code sample for the beta version
To manually send an `alias` event:
Rust
```
1
| client.alias(user, previous_user);
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs