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
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Transport Layer Security (TLS)](#transport-layer-security-tls)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 3 of the Erlang SDK requires Gun 2.x**. To learn more about upgrading, read [Erlang (server-side) SDK 2.x to 3.0 migration guide](/docs/sdk/server-side/erlang/migration-2-to-3).
## Overview
This topic documents how to get started with the Erlang SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://hexdocs.pm/launchdarkly_server_sdk/) 
GitHub repository | [erlang-server-sdk](https://github.com/launchdarkly/erlang-server-sdk/) 
Sample applications | [Erlang](https://github.com/launchdarkly/hello-erlang/) 
[Elixir](https://github.com/launchdarkly/hello-elixir) 
[Phoenix](https://github.com/launchdarkly/hello-phoenix) 
Published module | [Hex](https://hex.pm/packages/launchdarkly_server_sdk) 
## Get started
Follow the steps below to get started using the LaunchDarkly SDK in your Erlang application.
First, download the dependency using [Rebar](https://www.rebar3.org/):
Erlang
```
1
| {deps, [
---|--- 
2
| {ldclient, "3.0.0", {pkg, launchdarkly_server_sdk}}
3
| ]}.
```
Then, add it to your `app.src` file:
Erlang
```
1
| {applications,
---|--- 
2
| [kernel,
3
| stdlib,
4
| ldclient
5
| ]},
```
If you use Elixir, you can download the dependency using [Mix](https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html):
Elixir
```
1
| defp deps do
---|--- 
2
| [
3
| {:ldclient, "~> 3.0.0", hex: :launchdarkly_server_sdk}
4
| ]
5
| end
```
##### The Erlang SDK uses an SDK key
The Erlang SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install the SDK dependency, create an instance of the client. Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
##### Use a single instance
The Erlang SDK supports starting multiple instances, but most use cases only need a single instance. Consider using multiple instances only if you need to simultaneously access more than one environment. Do not start an instance every time you need to make a variation or other SDK call.
Here is an example:
Erlang
```
1
| % This starts an instance with the default options
---|--- 
2
| ldclient:start_instance("sdk-key-123abc")
3
| 
4
| % You can also start a named instance
5
| ldclient:start_instance("sdk-key-123abc", your_instance)
```
To learn more about the specific configuration options available for this SDK, read [`ldclient_config`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_config.html).
### Evaluate a context
Next, check which flag variation a specific context should receive:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| Flag = ldclient:variation(<<"flag-key-123abc">>, #{key => <<"context-key-123abc">>}, false)
---|--- 
```
## Transport Layer Security (TLS)
The SDK includes configuration options that allow you to set custom TLS options. If you don’t set these options, then the SDK will use the Erlang/OTP defaults. The default TLS connection settings in Erlang/OTP do not validate the identity or authenticity of certificates.
If your application has existing TLS options, then you can pass them to the SDK:
Erlang
```
1
| ldclient:start_instance(SdkKey, #{
---|--- 
2
| http_options => #{
3
| tls_options => YourOptions
4
| }}),
```
The SDK also provides helper methods to create TLS options. We recommend ensuring that the SDK is using a Certificate Authorities (CA) store that is regularly updated for production environments.
Here is a list of helper methods:
 * `ldclient_config:tls_basic_options()`: This helper provides a basic TLS configuration suitable for development. It tries to use a CA store in the default location for many linux distributions (`/etc/ssl/certs/ca-certificates.crt`). If it can’t find the store, then it will use the store from the `certifi` package.
 * `ldclient_config:tls_basic_linux_options()`: This helper provides a basic TLS configuration for linux. It uses the CA store located at `/etc/ssl/certs/ca-certificates.crt`.
 * `ldclient_config:tls_ca_certfile_options(CaStorePath)`: This helper provides a basic TLS configuration with the CA store you specify.
 * `ldclient_config:tls_basic_certifi_options()`: This helper provides a basic TLS configuration that uses the `certifi` store. Because this store is from a dependency of the package, it is not maintained or updated by OS releases.
 * `ldclient_config:with_tls_revocation(TlsOptions)`: This helper extends a TLS configuration with certificate revocation. Revocation is not included in the basic configuration because the Erlang/OTP does not cache revocation results. Enabling this feature incurs additional requests per request the SDK makes.
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#erlang).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#erlang)
 * [Configuration](/docs/sdk/features/config#erlang), including
 * [Application metadata configuration](/docs/sdk/features/app-config#erlang)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#erlang)
 * [Context configuration](/docs/sdk/features/context-config#erlang)
 * [Evaluating flags](/docs/sdk/features/evaluating#erlang)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#erlang)
 * [Getting all flags](/docs/sdk/features/all-flags#erlang)
 * [Identifying and changing contexts](/docs/sdk/features/identify#erlang)
 * [Offline mode](/docs/sdk/features/offline-mode#erlang)
 * [Private attributes](/docs/sdk/features/private-attributes#erlang)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#erlang)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#erlang)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#erlang)
 * [Sending custom events](/docs/sdk/features/events#erlang)
 * [Shutting down](/docs/sdk/features/shutdown#erlang)
 * [Storing data](/docs/sdk/features/storing-data#erlang)
 * [Test data sources](/docs/sdk/features/test-data-sources#erlang)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs