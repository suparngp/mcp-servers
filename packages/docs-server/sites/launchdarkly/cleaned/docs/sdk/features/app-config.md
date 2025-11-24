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
 * [Customize application information](#customize-application-information)
 * [Configure application metadata for engineering insights](#configure-application-metadata-for-engineering-insights)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [Roku](#roku)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
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
This topic explains how to configure LaunchDarkly SDKs to send application metadata to LaunchDarkly. This feature is available for client-side and server-side SDKs.
## Customize application information
Some LaunchDarkly SDKs support configuration options for specifying application information, including application identifier and version. When you configure these options, the SDK automatically sends this application information to LaunchDarkly.
In the LaunchDarkly user interface (UI), the application information appears in the following places:
 * Application information appears in the “From source” field on Context details pages. To learn more, read [The context details page](/docs/home/flags/context-details).
 * Application information appears in the **Applications** page. From this page, you can also set additional properties, such as whether an application version is supported or unsupported. To learn more, read [Applications and application versions](/docs/home/releases/apps-and-app-versions).
 * Application metadata also appears on the **Usage** pages. This information can help you identify which applications are consuming Service Connections.
Additionally, some LaunchDarkly mobile SDKs support the automatic collection of data about the mobile environment where the application is running. When you enable this collection of environment variables, the application information that you configure here is automatically added to an `ld_application` context that the SDK then includes in each evaluation context. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
After the SDK has evaluated at least one feature flag using an `ld_application` context, you can create mobile targeting rules based on application and application version information. To learn more, read [Applications and application versions](/docs/home/releases/apps-and-app-versions) and [Mobile targeting](/docs/home/flags/mobile-targeting).
For the SDKs that support this feature, you can send some or all of the following metadata:
 * Application identifier (string): A unique identifier representing the application where the LaunchDarkly SDK is running. For example, `authentication-service`.
 * Application name (string): A human-friendly name for the application where the LaunchDarkly SDK is running. For example, `Authentication-Service`.
 * Application version (string): A unique identifier representing the version of the application where the LaunchDarkly SDK is running. For example, you could set this to the semantic version of your application, such as `1.0.0`. If you are using engineering insights, you must set the application version either to the full secure hash algorithm (SHA) of the GitHub commit for this deployment, such as `a12bcde3f45ab6c789123456d78efabcde91234f`, or to the tag associated with the GitHub commit for this deployment. Learn more about [sending deployment information to engineering insights](/docs/home/releases/config-deployment#set-the-application-version).
 * Application version name (string): A human-friendly name for the version of the application in which the LaunchDarkly SDK is running. For example, `v1`.
For all fields, the value can use only alphanumeric characters and hyphens `-`, periods `.`, and underscores `_`. Spaces are converted to hyphens.
You can set these values when you configure the SDK. All connections to LaunchDarkly from a client will send the same value to LaunchDarkly, whether the connection is through streaming, polling, or events. You cannot change the value after you configure the client.
##### Ensure your application identifier is unique per distributed application
We recommend that you set the application identifier to a different value for each separately distributed software binary.
For example, suppose you have two mobile apps, one for iOS and one for Android. If you set the application identifier to “example-app” and the version to “1.0” in both SDKs, then when you create a flag targeting rule based only on application information, the flag will target both the iOS and Android application. This may not be what you intend. We recommend using different application identifiers in this situation, for instance, “example-app-ios” and “example-app-android.”
You can also enable automatic environment attributes, and then create flag targeting rules based on both the application information and the device information. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
## Configure application metadata for engineering insights
##### Engineering insights is available to customers on select plans
Engineering insights is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Configuring your application metadata to send deployment information lets engineering insights track the frequency and timing of your deployments. If you set the application version to a deployment SHA or tag from GitHub, engineering insights will also track which commits and pull requests are in your deployment.
![An example of deployment frequency summary in engineering insights.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fcafbe01d8c8a935b15e2f3fccab158926b1406d25777e2694e9a3524293996b/assets/images/__LD_UI_no_test/eng-insights-deployment-frequency-summary.png)
An example of deployment frequency summary in engineering insights.
To learn how to retrieve the SHA for your deployment, read [Set up automated deployment detection](/docs/home/releases/config-deployment#option-1-set-up-automated-deployment-detection).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/app-config#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/app-config#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/app-config#net-client-side)
 * [Android](/docs/sdk/features/app-config#android)
 * [C++ (client-side)](/docs/sdk/features/app-config#c-client-side)
 * [Flutter](/docs/sdk/features/app-config#flutter)
 * [iOS](/docs/sdk/features/app-config#ios)
 * [JavaScript](/docs/sdk/features/app-config#javascript)
 * [Node.js (client-side)](/docs/sdk/features/app-config#nodejs-client-side)
 * [React Native](/docs/sdk/features/app-config#react-native)
 * [React Web](/docs/sdk/features/app-config#javascript): The React Web SDK relies on the JavaScript SDK for this functionality.
 * [Roku](/docs/sdk/features/app-config#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
This code sample shows you how to configure the application information:
C#
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .ApplicationInfo(Components.ApplicationInfo()
4
| .ApplicationId("authentication-service")
5
| .ApplicationName("Authentication-Service")
6
| .ApplicationVersion("1.0.0")
7
| .ApplicationVersionName("v1")
8
| )
9
| .Build();
```
The application information is supported in .NET SDK v3.1.0 and later.
If you configure the application information and have enabled automatic environment attribute collection, the values you set will override any values collected automatically. The application identifier, name, version, and version name you set explicitly will be included in the `ld_application` context. To learn more, read [Automatic environment attributes and application metadata configuration](/docs/sdk/features/environment-attributes#automatic-environment-attributes-and-application-metadata-configuration).
To learn more about the configuration option, read [`ApplicationInfoBuilder`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.ApplicationInfoBuilder.html).
### Android
###### Expand Android code sample
This code sample shows you how to configure the application information:
JavaKotlin
```
1
| LDConfig config = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .applicationInfo(
3
| Components.applicationInfo()
4
| .applicationId("authentication-service")
5
| .applicationName("Authentication-Service")
6
| .applicationVersion("1.0.0")
7
| .applicationVersionName("v1")
8
| )
9
| .build();
```
The application identifier and version are supported in Android SDK v4 and later. The application name and version name are supported in Android SDK v5 and later.
If you configure the application information and have enabled automatic environment attribute collection, the values you set will override any values collected automatically. The application identifier, name, version, and version name you set explicitly will be included in the `ld_application` context. To learn more, read [Automatic environment attributes and application metadata configuration](/docs/sdk/features/environment-attributes#automatic-environment-attributes-and-application-metadata-configuration).
To learn more about the configuration option, read [`ApplicationInfoBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/ApplicationInfoBuilder.html).
### C++ (client-side)
###### Expand C++ (client-side) code sample
This code sample shows you how to configure the application identifier and application version:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.AppInfo().Identifier("authentication-service").Version("1.0.0")
3
| auto config = config_builder.Build();
```
To learn more, read [`AppInfoBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1AppInfoBuilder.html).
### Flutter
###### Expand Flutter code sample
This code sample shows you how to configure the application information:
Flutter SDK v4Flutter SDK v3.xFlutter SDK v2.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| applicationInfo: ApplicationInfo(
5
| applicationId: 'authentication-service',
6
| applicationName: 'Authentication-Service',
7
| applicationVersion: '1.0.0',
8
| applicationVersionName: 'v1',
9
| ),
10
| )
```
The application identifier and version are supported in Flutter SDK v2 and later. The application name and version name are supported in Flutter SDK v3 and later.
If you configure the application information and have enabled automatic environment attribute collection, the values you set will override any values collected automatically. The application identifier, name, version, and version name you set explicitly will be included in the `ld_application` context. To learn more, read [Automatic environment attributes and application metadata configuration](/docs/sdk/features/environment-attributes#automatic-environment-attributes-and-application-metadata-configuration).
To learn more, read [`LDConfig`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig-class.html).
### iOS
###### Expand iOS code sample
This code sample shows you how to configure the application identifier and application version:
SwiftObjective-C
```
1
| var applicationInfo = ApplicationInfo()
---|--- 
2
| applicationInfo.applicationIdentifier("authentication-service")
3
| applicationInfo.applicationName("Authentication-Service")
4
| applicationInfo.applicationVersion("1.0.0")
5
| applicationInfo.applicationVersionName("v1")
6
| 
7
| var config = LDConfig(mobileKey: mobileKey, autoEnvAttributes: .enabled)
8
| config.applicationInfo = applicationInfo
```
The application identifier and version are supported in iOS SDK v8 and later. The application name and version name are supported in iOS SDK v9 and later.
If you configure the application information and have enabled automatic environment attribute collection, the values you set will override any values collected automatically. The application identifier, name, version, and version name you set explicitly will be included in the `ld_application` context. To learn more, read [Automatic environment attributes and application metadata configuration](/docs/sdk/features/environment-attributes#automatic-environment-attributes-and-application-metadata-configuration).
To learn more about the specific configuration options available in this SDK, read the [SDK’s API docs](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html).
### JavaScript
###### Expand JavaScript code sample
This code sample shows you how to configure the application identifier and application version:
JavaScriptTypeScript
```
1
| const options = {
---|--- 
2
| application: {
3
| id: 'authentication-service',
4
| version: '1.0.0',
5
| },
6
| };
7
| const client = LDClient.initialize('client-side-id-123abc', context, options);
8
| 
9
| try {
10
| await client.waitForInitialization(5);
11
| proceedWithSuccessfullyInitializedClient();
12
| } catch(err) {
13
| // Client failed to initialized or timed out
14
| // variation() calls return fallback values until initialization completes
15
| }
```
To learn more about the specific configuration options available in this SDK, read the [`LDOptions`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
This code sample shows you how to configure the application identifier and application version:
JavaScriptTypeScript
```
1
| const options = {
---|--- 
2
| application: {
3
| id: "authentication-service",
4
| version: "1.0.0"
5
| }
6
| };
7
| 
8
| const client = LDClient.initialize('client-side-id-123abc', context, options);
```
To learn more, read [`application`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html#application).
### React Native
###### Expand React Native code sample
This code sample shows you how to configure the application information:
React Native SDK v10
```
1
| const options: LDOptions = {
---|--- 
2
| applicationInfo: {
3
| id: 'authentication-service',
4
| name: 'Authentication-Service',
5
| version: '1.0.0',
6
| versionName: 'v1',
7
| }
8
| }
9
| 
10
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
```
The application identifier and version are supported in React Native SDK v7 and later. The application name and version name are supported in React Native SDK v8 and later.
If you configure the application information and specify the application id, all application information will be added to the `ld_application` context. Otherwise, the `ld_application` context will not be included. To learn more, read [Automatic environment attributes and application metadata configuration](/docs/sdk/features/environment-attributes#react-native).
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html).
### Roku
###### Expand Roku code sample
This code sample shows you how to configure the application identifier and application version:
BrightScript
```
1
| ' for a legacy Roku application
---|--- 
2
| config = LaunchDarklyConfig("mobile-key-123abc")
3
| 
4
| ' for a SceneGraph Roku Application
5
| config = LaunchDarklyConfig("mobile-key-123abc", CLIENT_SCENEGRAPH_NODE)
6
| 
7
| ' configure the application identifier and application version
8
| config.setApplicationInfoValue("id", "authentication-service")
9
| config.setApplicationInfoValue("version", "1.0.0")
```
## Server-side SDKs
This feature is available for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/app-config#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/app-config#c-server-side)
 * [Erlang](/docs/sdk/features/app-config#erlang)
 * [Go](/docs/sdk/features/app-config#go)
 * [Haskell](/docs/sdk/features/app-config#haskell)
 * [Java](/docs/sdk/features/app-config#java)
 * [Lua](/docs/sdk/features/app-config#lua)
 * [Node.js (server-side)](/docs/sdk/features/app-config#nodejs-server-side)
 * [PHP](/docs/sdk/features/app-config#php)
 * [Python](/docs/sdk/features/app-config#python)
 * [Ruby](/docs/sdk/features/app-config#ruby)
 * [Rust](/docs/sdk/features/app-config#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
This code sample shows you how to configure the application identifier and application version:
.NET SDK v8 (C#)
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .ApplicationInfo(Components.ApplicationInfo()
3
| .ApplicationId("authentication-service")
4
| .ApplicationName("Authentication-Service")
5
| .ApplicationVersion("1.0.0")
6
| .ApplicationVersionName("v1")
7
| )
8
| .Build();
9
| 
10
| var client = new LdClient(config);
```
For a complete list of configuration options, read the documentation for [`ConfigurationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html).
### C++ (server-side)
###### Expand C++ (server-side) code sample
This code sample shows you how to configure the application identifier and application version:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.AppInfo().Identifier("authentication-service").Version("1.0.0")
3
| auto config = config_builder.Build();
4
| if (!config) {
5
| /* an error occurred, config is not valid */
6
| }
```
To learn more, read [`AppInfoBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1AppInfoBuilder.html).
### Erlang
###### Expand Erlang code sample
This code sample shows you how to configure the application identifier and application version:
Erlang
```
1
| ldclient:start_instance("sdk-key-123abc", #{
---|--- 
2
| application => #{
3
| id => <<"authentication-service">>,
4
| version => <<"1.0.0">>
5
| }
6
| })
```
For a complete list of configuration options, read the documentation for the [`ldclient_config` module](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_config.html).
### Go
###### Expand Go code sample
The code in this sample configures the application identifier and application version:
Go
```
1
| var config ld.Config
---|--- 
2
| config.ApplicationInfo.ApplicationID = "authentication-service"
3
| config.ApplicationInfo.ApplicationVersion = "1.0.0"
```
To learn more about the configuration options, read [`Config`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config).
### Haskell
###### Expand Haskell code sample
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
The code in this sample configures the application identifier and application version:
Haskell
```
1
| {-# LANGUAGE OverloadedStrings #-}
---|--- 
2
| 
3
| import LaunchDarkly.Server.Config
4
| 
5
| import Data.Function ((&))
6
| 
7
| config :: Config
8
| config = makeConfig "sdk-key-123abc" & configSetApplicationInfo appInfo
9
| where appInfo = makeApplicationInfo
10
| & withApplicationValue "id" "authentication-service"
11
| & withApplicationValue "version" "1.0.0"
```
### Java
###### Expand Java code sample
This code sample shows you how to configure the application identifier and application version:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .applicationInfo(
3
| Components.applicationInfo()
4
| .applicationId("authentication-service")
5
| .applicationVersion("1.0.0")
6
| ).build();
```
For a complete list of configuration options for the client, including proxy settings, timeouts, and streaming/polling options, read the Javadoc for [`LDConfig.Builder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDConfig.Builder.html).
### Lua
###### Expand Lua code sample
This code sample shows you how to configure the application identifier and application version:
Lua SDK v2
```
1
| local config = {
---|--- 
2
| appInfo = {
3
| identifier = "authentication-server",
4
| version = "1.0.0"
5
| }
6
| }
```
To learn more about the configuration options, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
This code sample shows you how to configure the application identifier and application version:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| const options: ld.LDOptions = {
3
| application: {
4
| id: 'authentication-service',
5
| version: '1.0.0'
6
| }
7
| };
8
| const client = ld.init('sdk-key-123abc', options);
```
To learn more about the specific configuration options available in this SDK, read the [SDK’s API docs](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html).
### PHP
###### Expand PHP code sample
This code sample shows you how to configure the application identifier and application version:
PHP
```
1
| $appInfo = (new ApplicationInfo())->withId('authentication-service')->withVersion('1.0.0');
---|--- 
2
| $config = [
3
| "application_info" => $appInfo
4
| ];
5
| 
6
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", $config);
```
To learn more, read [`ApplicationInfo`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Types-ApplicationInfo.html). For a complete list of configuration options, read the documentation for the [LDClient constructor](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method___construct).
### Python
###### Expand Python code sample
This code sample shows you how to configure the application identifier and application version:
Python
```
1
| config = Config(sdk_key='sdk-key-123abc',
---|--- 
2
| application = {"id": "authentication-service", "version": "1.0.0"})
3
| ldclient.set_config(config)
```
To learn more, read [`application`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.Config.application). For a complete list of configuration options, read the documentation for the [`ldclient.config` module](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#module-ldclient.config).
### Ruby
###### Expand Ruby code sample
This code sample shows you how to configure the application identifier and application version:
Ruby
```
1
| LaunchDarkly::Config.new({
---|--- 
2
| application: {
3
| id: "authentication-service",
4
| version: "abc123def456"
5
| }
6
| })
```
To learn more about the specific configuration options available in this SDK, read the [SDK’s API docs](https://launchdarkly.github.io/ruby-server-sdk).
### Rust
###### Expand Rust code sample
This code sample shows you how to configure the application identifier and application version:
Rust
```
1
| let mut application_info = ApplicationInfo::new();
---|--- 
2
| application_info
3
| .application_identifier("authentication-service")
4
| .application_version("1.0.0");
5
| let config = ConfigBuilder::new(&sdk_key)
6
| .application_info(application_info)
7
| .build();
```
The `Config` type lets you specify a variety of options. To learn more about the specific configuration options available in this SDK, read the [SDK’s API docs](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Config.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs