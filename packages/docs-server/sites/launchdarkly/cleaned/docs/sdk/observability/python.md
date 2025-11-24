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
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the Python SDK.
The Python SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-python/) 
GitHub repository | [@launchdarkly/observability-python](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability-python) 
Sample application | [Example Flask app](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/python-plugin-flask/README.md) 
Published module | [PyPI](https://pypi.org/project/launchdarkly-observability) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [Python SDK](/docs/sdk/server-side/python).
The observability plugin is compatible with the [Python SDK](/docs/sdk/server-side/python), version 9.12.0 and later. Using the observability plugin requires Python 3.10.0 or higher.
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/python#install-the-plugin)
 * [Initialize the Python SDK client](/docs/sdk/observability/python#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/python#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/python#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/python#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the Python SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies.
Here’s how:
Shell
```
$
| pip install launchdarkly-server-sdk
---|--- 
>
| pip install launchdarkly-observability
```
Then, import the plugin into your code:
Python
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config
3
| 
4
| import ldobserve
5
| from ldobserve import ObservabilityConfig, ObservabilityPlugin, observe
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s SDK key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/server-side/python#initialize-the-client) in the Python SDK reference guide.
Here’s how to initialize the SDK and plugin:
Initialize, Python SDK v9.12+
```
1
| plugin = ObservabilityPlugin()
---|--- 
2
| 
3
| config = Config(
4
| sdk_key = "sdk-key-123abc",
5
| plugins = [plugin]
6
| )
7
| ldclient.set_config(config)
8
| client = ldclient.get()
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, Python SDK v9.12+
```
1
| observability_config = ObservabilityConfig(
---|--- 
2
| service_name = "example-service",
3
| # we recommend setting service_version to the latest deployed git SHA
4
| service_version = "example-sha",
5
| environment = "production"
6
| )
7
| 
8
| plugin = ObservabilityPlugin(observability_config)
```
For more information on plugin options, as well as how they interact with environment variables and existing OpenTelemetry configuration, read [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side).
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side#python)
 * [Errors](/docs/sdk/features/observability-errors#python)
 * [Logs](/docs/sdk/features/observability-logs#python)
 * [Metrics](/docs/sdk/features/observability-metrics#python)
 * [Tracing](/docs/sdk/features/observability-traces#python)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
Specifically, the observability data includes events that LaunchDarkly uses to automatically create the following metrics:
 * User HTTP error rate (OpenTelemetry)
 * User HTTP 5XX response rate (OpenTelemetry)
 * User non-HTTP exception rate (OpenTelemetry)
 * Average, P95, and P99 request latency (OpenTelemetry)
To learn more, read [Metrics autogenerated from OpenTelemetry data](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-opentelemetry-data).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs