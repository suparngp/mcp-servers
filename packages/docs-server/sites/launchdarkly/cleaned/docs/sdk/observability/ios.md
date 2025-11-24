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
 * [Configuration options](#configuration-options)
 * [Manual instrumentation](#manual-instrumentation)
 * [Recording custom metrics](#recording-custom-metrics)
 * [Recording custom logs](#recording-custom-logs)
 * [Recording custom errors](#recording-custom-errors)
 * [Recording custom traces](#recording-custom-traces)
 * [Using span builder for advanced tracing](#using-span-builder-for-advanced-tracing)
 * [Session management](#session-management)
 * [Session timeout configuration](#session-timeout-configuration)
 * [Automatic instrumentation](#automatic-instrumentation)
 * [Session Replay](#session-replay)
 * [Install the Session Replay plugin](#install-the-session-replay-plugin)
 * [Initialize Session Replay](#initialize-session-replay)
 * [Configure Session Replay privacy options](#configure-session-replay-privacy-options)
 * [Privacy configuration options](#privacy-configuration-options)
 * [Fine-grained masking control](#fine-grained-masking-control)
 * [SwiftUI view masking](#swiftui-view-masking)
 * [UIKit view masking](#uikit-view-masking)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the iOS SDK.
The iOS SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/swift-launchdarkly-observability/) 
GitHub repository | [swift-launchdarkly-observability](https://github.com/launchdarkly/swift-launchdarkly-observability) 
Published module | [Swift Package Manager](https://swift.org/package-manager/) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [iOS SDK](/docs/sdk/client-side/ios).
The observability plugin is compatible with the [iOS SDK](/docs/sdk/client-side/ios), version 9.14.0 and later, and is only available if you are using Swift.
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/ios#install-the-plugin)
 * [Initialize the iOS SDK client](/docs/sdk/observability/ios#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/ios#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/ios#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/ios#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the iOS SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies.
Here’s how:
Package.swift, using Swift Package ManagerPodfile, using CocoaPodsCartfile, using Carthage
```
1
| //...
---|--- 
2
| dependencies: [
3
| .package(url: "https://github.com/launchdarkly/ios-client-sdk.git", .upToNextMinor("9.0.0")),
4
| .package(url: "https://github.com/launchdarkly/swift-launchdarkly-observability.git", .upToNextMinor("1.0.0")),
5
| ],
6
| targets: [
7
| .target(
8
| name: "YOUR_TARGET",
9
| dependencies: ["LaunchDarkly"]
10
| )
11
| ],
12
| //...
```
Then, import the plugin into your code:
Swift
```
1
| import LaunchDarkly
---|--- 
2
| import LaunchDarklyObservability
3
| import OpenTelemetryApi
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s mobile key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/client-side/android#initialize-the-client) in the Android SDK reference guide.
Here’s how to initialize the SDK and plugin:
iOS SDK v9.14+ (Swift)
```
1
| let config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| config.plugins = [Observability()]
3
| 
4
| let contextBuilder = LDContextBuilder(key: "context-key-123abc")
5
| guard case .success(let context) = contextBuilder.build()
6
| else { return }
7
| 
8
| LDClient.start(config: config, context: context, startWaitSeconds: 5) { timedOut in
9
| if timedOut {
10
| // Client may not have the most recent flags for the configured context
11
| } else {
12
| // Client has received flags for the configured context
13
| }
14
| }
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, iOS SDK v9.14+
```
1
| // Create configuration with custom options
---|--- 
2
| let configuration = Configuration(
3
| serviceName: "MyApp",
4
| otlpEndpoint: "https://otel.observability.app.launchdarkly.com:4318",
5
| serviceVersion: "1.2.3",
6
| resourceAttributes: [
7
| "environment": .string("production"),
8
| "team": .string("mobile-team"),
9
| "app.version": .string("1.2.3")
10
| ],
11
| customHeaders: [("Custom-Header", "header-value")],
12
| sessionTimeout: 30 * 60, // 30 minutes in seconds
13
| isDebug: false,
14
| isErrorTrackingDisabled: false,
15
| isLogsDisabled: false,
16
| isTracesDisabled: false,
17
| isMetricsDisabled: false
18
| )
19
| 
20
| // Create the observability plugin with configuration
21
| let observabilityPlugin = Observability(configuration: configuration)
22
| 
23
| let config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
24
| config.plugins = [observabilityPlugin]
```
### Configuration options
The `Configuration` struct provides the following parameters:
 * **serviceName** : The service name for the application. Defaults to “App”.
 * **otlpEndpoint** : The endpoint URL for the OTLP exporter. Defaults to LaunchDarkly’s endpoint.
 * **serviceVersion** : The service version for the application. Defaults to “1.0.0”.
 * **resourceAttributes** : Additional OpenTelemetry resource attributes to include in telemetry data.
 * **customHeaders** : Custom headers to include with OTLP exports as key-value tuples.
 * **sessionTimeout** : Session timeout in seconds. Defaults to 30 minutes (1800 seconds).
 * **isDebug** : Enables additional logging for debugging. Defaults to false.
 * **isErrorTrackingDisabled** : Disables automatic error tracking if true. Defaults to false.
 * **isLogsDisabled** : Disables automatic log collection if true. Defaults to false.
 * **isTracesDisabled** : Disables automatic trace collection if true. Defaults to false.
 * **isMetricsDisabled** : Disables automatic metric collection if true. Defaults to false.
For more information on plugin options, read [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side).
## Manual instrumentation
After initializing the observability plugin, you can use the `LDObserve` singleton to manually instrument your iOS application with custom metrics, logs, traces, and error reporting.
### Recording custom metrics
Record metrics
```
1
| // Record a point-in-time metric
---|--- 
2
| LDObserve.shared.recordMetric(metric: Metric(name: "response_time_ms", value: 250.0))
3
| 
4
| // Record metrics with attributes
5
| let attributes: [String: AttributeValue] = [
6
| "endpoint": .string("/api/users"),
7
| "method": .string("GET")
8
| ]
9
| LDObserve.shared.recordMetric(metric: Metric(
10
| name: "api_call_duration", 
11
| value: 120.5, 
12
| attributes: attributes
13
| ))
14
| 
15
| // Record different metric types
16
| LDObserve.shared.recordCount(metric: Metric(name: "button_clicks", value: 1.0))
17
| LDObserve.shared.recordIncr(metric: Metric(name: "page_views", value: 1.0))
18
| LDObserve.shared.recordHistogram(metric: Metric(name: "request_size_bytes", value: 1024.0))
19
| LDObserve.shared.recordUpDownCounter(metric: Metric(name: "active_connections", value: 5.0))
```
### Recording custom logs
Record logs
```
1
| // Record a basic log message
---|--- 
2
| LDObserve.shared.recordLog(
3
| message: "User login successful", 
4
| severity: .info, 
5
| attributes: [:]
6
| )
7
| 
8
| // Record logs with custom attributes
9
| let logAttributes: [String: AttributeValue] = [
10
| "user_id": .string("12345"),
11
| "action": .string("login")
12
| ]
13
| LDObserve.shared.recordLog(
14
| message: "Authentication completed", 
15
| severity: .info, 
16
| attributes: logAttributes
17
| )
```
### Recording custom errors
Record errors
```
1
| do {
---|--- 
2
| // Some operation that might fail
3
| try performNetworkRequest()
4
| } catch {
5
| // Record the error with context
6
| let errorAttributes: [String: AttributeValue] = [
7
| "operation": .string("network_request"),
8
| "endpoint": .string("/api/data")
9
| ]
10
| LDObserve.shared.recordError(error: error, attributes: errorAttributes)
11
| }
```
### Recording custom traces
Record traces
```
1
| // Start a span and end it manually
---|--- 
2
| let attributes: [String: AttributeValue] = [
3
| "table": .string("users"),
4
| "operation": .string("select")
5
| ]
6
| let span = LDObserve.shared.startSpan(name: "database_query", attributes: attributes)
7
| 
8
| // Perform your operation
9
| performDatabaseQuery()
10
| 
11
| // Optionally add more attributes during execution
12
| span.setAttribute(key: "rows_returned", value: .int(42))
13
| 
14
| // Always end the span
15
| span.end()
```
### Using span builder for advanced tracing
Advanced span usage
```
1
| // Get span builder for more control
---|--- 
2
| let spanBuilder = LDObserve.shared.spanBuilder(spanName: "complex_operation")
3
| .setSpanKind(spanKind: .client)
4
| 
5
| spanBuilder.setAttribute(key: "user.id", value: .string("12345"))
6
| let span = spanBuilder.startSpan()
7
| 
8
| // Make the span current for nested operations
9
| span.makeCurrent()
10
| 
11
| // Perform work that might create child spans
12
| performComplexWork()
13
| 
14
| span.end()
```
## Session management
The observability plugin automatically manages sessions and handles application lifecycle events. Sessions are automatically ended when:
 * The application is backgrounded for longer than the configured `sessionTimeout` (default: 30 minutes)
 * The application is terminated
 * A new session is explicitly started
### Session timeout configuration
You can configure how long the plugin waits before ending a session when the app goes to the background:
Configure session timeout
```
1
| let configuration = Configuration(
---|--- 
2
| sessionTimeout: 45 * 60 // 45 minutes in seconds
3
| )
```
## Automatic instrumentation
The observability plugin automatically instruments your iOS application to collect:
 * **Application lifecycle events** : App start, foreground, background, and termination
 * **Session tracking** : Automatic session start and end events with timing
 * **Network requests** : HTTP request/response data when enabled
 * **LaunchDarkly SDK events** : Feature flag evaluations and SDK operations
## Session Replay
##### Session Replay is in Early Access
Session Replay is available in Early Access. APIs are subject to change until a 1.x version is released.
Session Replay captures user interactions and screen recordings to help you understand how users interact with your application. Session Replay works as an additional plugin that requires the observability plugin to be configured first.
### Install the Session Replay plugin
First, add the Session Replay package as a dependency alongside the observability plugin:
Package.swift, using Swift Package ManagerPodfile, using CocoaPods
```
1
| //...
---|--- 
2
| dependencies: [
3
| .package(url: "https://github.com/launchdarkly/ios-client-sdk.git", .upToNextMinor("9.0.0")),
4
| .package(url: "https://github.com/launchdarkly/swift-launchdarkly-observability.git", .upToNextMinor("1.0.0")),
5
| ],
6
| targets: [
7
| .target(
8
| name: "YOUR_TARGET",
9
| dependencies: [
10
| "LaunchDarkly",
11
| .product(name: "LaunchDarklySessionReplay", package: "swift-launchdarkly-observability")
12
| ]
13
| )
14
| ],
15
| //...
```
Then, import the Session Replay plugin into your code:
Swift
```
1
| import LaunchDarkly
---|--- 
2
| import LaunchDarklyObservability
3
| import LaunchDarklySessionReplay
```
### Initialize Session Replay
To enable Session Replay, add the `SessionReplay` plugin to your SDK configuration alongside the `Observability` plugin. The `Observability` plugin must be added before the `SessionReplay` plugin:
iOS SDK v9.14+ with Session Replay
```
1
| let mobileKey = "mobile-key-123abc"
---|--- 
2
| let config = LDConfig(
3
| mobileKey: mobileKey,
4
| autoEnvAttributes: .enabled
5
| )
6
| config.plugins = [
7
| // Observability plugin must be added before SessionReplay
8
| Observability(options: .init(
9
| serviceName: "ios-app",
10
| sessionBackgroundTimeout: 3)),
11
| SessionReplay(options: .init(
12
| isEnabled: true,
13
| privacy: .init(
14
| maskTextInputs: true,
15
| maskWebViews: false,
16
| maskImages: false,
17
| maskAccessibilityIdentifiers: ["email-field", "password-field"]
18
| )
19
| ))
20
| ]
21
| 
22
| let contextBuilder = LDContextBuilder(key: "context-key-123abc")
23
| guard case .success(let context) = contextBuilder.build()
24
| else { return }
25
| 
26
| LDClient.start(
27
| config: config,
28
| context: context,
29
| startWaitSeconds: 5.0,
30
| completion: { (timedOut: Bool) -> Void in
31
| if timedOut {
32
| // Client may not have the most recent flags for the configured context
33
| } else {
34
| // Client has received flags for the configured context
35
| }
36
| }
37
| )
```
### Configure Session Replay privacy options
The Session Replay plugin provides privacy options to control what data is captured. Configure these options when initializing the plugin:
Session Replay privacy options
```
1
| SessionReplay(options: .init(
---|--- 
2
| isEnabled: true,
3
| serviceName: "my-swift-app",
4
| privacy: .init(
5
| maskTextInputs: true,
6
| maskWebViews: false,
7
| maskLabels: false,
8
| maskImages: false,
9
| maskUIViews: [SensitiveView.self],
10
| ignoreUIViews: [PublicView.self],
11
| maskAccessibilityIdentifiers: ["email-field", "password-field"],
12
| ignoreAccessibilityIdentifiers: ["public-label"],
13
| minimumAlpha: 0.02
14
| )
15
| ))
```
#### Privacy configuration options
The `PrivacyOptions` struct provides the following parameters:
 * **maskTextInputs** : Mask all text input fields. Defaults to `true`.
 * **maskWebViews** : Mask the contents of web views (`WKWebView` and `UIWebView`). When this setting is enabled, web views are rendered as blank rectangles in session replays. Defaults to `false`.
 * **maskLabels** : Mask all text labels. Defaults to `false`.
 * **maskImages** : Mask all images. Defaults to `false`.
 * **maskUIViews** : Array of `UIView` classes to automatically mask in recordings.
 * **ignoreUIViews** : Array of `UIView` classes to exclude from masking rules.
 * **maskAccessibilityIdentifiers** : Array of accessibility identifiers to mask. Use this to mask specific UI elements by their accessibility identifier.
 * **ignoreAccessibilityIdentifiers** : Array of accessibility identifiers to exclude from masking rules.
 * **minimumAlpha** : Minimum alpha value for view visibility in recordings. Views with alpha below this threshold are not captured. Defaults to `0.02`.
### Fine-grained masking control
You can override the default privacy settings on individual views using the `.ldPrivate()` and `.ldUnmask()` methods. This allows precise control over what is captured in session replays.
#### SwiftUI view masking
Use view modifiers to control masking for SwiftUI views:
SwiftUI masking control
```
1
| import SwiftUI
---|--- 
2
| import SessionReplay
3
| 
4
| struct ContentView: View {
5
| @State private var email = ""
6
| @State private var shouldMaskEmail = true
7
| 
8
| var body: some View {
9
| VStack {
10
| // Mask this specific view
11
| Text("Sensitive information")
12
| .ldPrivate()
13
| 
14
| // Unmask this view (even if it would be masked by default)
15
| Image("profile-photo")
16
| .ldUnmask()
17
| 
18
| // Conditionally mask based on a flag
19
| TextField("Email", text: $email)
20
| .ldPrivate(isEnabled: shouldMaskEmail)
21
| }
22
| }
23
| }
```
#### UIKit view masking
Use the `.ldPrivate()` and `.ldUnmask()` methods on UIView instances:
UIKit masking control
```
1
| import UIKit
---|--- 
2
| import SessionReplay
3
| 
4
| class CreditCardViewController: UIViewController {
5
| let cvvField = UITextField()
6
| let nameField = UITextField()
7
| let cardNumberField = UITextField()
8
| 
9
| override func viewDidLoad() {
10
| super.viewDidLoad()
11
| 
12
| // Mask the CVV field
13
| cvvField.ldPrivate()
14
| 
15
| // Unmask the name field (even if text inputs are masked by default)
16
| nameField.ldUnmask()
17
| 
18
| // Conditionally mask based on a flag
19
| cardNumberField.ldPrivate(isEnabled: true)
20
| }
21
| }
```
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side)
 * [Errors](/docs/sdk/features/observability-errors#ios)
 * [Logs](/docs/sdk/features/observability-logs#ios)
 * [Metrics](/docs/sdk/features/observability-metrics#ios)
 * [Tracing](/docs/sdk/features/observability-traces#ios)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events and OpenTelemetry data. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
The observability data collected includes:
 * **Error monitoring** : Unhandled exceptions, crashes, and manually recorded errors with stack traces
 * **Logs** : Application logs with configurable severity levels and custom attributes
 * **Traces** : Distributed tracing data including span timing, nested operations, and custom instrumentation
 * **Metrics** : Performance metrics, custom counters, histograms, and gauge measurements
 * **Session data** : User session information including lifecycle events and timing
Specifically, the observability data includes events that LaunchDarkly uses to automatically create the following metrics:
 * User error rate and crash frequency
 * Application performance metrics (launch time, session duration)
 * Feature flag evaluation context and timing
 * Custom business metrics recorded through the SDK
To learn more about autogenerated metrics, read [Metrics autogenerated from observability events](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-observability-events).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs