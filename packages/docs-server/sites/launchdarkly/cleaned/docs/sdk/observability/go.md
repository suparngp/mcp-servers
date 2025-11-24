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
 * [Examples using different frameworks](#examples-using-different-frameworks)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the Go SDK.
The Go SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go) 
GitHub repository | [@launchdarkly/go](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/go) 
Sample application | [Example applications](/docs/sdk/observability/go#examples-using-different-frameworks) for several frameworks 
Published module | [pkg.go.dev](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [Go SDK](/docs/sdk/server-side/go).
The observability plugin is compatible with the [Go SDK](/docs/sdk/server-side/go), version 7.11 and later. Using the observability plugin requires Go 1.24.3 or higher.
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/go#install-the-plugin)
 * [Initialize the Go SDK client](/docs/sdk/observability/go#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/go#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/go#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/go#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the Go SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies. How you do this depends on what dependency management system you are using:
 * If you are using the standard [Go modules](https://github.com/golang/go/wiki/Modules) system, import the SDK packages in your code and `go build` will automatically download them. The SDK and its dependencies are modules.
 * Otherwise, use the `go get` command and specify the SDK version, such as `go get github.com/launchdarkly/go-server-sdk/v7` and `go get github.com/launchdarkly/observability-sdk/go`.
There are several packages that you can import, depending on which features you are using. To work with observability, you need the following:
Go SDK v7.11+
```
1
| import (
---|--- 
2
| // go-sdk-common/v3/ldcontext defines LaunchDarkly's model for contexts
3
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
4
| 
5
| // go-server-sdk/v7 is the main SDK package - here we are aliasing it to "ld"
6
| ld "github.com/launchdarkly/go-server-sdk/v7"
7
| 
8
| // go-server-sdk/v7/ldplugins allows you to add plugins to the main SDK
9
| "github.com/launchdarkly/go-server-sdk/v7/ldplugins"
10
| 
11
| // observability-sdk/go is the observability plugin - here we are aliasing it to "ldobserve"
12
| // this package requires go-server-sdk/v7 version 7.11 or later
13
| ldobserve "github.com/launchdarkly/observability-sdk/go"
14
| )
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s SDK key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/server-side/go#initialize-the-client) in the Go SDK reference guide.
Here’s how to initialize the SDK and plugin:
Initialize, Go SDK v7.11+
```
1
| client, _ := ld.MakeCustomClient("sdk-key-123abc",
---|--- 
2
| ld.Config{
3
| Plugins: []ldplugins.Plugin{
4
| ldobserve.NewObservabilityPlugin()
5
| },
6
| }, 5*time.Second)
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional function with the configuration details.
Here is an example:
Plugin options, Go SDK v7.11+
```
1
| client, _ := ld.MakeCustomClient("sdk-key-123abc",
---|--- 
2
| ld.Config{
3
| Plugins: []ldplugins.Plugin{
4
| ldobserve.NewObservabilityPlugin(
5
| ldobserve.WithServiceName("example-service"),
6
| ldobserve.WithServiceVersion("example-sha"),
7
| ldobserve.WithEnvironment("production")
8
| ),
9
| },
10
| }, 5*time.Second)
```
For more information on plugin options, as well as how they interact with environment variables and existing OpenTelemetry configuration, read [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side).
## Examples using different frameworks
LaunchDarkly provides several examples, each demonstrating the LaunchDarkly Observability plugin with different Go frameworks and libraries:
 * [Fiber example](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/go-plugin/README.md#1-fiber-example-cmdfiber)
 * [Gin example](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/go-plugin/README.md#2-gin-example-cmdgin)
 * [Gorilla Mux example](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/go-plugin/README.md#3-gorilla-mux-example-cmdgorillamux)
 * [Standard HTTP example](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/go-plugin/README.md#4-standard-http-example-cmdhttp)
 * [Logrus example](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/go-plugin/README.md#5-logrus-example-cmdlogrus)
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side#go)
 * [Errors](/docs/sdk/features/observability-errors#go)
 * [Logs](/docs/sdk/features/observability-logs#go)
 * [Metrics](/docs/sdk/features/observability-metrics#go)
 * [Tracing](/docs/sdk/features/observability-traces#go)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability) and [Metrics autogenerated from OpenTelemetry data](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-opentelemetry-data).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs