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
 * [Deploy the SDK to Salesforce](#deploy-the-sdk-to-salesforce)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a user](#evaluate-a-user)
 * [Use the LaunchDarkly Salesforce bridge](#use-the-launchdarkly-salesforce-bridge)
 * [Install the bridge](#install-the-bridge)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Apex SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://github.com/launchdarkly/apex-server-sdk/blob/master/doc.md) 
GitHub repository | [apex-server-sdk](https://github.com/launchdarkly/apex-server-sdk) 
Sample application | [Apex](https://github.com/launchdarkly/hello-apex-server) 
Published module | None 
## Get started
After you complete the [Get started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Salesforce Apex application.
### Deploy the SDK to Salesforce
The first step is deploying the SDK to Salesforce:
Console
```
$
| git clone https://github.com/launchdarkly/apex-server-sdk.git
---|--- 
>
| cd apex-server-sdk
>
| sfdx force:source:deploy --targetusername='YOUR TARGET ORG' --sourcepath='force-app'
```
### Initialize the client
Initialize the client as follows:
Default ConfigCustom Config
```
1
| LDClient client = new LDClient();
---|--- 
```
To learn more about the specific configuration options available for this SDK, read [`LDConfig.Builder`](https://github.com/launchdarkly/apex-server-sdk/blob/master/doc.md#class-ldconfigbuilder).
## Evaluate a user
You can use the `Variation` methods available from the client to check which variation a particular user will receive for a given feature flag.
Here’s how:
Apex
```
1
| LDUser user = new LDUser.Builder('user-key-123abc')
---|--- 
2
| .setName('Sandy')
3
| .build();
4
| 
5
| Boolean value = client.boolVariation(user, flagKey, false);
6
| if (value) {
7
| // Application code to show the feature
8
| } else {
9
| // The code to run if the feature is off
10
| }
```
After the SDK is deployed to Salesforce, start the bridge to begin evaluating flags. The bridge must be running in order to receive flag updates and publish events to LaunchDarkly.
## Use the LaunchDarkly Salesforce bridge
The Apex server-side SDK is architected differently than our other SDKs. In most of our SDKs, the SDK downloads feature configurations and sends events by itself. The Apex SDK instead uses an external bridging application to connect LaunchDarkly and Salesforce.
Because the SDK uses a bridge to handle state management, there is no initialization delay required to download flags. Additionally, the lack of state inside the SDK means that initializing multiple instances of the SDK is not problematic.
The Apex SDK exposes two HTTP endpoints that the bridge uses: `/store` and `/event`. The bridge pushes flag updates to Salesforce through one endpoint, and pulls events from Salesforce with the other.
### Install the bridge
The bridge is designed to be run as a [daemon](https://en.wikipedia.org/wiki/Daemon_\(computing\)) on your server infrastructure, either with a cloud provider or your own on-premise infrastructure.
The bridge is a Go application configured with environment variables. To build the bridge from source install Go 1.14 or higher. To install Go, read [Go’s documentation](https://golang.org/doc/install).
The bridge needs authorization for both LaunchDarkly and Salesforce.
##### The Apex SDK uses an SDK key
The Apex SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Build and run the bridge like this:
Console
```
$
| cd bridge && go build .
---|--- 
>
| 
>
| export LD_SDK_KEY='Your LaunchDarkly SDK key'
>
| export SALESFORCE_URL='Your Salesforce Apex REST URL'
>
| export OAUTH_ID='Your Salesforce OAuth Id'
>
| export OAUTH_SECRET='Your Salesforce OAuth secret'
>
| export OAUTH_USERNAME='Your Salesforce username'
>
| export OAUTH_PASSWORD='Your Salesforce password + security token'
>
| 
>
| ./bridge
```
The logs indicate if the bridge is running. If it fails, the logs show the errors that occurred.
To learn more about possible bridge errors and how to remediate them, read the following troubleshooting articles:
 * [Error “invalid_client_id” Apex SDK](https://support.launchdarkly.com/hc/en-us/articles/20832735937051-Error-invalid-client-id-Apex-SDK)
 * [Error “invalid_client” Apex SDK](https://support.launchdarkly.com/hc/en-us/articles/20832763464987-Error-invalid-client-Apex-SDK)
 * [Error “invalid_grant” Apex SDK](https://support.launchdarkly.com/hc/en-us/articles/20832928003355-Error-invalid-grant-Apex-SDK)
You must deploy the SDK to Salesforce before you run the bridge. After the SDK is deployed to Salesforce, start the bridge to begin evaluating flags. The bridge must be running in order to receive flag updates and publish events to LaunchDarkly.
## Supported features
This SDK supports the following features:
 * [Aliasing users](/docs/sdk/features/aliasing-users#apex)
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#apex)
 * [Configuration](/docs/sdk/features/config#apex), including
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#apex)
 * [Context configuration](/docs/sdk/features/context-config#apex)
 * [Evaluating flags](/docs/sdk/features/evaluating#apex)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#apex)
 * [Getting all flags](/docs/sdk/features/all-flags#apex)
 * [Identifying and changing contexts](/docs/sdk/features/identify#apex)
 * [Private attributes](/docs/sdk/features/private-attributes#apex)
 * [Sending custom events](/docs/sdk/features/events#apex)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#apex)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs