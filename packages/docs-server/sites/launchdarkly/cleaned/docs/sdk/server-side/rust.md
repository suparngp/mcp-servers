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
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 2 of the Rust SDK makes the`rustls` dependency optional**. There are no changes to the SDK API.
## Overview
This topic documents how to get started with the server-side Rust SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://docs.rs/launchdarkly-server-sdk) 
GitHub repository | [rust-server-sdk](https://github.com/launchdarkly/rust-server-sdk) 
Sample application | [Rust](https://github.com/launchdarkly/hello-rust) 
Published module | [crates.io](https://crates.io/crates/launchdarkly-server-sdk) 
## Get started
After you complete the [Get started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Rust application.
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application.
Shell
```
$
| cargo add launchdarkly-server-sdk
---|--- 
```
### Initialize the client
Next, import the LaunchDarkly client in your application code:
Rust
```
1
| use launchdarkly_server_sdk::{Client, ConfigBuilder, ContextBuilder, ServiceEndpointsBuilder};
---|--- 
```
##### The Rust SDK uses an SDK key
The Rust SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
After you install and import the SDK, create a single, shared instance of the LaunchDarkly client. Specify your SDK key here so that your application is authorized to connect to LaunchDarkly, your application, and your environment.
Once you have created the client, start the client process and wait for the client to initialize. This SDK depends on the tokio crate to provide a default runtime and as such it is a required dependency.
Only create one instance of `client`.
Here’s how:
Rust
```
1
| #[tokio::main]
---|--- 
2
| async fn main () {
3
| let config = ConfigBuilder::new(&sdk-key-123abc).build();
4
| let client = Client::build(config).unwrap();
5
| 
6
| client.start_with_default_executor();
7
| 
8
| if !client.initialized_async().await {
9
| panic!("Client failed to successfully initialize");
10
| }
11
| }
```
To learn more about the specific configuration options available in this SDK, read [`Config`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Config.html).
##### client must be a singleton
It’s important to make `client` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag.
Here’s how:
Rust
```
1
| let context = ContextBuilder::new("context-key-123abc").build();
---|--- 
2
| let show_feature = client.bool_variation(&context, "flag-key-123abc", false);
3
| 
4
| if show_feature {
5
| # application code to show the feature
6
| } else {
7
| # the code to run if the feature is off
8
| }
```
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#rust).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#rust)
 * [Configuration](/docs/sdk/features/config#rust), including
 * [Application metadata configuration](/docs/sdk/features/app-config#rust)
 * [Context configuration](/docs/sdk/features/context-config#rust)
 * [Evaluating flags](/docs/sdk/features/evaluating#rust)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#rust)
 * [Flushing events](/docs/sdk/features/flush#rust)
 * [Getting all flags](/docs/sdk/features/all-flags#rust)
 * [Identifying and changing contexts](/docs/sdk/features/identify#rust)
 * [Logging configuration](/docs/sdk/features/logging#rust)
 * [Migrations](/docs/sdk/features/migrations#rust)
 * [Offline mode](/docs/sdk/features/offline-mode#rust)
 * [Private attributes](/docs/sdk/features/private-attributes#rust)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#rust)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#rust)
 * [Secure mode](/docs/sdk/features/secure-mode#rust)
 * [Sending custom events](/docs/sdk/features/events#rust)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#rust)
 * [Shutting down](/docs/sdk/features/shutdown#rust)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs