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
 * [Connecting though a web proxy](#connecting-though-a-web-proxy)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [C++ (client-side)](#c-client-side)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Apex](#apex)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to configure an SDK to connect to LaunchDarkly through a web proxy. This feature is available for client-side and server-side SDKs.
Connecting to LaunchDarkly through a web proxy is not related to using LaunchDarkly’s Relay Proxy. To learn about LaunchDarkly’s Relay Proxy, read [The Relay Proxy](/docs/sdk/relay-proxy).
## Connecting though a web proxy
If your organization requires that you use a web proxy to connect to external resources, you must configure your LaunchDarkly SDKs to connect through the proxy instead of connecting to LaunchDarkly directly.
Some proxies require authentication with a username and password, or with custom headers. Instructions on how to configure the SDK to send these parameters are in the SDK-specific sections.
In the following examples, the web proxy’s hostname is “my-proxy-host” and it uses port 8080. Substitute the appropriate values for your proxy. Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/web-proxy#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/web-proxy#server-side-sdks)
##### Using a web proxy with mobile SDKs
Android, Flutter, iOS, and React Native support using a web proxy through their device operating systems (OS). You can use their onboard OS settings to configure a web proxy.
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/web-proxy#net-client-side)
 * [C++ (client-side)](/docs/sdk/features/web-proxy#c-client-side)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To configure the client-side .NET SDK to connect to LaunchDarkly through a web proxy:
C#
```
1
| var handler = new System.Net.Http.HttpClientHandler();
---|--- 
2
| handler.Proxy = new System.Net.WebProxy("http://my-proxy-host:8080");
3
| 
4
| var config = Configuration
5
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
6
| .HttpMessageHandler(handler)
7
| .Build();
```
To configure the client-side .NET SDK to connect to LaunchDarkly through a web proxy with authentication:
C#
```
1
| var handler = new System.Net.Http.HttpClientHandler();
---|--- 
2
| var proxy = new System.Net.WebProxy("http://my-proxy-host:8080");
3
| var credentials = new System.Net.CredentialCache();
4
| credentials.Add(proxy.Address, "Basic",
5
| new NetworkCredential("username", "password"));
6
| proxy.Credentials = credentials;
7
| handler.Proxy = proxy;
8
| 
9
| var config = Configuration
10
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
11
| .HttpMessageHandler(handler)
12
| .Build();
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
##### Supported versions
This feature is available in the client-side C++ SDK’s version 2.x only. It is not yet available in version 3.0.
To configure the client-side C/C++ SDK to connect to LaunchDarkly through a web proxy:
C SDK v2.x (native)
```
1
| struct LDConfig *config = LDConfigNew("mobile-key-123abc");
---|--- 
2
| LDConfigSetProxyURI(config, "https://web-proxy.domain.com:8080");
```
To configure the client-side C/C++ SDK to connect to LaunchDarkly through a web proxy with authentication:
C SDK v2.x (native)
```
1
| struct LDConfig *config = LDConfigNew("mobile-key-123abc");
---|--- 
2
| LDConfigSetProxyURI(config, "https://username:password@web-proxy.domain.com:8080");
```
## Server-side SDKs
 * [.NET (server-side)](/docs/sdk/features/web-proxy#net-server-side)
 * [Apex](/docs/sdk/features/web-proxy#apex)
 * [Go](/docs/sdk/features/web-proxy#go)
 * [Java](/docs/sdk/features/web-proxy#java)
 * [Node.js (server-side)](/docs/sdk/features/web-proxy#nodejs-server-side)
 * [Python](/docs/sdk/features/web-proxy#python)
 * [Ruby](/docs/sdk/features/web-proxy#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To configure the server-side .NET SDK to connect to LaunchDarkly through a web proxy:
C#.NET SDK v5.14.x and earlier (C#)
```
1
| var proxy = new System.Net.WebProxy("http://my-proxy-host:8080");
---|--- 
2
| 
3
| var config = Configuration.Builder("sdk-key-123abc")
4
| .Http(Components.HttpConfiguration().Proxy(proxy))
5
| .Build();
```
To configure the server-side .NET SDK to connect to LaunchDarkly through a web proxy with authentication:
C#.NET SDK v5.14.x and earlier (C#)
```
1
| var proxyUri = new Uri("http://my-proxy-host:8080")
---|--- 
2
| var proxy = new System.Net.WebProxy(proxyUri);
3
| var credentials = new System.Net.CredentialCache();
4
| credentials.Add(proxy.Address, "Basic",
5
| new NetworkCredential("username", "password"));
6
| proxy.Credentials = credentials;
7
| 
8
| var config = Configuration.Builder("sdk-key-123abc")
9
| .Http(Components.HttpConfiguration().Proxy(proxy))
10
| .Build();
```
This example uses basic authentication. However, other options are supported: the `proxy` that you pass to the `ConfigurationBuilder` in the line `.Http(Components.HttpConfiguration().Proxy(proxy))` can be any implementation of `System.Net.IWebProxy`. If you choose to use a different implementation of `System.Net.IWebProxy`, you may need to make corresponding configuration updates elsewhere in your system. For example, if you use Microsoft’s [NTLM authentication](https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/ntlm-user-authentication), you may also need to enable `System.Net.Security.UseManagedNtlm` in your .NET project.
To learn more, read [`Http`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html#LaunchDarkly_Sdk_Server_ConfigurationBuilder_Http_LaunchDarkly_Sdk_Server_Subsystems_IComponentConfigurer_LaunchDarkly_Sdk_Server_Subsystems_HttpConfiguration__) and [`HttpConfigurationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.HttpConfigurationBuilder.html).
### Apex
###### Expand Apex code sample
The Apex bridge that provides and retrieves flag values is written in Go, and uses the default Go networking mechanisms. 
Go’s standard HTTP library recognizes the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. If you set these variables, the SDK will connect through a web proxy at the URL you provide. Because the LaunchDarkly services have `https:` URLs, you use `HTTPS_PROXY`. If you are connecting to services at an insecure `http:` URL use `HTTP_PROXY` instead.
Here is an example:
Consolecmd
```
$
| export HTTPS_PROXY=https://my-proxy-host:8080
---|--- 
```
### Go
###### Expand Go code sample
There are two ways to specify proxy server parameters in the Go SDK.
Go’s standard HTTP library recognizes the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. If you set these variables, the SDK will connect through a web proxy at the URL you provide. Because the LaunchDarkly services have `https:` URLs, you use `HTTPS_PROXY`. If you are connecting to services at an insecure `http:` URL, such as a Relay Proxy instance, use `HTTP_PROXY` instead.
Here is an example:
Consolecmd
```
$
| export HTTPS_PROXY=https://my-proxy-host:8080
---|--- 
```
You can also specify a proxy programmatically through the SDK configuration:
Go SDK v6.0
```
1
| import (
---|--- 
2
| ld "github.com/launchdarkly/go-server-sdk/v6"
3
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
4
| )
5
| 
6
| var config ld.Config
7
| config.HTTP = ldcomponents.HTTPConfiguration().
8
| ProxyURL("https://my-proxy-host:8080")
```
### Java
###### Expand Java code sample
To configure the Java SDK to connect to LaunchDarkly through a web proxy:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .http(Components.httpConfiguration().proxyHostAndPort("my-proxy-host", 8080))
3
| .build();
```
To configure the Java SDK to connect to LaunchDarkly through a web proxy with authentication:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .http(Components.httpConfiguration()
3
| .proxyHostAndPort("my-proxy-host", 8080)
4
| .proxyAuth(Components.httpBasicAuthentication("username", "password")))
5
| .build();
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To configure the server-side Node.js SDK to connect to LaunchDarkly through a web proxy:
Node.js SDK v8.x (TypeScript)Node.js SDK v8.x (JavaScript)Node.js SDK v7.x (TypeScript)Node.js SDK v7.x (JavaScript)
```
1
| import { LDOptions } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| proxyOptions: {
5
| host: 'your-proxy-host',
6
| port: 8080,
7
| scheme: 'https'
8
| }
9
| };
```
To configure the server-side Node.js SDK to connect to LaunchDarkly through a web proxy with authentication:
Node.js SDK v8.x (TypeScript)Node.js SDK v8.x (JavaScript)Node.js SDK v7.x (TypeScript)Node.js SDK v7.x (JavaScript)
```
1
| import { LDOptions } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| proxyOptions: {
5
| host: 'your-proxy-host',
6
| port: 8080,
7
| scheme: 'https',
8
| auth: 'username:password'
9
| }
10
| };
```
To learn more, read [`proxyOptions`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html#proxyOptions).
### Python
###### Expand Python code sample
There are two ways to specify proxy server parameters in the Python SDK.
Python’s standard HTTP library recognizes the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. If you set these variables, the SDK will connect through a web proxy at the URL you provide. Because the LaunchDarkly services have `https:` URLs, you use `HTTPS_PROXY`. If you are connecting to services at an insecure `http:` URL, such as a Relay Proxy instance, use `HTTP_PROXY` instead.
How to set the HTTPS_PROXY environment variable on Mac/Linux and Windows systems:
Consolecmd
```
$
| export HTTPS_PROXY=https://my-proxy-host:8080
---|--- 
```
Or it can be set from within Python:
Python
```
1
| os.environ["HTTPS_PROXY"] = "https://my-proxy-host:8080"
---|--- 
```
### Ruby
###### Expand Ruby code sample
There are two ways to specify proxy server parameters in the Ruby SDK.
Ruby’s standard HTTP library recognizes the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. If you set these variables, the SDK will connect through a web proxy at the URL you provide. Because the LaunchDarkly services have `https:` URLs, you use `HTTPS_PROXY`. If you are connecting to services at an insecure `http:` URL, such as a Relay Proxy instance, use `HTTP_PROXY` instead.
To configure the Ruby SDK to connect to LaunchDarkly through a web proxy:
Consolecmd
```
$
| export HTTPS_PROXY=https://my-proxy-host:8080
---|--- 
```
Or it can be set from within Ruby:
Ruby
```
1
| ENV['HTTPS_PROXY'] = 'https://my-proxy-host:8080'
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs