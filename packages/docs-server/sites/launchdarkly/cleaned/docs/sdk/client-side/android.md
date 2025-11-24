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
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Import the SDK](#import-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Shut down the client](#shut-down-the-client)
 * [Data collection](#data-collection)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 5 of the Android SDK introduces optional automatic collection of environment attributes**. To learn more about upgrading, read [Android SDK 4.x to 5.0 migration guide](/docs/sdk/client-side/android/migration-4-to-5).
## Overview
This topic documents how to get started with the Android SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/android-client-sdk/) 
GitHub repository | [android-client-sdk](https://github.com/launchdarkly/android-client-sdk) 
Sample application | [Android](https://github.com/launchdarkly/hello-android) 
Published module | [Maven](https://mvnrepository.com/artifact/com.launchdarkly/launchdarkly-android-client-sdk) 
##### SDK version compatibility
The LaunchDarkly Android SDK is compatible with Android SDK versions 21 and higher (Android 5.0, Lollipop).
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your Android application:
 * [Install the SDK](/docs/sdk/client-side/android#install-the-sdk)
 * [Import the SDK](/docs/sdk/client-side/android#import-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/android#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/client-side/android#evaluate-a-flag)
### Install the SDK
First, declare a dependency on the LaunchDarkly Android SDK.
We recommend making the LaunchDarkly [observability plugin](/docs/sdk/observability) available as well. This plugin collects and sends observability data to LaunchDarkly. This means you can review error monitoring and logs from within the LaunchDarkly UI. It requires the Android SDK version 5.9 or later.
Here’s how:
Gradle GroovyGradle Kotlin
```
1
| implementation 'com.launchdarkly:launchdarkly-android-client-sdk:5.+'
---|--- 
2
| 
3
| // optional observability plugin, requires LaunchDarkly Android Client SDK v5.9+
4
| implementation 'com.launchdarkly:launchdarkly-observability-android:0.5.0'
```
The SDK uses [AndroidX from Jetpack](https://developer.android.com/jetpack/androidx). If your project does not use AndroidX, read [Android’s migration guide](https://developer.android.com/jetpack/androidx/migrate).
##### Using ProGuard or R8
If you use ProGuard or R8, the `aar` artifact should automatically include the configuration for the Android SDK. If this is not the case for your build, include the Proguard configuration lines from [consumer-proguard-rules.pro](https://github.com/launchdarkly/android-client-sdk/blob/master/launchdarkly-android-client-sdk/consumer-proguard-rules.pro) into your proguard file.
### Import the SDK
Next, import the LaunchDarkly client in your application code:
JavaKotlin
```
1
| import com.launchdarkly.sdk.*;
---|--- 
2
| import com.launchdarkly.sdk.android.*;
3
| 
4
| // optional observability plugin, requires LaunchDarkly Android Client SDK v5.9+
5
| import com.launchdarkly.observability.plugin.Observability
6
| import com.launchdarkly.sdk.android.integrations.Plugin
```
### Initialize the client
After you install the SDK, create a single, shared instance of `LDClient`. To create a client instance, you need your environment’s mobile key and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### Android SDK credentials
The Android SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
We recommend calling the client initialization method with a timeout of zero seconds. This allows you to use the client immediately. The app stores flags from the previous launch on the device and retrieves them for immediate use. The client connects in the background and continually updates itself with the latest flags.
Here’s how to create the client:
Android SDK v5.x (Java)Android SDK v5.x (Kotlin)Android SDK v4.x (Java)Android SDK v4.x (Kotlin)
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| // optional observability plugin, requires LaunchDarkly Android Client SDK v5.9+
4
| .plugins(Components.plugins().setPlugins(
5
| Collections.singletonList<Plugin>(Observability(this.getApplication()))
6
| ))
7
| // other options
8
| .build();
9
| 
10
| // You'll need this context later, but you can ignore it for now.
11
| LDContext context = LDContext.create("context-key-123abc");
12
| 
13
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, 0);
```
If you need to, you can block for a short period of time until the SDK retrieves the latest feature flags from LaunchDarkly by using a non-zero value for the timeout parameter in the initialization call. However, calling blocking code from the main thread in an Android app is not a best practice, and we do not recommend it. Blocking until the SDK retrieves the latest feature flags from LaunchDarkly will cause your app never to load if there is a connectivity problem. If you must use a non-zero timeout parameter, we recommend setting it for five seconds or fewer.
To learn more about the specific configuration options available in this SDK, read [`LDConfig.Builder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html).
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you should use the multiple environments feature. To learn more, read [Multiple environments](/docs/sdk/features/multiple-environments#android).
### Evaluate a flag
After you create the `client`, you can use it to check which variation a particular context will receive for a feature flag.
Here’s how:
JavaKotlin
```
1
| boolean showFeature = client.boolVariation(flagKey, true);
---|--- 
2
| if (showFeature) {
3
| // Application code to show the feature
4
| }
5
| else {
6
| // The code to run if the feature is off
7
| }
```
##### Making feature flags available to this SDK
You must make feature flags available to mobile SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the context will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Mobile key** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Mobile key** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#android).
## Data collection
The data collected by the Android SDK persists until the number of cached contexts exceeds a limit. When you call `identify`, the number of cached contexts increments. Eventually, the number of cached contexts exceeds `maxCachedContexts`. When that happens, the SDK deletes context data in excess of `maxCachedContext`, starting with the oldest context first.
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#android)
 * [Automatic environment attributes](/docs/sdk/features/environment-attributes#android)
 * [Configuration](/docs/sdk/features/config#android), including
 * [Application metadata configuration](/docs/sdk/features/app-config#android)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#android)
 * [Context configuration](/docs/sdk/features/context-config#android)
 * [Evaluating flags](/docs/sdk/features/evaluating#android)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#android)
 * [Flushing events](/docs/sdk/features/flush#android)
 * [Getting all flags](/docs/sdk/features/all-flags#android)
 * [Hooks](/docs/sdk/features/hooks#android)
 * [Identifying and changing contexts](/docs/sdk/features/identify#android)
 * [Logging configuration](/docs/sdk/features/logging#android)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#android)
 * [Multiple environments](/docs/sdk/features/multiple-environments#android)
 * [Observability](/docs/sdk/observability/android)
 * [Offline mode](/docs/sdk/features/offline-mode#android)
 * [Private attributes](/docs/sdk/features/private-attributes#android)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#android)
 * [Sending custom events](/docs/sdk/features/events#android)
 * [Shutting down](/docs/sdk/features/shutdown#android)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#android)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs