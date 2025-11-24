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
 * [Understand version compatibility](#understand-version-compatibility)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Fetch flags](#fetch-flags)
 * [Using the Relay Proxy](#using-the-relay-proxy)
 * [Using Guzzle](#using-guzzle)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the PHP SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/php-server-sdk/) 
GitHub repository | [php-server-sdk](https://github.com/launchdarkly/php-server-sdk) 
Sample application | [PHP](https://github.com/launchdarkly/hello-php) 
[OpenFeature PHP](https://github.com/launchdarkly/hello-openfeature-php-server) 
Published module | [Packagist](https://packagist.org/packages/launchdarkly/server-sdk) 
## Get started
After you complete the [Getting Started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your PHP application.
### Understand version compatibility
The LaunchDarkly PHP SDK, version 6.x and higher, is compatible with PHP 8.1 and higher. Starting with version 6.6, the LaunchDarkly PHP SDK also requires that the `apcu` extension is installed and enabled. The SDK uses the [APCu cache](https://www.php.net/manual/en/book.apcu.php) to help improve performance.
If you are using older versions:
 * The LaunchDarkly PHP SDK, version 5.x, is compatible with PHP 8.0 and higher.
 * The LaunchDarkly PHP SDK, version 4.x, is compatible with PHP 7.3 and higher.
 * If you need compatibility with older versions of PHP, use version 3.x of the LaunchDarkly PHP SDK.
### Install the SDK
The first step is to install [Composer](https://getcomposer.org/) and the LaunchDarkly SDK as a dependency in your application. Refer to the [SDK releases page](https://github.com/launchdarkly/php-server-sdk/releases) to identify the latest version if you want to depend on a specific version.
To install Composer:
Shell
```
$
| php composer.phar require launchdarkly/server-sdk
---|--- 
>
| 
>
| # In earlier versions, this was "launchdarkly/launchdarkly-php"
```
Then require Composer’s autoloader:
PHP
```
1
| require 'vendor/autoload.php';
---|--- 
```
##### The PHP SDK uses an SDK key
The PHP SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install and import the SDK, create a single, shared instance of [`LDClient`](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Only create one instance of `client`.
Here’s how:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc");
---|--- 
```
To learn more about the specific configuration options available in this SDK, read the SDK API documentation for the [`LDClient` constructor](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method___construct).
### Evaluate a context
You can use `$client` to check which variation a particular context will receive for a given feature flag.
Here’s how:
PHP
```
1
| $context = LDContext::builder("context-key-123abc")
---|--- 
2
| ->name("Sandy")
3
| ->build();
4
| 
5
| if ($client->variation("your.flag.key", $context)) {
6
| // application code to show the feature
7
| } else {
8
| // the code to run if the feature is off
9
| }
```
In our [Getting Started guide](/docs/home/getting-started) we recommend that users shut down the LaunchDarkly client on application termination. This step does not exist in PHP because the PHP SDK does not maintain long-lived network connections nor an event queue.
## Fetch flags
There are two distinct methods of integrating LaunchDarkly in a PHP environment:
 * [The Relay Proxy](/docs/sdk/relay-proxy) retrieves and stores flags in [Redis](/docs/sdk/features/storing-data/redis), [DynamoDB](/docs/sdk/features/storing-data/dynamodb), or [Consul](/docs/sdk/features/storing-data/consul). This is the recommended method. If you use synced segments or larger list-based segments, you can only use Redis or DynamoDB as a persistent store.
 * [Guzzle Cache Middleware](https://github.com/Kevinrob/guzzle-cache-middleware) requests and caches HTTP responses in an in-memory array. This is the default method.
We strongly suggest using the Relay Proxy. Per-flag caching mode using Guzzle is only intended for low-throughput environments.
### Using the Relay Proxy
PHP’s shared-nothing architecture prevents LaunchDarkly from reusing the streaming API connection across requests.
You can use PHP without the Relay Proxy, but we strongly recommend using the Relay Proxy in **daemon mode** if you are using PHP in a high-throughput setting. This makes the Relay Proxy receive feature flag updates.
To learn more, read [Configuring SDKs to use different modes](/docs/sdk/relay-proxy/sdk-config#configuring-sdks-to-use-different-modes).
### Using Guzzle
For the latest major version of the PHP SDK, use open-ended dependencies. For older versions, refer to your version’s composer.json file.
To require Guzzle as a dependency:
PHP
```
1
| php composer.phar require "guzzlehttp/guzzle:^6.3.0"
---|--- 
2
| php composer.phar require "kevinrob/guzzle-cache-middleware:^1.4.0"
```
Guzzle is then used to fetch flags. You can persist your cache somewhere other than the default in-memory store, like Memcached or Redis.
You can then specify your cache when initializing the client with the cache option:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", ["cache" => $cacheStorage]);
---|--- 
```
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#php)
 * [Big segments](/docs/sdk/features/big-segments#php)
 * [Configuration](/docs/sdk/features/config#php), including
 * [Application metadata configuration](/docs/sdk/features/app-config#php)
 * [Migration configuration](/docs/sdk/features/migration-config#php)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#php)
 * [Context configuration](/docs/sdk/features/context-config#php)
 * [Evaluating flags](/docs/sdk/features/evaluating#php)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#php)
 * [Flushing events](/docs/sdk/features/flush#php)
 * [Getting all flags](/docs/sdk/features/all-flags#php)
 * [Identifying and changing contexts](/docs/sdk/features/identify#php)
 * [Logging configuration](/docs/sdk/features/logging#php)
 * [Migrations](/docs/sdk/features/migrations#php)
 * [Offline mode](/docs/sdk/features/offline-mode#php)
 * [Private attributes](/docs/sdk/features/private-attributes#php)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#php)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#php)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#php)
 * [Secure mode](/docs/sdk/features/secure-mode#php)
 * [Sending custom events](/docs/sdk/features/events#php)
 * [Storing data](/docs/sdk/features/storing-data#nodejs-server-side)
 * [Test data sources](/docs/sdk/features/test-data-sources#php)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs