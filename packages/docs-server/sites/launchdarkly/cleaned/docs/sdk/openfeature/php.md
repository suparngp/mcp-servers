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
 * [Version compatibility](#version-compatibility)
 * [Install the provider](#install-the-provider)
 * [Initialize the provider](#initialize-the-provider)
 * [Construct a context](#construct-a-context)
 * [Evaluate a context](#evaluate-a-context)
## Overview
This topic documents how to get started with the LaunchDarkly OpenFeature provider for the PHP SDK.
##### Provider quick links
LaunchDarkly’s OpenFeature providers are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
OpenFeature Provider API documentation | [Provider API docs](https://launchdarkly.github.io/openfeature-php-server/) 
GitHub repository | [openfeature-php-server](https://github.com/launchdarkly/openfeature-php-server) 
Sample application | [Sample OpenFeature PHP provider application](https://github.com/launchdarkly/hello-openfeature-php-server) 
Published module | [Packagist](https://packagist.org/packages/launchdarkly/openfeature-server) 
## Get started
The LaunchDarkly OpenFeature provider for the PHP SDK is intended for use in multi-user systems such as web servers and application. It is not intended for use in desktop and embedded systems applications.
Follow these instructions to start using the LaunchDarkly OpenFeature provider for the PHP SDK in your application.
### Version compatibility
The LaunchDarkly OpenFeature provider for the PHP SDK is compatible with the [OpenFeature PHP SDK v2.x and above](https://openfeature.dev/docs/reference/technologies/server/php).
The provider is compatible with PHP 8.1+.
## Install the provider
First, add the LaunchDarkly OpenFeature package:
Shell
```
$
| composer require launchdarkly/openfeature-server
---|--- 
```
Next, import the OpenFeature namespaces in your application code:
LaunchDarkly PHP provider
```
1
| use OpenFeature\OpenFeatureAPI;
---|--- 
2
| use OpenFeature\implementation\flags\Attributes;
3
| use OpenFeature\implementation\flags\EvaluationContext;
```
## Initialize the provider
After you install and import the provider, create a single, shared instance of [`Provider`](https://launchdarkly.github.io/openfeature-php-server/classes/LaunchDarkly-OpenFeature-Provider.html). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
PHP
```
1
| $config = [];
---|--- 
2
| $provider = new LaunchDarkly\OpenFeature\Provider("sdk-key-123abc", $config);
3
| $api = OpenFeatureAPI::getInstance();
4
| $api->setProvider($provider);
5
| 
6
| $client = $api->getClient("hello-client", 1);
```
The configuration options are from the LaunchDarkly PHP SDK. To learn more about the configuration options available, read [Configuration](/docs/sdk/features/config#php).
##### The PHP provider uses an SDK key
The LaunchDarkly PHP provider uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
## Construct a context
A [context](/docs/home/getting-started/vocabulary#context) is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. The OpenFeature specification calls these [evaluation contexts](https://openfeature.dev/docs/reference/concepts/evaluation-context).
In the LaunchDarkly provider, contexts:
 * always have a particular [context kind](/docs/home/getting-started/vocabulary#context-kind). If you do not specify a kind, the provider treats the context as having a “user” kind. To specify a different kind, including a multi-context, you must include a `kind` attribute.
 * must have a targeting key. This is optional in the OpenFeature specification, but LaunchDarkly requires a key for evaluation. You can specify this using `targetingKey`, as in the OpenFeature specification, or `key`, which is the typical LaunchDarkly identifier for the targeting key.
Here are examples of a context:
Example user contextExample organization context
```
1
| $context = new EvaluationContext("user-key-123abc");
---|--- 
```
For additional examples, read [OpenFeature specific considerations](https://github.com/launchdarkly/openfeature-php-server?tab=readme-ov-file#openfeature-specific-considerations) in the provider GitHub repository.
## Evaluate a context
To evaluate feature flags for a context, use the OpenFeature [Evaluation API](https://openfeature.dev/docs/reference/concepts/evaluation-api). For example:
Evaluate a context
```
1
| $flagValue = $client->getBooleanValue("flag-key-123abc", false, $context);
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs