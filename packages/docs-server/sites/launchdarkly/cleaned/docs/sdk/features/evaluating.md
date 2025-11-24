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
 * [About flag evaluation](#about-flag-evaluation)
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
## Overview
This topic explains how to use the flag evaluation feature to serve different feature flag variations to contexts and users. This feature is available for all of the LaunchDarkly SDKs.
## About flag evaluation
The flag evaluation feature requires a feature flag key and the context that encounters the flag in your application. It returns the value of the feature flag variation for that context, based on the flag targeting rules you have created, including any [prerequisite flags](/docs/home/flags/prereqs).
Every flag has at least two variations: one for when targeting is off, and one for when it’s on. To learn more, read [Creating flag variations](/docs/home/flags/variations).
This is an example of a flag with three variations:
![The "Variations" definition for multivariate flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/40c8decee01a277ddabd153872d8642f8fd46bcc15771d3a54704cbfe3eea6bd/assets/images/auto/experiment-example-opt-in-flag-variations.auto.png)
The "Variations" definition for multivariate flag.
Flags also have fallback values. The fallback value is defined in your code, is one of the flag’s variations, and is only returned if an error occurs. For example, the SDK serves the fallback value if LaunchDarkly is unreachable, the feature flag key doesn’t exist, or the context or user doesn’t have a key specified. It also serves the fallback value if it cannot authenticate, or if your LaunchDarkly account has been deleted.
##### Contexts without a context kind are interpreted as users
If you are working with an older version of the SDK, you may provide a user object in the evaluation call. If you are using an SDK that supports contexts, and don’t supply the context kind, then that object is automatically interpreted as a context with a kind of “user.” To learn more, read [Context kinds](/docs/home/flags/context-kinds).
The flag evaluation feature adds a context to the **Contexts** list, if a context with the same key does not already exist. However, each SDK evaluates flags based only on the object you provide in the evaluation call. In other words, the SDK does not automatically use the attributes shown on the **Contexts** list, and attributes are not synchronized across SDK instances. You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly. To learn more, read [Context configuration](/docs/sdk/features/context-config).
You do not need to create contexts or users manually, but if you want to, you can with the identify feature. To learn more, read [Identifying and changing contexts](/docs/sdk/features/identify).
The flag evaluation feature _only_ returns information about the flag variation for the context. To access other information about a flag, visit the [**Flags** list](/docs/home/flags/manage) in the LaunchDarkly user interface. Alternatively, use the [`getFeatureFlag` endpoint](/docs/api/feature-flags/get-feature-flag) in [LaunchDarkly’s REST API](/docs/home/infrastructure/api).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/evaluating#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/evaluating#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/evaluating#edge-sdks)
## Client-side SDKs
This feature is available for all of our client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/evaluating#net-client-side)
 * [Android](/docs/sdk/features/evaluating#android)
 * [C++ (client-side)](/docs/sdk/features/evaluating#c-client-side)
 * [Electron](/docs/sdk/features/evaluating#electron)
 * [Flutter](/docs/sdk/features/evaluating#flutter)
 * [iOS](/docs/sdk/features/evaluating#ios)
 * [JavaScript](/docs/sdk/features/evaluating#javascript)
 * [Node.js (client-side)](/docs/sdk/features/evaluating#nodejs-client-side)
 * [React Native](/docs/sdk/features/evaluating#react-native)
 * [React Web](/docs/sdk/features/evaluating#react-web): The React Web SDK relies on the JavaScript SDK for this functionality.
 * [Roku](/docs/sdk/features/evaluating#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
The `Variation` method determines which variation of a flag LaunchDarkly serves to the current context. It requires the flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In the client-side .NET SDK, there is a `variation` method for each type, such as `BoolVariation` or `StringVariation`.
Here is an example:
C#
```
1
| client.BoolVariation("flag-key-123abc", false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Android
###### Expand Android code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to the current context. It requires the flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list. When `LDClient` is initialized for the first time at app launch, contexts receive the feature flag fallback values until an initial connection to LaunchDarkly completes.
In Android, there is a `variation` method for each type, such as `boolVariation` or `stringVariation`.
Here is an example:
JavaKotlin
```
1
| boolean variationResult = client.boolVariation(flagKey, false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### C++ (client-side)
###### Expand C++ (client-side) code sample
The variation methods determine which variation of a flag is served to the current context. The variation method signatures take the feature flag key and a fallback value. When the client is initialized for the first time, contexts receive the feature flag fallback values until an initial connection to LaunchDarkly completes.
There are variation methods for each type, such as `BoolVariation` or `StringVariation`.
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| bool show_feature = client.BoolVariation("flag-key-123abc", false);
---|--- 
2
| if (show_feature) {
3
| // Application code to show the feature
4
| } else {
5
| // The code to run if the feature is off
6
| }
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read the [`Client` documentation](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html).
### Electron
###### Expand Electron code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to a specific user. It requires the flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the user is evaluated, you can view it on the **Contexts** list.
To evaluate any feature flag for the current user, call `variation`:
JavaScriptTypeScript
```
1
| const flagValue = client.variation('flag-key-123abc', false);
---|--- 
2
| 
3
| // proceed based on flag value, for example:
4
| 
5
| if (flagValue) {
6
| // feature flag targeting is on
7
| } else {
8
| // feature flag targeting is off
9
| }
```
You must provide all relevant user attributes for each evaluation for your targeting rules to apply correctly.
The return value of `variation` is always either one of the variations you defined for your flag in the flag’s **Variations** tab, or the [fallback value](/docs/home/getting-started/vocabulary#fallback-value). The fallback value is the second parameter to `variation`.
You can also fetch all flags for the current user.
Here is an example:
JavaScript
```
1
| const flags = client.allFlags();
---|--- 
2
| const flagValue = flags['flag-key-123abc'];
```
This returns a key-value map of all your feature flags. It contains `null` values for any flags that could not be evaluated.
Both of these methods are synchronous. The client always has the last known flag values in memory, so retrieving them does not involve any input/output (I/O).
### Flutter
###### Expand Flutter code sample
The `variation` methods determine which variation of a flag LaunchDarkly serves to the current context. `variation` calls take the feature flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list. When the client is initialized for the first time at app launch, end users receive the feature flag fallback values until an initial connection to LaunchDarkly completes.
In Flutter, there is a `variation` method for each type, such as `boolVariation` or `stringVariation`.
Here is an example:
Flutter SDK v4Flutter SDK v3.x
```
1
| bool variationResult = client.boolVariation(flagKey, false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`boolVariation`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/boolVariation.html).
### iOS
###### Expand iOS code sample
The variation functions determine which variation of a flag LaunchDarkly serves the current context. Variation functions take the feature flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value) as parameters. After the context is evaluated, you can view it on the **Contexts** list. If the flag does not exist, cannot be cast to the correct return type, or the `LDClient` is not started, the function returns the fallback value.
In the iOS SDK, there is a variation method for each type, such as `boolVariation` or `jsonVariation`.
Here is an example:
SwiftObjective-C
```
1
| let boolFlagValue = LDClient.get()!.boolVariation(forKey: "bool-flag-key-123abc", defaultValue: false)
---|--- 
2
| let jsonFlagValue = LDClient.get()!.jsonVariation(forKey: "json-flag-key-456def", defaultValue: ["enabled": false, "special": "none"])
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### JavaScript
###### Expand JavaScript code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to the current context. `variation` calls take the feature flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example of the `variation` method:
JavaScriptTypeScript
```
1
| client.variation('flag-key-123abc', false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to the current context. It requires the flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
JavaScriptTypeScript
```
1
| const value = client.variation('flag-key-123abc', false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### React Native
###### Expand React Native code sample
The variation method determines the flag variation to serve for a specific context.
In React Native, there is a variation method for each type, such as `boolVariation` or `stringVariation`. In the React Native SDK version 10, there is also a hook for each type, such as `useBoolVariation` or `useStringVariation`.
Variation calls take the feature flag key and a fallback value. When `ReactNativeLDClient` is initialized for the first time at app launch, end users receive feature flag fallback values until an initial connection to LaunchDarkly is completed. You are not required to specify a context when you initialize `ReactNativeLDClient`. If you do not specify a context initially, end users will also receive fallback values until you do specify a context by calling `identify()`. To learn more, read [Identifying and changing contexts](/docs/sdk/features/identify#react-native).
Here is an example:
React Native SDK v10, using variation hooksReact Native SDK v10, using variation methods
```
1
| import { useBoolVariation, useNumberVariation, useStringVariation, useJsonVariation } from '@launchdarkly/react-native-client-sdk'
---|--- 
2
| 
3
| const boolResult = useBoolVariation('bool-flag-key-123abc', false);
4
| const numResult = useNumberVariation('numeric-flag-key-123abc', 2);
5
| const stringResult = useStringVariation('string-flag-key-123abc', '');
6
| const jsonResult = useJsonVariation('json-flag-key-123abc', {});
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`boolVariation`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#boolVariation).
The SDK also includes an untyped method to determine the variation of a feature flag. To learn more, read [`variation`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#variation). We recommend using the strongly typed variation methods, such as `boolVariation`, which perform type checks and handle type errors.
### React Web
The React Web SDK relies on the [JavaScript SDK](/docs/sdk/features/evaluating#javascript) for this functionality.
##### Fallback values in the React Web SDK
The fallback variation for each flag is returned if an error occurs. For example, the SDK serves the fallback variation if LaunchDarkly is unreachable, the feature flag key doesn’t exist, or the context or user doesn’t have a key specified.
In the LaunchDarkly user interface, on the flag’s **Targeting** tab, a value for the “Fallback variation” information appears. However, if you are using the React Web SDK this displayed value may not match the value actually being served for the fallback variation:
 * A value for the fallback variation may appear in the UI even though you have not defined a fallback variation in your code. Specifically, the React Web SDK automatically uses the results of [getting all flags](/docs/sdk/features/all-flags#react-web) to determine the value of the fallback variation. In some cases, this means that the fallback value is undefined. For example, it may be undefined if the SDK has not finished initializing, or if LaunchDarkly is unreachable.
 * If you use the `useLDClient()` hook and evaluate flags with the underlying JavaScript SDK’s [`variation()` method](/docs/sdk/features/evaluating#javascript), then you can define a fallback variation. However, the value displayed in the UI may not match the value of the fallback variation that you set in the `variation()` call.
Rather than relying on the “Fallback variation” display in the UI, review your application code to determine the fallback variation that the SDK will serve if LaunchDarkly is unreachable.
### Roku
###### Expand Roku code sample
The `*variation` methods determines which variation of a flag LaunchDarkly serves to the current context. The calls require the flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In the Roku SDK, there is a variation method for each type, such as `boolVariation` and `intVariation`.
Here is an example:
BrightScript
```
1
| ' typed variations
---|--- 
2
| myInt = launchDarkly.intVariation("flag-key-123abc", 123)
3
| 
4
| myBool = launchDarkly.boolVariation("flag-key-123abc", false)
5
| 
6
| myString = launchDarkly.stringVariation("flag-key-123abc", "hello world!")
7
| 
8
| myObjectOrArray = launchDarkly.jsonVariation("flag-key-123abc", {"value": 123})
9
| 
10
| ' generic variation
11
| myValue = launchDarkly.variation("flag-key-123abc", false)
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
## Server-side SDKs
This feature is available for all of our server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/evaluating#net-server-side)
 * [Apex](/docs/sdk/features/evaluating#apex)
 * [C++ (server-side)](/docs/sdk/features/evaluating#c-server-side)
 * [Erlang](/docs/sdk/features/evaluating#erlang)
 * [Go](/docs/sdk/features/evaluating#go)
 * [Haskell](/docs/sdk/features/evaluating#haskell)
 * [Java](/docs/sdk/features/evaluating#java)
 * [Lua](/docs/sdk/features/evaluating#lua)
 * [Node.js (server-side)](/docs/sdk/features/evaluating#nodejs-server-side)
 * [PHP](/docs/sdk/features/evaluating#php)
 * [Python](/docs/sdk/features/evaluating#python)
 * [Ruby](/docs/sdk/features/evaluating#ruby)
 * [Rust](/docs/sdk/features/evaluating#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The `Variation` methods determine which variation of a flag LaunchDarkly serves to a specific context. The methods require the flag key, the [`Context`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Context.html) to evaluate, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In .NET, there is a `Variation` method for each type:
 * [`BoolVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_BoolVariation_)
 * [`DoubleVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_DoubleVariation_)
 * [`FloatVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_FloatVariation_)
 * [`IntVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_IntVariation_)
 * [`JsonVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_JsonVariation_)
 * [`StringVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_StringVariation_).
Here is an example:
.NET SDK v7.0 (C#)
```
1
| var value = client.BoolVariation("your.feature.key", context, false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Apex
###### Expand Apex code sample
The `variation` methods determine which variation of a flag LaunchDarkly serves to a specific user. In Apex, there is a `variation` method for each type, such as `boolVariation` or `stringVariation`. The methods take an `LDUser`, a feature flag key, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the user is evaluated, you can view it on the **Contexts** list.
Here is an example:
Apex
```
1
| Boolean value = client.boolVariation(user, 'your.feature.key', false);
---|--- 
```
You must provide all relevant user attributes for each evaluation for your targeting rules to apply correctly.
### C++ (server-side)
###### Expand C++ (server-side) code sample
The `variation` family of functions determine which variation of a flag LaunchDarkly serves to a specific context. The functions require a context, feature flag key, and [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In C++, there is a `variation` function for each type, such as `BoolVariation` or `StringVariation`.
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| bool value = client.BoolVariation(context, "flag-key-123abc", false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Erlang
###### Expand Erlang code sample
The `variation` function determines which variation of a flag LaunchDarkly serves to a specific context. The functions take a flag key, context, [fallback value](/docs/home/getting-started/vocabulary#fallback-value), and an instance tag. In the example below, the fallback value is false. The instance tag is optional. After the context is evaluated, you can view it on the **Contexts** list.
Erlang SDK v2.0+Erlang SDK v1.x
```
Flag = ldclient:variation(<<"flag-key-123abc">>, #{key => <<"context-key-123abc">>,}, false, your_instance) 
--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Go
###### Expand Go code sample
The `Variation` methods determine which variation of a flag LaunchDarkly serves to a specific context:
 * If you are working with an `LDScopedClient`, the context is the multi-context comprised of all contexts currently in the scoped client.
 * If you are working with the `LDClient`, the context is the one you pass to the `Variation` methods.
##### LDScopedClient is in beta
`LDScopedClient` is in beta. It is still undergoing testing and active development. Its functionality may change without notice, including becoming backwards incompatible.
In either case, the `Variation` methods also take the feature flag key and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In Go, there is a `Variation` method for each type:
 * [`BoolVariation`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.BoolVariation)
 * [`IntVariation`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.IntVariation)
 * [`Float64Variation`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.Float64Variation)
 * [`StringVariation`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.StringVariation)
 * [`JSONVariation`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.JSONVariation), which can be any JSON type.
Here is an example:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| result, _ := scopedClient.BoolVariation("flag-key-123abc", false)
---|--- 
2
| 
3
| // result is now true or false depending on the setting of this boolean feature flag
4
| // LDScopedClient is in beta and may change without notice.
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more about constructing the context, read [Context configuration](/docs/sdk/features/context-config#go).
If you are using OpenTelemetry, then instead of using the `Variation` method for each type, you must use the `VariationCtx` method for each type. For example, use `BoolVariationCtx` rather than `BoolVariation`. The methods are the same except that the `VariationCtx` methods also require a Go context parameter. This Go context is used in the hook implementation that provides OpenTelemetry support. To learn more, read [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#go).
### Haskell
###### Expand Haskell code sample
The `variation` family of functions determine which variation of a flag LaunchDarkly serves to a specific context. The functions take a `Client`, `Context`, feature flag key, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In Haskell, there is a `variation` function for each type:
 * [`boolVariation`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:boolVariation)
 * [`intVariation`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:intVariation)
 * [`doubleVariation`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:doubleVariation)
 * [`stringVariation`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:stringVariation)
 * [`jsonVariation`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:jsonVariation)
Here is an example:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| myBoolVariation <- boolVariation client "flag-key-123abc" context False
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more about constructing the context, read [Context configuration](/docs/sdk/features/context-config#haskell).
### Java
###### Expand Java code sample
The `variation` methods determine which variation of a flag LaunchDarkly serves to a specific context. The `variation` methods take the feature flag key, an [`LDContext`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/LDContext.html), and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In Java, there is a `variation` method for each type:
 * [`boolVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#boolVariation-java.lang.String-com.launchdarkly.sdk.LDContext-boolean-)
 * [`intVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#intVariation-java.lang.String-com.launchdarkly.sdk.LDContext-int-)
 * [`doubleVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#doubleVariation-java.lang.String-com.launchdarkly.sdk.LDContext-double-)
 * [`stringVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#stringVariation-java.lang.String-com.launchdarkly.sdk.LDContext-java.lang.String-)
 * [`jsonValueVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#jsonValueVariation-java.lang.String-com.launchdarkly.sdk.LDContext-com.launchdarkly.sdk.LDValue-), which can be of any JSON type.
Here is an example:
Java SDK v6.0
```
1
| boolean value = client.boolVariation("flag-key-123abc", context, false);
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly.
### Lua
###### Expand Lua code sample
The `variation` family of functions determine which variation of a flag LaunchDarkly serves to a specific context. The functions take a context, feature flag key, and [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In Lua, there is a `variation` function for each type, such as `boolVariation` or `stringVariation`.
Here is an example:
Lua SDK v2Lua SDK v1.x
```
1
| local value = client:boolVariation(context, "flag-key-123abc", false)
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more, read [`boolVariation`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#boolVariation).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to a specific context. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
Node.js SDK v7.0
```
1
| client.variation('flag-key-123abc', context, false,
---|--- 
2
| (err, value) => {
3
| // check value and proceed accordingly
4
| });
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
### PHP
###### Expand PHP code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to a specific context. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
PHP SDK v5.0
```
1
| $value = $client->variation($key, $context, false);
---|--- 
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
### Python
###### Expand Python code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to a specific context. `variation` calls take the feature flag key, a `Context`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
Python SDK v8.0
```
1
| show_feature = ldclient.get().variation("your.feature.key", context, False)
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more about constructing the context, read [Context configuration](/docs/sdk/features/context-config#python).
### Ruby
###### Expand Ruby code sample
The `variation` method determines which variation of a flag LaunchDarkly serves to a specific context. `variation` calls take the feature flag key, an `LDContext` or user hash, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
Ruby SDK v7.0
```
1
| value = client.variation("your.feature.key", context, false)
---|--- 
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more about constructing the context, read [Context configuration](/docs/sdk/features/context-config#ruby).
### Rust
###### Expand Rust code sample
The `variation` methods determine which variation of a flag LaunchDarkly serves to a specific context. `variation` methods take a `Context`, the feature flag key, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
In Rust, there is a `variation` method for each type:
 * [`bool_variation`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.bool_variation),
 * [`int_variation`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.int_variation),
 * [`float_variation`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.float_variation),
 * [`str_variation`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.str_variation) for strings, and
 * [`json_variation`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.json_variation), which can be any JSON type.
Here is an example:
Rust SDK v1
```
1
| let result = client.bool_variation(&context, "your.feature.key", false);
---|--- 
2
| // result is now true or false depending on the setting of this boolean feature flag
```
You must provide all relevant context attributes for each evaluation for your targeting rules to apply correctly. To learn more about constructing the context, read [Context configuration](/docs/sdk/features/context-config#rust).
## Edge SDKs
This feature is available for all of our edge SDKs:
 * [Akamai](/docs/sdk/features/evaluating#akamai)
 * [Cloudflare](/docs/sdk/features/evaluating#cloudflare)
 * [Fastly](/docs/sdk/features/evaluating#fastly)
 * [Vercel](/docs/sdk/features/evaluating#vercel)
### Akamai
###### Expand Akamai code sample
The `variation` method determines which variation of a feature flag a context receives. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
TypeScript
```
1
| const flagValue = await client.variation('flag-key-123abc', context, false);
---|--- 
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`variation`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#variation). The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariation`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#boolVariation), [`stringVariation`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#stringVariation), [`numberVariation`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#numberVariation), [`jsonVariation`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#jsonVariation).
Every time you evaluate a flag, the SDK fetches the flag data from the EdgeKV store. Your Akamai resource tier may limit how many of these queries you can make while a single worker handler is being executed. To learn more, read [Understand resource limits and caching options](/docs/sdk/edge/akamai#understand-resource-limits-and-caching-options).
### Cloudflare
###### Expand Cloudflare code sample
The `variation` method determines which variation of a feature flag a context receives. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
TypeScript
```
1
| const flagValue = await client.variation('flag-key-123abc', context, false);
---|--- 
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`variation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#variation). The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#boolVariation), [`stringVariation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#stringVariation), [`numberVariation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#numberVariation), [`jsonVariation`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#jsonVariation).
### Fastly
###### Expand Fastly code sample
The `variation` method determines which variation of a feature flag a context receives. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
TypeScript
```
1
| const flagValue = await client.variation('flag-key-123abc', context, false);
---|--- 
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`variation`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#variation).
The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariation`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#boolVariation), [`stringVariation`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#stringVariation), [`numberVariation`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#numberVariation), [`jsonVariation`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#jsonVariation).
### Vercel
###### Expand Vercel code sample
The `variation` method determines which variation of a feature flag a context receives. `variation` calls take the feature flag key, an `LDContext`, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). After the context is evaluated, you can view it on the **Contexts** list.
Here is an example:
TypeScript
```
1
| const flagValue = await client.variation('flag-key-123abc', context, false);
---|--- 
```
You must provide all relevant attributes for each evaluation for your targeting rules to apply correctly.
To learn more, read [`variation`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#variation). The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariation`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#boolVariation), [`stringVariation`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#stringVariation), [`numberVariation`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#numberVariation), [`jsonVariation`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#jsonVariation).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs