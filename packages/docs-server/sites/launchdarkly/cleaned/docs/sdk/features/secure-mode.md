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
 * [About secure mode](#about-secure-mode)
 * [How secure mode works](#how-secure-mode-works)
 * [Generate a secure mode hash](#generate-a-secure-mode-hash)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [Edge SDKs](#edge-sdks)
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
 * [Compute the hash manually](#compute-the-hash-manually)
 * [Configure secure mode in JavaScript-based SDKs](#configure-secure-mode-in-javascript-based-sdks)
 * [Electron](#electron)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Web](#react-web)
## Overview
This topic explains how to use the secure mode feature to safely evaluate feature flags in a web browser.
## About secure mode
Secure mode ensures that customers’ feature flag evaluations are kept private in web browser environments, and that one end user cannot inspect the variations for another end user. On an insecure device, a malicious end user could use a context or user key to identify what flag values another end user receives by analyzing the results of multiple flag evaluations. Secure mode prevents you from doing an evaluation for a context or user key that hasn’t been signed on the backend.
Secure mode is available for communication between the following JavaScript-based SDKs and LaunchDarkly:
 * Electron
 * JavaScript
 * Node.js (client-side)
 * React Web
Secure mode is not necessary for server-side SDKs.
### How secure mode works
Secure mode works when you configure your JavaScript SDK to include a server-generated HMAC SHA256 hash of your context key or user key. This hash is signed with the SDK key for your environment. Enabling secure mode means that every request coming from a client-side JavaScript SDK requires the secure mode hash to evaluate flag variations. You can pass this to your front-end code with the mechanism of your choice, such as bootstrapping or as a template variable.
To use secure mode, you must complete the following:
 1. Enable secure mode for each environment: You can enable secure mode by editing each of your environments from the **Environments** list of your project. Secure mode is an environment-wide setting. You can enable secure mode for your environment even if you’re also using SDKs other than JavaScript. Enabling secure mode does not cause those SDKs to fail.
 2. [Configure your server-side or edge SDK to generate the secure mode hash](/docs/sdk/features/secure-mode#generate-a-secure-mode-hash): Most LaunchDarkly server-side and edge SDKs include a method to compute the secure mode hash for a key. Alternatively, you can compute the hash yourself. To learn how, read [Compute the hash manually](/docs/sdk/features/secure-mode#compute-the-hash-manually). If at any time you reset an environment’s SDK key, you will need to regenerate the secure mode hash.
 3. [Send the computed secure mode hash for the context or user to LaunchDarkly](/docs/sdk/features/secure-mode#configure-secure-mode-in-javascript-based-sdks): Include the secure mode hash when requesting flag evaluations. The JavaScript-based SDK will send the context or user key and the hash to LaunchDarkly. If the hash doesn’t match, LaunchDarkly returns an error.
##### Enable secure mode during initial setup
You can enable secure mode at any time when you use LaunchDarkly SDKs. As a best practice, we recommend that you enable secure mode during initial SDK configuration, because late-stage changes to your SDK configuration may have negative interactions with other settings.
To learn more about the secure mode hash process, read [How to verify secure mode hash](https://support.launchdarkly.com/hc/en-us/articles/14614789065115-How-to-verify-secure-mode-hash).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## Generate a secure mode hash
Details about generating a secure mode hash are available in the SDK-specific sections below:
 * [Server-side SDKs](/docs/sdk/features/secure-mode#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/secure-mode#edge-sdks)
## Server-side SDKs
You can use the following server-side SDKs to generate a secure mode hash:
 * [.NET (server-side)](/docs/sdk/features/secure-mode#net-server-side)
 * [Go](/docs/sdk/features/secure-mode#go)
 * [Haskell](/docs/sdk/features/secure-mode#haskell)
 * [Java](/docs/sdk/features/secure-mode#java)
 * [Node.js (server-side)](/docs/sdk/features/secure-mode#nodejs-server-side)
 * [PHP](/docs/sdk/features/secure-mode#php)
 * [Python](/docs/sdk/features/secure-mode#python)
 * [Ruby](/docs/sdk/features/secure-mode#ruby)
 * [Rust](/docs/sdk/features/secure-mode#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The [`SecureModeHash`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_SecureModeHash_) method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
.NET SDK v7.0 (C#)
```
1
| var hash = client.SecureModeHash(context);
---|--- 
```
### Go
###### Expand Go code sample
The [`SecureModeHash`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.SecureModeHash) method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| // There is not a SecureModeHash method in the LDScopedClient,
---|--- 
2
| // so you need to access the method from the LDClient.
3
| // Then, pass in the scoped client's current context.
4
| // LDScopedClient is in beta and may change without notice.
5
| scopedClient.Client().SecureModeHash(scopedClient.CurrentContext())
```
### Haskell
###### Expand Haskell code sample
The `secureModeHash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Haskell SDK v4.0
```
1
| secureModeHash client context
---|--- 
```
### Java
###### Expand Java code sample
The [`secureModeHash`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#secureModeHash-com.launchdarkly.sdk.LDContext-) method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Java SDK v6.0
```
1
| client.secureModeHash(context);
---|--- 
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The `secureModeHash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Node.js SDK v7.x and later (JavaScript)
```
1
| client.secureModeHash(context);
---|--- 
```
### PHP
###### Expand PHP code sample
The `secureModeHash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
PHP SDK v5.0
```
1
| $hash = $client->secureModeHash($context);
---|--- 
```
### Python
###### Expand Python code sample
The `SecureModeHash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Python SDK v8.0
```
1
| hash = ldclient.get().secure_mode_hash(context)
---|--- 
```
### Ruby
###### Expand Ruby code sample
The `secure_mode_hash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Ruby SDK v7.0
```
1
| client.secure_mode_hash(context)
---|--- 
```
### Rust
###### Expand Rust code sample
The `secure_mode_hash` method computes an HMAC signature of a context signed with the client’s SDK key.
Here is the method:
Rust SDK v1
```
1
| client.secure_mode_hash(&context);
---|--- 
```
## Edge SDKs
You can use the following edge SDKs to generate a secure mode hash:
 * [Cloudflare](/docs/sdk/features/secure-mode#cloudflare)
 * [Fastly](/docs/sdk/features/secure-mode#fastly)
 * [Vercel](/docs/sdk/features/secure-mode#vercel)
### Cloudflare
###### Expand Cloudflare code sample
The [`secureModeHash`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#secureModeHash) method computes an HMAC signature of a context signed with the SDK key.
Here is the method:
TypeScript
```
1
| const hash = client.secureModeHash(context);
---|--- 
```
### Fastly
###### Expand Fastly code sample
The [`secureModeHash`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#secureModeHash) method computes an HMAC signature of a context signed with the SDK key.
Here is the method:
TypeScript
```
1
| const hash = client.secureModeHash(context);
---|--- 
```
### Vercel
###### Expand Vercel code sample
The [`secureModeHash`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#secureModeHash) method computes an HMAC signature of a context signed with the SDK key.
Here is the method:
TypeScript
```
1
| const hash = client.secureModeHash(context);
---|--- 
```
## Compute the hash manually
To compute the hash manually, locate the server-side SDK key for your environment on the **Environments** list for your project. Then, compute an HMAC SHA256 hash of the UTF-8 encoding of your context key, using the UTF-8 encoding of your SDK key as a secret, and convert the hash to a hexadecimal string.
Here is a .NET (server-side) example:
C#
```
1
| using System;
---|--- 
2
| using System.Security.Cryptography;
3
| using System.Text;
4
| 
5
| var encoding = new UTF8Encoding();
6
| var keyBytes = encoding.GetBytes("sdk-key-123abc");
7
| var hmacSha256 = new HMACSHA256(keyBytes);
8
| var hashBytes = hmacSha256.ComputeHash(encoding.GetBytes("context-key-123abc"));
9
| var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
```
## Configure secure mode in JavaScript-based SDKs
To use secure mode, you must generate the hash based on a unique identifier for the context. This unique identifier is called a “canonical key” and is a concatenation of the `kind` and `key` attributes, separated by a colon (`:`). For example, if a user context has a key of “user-key-123abc,” this means you must generate the hash using a canonical key of `user:user-key-123abc`. If the context is a multi-context, the canonical key must include the `key` and `kind` attribute for each context kind. For example, if a multi-context contains an organization context kind and a user context kind, and they have the keys “org-key-123abc” and “user-key-123abc”, the canonical key is `organization:org-key-123abc:user:user-key-123abc`.
Secure mode is not compatible with the SDK’s ability to automatically generate keys for anonymous contexts because the SDK needs a correctly calculated `hash` value. To learn more, read [Anonymous contexts and users](/docs/sdk/features/anonymous).
In JavaScript-based SDKs, send the computed secure mode hash for your context as the [`hash` attribute](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#hash) in the `LDOptions` object during client initialization, and as the [`hash` parameter](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#identify) if subsequently identifying new contexts.
Specifying the computed secure mode hash is supported in the following client-side SDKs:
 * [Electron](/docs/sdk/features/secure-mode#electron)
 * [JavaScript](/docs/sdk/features/secure-mode#javascript)
 * [Node.js (client-side)](/docs/sdk/features/secure-mode#nodejs-client-side)
 * [React Web](/docs/sdk/features/secure-mode#react-web)
### Electron
###### Expand Electron code sample
Here’s how to configure or send the computed secure mode hash:
Electron SDK
```
1
| // client initialization
---|--- 
2
| const options = {
3
| hash: 'server-generated-hash-123abc',
4
| };
5
| const client = LDClient.initialize('client-side-id-123abc', user, options);
6
| 
7
| // identification of new user
8
| client.identify(newUser, hash, function() {
9
| console.log("New user's flags available");
10
| });
11
| 
12
| // identification of new user, with a Promise
13
| client.identify(newUser, hash).then(() => {
14
| console.log("New user's flags available");
15
| });
```
### JavaScript
###### Expand JavaScript code sample
Here’s how to configure or send the computed secure mode hash:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| // client initialization
---|--- 
2
| const options = {
3
| hash: 'server-generated-hash-123abc',
4
| };
5
| const client = LDClient.initialize('client-side-id-123abc', context, options);
6
| 
7
| try {
8
| await client.waitForInitialization(5);
9
| // proceed with successfully initialized client
10
| 
11
| // identification of new contexts
12
| client.identify(newContext, hash, function() {
13
| console.log("New context's flags available");
14
| });
15
| 
16
| } catch(err) {
17
| // Client failed to initialized or timed out
18
| // variation() calls return fallback values until initialization completes
19
| }
```
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
Here’s how to configure or send the computed secure mode hash:
Node.js (client-side) SDK v3 (JavaScript)
```
1
| // client initialization
---|--- 
2
| const options = {
3
| hash: 'server-generated-hash-123abc',
4
| };
5
| const client = LDClient.initialize('client-side-id-123abc', context, options);
6
| 
7
| // identification of new contexts
8
| client.identify(newContext, hash, function() {
9
| console.log("New context's flags available");
10
| });
11
| 
12
| // identification of new contexts, with a Promise
13
| client.identify(newContext, hash).then(() => {
14
| console.log("New context's flags available");
15
| });
```
### React Web
All context-related functionality provided by the [JavaScript SDK](/docs/sdk/features/secure-mode#javascript) is also available in the React Web SDK.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs