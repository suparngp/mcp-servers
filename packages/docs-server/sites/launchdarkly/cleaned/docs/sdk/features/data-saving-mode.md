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
 * [Server-side SDKs](#server-side-sdks)
 * [Go](#go)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
##### Data saving mode is available for Early Access
Data saving mode is supported in the server-side SDKs listed below. It is also supported in the [Relay Proxy](/docs/sdk/relay-proxy).
Data saving mode is only available to members of LaunchDarkly’s Early Access Program (EAP). If you want access to this feature, join the EAP.
## Overview
This topic explains how data saving mode works in the LaunchDarkly SDKs that support it.
Server-side SDKs in data saving mode first open a polling connection to LaunchDarkly. The initial payload from this connection contains the data the SDK will need to operate and perform flag evaluations.
Subsequently, server-side SDKs in data saving mode open a streaming connection and receive realtime flag configuration changes over the stream. These configuration changes include only the difference between the server-side SDK’s stored configuration and the latest configuration in LaunchDarkly. The SDKs use in-memory data for the unchanged aspects of the flag configuration.
The SDKs fall back to using a polling connection if LaunchDarkly streaming is unavailable. Data saving mode includes additional configuration options that let you set a backup data source, enabling automatic failover if a connection is unavailable.
Depending on the number of flags in your project and the complexity of their configuration, data saving mode can significantly improve performance, including reducing your network costs when in polling mode or on reconnection. Additionally, SDKs in data saving mode have reduced memory and CPU usage overall.
## Server-side SDKs
This feature is available in the following SDKs:
 * [Go](/docs/sdk/features/data-saving-mode#go)
 * [Node.js (server-side)](/docs/sdk/features/data-saving-mode#nodejs-server-side)
 * [Python](/docs/sdk/features/data-saving-mode#python)
### Go
###### Expand Go SDK code sample
To enable data saving mode:
 1. If you are using the [Relay Proxy](/docs/sdk/relay-proxy), upgrade your Relay Proxy to version 9.0.0-alpha.1 or later.
##### Relay Proxy version 9 supports data saving mode
The Relay Proxy version that supports data saving mode will be released as an `alpha` version while data saving mode is part of LaunchDarkly’s Early Access Program (EAP). We will release version 9.0 by the end of the EAP.
 1. Upgrade your Go SDK to version 7.11 or later.
 2. Request to join the Early Access Program. Wait to receive confirmation from LaunchDarkly that data saving mode is enabled for your account.
 3. Update your SDK configuration to enable the `DataSystem` configuration option.
Here’s how to enable the `DataSystem` configuration option:
Go SDK v7.11+
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| ld "github.com/launchdarkly/go-server-sdk/v7"
4
| "github.com/launchdarkly/go-server-sdk/v7/ldcomponents"
5
| )
6
| 
7
| var config ld.Config
8
| 
9
| config.DataSystem = ldcomponents.DataSystem().Default()
10
| 
11
| client, _ := ld.MakeCustomClient("sdk-key-123abc", config, 5*time.Second)
```
We recommend the standard data system configuration for most customers. It uses a combination of streaming and polling to initialize the SDK, provide real time updates, and switch between streaming and polling automatically to provide redundancy.
To learn more, read [`DataSystem`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#Config.DataSystem). For information on additional configuration options, read [`DataSystemConfiguration`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7@v7.11.0/subsystems#DataSystemConfiguration).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To enable data saving mode:
 1. If you are using the [Relay Proxy](/docs/sdk/relay-proxy), upgrade your Relay Proxy to version 9.0.0-alpha.1 or later.
##### Relay Proxy version 9 supports data saving mode
The Relay Proxy version that supports data saving mode will be released as an `alpha` version while data saving mode is part of LaunchDarkly’s Early Access Program (EAP). We will release version 9.0 by the end of the EAP.
 1. Upgrade your Node.js (server-side) SDK to version 9.10 or later.
 2. Request to join the Early Access Program. Wait to receive confirmation from LaunchDarkly that data saving mode is enabled for your account.
 3. Update your SDK configuration:
 * Enable the `dataSystem` configuration option.
 * Migrate existing `LDOptions` fields. The following existing options were previously top-level `LDOptions` fields and are part of the `dataSystem` configuration as of version 9.10: `persistentStore`, `stream`, `streamInitialReconnectDelay`, `pollInterval`, `useLDD`.
Here’s how to enable the `dataSystem` configuration option:
Node.js (server-side) SDK v9.10+
```
1
| const ldClient = LaunchDarkly.init('sdk-key-123abc', {
---|--- 
2
| dataSystem: {
3
| dataSource: {
4
| dataSourceOptionsType: 'standard',
5
| 
6
| // if you use the stream, streamInitialReconnectDelay, or pollInterval options,
7
| // these options are now part of the dataSystem options,
8
| // and are set within the dataSource option
9
| }
10
| // if you use the persistentStore or useLDD option,
11
| // these options are now part of the dataSystem option
12
| }
13
| });
```
We recommend the `standard` data source option for most customers. It uses a combination of streaming and polling to initialize the SDK, provide real time updates, and switch between streaming and polling automatically to provide redundancy.
To learn more, read [`dataSystem`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html#dataSystem). For information on additional configuration options, read [`LDDataSystemOptions`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDDataSystemOptions.html).
### Python
###### Expand Python SDK code sample
To enable data saving mode:
 1. If you are using the [Relay Proxy](/docs/sdk/relay-proxy), upgrade your Relay Proxy to version 9.0.0-alpha.1 or later.
##### Relay Proxy version 9 supports data saving mode
The Relay Proxy version that supports data saving mode will be released as an `alpha` version while data saving mode is part of LaunchDarkly’s Early Access Program (EAP). We will release version 9.0 by the end of the EAP.
 1. Upgrade your Python SDK to version 9.13 or later.
 2. Request to join the Early Access Program. Wait to receive confirmation from LaunchDarkly that data saving mode is enabled for your account.
 3. Update your SDK configuration to enable the `DataSystem` configuration option.
Here’s how to enable the `DataSystem` configuration option:
Python SDK v9.13+
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config
3
| from ldclient.datasystem import default
4
| 
5
| ldclient.set_config(
6
| Config(
7
| "sdk-key-123abc",
8
| datasystem_config=default().build(),
9
| )
10
| )
11
| 
12
| client = ldclient.get()
```
We recommend the standard data system configuration for most customers. It uses a combination of streaming and polling to initialize the SDK, provide real time updates, and switch between streaming and polling automatically to provide redundancy.
To learn more, read [`ldclient.datasystem`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#module-ldclient.datasystem). For information on additional configuration options, read [`DataSystemConfig`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.DataSystemConfig).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs