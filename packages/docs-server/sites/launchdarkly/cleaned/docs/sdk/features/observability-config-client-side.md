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
 * [Client-side SDKs](#client-side-sdks)
 * [iOS](#ios)
 * [Android](#android)
 * [JavaScript](#javascript)
 * [Recording network requests and WebSocket events](#recording-network-requests-and-websocket-events)
 * [Console messages](#console-messages)
 * [Using a proxy](#using-a-proxy)
 * [Fullstack mapping](#fullstack-mapping)
 * [Versioning sessions and errors](#versioning-sessions-and-errors)
 * [React Native](#react-native)
 * [React Web](#react-web)
 * [Vue](#vue)
 * [Monkey patches](#monkey-patches)
 * [Browser APIs subject to monkey patching](#browser-apis-subject-to-monkey-patching)
## Overview
This topic explains how to configure the observability plugin for client-side SDKs.
The observability plugin collects and sends observability data to LaunchDarkly, so you can review error monitoring, logs, traces, and more from within the LaunchDarkly UI.
To get started with the observability plugin, read the observability reference guide for your SDK. Use the docs site navigation on the left, or find your SDK under [Observability SDKs](/docs/sdk/observability#observability-sdks).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/observability-config-client-side#client-side-sdks)
## Client-side SDKs
This feature is available in the observability plugin for the following client-side SDKs:
 * [iOS](/docs/sdk/features/observability-config-client-side#ios)
 * [Android](/docs/sdk/features/observability-config-client-side#android)
 * [JavaScript](/docs/sdk/features/observability-config-client-side#javascript)
 * [React Native](/docs/sdk/features/observability-config-client-side#react-native)
 * [React Web](/docs/sdk/features/observability-config-client-side#react-web)
 * [Vue](/docs/sdk/features/observability-config-client-side#vue)
### iOS
###### Expand iOS code sample
To specify the observability plugin configuration options, use `Options` for the plugin.
Here’s how:
Plugin options, iOS SDK v9.14+
```
1
| let config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| config.plugins = [
3
| Observability(
4
| options: .init(
5
| serviceName: "custom service name",
6
| serviceVersion: "1.0.0",
7
| resourceAttributes: [
8
| "my-resource": .string("my-value")
9
| ],
10
| isDebug: true,
11
| logs: .enabled,
12
| traces: .enabled,
13
| metrics: .enabled
14
| )
15
| )
16
| ]
```
For a complete list of configuration options, read [`Configuration`](https://github.com/launchdarkly/swift-launchdarkly-observability/blob/main/Sources/LaunchDarklyObservability/API/Options.swift).
### Android
###### Expand Android code sample
To specify the observability plugin configuration options, use `Options` for the plugin.
Here’s how:
Plugin configuration options
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
18
| 
19
| LDContext context = LDContext.create("context-key-123abc");
20
| 
21
| LDClient client = LDClient.init(this@BaseApplication, ldConfig, context, 0);
```
For a complete list of configuration options, read [`Options javadoc`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-android/com/launchdarkly/observability/api/Options.html).
### JavaScript
###### Expand JavaScript code sample
The observability plugin supports the following configuration options. After you [initialize the SDK](/docs/sdk/observability/javascript#initialize-the-client), you can set these when you [configure the observability plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options). Then, you can access the related features from within your application.
#### Recording network requests and WebSocket events
By default, the observability plugin shows you all the network request durations, response codes, and sizes for a session.
You can configure the options for the observability plugin to additionally record the headers and bodies of network requests and responses. Then, provide these options when you initialize the SDK client.
Here’s how to construct the `options` object:
Plugin options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new Observability({
4
| networkRecording: {
5
| enabled: true,
6
| recordHeadersAndBody: true
7
| }
8
| })
9
| ]
10
| }
```
By default, the plugin does not record the following headers:
 * `Authorization`
 * `Cookie`
 * `Proxy-Authorization`
To redact other headers, set `networkRecording.networkHeadersToRedact`. To redact specific keys in the request/response body, set `networkRecording.networkBodyKeysToRedact`. Alternatively, you can use an allowlist, and set `networkRecording.headerKeysToRecord` and `networkRecording.bodyKeysToRecord`.
By default, the plugins do not record the following URLs:
 * `https://www.googleapis.com/identitytoolkit`
 * `https://securetoken.googleapis.com`
To redact other URLs, for example if you have APIs that you know will always return secrets in their headers, body, or both, add the option `urlBlocklist` to your plugin options and set it to a list of URLs:
Plugin options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new Observability({
4
| networkRecording: {
5
| enabled: true,
6
| recordHeadersAndBody: true
7
| },
8
| urlBlocklist: [
9
| 'https://salted-passwords.com',
10
| ]
11
| })
12
| ]
13
| };
```
If none of these options are specific enough, you can write your own method to sanitize network responses. Define a `networkRecording.requestResponseSanitizer` function that receives a request/response pair and returns either `null`, if you want to drop the request entirely, or a sanitized request/response pair. We do not recommend dropping requests completely unless absolutely necessary, as it can cause issues with debugging due to the missing requests. Instead, we recommend deleting or redacting header and body fields in your `requestResponseSanitizer` function.
When `networkRecording.recordHeadersAndBody` is `true`, the plugins record all of the WebSocket events in your sessions, including opening a connection, sending and receiving messages, receiving an error, and closing a connection.
To disable WebSocket events, but keep recording the headers and bodies of network requests, set `networkRecording.disableWebSocketEventRecordings` to `true`.
#### Console messages
By default, the plugins show the console messages that were logged during a session.
To disable console recording, set `disableConsoleRecording` to `true` when you [configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options) for either the observability plugin or the session replay plugin.
If you are not seeing console logs in your session recordings, ensure that `disableConsoleRecording` is set to `false` in your plugin options.
To specify which console methods to record, set `consoleMethodsToRecord`.
#### Using a proxy
If your sessions or errors are not appearing in LaunchDarkly, it may be that requests to LaunchDarkly are being blocked. This may be happening for any of several reasons, including third-party browser extensions, browser configuration, or VPN settings.
If you have access to your domain’s DNS settings, you can set up a proxy from your domain to LaunchDarkly to avoid having requests blocked.
Here’s how:
 1. On your domain, add two `CNAME` records:
 * A `CNAME` record that points `pub.ld.<your_domain>` to `pub.observability.app.launchdarkly.com`
 * A `CNAME` record that points `otel.ld.<your_domain>` to `otel.observability.app.launchdarkly.com`
Together, these records mean that if you have an app running at `<your_domain>`, your DNS records will point `pub.ld.<your_domain>` and `otel.ld.<your_domain>` to the LaunchDarkly servers.
 2. In your application, set the `backendUrl` and `otel` options when you [configure the observability plugin](/docs/sdk/observability/javascript#configure-the-plugin-options).
 * Set the `backendUrl` option to `pub.ld.<your_domain>`
 * Set the `otel` option to `otel.ld.<your_domain>`
Here’s how:
Plugin options
```
1
| // the examples assume your_domain is acme.com
---|--- 
2
| 
3
| const options = {
4
| plugins: [
5
| new Observability({
6
| backendUrl: 'https://pub.ld.acme.com',
7
| otel: { otlpEndpoint: 'https://otel.ld.acme.com', },
8
| })
9
| ]
10
| };
```
#### Fullstack mapping
We recommend instrumenting your application so that you can attribute frontend requests with backend errors and logs.
To do this, set following plugin options:
 * `tracingOrigins`:
 * set to the URI of your application’s backend API to propagate the trace context. Matching API requests include a `traceparent` HTTP header that propagates the trace context, allowing server-side tracing and logging to associate its data with the frontend trace.
 * set to `true` to include all domains and subdomains of the URL for your frontend application.
 * set to an array of patterns matching the location of your backend if you want to include specific URLs. You’ll need to use this option if your application makes cross-origin requests that you would like to trace. For example, if your frontend sends requests to `https://backend.example.com/api`, set the value to `['backend.example.com/api']`.
 * `networkRecording`:
 * set `enabled` to `true`
 * set `recordHeadersAndBody` to `true`
Here’s how:
Plugin options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new Observability({
4
| tracingOrigins: true,
5
| networkRecording: {
6
| enabled: true,
7
| recordHeadersAndBody: true
8
| }
9
| })
10
| ]
11
| };
```
#### Versioning sessions and errors
When you [configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options), you can optionally set a `version` field. The version is then included in the [error and session views in the LaunchDarkly UI](/docs/home/observability).
This `version` field is configured manually, and is separate from any versions that may be set if you [configure automatic environment attributes](/docs/sdk/features/environment-attributes) in the LaunchDarkly SDK.
### React Native
###### Expand React Native code sample
To specify the observability plugin configuration options, use the `ReactNativeOptions` interface to set the options.
Here’s how:
Plugin configuration options
```
1
| const client = new ReactNativeLDClient(
---|--- 
2
| 'mobile-key-123abc',
3
| AutoEnvAttributes.Enabled,
4
| {
5
| plugins: [
6
| new Observability({
7
| serviceName: 'example-service',
8
| // we recommend setting service_version to the latest deployed git SHA
9
| serviceVersion: 'example-sha'
10
| })
11
| ],
12
| }
13
| );
```
For a complete list of configuration options, read [`ReactNativeOptions`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/ReactNativeOptions.html).
### React Web
Configuring the observability plugin in the React Web SDK follows the examples given for the [JavaScript SDK](/docs/sdk/features/observability-config-client-side#javascript).
### Vue
Configuring the observability plugin in the Vue SDK follows the examples given for the [JavaScript SDK](/docs/sdk/features/observability-config-client-side#javascript).
## Monkey patches
When the observability plugin runs, it [monkey patches](https://en.wikipedia.org/wiki/Monkey_patch) browser APIs in order to record errors, console messages, network requests, and changes on the page.
###### Expand Browser APIs subject to monkey patching
### Browser APIs subject to monkey patching
Here is a list of the browser APIs that the LaunchDarkly observability plugins may monkey patch:
 * `window.sessionStorage.setItem`
 * `window.sessionStorage.getItem`
 * `window.sessionStorage.removeItem`
 * `window.onerror`
 * `window.fetch`
 * `window.FontFace`
 * `window.scroll`
 * `window.scrollTo`
 * `window.scrollBy`
 * `window.scrollIntoView`
 * `window.WebGLRenderingContext`
 * `window.WebGL2RenderingContext`
 * `window.CanvasRenderingContext2D`
 * `window.HTMLCanvasElement`
 * `window.CSSStyleSheet.prototype.insertRule`
 * `window.CSSStyleSheet.prototype.deleteRule`
 * `window.CSSGroupingRule`
 * `window.CSSMediaRule`
 * `window.CSSConditionRule`
 * `window.CSSSupportsRule`
 * `window.CSSStyleDeclaration.prototype.setProperty`
 * `window.CSSStyleDeclaration.prototype.removeProperty`
 * `history.pushState`
 * `history.replaceState`
 * `XMLHttpRequest.prototype.open`
 * `XMLHttpRequest.prototype.setRequestHeader`
 * `XMLHttpRequest.prototype.send`
 * `console.assert`
 * `console.clear`
 * `console.count`
 * `console.countReset`
 * `console.debug`
 * `console.dir`
 * `console.dirxml`
 * `console.error`
 * `console.group`
 * `console.groupCollapsed`
 * `console.groupEnd`
 * `console.info`
 * `console.log`
 * `console.table`
 * `console.time`
 * `console.timeEnd`
 * `console.timeLog`
 * `console.trace`
 * `console.warn`
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs