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
 * [Use the Swift Package Manager](#use-the-swift-package-manager)
 * [Use CocoaPods](#use-cocoapods)
 * [Use Carthage](#use-carthage)
 * [Install the SDK manually](#install-the-sdk-manually)
 * [Import the SDK](#import-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Background fetch](#background-fetch)
 * [Shut down the client](#shut-down-the-client)
 * [Data collection](#data-collection)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 9 of the iOS SDK introduces optional automatic collection of environment attributes**. To learn more about upgrading, read [iOS SDK 8.x to 9.0 migration guide](/docs/sdk/client-side/ios/migration-8-to-9).
## Overview
This topic documents how to get started with the iOS SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/ios-client-sdk/) 
GitHub repository | [ios-client-sdk](https://github.com/launchdarkly/ios-client-sdk/) 
Sample applications | [iOS (Objective-C)](https://github.com/launchdarkly/hello-ios) 
[iOS (Swift)](https://github.com/launchdarkly/hello-ios-swift) 
[macOS](https://github.com/launchdarkly/hello-macos) 
[tvOS](https://github.com/launchdarkly/hello-tvos) 
Published module | [CocoaPods](https://cocoapods.org/pods/LaunchDarkly) 
##### SDK version compatibility
The LaunchDarkly iOS SDK, version 4.0.0 and higher, is compatible with applications written in either Swift or Objective-C. The inline code samples include both languages. The SDK is written in Swift.
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your application:
 * [Install the SDK](/docs/sdk/client-side/ios#install-the-sdk)
 * [Import the SDK](/docs/sdk/client-side/ios#import-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/ios#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/client-side/ios#evaluate-a-flag)
### Install the SDK
The first step is to install the LaunchDarkly SDK as a dependency in your application.
We recommend making the LaunchDarkly [observability plugin](/docs/sdk/observability) available as well. This plugin collects and sends observability data to LaunchDarkly. This means you can review error monitoring and logs from within the LaunchDarkly UI. It requires the iOS SDK version 9.14 or later, and is only available if you are using Swift.
LaunchDarkly supports multiple methods for installing the SDK. Each method is explained below.
###### Expand Use the Swift Package Manager
#### Use the Swift Package Manager
If you use the [Swift Package Manager](https://swift.org/package-manager/), you can install the SDK through Xcode or include it as a dependency in your `Package.swift` file.
To add a package dependency to your Xcode project, select “File,” “Swift Packages,” “Add Package Dependency” and enter the [iOS SDK repository URL](https://github.com/launchdarkly/ios-client-sdk) clone URL, then select your desired version constraints.
Including the SDK as a dependency in a `Package.swift` file looks like this:
Package.swift
```
1
| //...
---|--- 
2
| dependencies: [
3
| .package(url: "https://github.com/launchdarkly/ios-client-sdk.git", .upToNextMinor("9.0.0")),
4
| // optional observability plugin, requires iOS SDK v9.14+
5
| .package(url: "https://github.com/launchdarkly/swift-launchdarkly-observability.git", .upToNextMajor("1.0.0")),
6
| ],
7
| targets: [
8
| .target(
9
| name: "YOUR_TARGET",
10
| dependencies: ["LaunchDarkly"]
11
| )
12
| ],
13
| //...
```
###### Expand Use CocoaPods
#### Use CocoaPods
If you use [CocoaPods](https://cocoapods.org/), you can install the SDK by adding the following to your `Podfile`. To identify the latest version, read the [SDK releases page](https://github.com/launchdarkly/ios-client-sdk/releases).
Here is the code to add to your `Podfile`:
Podfile
```
1
| use_frameworks!
---|--- 
2
| target 'YourTargetName' do
3
| pod 'LaunchDarkly', '~> 9.0'
4
| # optional observability plugin, requires iOS SDK v9.14+
5
| pod 'LaunchDarklyObservability', '~> 1.0'
6
| end
```
###### Expand Use Carthage
#### Use Carthage
If you use [Carthage](https://github.com/Carthage/Carthage), you can install the SDK by specifying it in your `Cartfile`. To identify the latest version, read the [SDK releases page](https://github.com/launchdarkly/ios-client-sdk/releases).
Here is the code to include in your `Cartfile`:
Cartfile
```
1
| github "launchdarkly/ios-client" ~> 9.0
---|--- 
2
| // optional observability plugin, requires iOS SDK v9.14+
3
| github "launchdarkly/swift-launchdarkly-observability" ~> 1.0
```
###### Expand Install the SDK manually
#### Install the SDK manually
For instructions on installing the SDK without CocoaPods or Carthage, read the [SDK readme](https://github.com/launchdarkly/ios-client-sdk/blob/master/README.md).
### Import the SDK
After you install the SDK as a dependency, import the LaunchDarkly client in your application code:
SwiftObjective-C
```
1
| import LaunchDarkly
---|--- 
2
| // optional observability plugin, requires iOS SDK v9.14+
3
| import LaunchDarklyObservability
```
### Initialize the client
After importing the SDK, configure and initialize the client. To do this, you need your environment’s mobile key and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### iOS SDK credentials
The iOS SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
The following example shows how to configure the SDK, specify your mobile key, and initialize the client.
We recommend calling the client initialization method with a timeout of five seconds or fewer. The SDK provides a `timedOut` boolean to the `completion` closure, indicating whether the connection timed out.
Here’s how:
iOS SDK v9.x (Swift)iOS SDK v9.x (Objective-C)iOS SDK v8.x (Swift)iOS SDK v8.x (Objective-C)
```
1
| let config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| // optional observability plugin, requires iOS SDK v9.14+
3
| config.plugins = [
4
| Observability(
5
| options: .init(
6
| resourceAttributes: [
7
| "my-attribute": .string("new-value")
8
| ],
9
| isDebug: true,
10
| logs: .enabled,
11
| traces: .enabled,
12
| metrics: .enabled
13
| )
14
| )
15
| ]
16
| 
17
| // You'll need this context later, but you can ignore it for now.
18
| let contextBuilder = LDContextBuilder(key: "context-key-123abc")
19
| guard case .success(let context) = contextBuilder.build()
20
| else { return }
21
| 
22
| LDClient.start(config: config, context: context, startWaitSeconds: 5) { timedOut in
23
| if timedOut {
24
| // Client may not have the most recent flags for the configured context
25
| } else {
26
| // Client has received flags for the configured context
27
| }
28
| }
```
To learn more about the specific configuration options available in this SDK, read [`LDConfig`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html).
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you should use the multiple environments feature. To learn more, read [Multiple environments](/docs/sdk/features/multiple-environments#ios).
### Evaluate a flag
After calling `start`, you can retrieve the `LDClient` instance with the static method `LDClient.get()`:
SwiftObjective-C
```
1
| let client = LDClient.get()!
---|--- 
```
Then, use the `client` to check which variation a particular context will receive for a given feature flag.
Here’s how:
SwiftObjective-C
```
1
| let showFeature = client.boolVariation(forKey: "flag-key-123abc", defaultValue: false)
---|--- 
2
| 
3
| if showFeature {
4
| // Application code to show the feature
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
## Background fetch
When the app is backgrounded, the SDK does not receive real-time events.
Unlike other mobile SDKs, the iOS SDK does not support background fetch, so devices on the iOS operating system will not fetch flags from the background. However, devices on MacOS will update flag values opportunistically, according to the iOS SDK standard background polling defaults.
To change the background polling default for flags in your app, add the following code in your `LDConfig`:
iOS SDK v9.0 (Swift)iOS SDK v9.0 (Objective-C)iOS SDK v8.0 and earlier (Swift)iOS SDK v8.0 and earlier (Objective-C)
```
1
| var ldConfig = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| ldConfig.backgroundFlagPollingInterval = 3600
```
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#ios).
## Data collection
The data collected by the iOS SDK persists until the number of cached contexts exceeds a limit. When you call `identify`, the number of cached contexts increments. Eventually, the number of cached contexts exceeds `maxCachedContexts`. When that happens, the SDK deletes context data in excess of `maxCachedContext`, starting with the oldest context first.
To learn more about data collection within this SDK and implications on submissions to the Apple App Store, read the [Apple App Store data collection policy](/docs/sdk/concepts/apple-app-store).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#ios)
 * [Automatic environment attributes](/docs/sdk/features/environment-attributes#ios)
 * [Configuration](/docs/sdk/features/config#ios), including
 * [Application metadata configuration](/docs/sdk/features/app-config#ios)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#ios)
 * [Context configuration](/docs/sdk/features/context-config#ios)
 * [Evaluating flags](/docs/sdk/features/evaluating#ios)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#ios)
 * [Flushing events](/docs/sdk/features/flush#ios)
 * [Getting all flags](/docs/sdk/features/all-flags#ios)
 * [Hooks](/docs/sdk/features/hooks#ios)
 * [Identifying and changing contexts](/docs/sdk/features/identify#ios)
 * [Logging configuration](/docs/sdk/features/logging#ios)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#ios)
 * [Multiple environments](/docs/sdk/features/multiple-environments#ios)
 * [Observability](/docs/sdk/observability/ios)
 * [Offline mode](/docs/sdk/features/offline-mode#ios)
 * [Private attributes](/docs/sdk/features/private-attributes#ios)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#ios)
 * [Sending custom events](/docs/sdk/features/events#ios)
 * [Shutting down](/docs/sdk/features/shutdown#ios)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#ios)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs