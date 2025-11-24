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
 * [Prerequisites and dependencies](#prerequisites-and-dependencies)
 * [Get started](#get-started)
 * [Install the plugin](#install-the-plugin)
 * [Initialize the client](#initialize-the-client)
 * [Configure the plugin options](#configure-the-plugin-options)
 * [Configure additional instrumentations](#configure-additional-instrumentations)
 * [Configure session replay](#configure-session-replay)
 * [Session replay configuration options](#session-replay-configuration-options)
 * [Privacy options](#privacy-options)
 * [Sensitive keywords](#sensitive-keywords)
 * [Common privacy configurations](#common-privacy-configurations)
 * [Custom masking with MaskMatcher](#custom-masking-with-maskmatcher)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the Android SDK.
The Android SDK supports the **observability plugin** for error monitoring, logging, tracing, and **session replay**.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-android/) 
GitHub repository | [@launchdarkly/observability-android](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability-android) 
Published module | [Maven](https://mvnrepository.com/artifact/com.launchdarkly/launchdarkly-observability-android) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [Android SDK](/docs/sdk/client-side/android).
The observability plugin is compatible with the [Android SDK](/docs/sdk/client-side/android), version 5.9.0 and later.
The LaunchDarkly Android SDK is compatible with Android SDK versions 21 and higher (Android 5.0, Lollipop).
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/android#install-the-plugin)
 * [Initialize the Android SDK client](/docs/sdk/observability/android#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/android#configure-the-plugin-options)
 * [Configure additional instrumentations](/docs/sdk/observability/android#configure-additional-instrumentations)
 * [Configure session replay](/docs/sdk/observability/android#configure-session-replay)
 * [Explore supported features](/docs/sdk/observability/android#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/android#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the Android SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies.
Here’s how:
Gradle GroovyGradle Kotlin
```
1
| implementation 'com.launchdarkly:launchdarkly-android-client-sdk:5.+'
---|--- 
2
| implementation 'com.launchdarkly:launchdarkly-observability-android:0.5.0'
```
Then, import the plugin into your code:
Import for JavaImport for Kotlin
```
1
| import com.launchdarkly.sdk.*;
---|--- 
2
| import com.launchdarkly.sdk.android.*;
3
| import com.launchdarkly.observability.plugin.Observability
4
| import com.launchdarkly.sdk.android.integrations.Plugin
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s mobile key and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/client-side/android#initialize-the-client) in the Android SDK reference guide.
##### Android observability SDK credentials
The Android observability SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
Here’s how to initialize the SDK and plugin:
Android SDK v5.x (Java)Android SDK v5.x (Kotlin)
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .plugins(Components.plugins().setPlugins(
4
| Collections.singletonList<Plugin>(Observability(this.getApplication()))
5
| ))
6
| // other options
7
| .build();
8
| 
9
| // You'll need this context later, but you can ignore it for now.
10
| LDContext context = LDContext.create("context-key-123abc");
11
| 
12
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, 0);
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, Android SDK v5.9+
```
1
| val ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .plugins(
4
| Components.plugins().setPlugins(
5
| Collections.singletonList<Plugin>(
6
| Observability(
7
| this@BaseApplication,
8
| Options(
9
| resourceAttributes = Attributes.of(
10
| AttributeKey.stringKey("serviceName"), "example-service"
11
| )
12
| )
13
| )
14
| )
15
| )
16
| )
17
| .build();
```
For more information on plugin options, read [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side).
## Configure additional instrumentations
To enable HTTP request instrumentation and user interaction instrumentation, add the following plugin and dependencies to your top level application’s Gradle file.
Gradle GroovyGradle Kotlin
```
1
| plugins {
---|--- 
2
| id 'net.bytebuddy.byte-buddy-gradle-plugin' version '1.+'
3
| }
4
| 
5
| dependencies {
6
| // Android HTTP Url instrumentation
7
| implementation 'io.opentelemetry.android.instrumentation:httpurlconnection-library:0.11.0-alpha'
8
| byteBuddy 'io.opentelemetry.android.instrumentation:httpurlconnection-agent:0.11.0-alpha'
9
| 
10
| // OkHTTP instrumentation
11
| implementation 'io.opentelemetry.android.instrumentation:okhttp3-library:0.11.0-alpha'
12
| byteBuddy 'io.opentelemetry.android.instrumentation:okhttp3-agent:0.11.0-alpha'
13
| }
```
## Configure session replay
The Android SDK supports session replay, which captures snapshots of your app’s UI at regular intervals. This allows you to visually review user sessions in LaunchDarkly to better understand user behavior and diagnose issues.
To enable session replay, add the `ReplayInstrumentation` to the `instrumentations` list when configuring the observability plugin.
Here’s how:
Enable session replay
```
1
| import com.launchdarkly.observability.replay.ReplayInstrumentation
---|--- 
2
| import com.launchdarkly.observability.replay.ReplayOptions
3
| import com.launchdarkly.observability.replay.PrivacyProfile
4
| 
5
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
6
| .mobileKey("mobile-key-123abc")
7
| .plugins(
8
| Components.plugins().setPlugins(
9
| listOf(
10
| Observability(
11
| this@BaseApplication,
12
| Options(
13
| resourceAttributes = Attributes.of(
14
| AttributeKey.stringKey("serviceName"), "example-service"
15
| ),
16
| instrumentations = listOf(
17
| ReplayInstrumentation()
18
| )
19
| )
20
| )
21
| )
22
| )
23
| )
24
| .build()
```
### Session replay configuration options
You can customize session replay behavior by passing a `ReplayOptions` object to the `ReplayInstrumentation` constructor:
Session replay options
```
1
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .plugins(
4
| Components.plugins().setPlugins(
5
| listOf(
6
| Observability(
7
| this@BaseApplication,
8
| Options(
9
| instrumentations = listOf(
10
| ReplayInstrumentation(
11
| options = ReplayOptions(
12
| privacyProfile = PrivacyProfile(
13
| maskTextInputs = true,
14
| maskText = true,
15
| maskSensitive = true
16
| ),
17
| serviceName = "example-service",
18
| serviceVersion = "1.0.0",
19
| debug = false
20
| )
21
| )
22
| )
23
| )
24
| )
25
| )
26
| )
27
| )
28
| .build()
```
The available configuration options are:
 * `privacyProfile`: Controls how UI elements are masked in the replay. To learn more, read [Privacy options](/docs/sdk/observability/android#privacy-options).
 * `serviceName`: A name for your service. Defaults to “observability-android”.
 * `serviceVersion`: Version of your service. Defaults to the SDK version.
 * `backendUrl`: The backend URL for sending replay data. Defaults to LaunchDarkly’s backend.
 * `debug`: Enables verbose logging when set to `true`. Defaults to `false`.
### Privacy options
The `PrivacyProfile` class controls how UI elements are masked during session replay. Session replay for Android uses Jetpack Compose semantics to identify and mask UI elements. By default, all masking options are enabled to protect user privacy.
Here’s how to configure privacy settings:
Privacy profile configuration
```
1
| import com.launchdarkly.observability.replay.PrivacyProfile
---|--- 
2
| import com.launchdarkly.observability.replay.MaskMatcher
3
| 
4
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
5
| .mobileKey("mobile-key-123abc")
6
| .plugins(
7
| Components.plugins().setPlugins(
8
| listOf(
9
| Observability(
10
| this@BaseApplication,
11
| Options(
12
| instrumentations = listOf(
13
| ReplayInstrumentation(
14
| options = ReplayOptions(
15
| privacyProfile = PrivacyProfile(
16
| maskTextInputs = true,
17
| maskText = false,
18
| maskSensitive = true
19
| )
20
| )
21
| )
22
| )
23
| )
24
| )
25
| )
26
| )
27
| )
28
| .build()
```
The available privacy options are:
 * **maskTextInputs** : When `true`, masks all text input fields including editable text and paste operations. Defaults to `true`.
 * **maskText** : When `true`, masks all text elements in the UI. Defaults to `true`.
 * **maskSensitive** : When `true`, masks sensitive views that contain password fields or text matching sensitive keywords. Defaults to `true`.
#### Sensitive keywords
When `maskSensitive` is enabled, the SDK automatically masks any Compose UI text or content descriptions containing predetermined keywords. Keywords you specify are not case sensitive. For the current set of keywords, read [`PrivacyProfile`](https://github.com/launchdarkly/observability-sdk/blob/main/sdk/%40launchdarkly/observability-android/lib/src/main/kotlin/com/launchdarkly/observability/replay/PrivacyProfile.kt).
#### Common privacy configurations
For maximum privacy (recommended for production):
Maximum privacy
```
1
| privacyProfile = PrivacyProfile(
---|--- 
2
| maskTextInputs = true,
3
| maskText = true,
4
| maskSensitive = true
5
| )
```
For debugging or development, you can turn masking off:
No masking
```
1
| privacyProfile = PrivacyProfile(
---|--- 
2
| maskTextInputs = false,
3
| maskText = false,
4
| maskSensitive = false
5
| )
```
For selective masking, which masks inputs and sensitive data but shows regular text:
Selective masking
```
1
| privacyProfile = PrivacyProfile(
---|--- 
2
| maskTextInputs = true,
3
| maskText = false,
4
| maskSensitive = true
5
| )
```
### Custom masking with MaskMatcher
You can implement custom masking logic using the `MaskMatcher` interface. This allows you to define your own rules for which UI elements should be masked.
Here’s how:
Custom MaskMatcher
```
1
| import androidx.compose.ui.semantics.SemanticsNode
---|--- 
2
| import androidx.compose.ui.semantics.SemanticsProperties
3
| import androidx.compose.ui.semantics.getOrNull
4
| import com.launchdarkly.observability.replay.MaskMatcher
5
| import com.launchdarkly.observability.replay.PrivacyProfile
6
| 
7
| // Create a custom matcher that masks elements with specific test tags
8
| class CustomTestTagMatcher : MaskMatcher {
9
| override fun isMatch(node: SemanticsNode): Boolean {
10
| val testTag = node.config.getOrNull(SemanticsProperties.TestTag)
11
| return testTag == "sensitive-data" || testTag == "pii"
12
| }
13
| }
14
| 
15
| // Use the custom matcher in your privacy profile
16
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
17
| .mobileKey("mobile-key-123abc")
18
| .plugins(
19
| Components.plugins().setPlugins(
20
| listOf(
21
| Observability(
22
| this@BaseApplication,
23
| Options(
24
| instrumentations = listOf(
25
| ReplayInstrumentation(
26
| options = ReplayOptions(
27
| privacyProfile = PrivacyProfile(
28
| maskTextInputs = true,
29
| maskText = false,
30
| maskSensitive = true,
31
| maskAdditionalMatchers = listOf(CustomTestTagMatcher())
32
| )
33
| )
34
| )
35
| )
36
| )
37
| )
38
| )
39
| )
40
| )
41
| .build()
```
The `MaskMatcher` interface requires implementing a single method:
 * `isMatch(node: SemanticsNode): Boolean` - Returns `true` if the node should be masked, `false` otherwise.
Custom matchers should execute synchronously and avoid heavy operations to prevent performance issues during screen captures.
For more information on session replay configuration, read [Configuration for session replay](/docs/sdk/features/session-replay-config).
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side)
 * [Configuration for session replay](/docs/sdk/features/session-replay-config)
 * [Errors](/docs/sdk/features/observability-errors#android)
 * [Logs](/docs/sdk/features/observability-logs#android)
 * [Metrics](/docs/sdk/features/observability-metrics#android)
 * [Tracing](/docs/sdk/features/observability-traces#android)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly, including errors and logs. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs