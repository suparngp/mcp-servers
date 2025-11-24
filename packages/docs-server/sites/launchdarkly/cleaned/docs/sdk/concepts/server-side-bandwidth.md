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
 * [Calculating streaming usage](#calculating-streaming-usage)
 * [Initializing the stream](#initializing-the-stream)
 * [Targeting rule updates](#targeting-rule-updates)
 * [Heartbeats](#heartbeats)
 * [Calculating events usage](#calculating-events-usage)
 * [Handshakes and headers](#handshakes-and-headers)
 * [Summary and index events](#summary-and-index-events)
 * [Total event usage](#total-event-usage)
## Overview
This topic explains how to estimate bandwidth usage for server-side SDKs.
This topic is for educational purposes only. The numbers below represent a hypothetical deployment and may not apply to your production environment.
The numbers we provide in this topic assume the following about your server-side SDK configuration:
 * You have implemented the SDK correctly. To learn more, read [the reference topic for your SDK](/docs/sdk/server-side).
 * You are using the default SDK configuration.
 * You are following our recommendations for targeting contexts. To learn more, read [Target with flags](/docs/home/flags/target).
 * There are no network issues inhibiting the SDK from maintaining a long-lived streaming connection with LaunchDarkly.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Configuration](/docs/sdk/features/config)
##### The following bandwidth calculations do not apply to PHP
The following estimates apply to all server-side SDKs except PHP. The LaunchDarkly PHP SDK doesn’t use a streaming connection to receive updates, so the following calculations are not applicable.
## Calculating streaming usage
You can estimate your total streaming connection data usage by calculating usage for initialization, targeting rules updates, and heartbeats.
### Initializing the stream
To initialize the stream, the SDK performs an HTTPS handshake, sends headers, and receives the initial payload. This occurs each time you initialize the SDK and any time the SDK reconnects after losing connection to LaunchDarkly. The estimated bandwidth for these actions varies and depends on your SDK, but we have calculated the average usage below.
The estimated bandwidth usage of each of these actions is as follows:
 * **HTTPS handshake** : Averages to about 6,500 bytes.
 * **Communicating headers** : Averages less than 100 bytes.
 * **Initial payload** : Differs in size depending on your targeting rules. Because targeting rules are unique to each environment, you need to fetch the size of the payload for the specific environment you’re calculating bandwidth for.
You can fetch the size of your environment payload using the following curl:
Payload calculationPayload calculation, federalPayload calculation, EU
```
$
| curl -sH "Authorization: sdk-key-123abc" \
---|--- 
>
| https://sdk.launchdarkly.com/sdk/latest-all | wc -c
```
After fetching the size of your payload, here is the calculation you can use to estimate bandwidth usage for initialization:
```
initialization_data_usage = 
--- 
(6500 bytes + 100 bytes + size_of_payload) * number_of_connections 
```
### Targeting rule updates
When you make flag targeting changes in the LaunchDarkly user interface (UI) or using the API, LaunchDarkly sends those changes to the SDK using the already open streaming connection.
The bandwidth required for sending the changes depends on the size of the changes, and how frequently you make them. The smallest change uses around 30 bytes. Because LaunchDarkly sends them over the existing connection, there is no additional overhead.
Here is the calculation you can use to estimate bandwidth usage for targeting rule updates:
```
update_data_usage = 
--- 
size_of_update * number_of_updates 
```
### Heartbeats
If there are no configuration changes for three minutes, then LaunchDarkly sends a single character as a heartbeat to keep the connection alive.
Here is the calculation you can use to estimate bandwidth usage for a heartbeat:
```
heartbeat_data_usage = 
--- 
1 byte * number_of_minutes_active / 3 
```
## Calculating events usage
When you call the variation, identify, or track methods, the SDK queues an analytic event. SDKs send events to LaunchDarkly every five seconds. If you do not call any of these SDK methods, the SDK won’t send any events.
### Handshakes and headers
To send events, the SDK performs an HTTPS handshake and sends headers.
The estimated bandwidth usage for each of these actions is as follows:
 * **HTTPS handshake** : Averages to about 6,500 bytes.
 * **Communicating headers** : Averages less than 100 bytes.
### Summary and index events
The SDK summarizes most events when it sends them. This means that the SDK sends one `summary` event that contains an array of all flag keys requested since the last flush, and then one `index` event for each context encountered during this period.
##### Data Export and Experimentation events use more bandwidth
If you are using Data Export or Experimentation, SDKs do not send `summary` events for those evaluations. Instead, SDKs will send detailed event information, which results in higher bandwidth usage.
The overhead for the request is two bytes.
The `summary` event has an overhead of 34 bytes, plus three bytes per flag requested.
The SDK sends an `index` event once for each context the SDK encounters during the five second polling interval. `index` events have an overhead of 49 bytes. If the context has custom attributes, then the overhead increases to 59 bytes.
The size of the `index` event is dependent on the context attributes, and whether the event was generated by a single context or a multi-context. The overhead per attribute is four bytes. The size per attribute is equal to the size of the key, plus the size of the value of the attribute. The size of the value of an attribute can be difficult to approximate because the different types of attributes can be vastly different sizes. For example, arrays are much larger than single values, such as numbers and strings.
##### Use these request sizes as guidelines only
The overhead size of `summary` and `index` events varies based on contexts and context kinds.
Each `summary` event includes an array of `contextKinds` to indicate which context kinds have been used to evaluate each flag. The size of this array varies based on the number of different context kinds you use in your app. The overhead of the `index` event increases slightly if the event records a multi-context, rather than a single context.
The event sizes listed here are good guidelines, but may not match the exact number of bytes sent by events from your application.
Here is the calculation you can use to estimate bandwidth usage for `summary` and `index` events:
```
summary_index_event_usage = 
--- 
(2 bytes events_overhead) + 
(34 bytes summary_overhead + (3 * number_of_flags)) + 
((59 bytes index_overhead + 
 (number_of_attributes * (average_attribute_size + 4)) * 
 (number_of_contexts)) 
) * 
(number_of_minutes_active / 5) 
```
### Total event usage
To calculate total event usage, add the handshake and headers usage:
```
total_event_usage = 
--- 
6500 bytes handshake + 
100 bytes header + 
(2 bytes events_overhead) + 
(34 bytes summary_overhead + (3 * number_of_flags)) + 
((59 bytes index_overhead + 
 (number_of_attributes * (average_attribute_size + 4)) * 
 (number_of_contexts)) 
) * 
(number_of_minutes_active / 5) 
```
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs