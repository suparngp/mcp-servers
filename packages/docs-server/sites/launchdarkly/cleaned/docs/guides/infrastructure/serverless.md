`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Concepts](#concepts)
 * [Serverless](#serverless)
 * [Function-as-a-Service (FaaS)](#function-as-a-service-faas)
 * [LaunchDarkly in a serverless infrastructure](#launchdarkly-in-a-serverless-infrastructure)
 * [How the SDKs balance performance](#how-the-sdks-balance-performance)
 * [Option 1: Use the SDK as normal](#option-1-use-the-sdk-as-normal)
 * [Option 2: Use a persistent feature store](#option-2-use-a-persistent-feature-store)
 * [Send analytics events to the Contexts list](#send-analytics-events-to-the-contexts-list)
 * [Conclusion](#conclusion)
## Overview
This guide provides best practice advice for using LaunchDarkly in serverless and short-lived environments. While most uses of serverless architecture require no extra configuration, some apps may benefit from additional configuration to ensure consistent high performance.
If your app is very sensitive to start up run times, you may want to use LaunchDarkly with the Relay Proxy hosted on a long-lived server to reduce initialization latency. To learn more, read [Reducing initialization latency in short-lived and serverless environments](/docs/sdk/relay-proxy/use-cases#reducing-initialization-latency-in-short-lived-and-serverless-environments).
If you do not need to use the Relay Proxy, an alternative option is described here. This guide assumes that you have already chosen to use serverless functions in your application architecture.
## Concepts
To use this guide effectively, you should understand the following concepts:
### Serverless
Serverless computing is a cloud computing model where a cloud provider runs the server and dynamically manages the allocation of machine resources.
### Function-as-a-Service (FaaS)
FaaS services are serverless computing services that allow customers to develop, run, and manage small units of functionality. These units can be developed and deployed independently, and then connected later to form a single app. This model contrasts with the more traditional software development model, in which functions are compiled together into a single monolithic unit before deployment.
## LaunchDarkly in a serverless infrastructure
FaaS platforms let developers code in the languages they know while reducing the effort required to create and manage production infrastructure.
If you’re considering using LaunchDarkly in a serverless or containerized app, the LaunchDarkly SDK in its default configuration has no significant performance impact in a serverless environment.
However, if your app is sensitive to initialization performance, consider configuring the LaunchDarkly SDK to use a persistent local flag store. A local flag store can increase initialization speed.
### How the SDKs balance performance
Each LaunchDarkly SDK is designed to have minimal impact on application performance. In its default configuration, its impact occurs almost entirely in the app’s initialization phase.
Here’s how the SDK interacts with your app:
 1. While the app starts, the SDK connects to LaunchDarkly and downloads the project’s flags to an in-memory store. This network connection is held open while the app runs so that flag updates are received immediately.
 2. After the app initializes, the in-memory flag store is used for flag evaluation functions such as variation calls. These functions run instantly, with no need to wait for network input/output (I/O).
Most apps are architected with the expectation that initialization takes a small amount of the app’s total runtime. Apps with serverless or containerized architectures may have different expectations.
During normal operation with relatively consistent load, the underlying platform uses long-lived runtime instances, or [Execution Contexts](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html) for each function or container. As in most other app architectures, the initialization time has insignificant impact on performance.
However, if a serverless app receives a sudden flood of requests, the platform may start extra runtime instances to handle the requests that arrive. Any additional latency in the initialization phase has extra impact, reducing performance and increasing the number of instances required to handle the load.
Most serverless apps never deal with this kind of sudden traffic increase, nor are they as sensitive to latency in the initial request. Those apps should use the default LaunchDarkly configuration. This configuration is displayed in [Example 1](/docs/guides/infrastructure/serverless#option-1-use-the-sdk-as-normal).
If your app has higher performance needs and is more likely to receive sudden traffic floods, or if the LaunchDarkly project has such a large and complex set of flags that initialization time is noticeably affected, then you can take additional steps to mitigate that. This configuration is displayed in [Example 2](/docs/guides/infrastructure/serverless#option-2-use-a-persistent-feature-store).
##### The examples below are service-agnostic
Both of the examples below use AWS Lambda, but you can use this approach for other FaaS platforms as well.
### Option 1: Use the SDK as normal
For smaller workloads, you can use the LaunchDarkly SDK as you normally would.
Here is a code sample that shows how to evaluate a feature flag with the NodeJS runtime in AWS Lambda:
JavaScript
```
1
| const LaunchDarkly = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY, { stream: true });
3
| 
4
| exports.handler = async event => {
5
| 
6
| try {
7
| await client.waitForInitialization({timeout: 10});
8
| // Initialization complete
9
| } catch (err) {
10
| // Timeout or initialization failed
11
| }
12
| 
13
| }
```
The Node.js (server-side) SDK defaults to using streaming mode to receive flag updates. To use polling mode instead, set `{ stream: false }` in the configuration options.
##### We do not recommend polling mode
We do not recommend using polling mode except in specific situations where streaming mode does not support your use case.
We strongly recommend using streaming mode, but the specifics depend on the use case for your Lambda:
 * If your Lambda is invoked multiple times per minute or more, streaming mode is preferable because invocations are likely to reuse an existing streaming connection.
 * If your Lambda’s invocation volume often spikes to higher than usual levels, it is sensitive to execution context initialization time, and you are not using provisioned concurrency to minimize cold starts, consider using polling mode to receive flag updates. Polling mode may provide better initialization performance in this use case.
 * If your Lambda is invoked infrequently, you can use either streaming or polling mode to receive flag updates.
To learn more, read [`stream`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html#stream) in the Node.js (server-side) SDK API documentation.
### Option 2: Use a persistent feature store
If your app often has high levels of concurrency or sensitivity to cold starts, you may need to reduce the initialization time that LaunchDarkly takes. You can do this by setting up a persistent feature store to serve flag values locally.
In this configuration, the LaunchDarkly SDK no longer downloads the project’s entire flag set for later evaluation. Instead, it connects to the configured feature store at initialization time, then queries the feature store for each flag evaluation call.
To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
The example below is a five-step process to configure a feature store:
 1. Use a cloud-local storage service to act as a flag store.
 2. Use a dedicated AWS Lambda function to update the flag store when a flag configuration changes.
 3. Use an AWS API Gateway endpoint to give the Lambda function a consistent HTTPS URL.
 4. Create a LaunchDarkly webhook to send flag changes to the API Gateway URL.
 5. Configure the LaunchDarkly SDK to read flags from the persistent flag store.
Most LaunchDarkly server-side SDKs can use a Redis database for persistent feature storage. AWS ElastiCache is compatible with Redis, and we use it as an example here, but other services will work as well.
An ElastiCache cluster composed of three small nodes should be sufficient for all but the largest LaunchDarkly projects.
This dedicated AWS Lambda function, built on the NodeJS runtime, connects to the LaunchDarkly network and updates the ElastiCache feature store.
We configure it using the `RedisFeatureStore` method. The AWS Lambda function built on the NodeJS runtime could look like this:
JavaScript
```
1
| var LaunchDarkly = require('@launchdarkly/node-server-sdk');
---|--- 
2
| 
3
| exports.handler = (event, context, callback) => {
4
| setTimeout(() => {
5
| var redisConfig = {
6
| port: process.env.ELASTICACHE_PORT,
7
| host: process.env.ELASTICACHE_ENDPOINT
8
| };
9
| var store = new LaunchDarkly.RedisFeatureStore(redisConfig);
10
| 
11
| var ldConfig = {
12
| featureStore: store
13
| };
14
| var client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY, ldConfig);
15
| 
16
| client.once('ready', () => {
17
| client.close();
18
| callback(null, 'store updated');
19
| });
20
| }, 2000); // initialize after some delay to ensure that LD caches have been purged
21
| }
```
In this example, we initialize the LaunchDarkly SDK inside the handler.
##### Initializing the SDK inside the handler should be done only if necessary
Initializing the LaunchDarkly SDK inside the handler is not best practice, and should be done only if strictly necessary.
By initializing the SDK in this way, we update the ElastiCache store with the latest flag state. The webhook lets this function know that an updated state is available.
After the store update function has been created, it needs a URL so it can be triggered by an HTTPS call. To provide this URL, create an [API Gateway endpoint](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html).
Now that both the feature store and the store update function are ready, add a webhook to the LaunchDarkly Project. To learn more, read [Webhooks](/docs/home/infrastructure/webhooks).
After you set up the webhook, every configuration change made to the LaunchDarkly project’s flags triggers an update in the cloud-hosted feature store.
Here is an image of the “Create a webhook” panel:
![Creation of a LaunchDarkly webhook which sends flag updates to a Lambda function.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e43d3da47936e34f4af9101bf1ab9d09e20c75cb6af9d9feeef4778d1f7587f8/assets/images/auto/lambda-webhook.auto.png)
Creation of a LaunchDarkly webhook which sends flag updates to a Lambda function.
Finally, with the persistent feature store active and continuously updated, you can configure the app to use the feature store instead of connecting to LaunchDarkly’s servers. This is called “daemon mode.”
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode)
The app code retains the same structure as the example in Option 1 above, but with additional configuration to point at the feature store and enable daemon mode.
Here is an example:
JavaScript
```
1
| var LaunchDarkly = require('@launchdarkly/node-server-sdk');
---|--- 
2
| 
3
| var redisConfig = {
4
| port: process.env.ELASTICACHE_PORT,
5
| host: process.env.ELASTICACHE_ENDPOINT
6
| };
7
| var store = new LaunchDarkly.RedisFeatureStore(redisConfig);
8
| 
9
| var ldConfig = {
10
| featureStore: store,
11
| useLdd: true
12
| };
13
| 
14
| var client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY, {ldConfig});
15
| 
16
| exports.handler = (event, context, callback) => {
17
| /*
18
| ...evaluate your flags and do your work here...
19
| */
20
| callback();
21
| };
```
## Send analytics events to the Contexts list
The **Contexts** list is populated with data from analytics events. You must call close in your SDK before shutting down to ensure the SDK sends analytics events and your **Contexts** list displays context data.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Shutting down](/docs/sdk/features/shutdown)
To learn more about the events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events).
## Conclusion
In most cases, LaunchDarkly works in serverless environments without additional configuration. If you need more support, however, the methods outlined above can help.
If you have more questions or need further assistance, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs