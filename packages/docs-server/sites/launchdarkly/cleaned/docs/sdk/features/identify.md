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
 * [Using identify to change contexts and users](#using-identify-to-change-contexts-and-users)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React](#react)
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
## Overview
This topic explains how to use the identify feature in LaunchDarkly SDKs. Identify is available for client-side and server-side SDKs.
## Using identify to change contexts and users
The identify feature’s behavior differs between client-side and server-side SDKs.
Client-side SDKs are configured to operate for one end user at a time, identified or anonymous. In these SDKs, the identify feature allows you to change the context, such as when an end user logs in or changes their settings. Identifying contexts and users causes LaunchDarkly to index them.
To associate two contexts with each other, such as your representations of an end user before and after they log in, call identify with a multi-context that contains both contexts. The association between the two contexts that comprise your multi-context doesn’t persist between sessions. You must call identify with the multi-context each time.
Here is an example of a multi-context, though each SDK sends context data to LaunchDarkly in a slightly different format:
Example multi-context
```
1
| {
---|--- 
2
| "kind": "multi",
3
| "user": {
4
| "key": "user-key-123abc",
5
| "name": "Sandy",
6
| "email": "sandy@example.com"
7
| },
8
| "device": {
9
| "key": "device-key-123abc",
10
| "type": "iPhone",
11
| "deviceId": 12345
12
| }
13
| }
```
Server-side SDKs operate for multiple end users concurrently. Unlike in client-side SDKs, server-side SDKs do not have a notion of “changing the user context” because contexts or users are directly passed to client method invocations for actions such as evaluating flag variations. In server-side SDKs, the only impact of identifying contexts and users is that they are added to the **Contexts** list. However, in most applications this is not needed because they are automatically indexed when used for a flag evaluation. Instead, you should provide the evaluation object in a variation or all flags call to get the expected flag evaluation. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Getting all flags](/docs/sdk/features/all-flags).
To learn more about the differences in how SDKs identify and use users and contexts, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
Details about each SDK’s identify feature are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/identify#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/identify#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/identify#net-client-side)
 * [Android](/docs/sdk/features/identify#android)
 * [C++ (client-side)](/docs/sdk/features/identify#c-client-side)
 * [Electron](/docs/sdk/features/identify#electron)
 * [Flutter](/docs/sdk/features/identify#flutter)
 * [iOS](/docs/sdk/features/identify#ios)
 * [JavaScript](/docs/sdk/features/identify#javascript)
 * [Node.js (client-side)](/docs/sdk/features/identify#nodejs-client-side)
 * [React](/docs/sdk/features/identify#react)
 * [React Native](/docs/sdk/features/identify#react-native)
 * [Roku](/docs/sdk/features/identify#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The identify method tells the client to change the current context and obtain the feature flag values for the new context. In the .NET SDK, you can use either the `Identify` or `IdentifyAsync` method to switch contexts.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `Identify()` or `IdentifyAsync()` so that the person receives the correct feature flag settings for their account.
In general, however, we recommend composing the new context as a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `Identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
You may want to wait until the flag values for the new context have been loaded before proceeding. You can do this either by calling the synchronous method `Identify` with a timeout, or by calling the asynchronous method `IdentifyAsync` and awaiting the result.
Here’s how:
.NET SDK v3.0+ (C#)
```
1
| var updatedContext = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("email", "sandy@example.com")
3
| .Build();
4
| 
5
| // Synchronous method
6
| client.Identify(updatedContext, TimeSpan.FromSeconds(5));
7
| 
8
| // Asynchronous method
9
| await client.IdentifyAsync(updatedContext);
```
To learn more, read [`Identify`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_LdClient_Identify_) and [`IdentifyAsync`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_LdClient_IdentifyAsync_).
### Android
###### Expand Android code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how:
Android SDK v4.0+ (Java)Android SDK v4.0+ (Kotlin)
```
1
| LDContext updatedContext = LDContext.builderFromContext(context)
---|--- 
2
| .email("sandy@example.com")
3
| .build();
4
| 
5
| client.identify(updatedContext);
```
The `identify()` call loads any saved flag values for the new user context and immediately triggers an update of the latest flags from LaunchDarkly.
`identify()` returns a [Future](https://developer.android.com/reference/java/util/concurrent/Future) to indicate completion. If you want to be sure subsequent code is using the latest values from the server, you can wait for the Future using `get`.
To learn more, read [`identify`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDClient.html#identify\(com.launchdarkly.sdk.LDContext\)).
### C++ (client-side)
###### Expand C++ (client-side) code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The identify method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `Identify` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `Identify` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how to update your initial context when you have additional information:
C++ SDK v3 (native)
```
1
| /* before end user logs in */
---|--- 
2
| auto context = ContextBuilder()
3
| .Kind("device", "device-key-123abc")
4
| .Build();
5
| 
6
| /* after end user logs in */
7
| auto updated_context = ContextBuilder(context)
8
| .Kind("user", "user-key-123abc")
9
| .Name("Sandy")
10
| .Kind("organization", "org-key-123abc")
11
| .Name("Global Health Services")
12
| .Build();
```
After you update the context, you must call identify with the updated context in order to evaluate flags based on the updated information.
Here’s how to use the identify method to switch contexts:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| client.IdentifyAsync(updated_context);
---|--- 
```
You can also examine the result to determine if the identification succeeded. Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto identify_result = client.IdentifyAsync(updated_context);
---|--- 
2
| auto status = identify_result.wait_for(maxwait);
3
| 
4
| if (status == std::future_status::ready) {
5
| /* The client's attempt to identify succeeded or failed in the specified amount of time. */
6
| if (identify_result.get()) {
7
| /* Identification succeeded */
8
| } else {
9
| /* Identification failed */
10
| }
11
| } else {
12
| /* The specified timeout was reached, but the client is still identifying. */
13
| }
```
The `IdentifyAsync` call loads any saved flag values for the new context and immediately triggers an update of the latest flags from LaunchDarkly. Because this method re-fetches flag settings for the updated context, you should not call it at high frequency. The intended use case for switching contexts is the login/logout flow. To learn more, read [`IdentifyAsync`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#a62fc1fe135495b72fa37ecedf5a2c7e2).
### Electron
###### Expand Electron code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current user and obtain the feature flag values for the new user.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how:
JavaScriptTypeScript
```
1
| const newUser = { key: 'user-key-123abc', name: 'Sandy' };
---|--- 
2
| 
3
| client.identify(newUser, (newFlags) => {
4
| console.log('value of flag for this user is: ' + newFlags['flag-key-123abc']);
5
| console.log('this should be the same: ' + client.variation('flag-key-123abc'));
6
| });
7
| 
8
| // or:
9
| client.identify(newUser).then((newFlags) => {
10
| // as above
11
| });
```
To learn more, read [`identify`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldelectronmainclient.html#identify).
### Flutter
###### Expand Flutter code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how:
Flutter SDK v4, single contextFlutter SDK v4, multi-contextFlutter SDK v3.x, single contextFlutter SDK v3.x, multi-contextFlutter SDK v2.x, single contextFlutter SDK v2.x, multi-contextFlutter SDK v1.x
```
1
| final updatedContext = LDContextBuilder()
---|--- 
2
| .kind('user', 'user-key-123abc')
3
| .setString('email', 'sandy@example.com'))
4
| .build();
5
| 
6
| await client.identify(updatedContext);
```
To learn more, read [`identify`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/identify.html).
### iOS
###### Expand iOS code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
If the client app does not identify an `LDContext`, `LDClient` creates an anonymous default context, which can affect which feature flags LaunchDarkly delivers to the `LDClient`. Client apps should follow the [Apple Privacy Policy](https://apple.com/legal/privacy) when collecting end user information.
Here’s how:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| let newContext = try LDContextBuilder(key: "context-key-123abc").build().get();
---|--- 
2
| 
3
| // You can also call identify with a completion
4
| LDClient.get()!.identify(context: newContext) {
5
| // Flags have been retrieved for the new context
6
| }
```
To learn more, read [`identify`](https://launchdarkly.github.io/ios-client-sdk/Classes/ObjcLDClient.html#/c:@M@LaunchDarkly@objc\(cs\)LDClient\(im\)identifyWithContext:).
### JavaScript
###### Expand JavaScript code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
If you provide a callback function, it is called with a map of flag keys and values after the flag values for the new context are available. After that point, `variation()` uses the new values. You can also use a Promise for the same purpose. When you use a Promise, it is important that you handle the rejection case. Otherwise, it will become an unhandled Promise rejection, which is a serious error on some platforms.
It is possible that the `identify()` call will fail. If you are using a callback, the callback will receive an error value, and calls to [evaluate a flag](/docs/sdk/features/evaluating) will still return flag values for the previous context.
Here’s how to identify a new context:
JavaScript SDK v3+, single contextJavaScript SDK v3+, multi-context
```
1
| client.identify(newContext, hash, function() {
---|--- 
2
| console.log("New context's flags available");
3
| });
```
To learn more, read [`identify`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#identify).
If you are using the [LaunchDarkly observability SDKs](/docs/sdk/observability), calling `identify()` also automatically indexes your sessions so that you can [search for sessions](/docs/home/observability/session-replay) based on context attributes.
If your contexts are extraordinarily large, you may need to configure the JavaScript SDK to send the evaluation context as a request body. To learn more, read [Using REPORT in the JavaScript SDK](/docs/guides/account/user-data#use-report-in-the-javascript-sdk).
##### You must use a hash parameter while in secure mode
The hash parameter is the hash for the new context, assuming that the context’s key has changed. The hash parameter is only required in secure mode. If secure mode is not enabled, pass in `null` for the hash.
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how:
Node.js SDK v3.0, single contextNode.js SDK v3.0, multi-context
```
1
| client.identify(newContext, () => {
---|--- 
2
| console.log("New context's flags available");
3
| });
4
| 
5
| // or, with a Promise:
6
| client.identify(newContext).then(() => {
7
| console.log("New context's flags available");
8
| });
```
To learn more, read [`identify`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDClient.html#identify).
### React
###### Expand React code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
Here’s how:
JavaScript
```
1
| import { useLDClient } from 'launchdarkly-react-client-sdk';
---|--- 
2
| 
3
| let ldClient = useLDClient();
4
| 
5
| ldClient.identify(newContext, null, () => {
6
| console.log("New context's flags available");
7
| });
```
To learn more, read [`identify`](https://launchdarkly.github.io/react-native-client-sdk/classes/LDClient.html#identify).
### React Native
###### Expand React Native code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify` method tells the client to change the current context and obtain the feature flag values for the new context.
##### Version 10 requires an identify call
In the React Native SDK version 10, you do not provide a context when you initialize the `ReactNativeLDClient`. You must call `identify` before you can evaluate a feature flag for a specific context. End users will receive fallback values until you call specify a context by calling `identify`.
If multiple customers use your app on a single device, you may want to change contexts and have separate flag settings for each one. To do this, the SDK stores contexts on a single device using [react-native-async-storage](https://react-native-async-storage.github.io/async-storage/), and supports switching between different contexts. You can use the `identify` method to switch contexts. `identify` loads any saved flag values for the new context and immediately triggers an update of the latest flags from LaunchDarkly.
You might also call `identify` when your app gathers additional information about the end user. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user. Then you can evaluate flags using attributes from all three context kinds together.
Here’s how:
React Native SDK v10
```
1
| import { useLDClient } from '@launchdarkly/react-native-client-sdk';
---|--- 
2
| 
3
| const client = useLDClient();
4
| const context: LDContext = {'key': 'user-key-123abc', 'kind': 'user'};
5
| client
6
| .identify(context)
7
| .catch((e: any) => console.error(`error identifying ${context.key}: ${e}`));
```
To learn more, read [`identify`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#identify).
### Roku
###### Expand Roku code sample
Client-side SDKs are configured to operate for one context at a time, whether identified or anonymous. The `identify()` method tells the client to change the current context and obtain the feature flag values for the new context.
In some situations, the new context may be an updated version of the existing context. For example, on a sign-in page in a single-page app, you could represent the same person as a multi-context that combines a pre-login anonymous context and a post-login context with the “user” kind. After the person logs in, you can call `identify()` so that the person receives the correct feature flag settings for their account.
In other situations, the new context may be a multi-context based on multiple identifiers, rather than only pre- and post-login contexts. For example, as soon as an end user visits your app, you may initialize the client with a context using a context kind of “device.” When the end user logs in, you now also have their user and organization information. You can call `identify()` with a multi-context that contains the “device,” “user,” and “organization” contexts for the end user.
To do this:
Roku SDK v2.0 (BrightScript)Roku SDK v1.x (BrightScript)
```
1
| ' before the end user logs in
---|--- 
2
| device = {
3
| "kind": "device",
4
| "key": "device-key-123abc",
5
| "type": "tablet"
6
| }
7
| context = LaunchDarklyCreateContext(device)
8
| 
9
| ' after the end user logs in
10
| multi = {
11
| "kind": "multi",
12
| "device": device,
13
| "user": {"key": "user-key-123abc", "name": "Sandy"},
14
| "organization": {"key": "org-key-123abc", "name": "Acme, Inc."}
15
| }
16
| 
17
| launchDarkly.identify(multi)
```
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/identify#net-server-side)
 * [Apex](/docs/sdk/features/identify#apex)
 * [C++ (server side)](/docs/sdk/features/identify#c-server-side)
 * [Erlang](/docs/sdk/features/identify#erlang)
 * [Go](/docs/sdk/features/identify#go)
 * [Haskell](/docs/sdk/features/identify#haskell)
 * [Java](/docs/sdk/features/identify#java)
 * [Lua](/docs/sdk/features/identify#lua)
 * [Node.js (server side)](/docs/sdk/features/identify#nodejs-server-side)
 * [PHP](/docs/sdk/features/identify#php)
 * [Python](/docs/sdk/features/identify#python)
 * [Ruby](/docs/sdk/features/identify#ruby)
 * [Rust](/docs/sdk/features/identify#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
In server-side SDKs, `Identify` creates or updates contexts on LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `Identify`. The `Variation` methods automatically create contexts on the **Contexts** list for you, using the context you pass to each `Variation` method. `Identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `Identify`:
.NET SDK v7.0 (C#)
```
1
| client.Identify(context);
---|--- 
```
To learn more, read [`Identify`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_Identify_).
### Apex
###### Expand Apex code sample
In server-side SDKs, `identify` creates or updates users in LaunchDarkly, which makes them available for targeting and autocomplete on the **Users** list.
To use `identify`:
Apex
```
1
| client.identify(user);
---|--- 
```
To learn more, read [Other methods](https://github.com/launchdarkly/apex-server-sdk/blob/main/doc.md#other-methods-1).
### C++ (server-side)
###### Expand C++ (server-side) code sample
In server-side SDKs, `Identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `Identify`. The `variation` call automatically creates contexts on the **Contexts** list for you, using the evaluation context you pass to each `variation` method. `Identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `Identify`:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2 (native)
```
1
| client.Identify(context);
---|--- 
```
To learn more, read `Identify()` in [`Client`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1server__side_1_1Client.html).
### Erlang
###### Expand Erlang code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` methods automatically create contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| ldclient:identify(#{key => <<"context-key-123abc">>})
---|--- 
```
To learn more, read [`identify`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient.html#identify-1).
### Go
###### Expand Go code sample
In server-side SDKs, `Identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `Identify`. The `Variation` method automatically creates contexts on the **Contexts** list for you, using the context you pass to each `Variation` method. `Identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `Identify`:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| // There is not an Identify method in the LDScopedClient,
---|--- 
2
| // so you need to access the method from the LDClient.
3
| // Then, pass in the scoped client's current context.
4
| // LDScopedClient is in beta and may change without notice.
5
| scopedClient.Client().Identify(scopedClient.CurrentContext())
```
To learn more, read [`Identify`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.Identify).
### Haskell
###### Expand Haskell code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` methods automatically create contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| identify client context
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:identify).
### Java
###### Expand Java code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` methods automatically create contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Java SDK v6.0
```
1
| client.identify(context);
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#identify-com.launchdarkly.sdk.LDContext-).
### Lua
###### Expand Lua code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` methods automatically create contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Lua SDK v2Lua SDK v1.x
```
1
| client:identify(context)
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#identify).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` call automatically creates users on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Node.js SDK v7.x and later
```
1
| client.identify(context);
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDClient.html#identify).
### PHP
###### Expand PHP code sample
In server-side SDKs, `identify` creates or updates users in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` call automatically creates contexts on the **Contexts** list for you, using the context you pass to each `variation` call. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
PHP SDK v5.0
```
1
| $client->identify($context);
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method_identify).
### Python
###### Expand Python code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` method automatically creates contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Python SDK v8.0
```
1
| ldclient.get().identify(context)
---|--- 
```
To learn more, read [`identify`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.identify).
### Ruby
###### Expand Ruby code sample
In server-side SDKs, `identify` creates or updates contexts in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` call automatically creates contexts on the **Contexts** list for you, using the context you pass to each `variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Ruby SDK v7.0
```
1
| client.identify(context)
---|--- 
```
To learn more, read [`identify`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#identify-instance_method).
### Rust
###### Expand Rust code sample
In server-side SDKs, `identify` creates or updates users in LaunchDarkly, which makes them available for targeting and autocomplete on the **Contexts** list.
In most cases, you do not need to call `identify`. The `variation` methods automatically create users or contexts on the **Contexts** list for you, using the context you pass to each `Variation` method. `identify` is useful if you want to pre-populate your **Contexts** list before you launch any features.
To use `identify`:
Rust SDK v1
```
1
| client.identify(context);
---|--- 
```
To learn more, read [`identify`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.identify).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs