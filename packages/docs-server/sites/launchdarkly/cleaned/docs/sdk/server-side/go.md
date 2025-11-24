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
 * [Use Go contexts with LDScopedClient](#use-go-contexts-with-ldscopedclient)
 * [HTTPS Proxy](#https-proxy)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Go SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7) 
GitHub repository | [go-server-sdk](https://github.com/launchdarkly/go-server-sdk) 
Sample application | [Go](https://github.com/launchdarkly/hello-go) 
Published module | [pkg.go.dev](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7) 
##### SDK version compatibility
The LaunchDarkly Go SDK, version 7.10 and higher, is compatible with Go 1.23 and higher.
The LaunchDarkly Go SDK, version 7.0 through 7.9, is compatible with Go 1.20 and higher.
The LaunchDarkly Go SDK, version 6.x, is compatible with Go 1.18 and higher.
## Get started
After you complete the [Getting Started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Go application.
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application. How you do this depends on what dependency management system you are using:
 * If you are using the standard [Go modules](https://github.com/golang/go/wiki/Modules) system, import the SDK packages in your code and `go build` will automatically download them. The SDK and its dependencies are modules.
 * Otherwise, use the `go get` command and specify the SDK version, such as `go get github.com/launchdarkly/go-server-sdk/v7`.
There are several packages that you can import, depending on which features you are using. We recommend following:
Go SDK v7Go SDK v6
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
| // go-sdk-common/v3/ldmigration defines LaunchDarkly's model for migration feature flags
6
| // (only needed if you are working with migration flags)
7
| "github.com/launchdarkly/go-sdk-common/v3/ldmigration"
8
| 
9
| // go-server-sdk/v7 is the main SDK package - here we are aliasing it to "ld"
10
| ld "github.com/launchdarkly/go-server-sdk/v7"
11
| 
12
| // go-server-sdk/v7/ldcomponents is for advanced configuration options
13
| "github.com/launchdarkly/go-server-sdk/v7/ldcomponents"
14
| 
15
| // go-server-sdk/v7/ldplugins allows you to add plugins to the main SDK
16
| "github.com/launchdarkly/go-server-sdk/v7/ldplugins"
17
| 
18
| // observability-sdk/go is the observability plugin - here we are aliasing it to "ldobserve"
19
| // this package requires go-server-sdk/v7 version 7.11 or later
20
| ldobserve "github.com/launchdarkly/observability-sdk/go"
21
| )
```
It is good practice to pin your dependencies to a specific version. Refer to the [SDK releases page](https://github.com/launchdarkly/go-server-sdk/releases) to identify the latest version. When you update your version of `go-server-sdk`, you should also update `go-sdk-common`.
### Initialize the client
After you install and import the SDK, you have two options:
 * Create an instance of [`LDScopedClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient). This is a wrapper around `LDClient` that lets you specify the [evaluation context](/docs/home/flags/contexts#about-contexts) to use for all operations, so you do not need to specify a context for each method call. The scoped client’s context is a [multi-context](/docs/home/flags/multi-contexts), and you can update the multi-context with additional or updated associated contexts any time.
 * Create a single, shared instance of [`LDClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient). This client requires that you specify an [evaluation context](/docs/home/flags/contexts#about-contexts) in each method call.
##### LDScopedClient is in beta
`LDScopedClient` is in beta. It is still undergoing testing and active development. Its functionality may change without notice, including becoming backwards incompatible.
Both options require that you specify your SDK key. The SDK key authorizes your application to connect to a particular environment within LaunchDarkly.
##### The Go SDK uses an SDK key
The Go SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
##### LDClient must be a singleton
It’s important to make the `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you use `LDScopedClient`, you should create a new scoped client for each logical scope for your context or multi-context. For example, you might create a new scoped client for each web request. Each scoped client should use the same `LDClient` instance in its initialization.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
This example assumes you’ve imported the LaunchDarkly SDK package as `ld`, as shown above.
Go SDK, using LDScopedClientGo SDK, using LDClientGo SDK, using LDClient and default configuration
```
1
| client, _ := ld.MakeCustomClient("sdk-key-123abc",
---|--- 
2
| ld.Config{
3
| // optional observability plugin, requires Go SDK v7.11+
4
| Plugins: []ldplugins.Plugin{
5
| ldobserve.NewObservabilityPlugin()
6
| },
7
| }, 5*time.Second)
8
| 
9
| context := ldcontext.NewBuilder("context-key-123abc").
10
| Name("Sandy").
11
| Build()
12
| 
13
| scopedClient := ld.NewScopedClient(client, context)
```
The final argument to `MakeClient` or `MakeCustomClient` is a timeout parameter. In these examples, you are telling the SDK that it can spend up to five seconds attempting to connect to LaunchDarkly services before returning to your application. For more details about what the timeout means and what happens if initialization fails, read [`MakeClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#MakeClient) and [`MakeCustomClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#MakeCustomClient).
To learn more about the observability plugin, read [Go SDK observability reference](/docs/sdk/observability/go). To learn more about the specific configuration options available for this SDK, read [`Config`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#Config).
##### Best practices for error handling
The second return type in these code samples ( `_` ) represents an error in case the LaunchDarkly client does not initialize. Consider naming the return value and using it with proper error handling.
### Evaluate a context
After you initialize the client, you can check which variation a particular context should receive for a given feature flag. If you are using `LDScopedClient`, you create the scoped client with the context, and then evaluate the flag. If you are using `LDClient`, you pass the context to the flag evaluation method.
Here’s how:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| )
4
| 
5
| flagKey := "flag-key-123abc"
6
| context := ldcontext.NewBuilder("context-key-123abc").
7
| Name("Sandy").
8
| Build()
9
| 
10
| scopedClient := ld.NewScopedClient(client, context)
11
| // LDScopedClient is in beta and may change without notice.
12
| 
13
| showFeature, _ := scopedClient.BoolVariation(flagKey, false)
14
| if showFeature {
15
| // Application code to show the feature
16
| } else {
17
| // The code to run if the feature is off
18
| }
```
To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons). For more information about how contexts are specified, read [Context configuration](/docs/sdk/features/context-config).
#### Use Go contexts with LDScopedClient
As [described above](/docs/sdk/server-side/go#initialize-the-client), one advantage of using `LDScopedClient` is that you can specify the [evaluation context](/docs/home/flags/contexts#about-contexts) to use for all operations, and do not need to specify a context for each method call. You can update the scoped client’s current context with additional or updated associated contexts any time.
After you create a scoped client, we recommend adding it your Go context. Another advantage of using `LDScopedClient` is that you can pass the scoped client to any logic that already takes a Go context (`context.Context`), using utility methods provided in the SDK. This means the scoped client is implicitly passed around through all of your code that uses `context.Context`, and you can access the scoped client anywhere in your application logic.
Here’s how to add and retrieve your `LDScopedClient` from your Go context:
Add LDScopedClient to Go contextRetrieve LDScopedClient from Go context
```
1
| scopedClient := ld.NewScopedClient(client, ldContext)
---|--- 
2
| ctx := ld.GoContextWithScopedClient(context.Background(), scopedClient)
3
| otherFunction(ctx)
4
| // LDScopedClient is in beta and may change without notice.
```
An example of how this might apply in your application is if you have HTTP middleware, and you want to pass an `LDScopedClient` into the `http.Request`’s Go context:
Example: Using LDScopedClient in Go context
```
1
| func LDScopedClientMiddleware(client *LDClient) func(http.Handler) http.Handler {
---|--- 
2
| return func(next http.Handler) http.Handler {
3
| return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
4
| scopedClient := NewScopedClient(client, ldcontext.New("context-key-123abc"))
5
| ctx := GoContextWithScopedClient(r.Context(), scopedClient)
6
| next.ServeHTTP(w, r.WithContext(ctx))
7
| })
8
| }
9
| }
10
| 
11
| func requestLogic(r *http.Request) {
12
| featureFlagEnabled := MustGetScopedClient(r.Context()).BoolVariation("flag-key-123abc", false)
13
| // use featureFlagEnabled...
14
| }
```
To learn more, read [`GoContextWithScopedClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.GoContextWithScopedClient), [`GetScopedClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.GetScopedClient), and [`MustGetScopedClient`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.MustGetScopedClient).
## HTTPS Proxy
Go’s standard HTTP library provides a built-in HTTPS proxy. If the `HTTPS_PROXY` environment variable is present, then the SDK will proxy all network requests through the URL provided.
Here is an example:
Consolecmd
```
$
| export HTTPS_PROXY=https://web-proxy.domain.com:8080
---|--- 
```
You can also specify a proxy programmatically through the SDK configuration:
Go SDK
```
1
| var config ld.Config
---|--- 
2
| config.HTTP = ldcomponents.HTTPConfiguration().
3
| ProxyURL("https://web-proxy.domain.com:8080")
```
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#go).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#go)
 * [Big segments](/docs/sdk/features/big-segments#go)
 * [Configuration](/docs/sdk/features/config#go), including
 * [Application metadata configuration](/docs/sdk/features/app-config#go)
 * [Migration configuration](/docs/sdk/features/migration-config#go)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#go)
 * [Context configuration](/docs/sdk/features/context-config#go)
 * [Data saving mode](/docs/sdk/features/data-saving-mode#go)
 * [Evaluating flags](/docs/sdk/features/evaluating#go)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#go)
 * [Flushing events](/docs/sdk/features/flush#go)
 * [Getting all flags](/docs/sdk/features/all-flags#go)
 * [Hooks](/docs/sdk/features/hooks#go)
 * [Identifying and changing contexts](/docs/sdk/features/identify#go)
 * [Logging configuration](/docs/sdk/features/logging#go)
 * [Migrations](/docs/sdk/features/migrations#go)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#go)
 * [Observability](/docs/sdk/observability/go)
 * [Offline mode](/docs/sdk/features/offline-mode#go)
 * [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#go)
 * [Private attributes](/docs/sdk/features/private-attributes#go)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#go)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#go)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#go)
 * [Secure mode](/docs/sdk/features/secure-mode#go)
 * [Sending custom events](/docs/sdk/features/events#go)
 * [Shutting down](/docs/sdk/features/shutdown#go)
 * [Storing data](/docs/sdk/features/storing-data#go)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#go)
 * [Test data sources](/docs/sdk/features/test-data-sources#go)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#go)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs