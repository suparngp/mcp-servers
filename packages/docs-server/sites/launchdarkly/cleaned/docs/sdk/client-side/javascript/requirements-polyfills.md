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
 * [Add a polyfill](#add-a-polyfill)
 * [Install polyfills for specific features](#install-polyfills-for-specific-features)
 * [Promise](#promise)
 * [EventSource](#eventsource)
 * [document.querySelectorAll()](#documentqueryselectorall)
## Overview
This topic explains how to add different types of polyfills in the JavaScript SDK.
Web browsers vary widely in their support of specific features and standards. It is common in JavaScript development to use [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) to ensure the widest possible compatibility. Polyfills are scripts that implement a feature in case it is not built into the browser.
Three features that the LaunchDarkly JavaScript SDK uses that may not be available on every browser are `Promise`, `EventSource`, and `document.querySelectorAll()`.
If you use REPORT, you need the LaunchDarkly EventSource polyfill
If you enable the JavaScript SDK’s [`useReport` configuration option](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#useReport) and want to use streaming, you must use the LaunchDarkly EventSource polyfill. This is true whether or not your browser already supports `EventSource`. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource).
## Add a polyfill
For each of these features, there are two ways you can provide the polyfill script.
The first way is to load the polyfill script directly from a CDN that hosts the package, with a `<script>` tag within the `<head>` element of your page. You must put the `<script>` tag for the polyfill _before_ any scripts that make use of the LaunchDarkly SDK.
Here is how to load a polyfill script directly from a CDN:
HTML
```
1
| <script src="[URL of the polyfill script]"></script>
---|--- 
```
If you are using a package manager such as NPM or Yarn, and using `require()` to load modules at runtime, you would first add the polyfill package to your project:
Shell
```
$
| npm install package-name-of-polyfill@package.version.number
---|--- 
```
Then, make sure that you `require` the polyfill module prior to initializing the LaunchDarkly client:
JavaScript
```
1
| require('package-name-of-polyfill');
---|--- 
```
You only need to use one of these methods. You do not need to use both a CDN and a package manager.
## Install polyfills for specific features
Three features that the LaunchDarkly SDK uses that may not be available on every browser are `Promise`, `EventSource`, and `document.querySelectorAll()`. This section describes how to install a polyfill for each of them.
### Promise
The JavaScript SDK relies heavily on JavaScript Promises. [Browsers that do not support Promise](https://caniuse.com/?search=Promise) include Internet Explorer and older versions of Microsoft Edge. If you need to support these browsers, you will need to install a polyfill for Promise, such as [es6-promise](https://github.com/stefanpenner/es6-promise).
To install a polyfill for Promise:
HTMLShellJavaScript
```
1
| <!-- loading polyfill from CDN -->
---|--- 
2
| <script src="https://unpkg.com/es6-promise@4.2.4/dist/es6-promise.auto.min.js"></script>
```
### EventSource
The JavaScript SDK uses [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) to provide a live streaming connection to LaunchDarkly, if you have enabled streaming.
By default, the JavaScript SDK client opens a streaming connection if you subscribe to `change` or `change:flag-key` events. You can also open a streaming connection explicitly by setting the `streaming` configuration option or using the `setStreaming` method. **If you never enable streaming, you do not need`EventSource`.** To learn more, read [`streaming`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#streaming).
EventSource is [widely available in modern browsers](https://caniuse.com/?search=EventSource). If you need streaming and the older browser versions you are supporting do not provide EventSource, you can install a polyfill.
If you enable the JavaScript SDK’s [`useReport` configuration option](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#useReport) and want to use streaming, you must install the [LaunchDarkly EventSource polyfill](https://github.com/launchdarkly/js-eventsource) to provide streaming support. This is true whether or not your browser already supports `EventSource`.
To install LaunchDarkly’s EventSource polyfill:
Installing LaunchDarkly's EventSource polyfillLoading LaunchDarkly's EventSource polyfill
```
$
| npm install launchdarkly-eventsource
---|--- 
```
### document.querySelectorAll()
The JavaScript SDK uses `querySelectorAll` to support `click` events for Experimentation. **If you never use click conversion metrics, you do not need`querySelectorAll`.** To learn more, read [Clicked or tapped conversion metrics](/docs/home/metrics/click).
`querySelectorAll` is widely available in browsers, [except in old versions of Internet Explorer](https://caniuse.com/queryselector). If you want to support these, and you need Experimentation support, you can install a polyfill such as [polyfill-queryselector](https://github.com/cobbdb/polyfill-queryselector).
To install a polyfill for `querySelectorAll`:
HTMLShellJavaScript
```
1
| <!-- loading polyfill from CDN -->
---|--- 
2
| <script src="https://unpkg.com/polyfill-queryselector@1.0.2/querySelector.js"></script>
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs