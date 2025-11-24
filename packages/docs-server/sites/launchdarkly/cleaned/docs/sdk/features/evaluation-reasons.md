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
This topic explains how to use the flag evaluation reason feature to get more information about the flag variations LaunchDarkly serves to contexts or users.
You can find the evaluation reason for a specific context on its details page:
![The "Expected variations" on the details page for a context.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ea4f766c1fff171dcc5158d684b52ecba4277c68e280f8de2547d59afb55a91b/assets/images/auto/context-details-expected-variations.auto.png)
The "Expected variations" on the details page for a context.
To learn more about how LaunchDarkly determines why a context or user receives a given flag variation, read [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons) in the [SDK Concepts](/docs/sdk/concepts) section. For additional guidance, read [How to use the SDK’s “evaluation reasons” feature to troubleshoot flag evaluation](https://support.launchdarkly.com/hc/en-us/articles/14514208910875-How-to-use-the-SDK-s-evaluation-reasons-feature-to-troubleshoot-flag-evaluation).
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/evaluation-reasons#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/evaluation-reasons#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/evaluation-reasons#edge-sdks)
## Client-side SDKs
##### An evaluation reason configuration option is required
In client-side SDKs, you must enable an evaluation reason configuration option for this feature to work. The code samples below include this option. To learn more about configuration options, read [Configuration](/docs/sdk/features/config).
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/evaluation-reasons#net-client-side)
 * [Android](/docs/sdk/features/evaluation-reasons#android)
 * [C++ (client-side)](/docs/sdk/features/evaluation-reasons#c-client-side)
 * [Electron](/docs/sdk/features/evaluation-reasons#electron)
 * [Flutter](/docs/sdk/features/evaluation-reasons#flutter)
 * [iOS](/docs/sdk/features/evaluation-reasons#ios)
 * [JavaScript](/docs/sdk/features/evaluation-reasons#javascript)
 * [Node.js (client-side)](/docs/sdk/features/evaluation-reasons#nodejs-client-side)
 * [React Native](/docs/sdk/features/evaluation-reasons#react-native)
 * [Roku](/docs/sdk/features/evaluation-reasons#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
The `VariationDetail` methods, such as `BoolVariationDetail`, work the same as `Variation`, but also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
.NET SDK v4.0 (C#).NET SDK v3.0 (C#)
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .EvaluationReasons(true)
4
| .Build();
5
| LdClient client = LdClient.Init(config, context);
6
| 
7
| EvaluationDetail<bool> detail =
8
| client.BoolVariationDetail("bool-flag-key-123abc", false);
9
| // or StringVariationDetail for a string-valued flag, and so on.
10
| 
11
| bool value = detail.Value;
12
| int? index = detail.VariationIndex;
13
| EvaluationReason reason = detail.Reason;
```
To learn more about the `VariationDetail` methods, read [`EvaluationDetail`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.EvaluationDetail-1.html) and [`BoolVariationDetail`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_LdClient_BoolVariationDetail_). To learn more about the configuration option, read [`EvaluationReasons`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.ConfigurationBuilder.html#LaunchDarkly_Sdk_Client_ConfigurationBuilder_EvaluationReasons_System_Boolean_).
### Android
###### Expand Android code sample
The `variationDetail` methods, such as `boolVariationDetail`, work the same as `variation`. They also provide additional “reason” information about how a flag value was calculated, such as if the context matched a specific rule. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Android SDK v5.x (Java)Android SDK v4.x (Java)
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .evaluationReasons(true)
4
| .build();
5
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, secondsToBlock);
6
| 
7
| EvaluationDetail<Boolean> detail =
8
| client.boolVariationDetail("flag-key-123abc", false);
9
| // or stringVariationDetail for a string-valued flag, etc.
10
| 
11
| boolean value = detail.getValue();
12
| Integer index = detail.getVariationIndex();
13
| EvaluationReason reason = detail.getReason();
```
To learn more about the `variationDetail` methods, read [`EvaluationDetail`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/EvaluationDetail.html) and [`getVariationIndex`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/EvaluationDetail.html#getVariationIndex--). To learn more about the configuration option, read [`evaluationReasons`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#evaluationReasons\(boolean\)).
Here is an example of how to access the details of a reason object:
Java
```
1
| void printReason(EvaluationReason reason) {
---|--- 
2
| switch (reason.getKind()) {
3
| case OFF:
4
| Timber.d("it's off");
5
| break;
6
| case FALLTHROUGH:
7
| Timber.d("fell through");
8
| break;
9
| case TARGET_MATCH:
10
| Timber.d("targeted");
11
| break;
12
| case RULE_MATCH:
13
| EvaluationReason.RuleMatch rm =
14
| (EvaluationReason.RuleMatch)reason;
15
| Timber.d("matched rule %d/%s",
16
| rm.getRuleIndex(),
17
| rm.getRuleId());
18
| break;
19
| case PREREQUISITE_FAILED:
20
| EvaluationReason.PrerequisiteFailed pf =
21
| (EvaluationReason.PrerequisiteFailed)reason;
22
| Timber.d("prereq failed: %s", pf.getPrerequisiteKey());
23
| break;
24
| case ERROR:
25
| EvaluationReason.Error e = (EvaluationReason.Error)reason;
26
| Timber.d("error: %s", e.getErrorKind());
27
| }
28
| // or, if all you want is a simple descriptive string:
29
| Timber.d(reason.toString());
30
| }
```
To learn more, read [`EvaluationReason`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/EvaluationReason.html).
### C++ (client-side)
###### Expand C++ (client-side) code sample
You can request and then programmatically inspect the reason for a particular feature flag evaluation.
The `detail.Reason()` response is described in [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons).
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| auto detail = client.BoolVariationDetail("flag-key-123abc", false);
---|--- 
2
| if (detail.Value()) {
3
| std::cout << "Value was true!" << std::endl;
4
| } else {
5
| // it was false, let's find out why.
6
| if (auto reason = detail.Reason(); reason.has_value()) {
7
| // reason might not be present, so we have to check
8
| std::cout << "Value was false because of " << reason.value() << std::endl;
9
| } else {
10
| std::cout << "No reason provided to explain why flag was false!" << std::endl;
11
| }
12
| }
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1EvaluationDetail.html) and [`BoolVariationDetail`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#a81d57edf13a87562d328174d7f9d6f09).
### Electron
###### Expand Electron code sample
The `variationDetail` methods work the same as `variation`. They also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
JavaScriptTypeScript
```
1
| const { value, variationIndex, reason } = client.variationDetail('flag-key-123abc', false);
---|--- 
```
To learn more about the `variationDetail` methods, read [`LDEvaluationDetail`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldevaluationdetail.html) and [`variationDetail`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldelectronmainclient.html#variationdetail). To learn more about the configuration option, read [`LDEvaluationReason`](https://launchdarkly.github.io/electron-client-sdk/index.html#ldevaluationreason).
### Flutter
###### Expand Flutter code sample
The `variationDetail` methods, such as `boolVariationDetail`, work the same as `variation`. They also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
To enable this functionality, set the `evaluationReasons` configuration option to `true` when you initialize the client.
Here is an example:
Flutter SDK v4Flutter SDK v3.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| dataSourceConfig: DataSourceConfig(
5
| evaluationReasons: true
6
| ),
7
| );
8
| 
9
| // initialize client and context
10
| 
11
| LDEvaluationDetail<bool> detail =
12
| client.boolVariationDetail('flag-key-123abc', false);
13
| // or stringVariationDetail for a string-valued flag, and so on.
14
| 
15
| bool value = detail.value;
16
| int index = detail.variationIndex;
17
| LDEvaluationReason reason = detail.reason;
```
To learn more about the `variationDetail` methods, read [`LDEvaluationDetail`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDEvaluationDetail-class.html) and [`boolVariationDetail`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/boolVariationDetail.html). To learn more about the configuration option, read [`evaluationReasons`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/DataSourceConfig/evaluationReasons.html).
Here is an example of how to access the details of a reason object:
Dart
```
1
| void printReason(LDEvaluationReason reason) {
---|--- 
2
| switch (reason.kind) {
3
| case LDKind.OFF:
4
| print("it's off");
5
| break;
6
| case LDKind.FALLTHROUGH:
7
| print('fell through');
8
| break;
9
| case LDKind.TARGET_MATCH:
10
| print('targeted');
11
| break;
12
| case LDKind.RULE_MATCH:
13
| print('matched rule: ${reason.ruleIndex} ${reason.ruleId}');
14
| break;
15
| case LDKind.PREREQUISITE_FAILED:
16
| print('prereq failed: ${reason.prerequisiteKey}');
17
| break;
18
| case LDKind.ERROR:
19
| print('error: ${reason.errorKind}');
20
| break;
21
| default: // LDKind.UNKNOWN
22
| print('unknown service kind');
23
| }
24
| }
```
To learn more, read [`LDEvaluationDetail`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDEvaluationDetail-class.html).
### iOS
###### Expand iOS code sample
The `variationDetail` methods, such as `boolVariationDetail`, work the same as the variation methods. They also provide additional “reason” information about how a flag value was calculated, such as if the user matched a specific rule. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| ldConfig.evaluationReasons = true
---|--- 
2
| LDClient.start(config: ldConfig, context: context)
3
| 
4
| let detail = client.boolVariationDetail(forKey: "flag-key-123abc", defaultValue: false);
5
| 
6
| let value: Bool = detail.value
7
| let variationIndex: Int? = detail.variationIndex
8
| let reason: [String: LDValue]? = detail.reason
```
To learn more about the `variationDetail` methods, read [`LDEvaluationDetail`](https://launchdarkly.github.io/ios-client-sdk/Classes/LDEvaluationDetail.html) and [`boolVariationDetail`](https://launchdarkly.github.io/ios-client-sdk/Classes/LDClient.html#/s:12LaunchDarkly8LDClientC19boolVariationDetail6forKey12defaultValueAA012LDEvaluationF0CySbGSS_SbtF). To learn more about the configuration option, read [`LDConfig`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html).
### JavaScript
###### Expand JavaScript code sample
The `variationDetail` method lets you evaluate a feature flag with the same parameters you would for `variation`. With `variationDetail`, you receive more information about how the value was calculated.
The variation detail returns in an object containing both the result value and a “reason” object which tells you more information about the flag evaluation. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. It also indicates if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
JavaScript SDK 3.x
```
1
| const options = { evaluationReasons: true };
---|--- 
2
| const client = LDClient.initialize('client-side-id-123abc', context, options);
3
| 
4
| try {
5
| client.waitForInitialization(5);
6
| 
7
| // proceed with successfully initialized client:
8
| 
9
| const detail = client.variationDetail('flag-key-123abc', false);
10
| 
11
| const value = detail.value;
12
| const index = detail.variationIndex;
13
| const reason = detail.reason;
14
| 
15
| } catch(err) {
16
| // Client failed to initialized or timed out
17
| // variation() calls return fallback values until initialization completes
18
| }
```
To learn more about the `variationDetail` methods, read [`LDEvaluationDetail`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDEvaluationDetail.html) and [`variationDetail`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#variationDetail). To learn more about the configuration option, read [`evaluationReasons`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#evaluationReasons).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
The `variationDetail` method lets you evaluate a feature flag with the same parameters you would for `variation`. With `variationDetail`, you receive more information about how the value was calculated.
The variation detail returns in an object that contains both the result value and a “reason” object which tells you more information about the flag evaluation. For example, you can find out if the user was individually targeted for the flag or was matched by one of the flag’s rules. It also indicates if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
JavaScript
```
1
| const options = { evaluationReasons: true };
---|--- 
2
| const client = LDClient.initialize('client-side-id-123abc', user, options);
3
| 
4
| const detail = client.variationDetail('flag-key-123abc', false);
5
| 
6
| const value = detail.value;
7
| const index = detail.variationIndex;
8
| const reason = detail.reason;
```
To learn more about the `variationDetail` method, read [`LDEvaluationDetail`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDEvaluationDetail.html) and [`variationDetail`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDClient.html#variationDetail). To learn more about the configuration option, read [`evaluationReasons`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html#evaluationReasons).
### React Native
###### Expand React Native code sample
The `variationDetail` methods work the same way as the [`variation` methods](/docs/sdk/features/evaluating#react-native), and also provide additional information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export. To view this reason information, set the `withReasons` configuration option to `true`.
In React Native, there is a variation detail method for each type, such as `boolVariationDetail` or `stringVariationDetail`. In the React Native SDK version 10, there is also a hook for each type, such as `useBoolVariationDetail` or `useStringVariationDetail`.
Here is an example:
React Native SDK v10, using variation hooksReact Native SDK v10, using variation methods
```
1
| const { reason, value, variationIndex } = useBoolVariationDetail('flag-key-123abc', false);
---|--- 
```
To learn more about the `variationDetail` methods, read [`LDEvaluationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/platform-1.LDEvaluationDetail.html), [`useBoolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/functions/useBoolVariationDetail.html) and [`boolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#boolVariationDetail).
To learn more about the `withReasons` configuration option, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html#withReasons).
The SDK also includes an untyped method to determine the variation of a feature flag and provide information about how the flag value was calculated. To learn more, read [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#variationDetail). We recommend using the strongly typed variation methods, such as `boolVariationDetail`, which perform type checks and handle type errors.
### Roku
###### Expand Roku code sample
For each variation type there is also an associated version that returns the reason a particular value was returned.
Here is an example:
BrightScript
```
1
| config.setUseEvaluationReasons(true)
---|--- 
2
| 
3
| details = launchDarkly.intVariationDetail("flag-key-123abc", 123)
```
These variation methods return an object containing the keys `value`, `reason`, and `variationIndex`. The `value` field is the result of the evaluation. The `reason` field is an object that explains why the result happened, for example details about a rule match. The reason object will always contain a `kind` field. Lastly the `variationIndex` field contains the ID of the particular value returned. This field may be null.
## Server-side SDKs
Unlike client-side SDKs, you do not need to enable an evaluation reason configuration option in server-side SDKs for this feature to work.
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/evaluation-reasons#net-server-side)
 * [Apex](/docs/sdk/features/evaluation-reasons#apex)
 * [C++ (server-side)](/docs/sdk/features/evaluation-reasons#c-server-side)
 * [Erlang](/docs/sdk/features/evaluation-reasons#erlang)
 * [Go](/docs/sdk/features/evaluation-reasons#go)
 * [Haskell](/docs/sdk/features/evaluation-reasons#haskell)
 * [Java](/docs/sdk/features/evaluation-reasons#java)
 * [Lua](/docs/sdk/features/evaluation-reasons#lua)
 * [Node.js (server-side)](/docs/sdk/features/evaluation-reasons#nodejs-server-side)
 * [PHP](/docs/sdk/features/evaluation-reasons#php)
 * [Python](/docs/sdk/features/evaluation-reasons#python)
 * [Ruby](/docs/sdk/features/evaluation-reasons#ruby)
 * [Rust](/docs/sdk/features/evaluation-reasons#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The `VariationDetail` methods, such as [`BoolVariationDetail`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_BoolVariationDetail_), work the same as the `Variation` methods, but also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
.NET SDK v7.0 (C#)
```
1
| EvaluationDetail<bool> detail =
---|--- 
2
| client.BoolVariationDetail("flag-key-123abc", myContext, false);
3
| // or StringVariationDetail for a string-valued flag, etc.
4
| 
5
| bool value = detail.Value;
6
| int? index = detail.VariationIndex;
7
| EvaluationReason reason = detail.Reason;
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.EvaluationDetail-1.html), [`BoolVariationDetail`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_BoolVariationDetail_).
Here is an example of how to access the details of a reason object:
C#
```
1
| void PrintReason(EvaluationReason reason)
---|--- 
2
| {
3
| switch (reason.Kind)
4
| {
5
| case EvaluationReasonKind.OFF:
6
| Console.WriteLine("it's off");
7
| break;
8
| case EvaluationReasonKind.FALLTHROUGH:
9
| Console.WriteLine("fell through");
10
| break;
11
| case EvaluationReasonKind.TARGET_MATCH:
12
| Console.WriteLine("targeted");
13
| break;
14
| case EvaluationReasonKind.RULE_MATCH:
15
| var rm = reason as EvaluationReason.RuleMatch;
16
| Console.WriteLine("matched rule " + rm.RuleIndex + "/" + rm.RuleID);
17
| break;
18
| case EvaluationReasonKind.PREREQUISITE_FAILED:
19
| var pf = reason as EvaluationReason.PrerequisiteFailed;
20
| Console.WriteLine("prereq failed: " + pf.PrerequisiteKey);
21
| break;
22
| case EvaluationReasonKind.ERROR:
23
| var e = reason as EvaluationReason.Error;
24
| Console.WriteLine("error: " + e.ErrorKind);
25
| break;
26
| }
27
| // or, if all you want is a simple descriptive string:
28
| System.out.println(reason.ToString());
29
| }
```
To learn more, read [`EvaluationReason`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.EvaluationReason.html).
### Apex
###### Expand Apex code sample
By passing an `LDClient.EvaluationDetail` object to a variation call you can programmatically inspect the reason for a particular evaluation.
Here is an example:
Apex
```
1
| LDClient.EvaluationDetail details = new LDClient.EvaluationDetail();
---|--- 
2
| 
3
| Boolean value = client.boolVariation(user, 'your.feature.key', false, details);
4
| 
5
| /* inspect details here */
6
| if (details.getReason().getKind() == EvaluationReason.Kind.OFF) {
7
| /* ... */
8
| }
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
You can request and then programmatically inspect the reason for a particular feature flag evaluation.
The `detail.Reason()` response is described in [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons).
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| auto detail = client.BoolVariationDetail(context, "flag-key-123abc", false);
---|--- 
2
| if (detail.Value()) {
3
| std::cout << "Value was true!" << std::endl;
4
| } else {
5
| // it was false, let's find out why
6
| if (auto reason = detail.Reason(); reason.has_value()) {
7
| // reason might not be present, so we have to check
8
| std::cout << "Value was false because of " << reason.value() << std::endl;
9
| } else {
10
| std::cout << "No reason provided to explain why flag was false!" << std::endl;
11
| }
12
| }
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1EvaluationDetail.html).
### Erlang
###### Expand Erlang code sample
The `variation_detail` function is similar to the variation function, but also returns an explanation of the evaluation that you can inspect programmatically.
Here is an example:
Erlang SDK v2.0+Erlang SDK v1.x
```
Flag = ldclient:variation_detail(<<"flag-key-123abc">>, #{key => <<"context-key-123abc">>}, false) 
--- 
```
### Go
###### Expand Go code sample
The `VariationDetail` methods, such as [`BoolVariationDetail`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.BoolVariationDetail), work the same way as `Variation`, but also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted by the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| value, detail, err := scopedClient.BoolVariationDetail("flag-key-123abc", false)
---|--- 
2
| // or StringVariationDetail for a string-valued flag, etc.
3
| // LDScopedClient is in beta and may change without notice.
4
| 
5
| index := detail.VariationIndex
6
| reason := detail.Reason
```
To learn more, read [`EvaluationDetail`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3/ldreason#EvaluationDetail) and [`BoolVariationDetail`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.BoolVariationDetail).
Here is an example of how to access the details of a reason object:
Go SDK v6+
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldreason"
3
| )
4
| 
5
| func PrintReason(reason ldreason.EvaluationReason) {
6
| switch reason.GetKind() {
7
| case ldreason.EvalReasonOff:
8
| fmt.Println("it's off")
9
| case ldreason.EvalReasonFallthrough:
10
| fmt.Println("fell through")
11
| case ldreason.EvalReasonTargetMatch:
12
| fmt.Println("targeted")
13
| case ldreason.EvalReasonRuleMatch:
14
| fmt.Printf("matched rule %d/%s\n", r.GetRuleIndex(), r.GetRuleID())
15
| case ldreason.EvalReasonPrerequisiteFailed:
16
| fmt.Printf("prereq failed: %s\n", r.GetPrerequisiteKey())
17
| case ldreason.EvalReasonError:
18
| fmt.Printf("error: %s\n", r.GetErrorKind())
19
| }
20
| // or, if all you want is a simple descriptive string:
21
| fmt.Println(reason)
22
| }
```
To learn more, read [`EvaluationReason`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3@v3.0.0/ldreason#EvaluationReason).
If you are using OpenTelemetry, then instead of using the `VariationDetail` method for each type, you must use the `VariationDetailCtx` method for each type. For example, use `BoolVariationDetailCtx` rather than `BoolVariationDetail`. The methods are the same except that the `VariationDetailCtx` methods also require a Go context parameter. This Go context is used in the hook implementation that provides OpenTelemetry support. To learn more, read [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#go).
### Haskell
###### Expand Haskell code sample
The `variationDetail` functions are similar to the `variation` functions, but they also return an explanation of the evaluation that is programmatically inspectable.
Here is an example:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| details :: IO (EvaluationDetail Bool)
---|--- 
2
| details = boolVariationDetail client "flag-key-123abc" context False
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#t:EvaluationDetail) and [`boolVariationDetail`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Client.html#v:boolVariationDetail).
### Java
###### Expand Java code sample
The `variationDetail` methods, such as [`boolVariationDetail`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#boolVariationDetail-java.lang.String-com.launchdarkly.sdk.LDContext-boolean-), work the same as `variation`, but also provide additional “reason” information about how a flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Java SDK v6.0
```
1
| import com.launchdarkly.sdk.*;
---|--- 
2
| 
3
| EvaluationDetail<Boolean> detail =
4
| client.boolVariationDetail("flag-key-123abc", context, false);
5
| // or stringVariationDetail for a string-valued flag, and so on.
6
| 
7
| boolean value = detail.getValue();
8
| int index = detail.getVariationIndex(); // will be < 0 if evaluation failed
9
| EvaluationReason reason = detail.getReason();
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/EvaluationDetail.html) and [`boolVariationDetail`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#boolVariationDetail-java.lang.String-com.launchdarkly.sdk.LDContext-boolean-).
Here is an example of how to access the details of a reason object:
Java
```
1
| void printReason(EvaluationReason reason) {
---|--- 
2
| switch (reason.getKind()) {
3
| case OFF:
4
| System.out.println("it's off");
5
| break;
6
| case FALLTHROUGH:
7
| System.out.println("fell through");
8
| break;
9
| case TARGET_MATCH:
10
| System.out.println("targeted");
11
| break;
12
| case RULE_MATCH:
13
| EvaluationReason.RuleMatch rm = (EvaluationReason.RuleMatch)reason;
14
| System.out.println("matched rule " + rm.getRuleIndex()
15
| + "/" + rm.getRuleId());
16
| break;
17
| case PREREQUISITE_FAILED:
18
| EvaluationReason.PrerequisiteFailed pf =
19
| (EvaluationReason.PrerequisiteFailed)reason;
20
| System.out.println("prereq failed: " + pf.getPrerequisiteKey());
21
| break;
22
| case ERROR:
23
| EvaluationReason.Error e = (EvaluationReason.Error)reason;
24
| System.out.println("error: " + e.getErrorKind());
25
| }
26
| // or, if all you want is a simple descriptive string:
27
| System.out.println(reason.toString());
28
| }
```
To learn more, read [`EvaluationReason`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/EvaluationReason.html).
### Lua
###### Expand Lua code sample
By using the `*VariationDetail` family of variation calls you can programmatically inspect the reason for a particular evaluation:
Lua SDK v2Lua SDK v1.x
```
1
| local details = client:boolVariationDetail(client, context, "flag-key-123abc", false);
---|--- 
2
| 
3
| -- inspect details here
4
| if details.reason == "FLAG_NOT_FOUND" then
5
| end
```
To learn more, read [`boolVariationDetail`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#boolVariationDetail).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The `variationDetail` method lets you evaluate a feature flag (using the same parameters as you would for `variation`) and receive more information about how the value was calculated.
The variation detail is returned in an object that contains both the result value and a “reason” object which will tell you, for instance, if the context was individually targeted for the flag or was matched by one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Node.js SDK v7.x and later (JavaScript)Node.js SDK v7.x and later (TypeScript)
```
1
| var detail = client.variationDetail('flag-key-123abc', context, false);
---|--- 
2
| 
3
| var value = detail.value;
4
| var index = detail.variationIndex;
5
| var reason = detail.reason;
```
To learn more, read [`LDEvaluationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/platform-1.LDEvaluationDetail.html) and [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDClient.html#variationDetail).
Here is an example of how to access the details of a reason object:
JavaScript
```
1
| function printReason(reason) {
---|--- 
2
| switch(reason.kind) {
3
| case "OFF":
4
| console.log("it's off");
5
| break;
6
| case "FALLTHROUGH":
7
| console.log("fell through");
8
| break;
9
| case "TARGET_MATCH":
10
| console.log("targeted");
11
| break;
12
| case "RULE_MATCH":
13
| console.log("matched rule " + reason.ruleIndex + ", " + reason.ruleId);
14
| break;
15
| case "PREREQUISITE_FAILED":
16
| console.log("prereq failed: " + reason.prerequisiteKey);
17
| break;
18
| case "ERROR":
19
| console.log("error: " + reason.errorKind);
20
| break;
21
| }
22
| }
```
To learn more, read [`LDEvaluationReason`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/platform-1.LDEvaluationReason.html).
### PHP
###### Expand PHP code sample
The `variationDetail` method lets you evaluate a feature flag (using the same parameters as you would for `variation`) and receive more information about how the value was calculated.
The variation detail is returned in an object that contains both the result value and a “reason” object which will tell you, for example, if the context was individually targeted for the flag or was matched by one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
PHP SDK v5.0
```
1
| $detail = $client->variationDetail("flag-key-123abc", $myContext, false);
---|--- 
2
| 
3
| $value = $detail->getValue();
4
| $index = $detail->getVariationIndex();
5
| $reason = $detail->getReason();
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-EvaluationDetail.html) and [`variationDetail`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method_variationDetail).
Here is an example of how to access the details of a reason object:
PHP SDK v5.0 and earlier
```
1
| function printReason($reason) {
---|--- 
2
| switch ($reason->getKind()) {
3
| case EvaluationReason::OFF:
4
| echo("it's off");
5
| break;
6
| case EvaluationReason::FALLTHROUGH:
7
| echo("fell through");
8
| break;
9
| case EvaluationReason::TARGET_MATCH:
10
| echo("targeted");
11
| break;
12
| case EvaluationReason::RULE_MATCH:
13
| echo("matched rule " . $reason->getRuleIndex() .
14
| "/" . $reason->getRuleId());
15
| break;
16
| case EvaluationReason::PREREQUISITE_FAILED:
17
| echo("prereq failed: " . $reason->getPrerequisiteKey());
18
| break;
19
| case EvaluationReason::ERROR:
20
| echo("error: " . $reason->getErrorKind());
21
| break;
22
| }
23
| // or, if all you want is a simple descriptive string:
24
| echo $reason;
25
| }
```
To learn more, read [`EvaluationReason`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-EvaluationReason.html).
### Python
###### Expand Python code sample
The `variation_detail` method lets you evaluate a feature flag with the same parameters as you would for `variation`. You can use this method to receive more information about how the value was calculated.
The variation detail is returned in an object that contains both the result value and a “reason” object which will tell you, for instance, if the context was individually targeted for the flag or was matched by one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Python SDK v8.0
```
1
| detail = client.variation_detail("flag-key-123abc", my_context, False)
---|--- 
2
| value = detail.value
3
| index = detail.variation_index
4
| reason = detail.reason
```
To learn more, read [`EvaluationDetail`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.evaluation.EvaluationDetail) and [`variation_detail`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.variation_detail).
Here is an example of how to access the details of a reason object:
Python
```
1
| def print_reason(reason):
---|--- 
2
| kind = reason["kind"]
3
| if kind == "OFF":
4
| print "it's off"
5
| elif kind == "FALLTHROUGH":
6
| print "fell through"
7
| elif kind == "TARGET_MATCH":
8
| print "targeted"
9
| elif kind == "RULE_MATCH":
10
| print "matched rule %d/%s" % (reason["ruleIndex"], reason["ruleId"])
11
| elif kind == "PREREQUISITE_FAILED":
12
| print "prereq failed: %s" % reason["prerequisiteKey"]
13
| elif kind == "ERROR":
14
| print "error: %s" % reason["errorKind"]
```
To learn more, read [`EvaluationDetail.reason`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.evaluation.EvaluationDetail.reason).
### Ruby
###### Expand Ruby code sample
The `variation_detail` method lets you evaluate a feature flag (using the same parameters as you would for `variation`) and receive more information about how the value was calculated.
The variation detail is returned in an object that contains both the result value and a “reason” object which will tell you, for instance, if the context was individually targeted for the flag or was matched by one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Ruby SDK v7.0
```
1
| detail = client.variation_detail("flag-key-123abc", my_context, false)
---|--- 
2
| value = detail.value
3
| index = detail.variation_index
4
| reason = detail.reason
```
To learn more, read [`EvaluationDetail`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/EvaluationDetail.html) and [`variation_detail`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#variation_detail-instance_method).
Here is an example of how to access the details of a reason object:
Ruby
```
1
| def print_reason(reason)
---|--- 
2
| case reason[:kind]
3
| when "OFF"
4
| puts "it's off"
5
| when "FALLTHROUGH"
6
| puts "fell through"
7
| when "TARGET_MATCH"
8
| puts "targeted"
9
| when "RULE_MATCH"
10
| puts "matched rule #{reason[:ruleIndex]}/#{reason[:ruleId]}"
11
| when "PREREQUISITE_FAILED"
12
| puts "prereq failed: #{reason[:prerequisiteKey]}"
13
| when "ERROR"
14
| puts "error: #{reason[:errorKind]}"
15
| end
16
| end
```
To learn more, read [`EvaluationDetail.reason`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/EvaluationDetail.html#reason-instance_method).
### Rust
###### Expand Rust code sample
The `variation_detail` methods (for example, [`bool_variation_detail`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.bool_variation_detail)) let you evaluate a feature flag, using the same parameters as you would for `variation`, and receive more information about how the flag value was calculated. For example, you can find out if the context was individually targeted for the flag or was matched by one of the flag’s rules. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
Rust SDK v1
```
1
| let detail = client.bool_variation_detail(&context, "flag-key-123abc", false);
---|--- 
2
| 
3
| let value = detail.value;
4
| let index = detail.variation_index;
5
| let reason = detail.reason;
```
To learn more, read [`variation_detail`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.variation_detail) and [`bool_variation_detail`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.bool_variation_detail).
Here is an example of how to access the details of a reason object:
Rust SDK v1
```
1
| fn print_reason(reason: Reason) {
---|--- 
2
| match reason {
3
| Reason::Off => println!("it's off"),
4
| Reason::Fallthrough { .. } => println!("fell through"),
5
| Reason::TargetMatch => println!("targeted"),
6
| Reason::RuleMatch {
7
| rule_index,
8
| rule_id,
9
| ..
10
| } => println!("matched rule {}/{}", rule_index, rule_id),
11
| Reason::PrerequisiteFailed { prerequisite_key } => {
12
| println!("prereq failed: {}", prerequisite_key)
13
| }
14
| Reason::Error { error } => println!("error: {:?}", error),
15
| };
16
| }
```
To learn more, read [`Reason`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/enum.Reason.html).
## Edge SDKs
This feature is available for all of our edge SDKs:
 * [Akamai](/docs/sdk/features/evaluation-reasons#akamai)
 * [Cloudflare](/docs/sdk/features/evaluation-reasons#cloudflare)
 * [Fastly](/docs/sdk/features/evaluation-reasons#fastly)
 * [Vercel](/docs/sdk/features/evaluation-reasons#vercel)
### Akamai
###### Expand Akamai code sample
The `variationDetail` method lets you evaluate a feature flag using the same parameters as you would for `variation` and receive more information about how the value was calculated.
The SDK returns the variation detail in an object that contains both the result value and a `reason` object. These tell you more information. For example, they can tell you if the flag individually targeted the context, or if the context matched one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the `reason` data programmatically.
Here is an example:
TypeScript
```
1
| const { value, variationIndex, reason } = await client.variationDetail(flagKey, context, false);
---|--- 
```
To learn more, read [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#variationDetail), [`LDEvaluationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/index.html#LDEvaluationDetail) and [`LDEvaluationReason`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/index.html#LDEvaluationReason).
The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#boolVariationDetail), [`stringVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#stringVariationDetail), [`numberVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#numberVariationDetail), [`jsonVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDClient.html#jsonVariationDetail).
Every time you evaluate a flag, the SDK fetches the flag data from the EdgeKV store. Your Akamai resource tier may limit how many of these queries you can make while a single worker handler is being executed. To learn more, read [Understand resource limits and caching options](/docs/sdk/edge/akamai#understand-resource-limits-and-caching-options).
### Cloudflare
###### Expand Cloudflare code sample
The `variationDetail` method lets you evaluate a feature flag using the same parameters as you would for `variation` and receive more information about how the value was calculated.
The SDK returns the variation detail in an object that contains both the result value and a “reason” object. These tell you, for instance, if the flag individually targeted the context or if the context matched one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
TypeScript
```
1
| const { value, variationIndex, reason } = await client.variationDetail(flagKey, context, false);
---|--- 
```
To learn more, read [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#variationDetail), [`LDEvaluationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDEvaluationDetail.html) and [`LDEvaluationReason`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDEvaluationDetail.html#reason).
The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#boolVariationDetail), [`stringVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#stringVariationDetail), [`numberVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#numberVariationDetail), [`jsonVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#jsonVariationDetail).
### Fastly
###### Expand Fastly code sample
The `variationDetail` method lets you evaluate a feature flag using the same parameters as you would for `variation` and receive more information about how the value was calculated.
The SDK returns the variation detail in an object that contains both the result value and a “reason” object. These tell you more information. For example, they can tell you if the flag individually targeted the context, or if the context matched one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
TypeScript
```
1
| const { value, variationIndex, reason } = await client.variationDetail('flag-key-123abc', context, false);
---|--- 
```
To learn more, read [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#variationDetail) and [`LDEvaluationReason`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/interfaces/LDEvaluationReason.html).
The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#boolVariationDetail), [`stringVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#stringVariationDetail), [`numberVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#numberVariationDetail), [`jsonVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#jsonVariationDetail).
### Vercel
###### Expand Vercel code sample
The `variationDetail` method lets you evaluate a feature flag using the same parameters as you would for `variation` and receive more information about how the value was calculated.
The SDK returns the variation detail in an object that contains both the result value and a “reason” object. These tell you more information. For example, they can tell you if the flag individually targeted the context, or if the context matched one of the flag’s rules. It will also indicate if the flag returned the default value due to an error. You can examine the “reason” data programmatically, or, if you capture detailed analytics events for flags, view it with Data Export.
Here is an example:
TypeScript
```
1
| const { value, variationIndex, reason } = await client.variationDetail(flagKey, context, false);
---|--- 
```
To learn more, read [`variationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#variationDetail), [`LDEvaluationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/platform-1.LDEvaluationDetail.html) and [`LDEvaluationReason`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/platform-1.LDEvaluationReason.html).
The `LDClient` also provides typed variation methods for type-safe usage in TypeScript: [`boolVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#boolVariationDetail), [`stringVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#stringVariationDetail), [`numberVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#numberVariationDetail), [`jsonVariationDetail`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#jsonVariationDetail).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs