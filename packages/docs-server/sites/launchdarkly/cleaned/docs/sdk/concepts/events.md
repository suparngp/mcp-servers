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
 * [Event buffering and sending](#event-buffering-and-sending)
 * [Manually flush events](#manually-flush-events)
 * [Shut down your SDK](#shut-down-your-sdk)
 * [Omit anonymous contexts from events](#omit-anonymous-contexts-from-events)
 * [Include prerequisite information in events](#include-prerequisite-information-in-events)
 * [Disable SDKs from sending events](#disable-sdks-from-sending-events)
## Overview
This topic explains analytics events, how SDKs send them to LaunchDarkly, and what features they are generated for.
Server-side, client-side, AI, and most edge SDKs send analytics events to LaunchDarkly as a result of feature flag evaluations, AI Config customizations, and certain SDK calls. The [Akamai SDK](/docs/sdk/edge/akamai) cannot send events.
There are several kinds of analytics events. Here is a list of analytics event kinds and their functions:
 * `summary` events describe a set of individual evaluations and customizations over an interval.
 * `feature` events include additional evaluation and customization details for flags or AI Configs used in Experimentation and any flags you enable detailed tracking for. These events are also essential for [guarded rollouts](/docs/home/releases/guarded-rollouts), which use them to monitor variation performance, detect regressions, and help ensure safe, gradual releases.
 * `debug` events describe evaluations and customizations when debugging mode is on.
 * `migration_op` events describe metrics collected as part of reading and writing migration flags.
 * `index` and `identify` events push context data to LaunchDarkly.
 * `page view` and `click` events are sent by JavaScript-based SDKs when pages are visited or clicked as part of an experiment.
 * `custom` events are sent:
 * when your application calls any of the SDK’s `track*` methods
 * automatically when the SDK is initialized, when an error occurs, and when other web vitals occur, if you are using an [observability SDK](/docs/sdk/observability)
Analytics events are crucial to the functioning of several features in LaunchDarkly.
##### Your network must be allowed to send events
For analytics events to reach LaunchDarkly, your network must be allowed to send events. Ensure that event streaming endpoints, `mobile.launchdarkly.com` and `events.launchdarkly.com`, are on your allow list. To learn more about how SDKs send events, read [Recording events](/docs/sdk/concepts/contributors-guide#recording-events).
Here is a list of LaunchDarkly features that rely on analytics events:
 * [The **Contexts** list](/docs/home/flags/contexts-list)
 * [Target with flags](/docs/home/flags/target)
 * [Flag statuses and lifecycle stages](/docs/home/flags/flag-status)
 * [Live events](/docs/home/releases/live-events)
 * [Data Export](/docs/integrations/data-export#export-event-data-for-flags-and-environments)
 * [Experimentation](/docs/home/experimentation/events)
 * [Guarded rollouts](/docs/home/releases/guarded-rollouts)
 * [Observability and feature monitoring](/docs/home/observability)
 * [Migration flag metrics](/docs/home/flags/migration-metrics)
## Event buffering and sending
LaunchDarkly SDKs automatically send pending analytics events to LaunchDarkly at regular intervals. This is called a flush interval. The buffer between flushes prevents the SDK from having to send constant network requests, and varies by SDK. By default, server-side SDK buffer time is usually a few seconds, and mobile SDK buffer time is around 30 seconds. A longer buffer time for mobile SDKs helps preserve the device’s battery life, and events do not need to be flushed as often because events accumulate much more slowly for client-side SDKs with only a small number of contexts.
You can configure your SDK’s buffer time between flushes.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Configuration](/docs/sdk/features/config)
### Manually flush events
You can manually call flush to send events immediately without waiting for the next interval. Customers using edge SDKs must flush events before the edge worker exits to ensure that events are sent back to LaunchDarkly. (This excludes the [Akamai SDK](/docs/sdk/edge/akamai), which cannot send events.) Most other customers do not need to use the manual flush feature, but it can be useful if you test the SDK in a simulator.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Flushing events](/docs/sdk/features/flush)
### Shut down your SDK
You do not need to manually shut down your SDK in most situations. However, if your app dies while there are still events in the buffer, the SDK discards them. If you know your application is about to terminate, or if you’re testing an app, you should manually shut down the LaunchDarkly client before quitting to ensure it delivers any pending analytics events to LaunchDarkly.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Shutting down](/docs/sdk/features/shutdown)
## Omit anonymous contexts from events
By default, `index` and `identify` events push context data to LaunchDarkly. In some server-side SDKs, you can configure the SDK to omit data from anonymous contexts when sending these `index` and `identify` events. Depending on how your application uses contexts, this can significantly decrease the amount of data your application sends to LaunchDarkly.
## Include prerequisite information in events
Any client-side SDK that is configured to send events sends a combination of `summary`, `debug`, and `feature` events back to LaunchDarkly for each evaluated flag.
Additionally, most client-side SDKs also send the same combination of `summary`, `debug`, and `feature` events back to LaunchDarkly for any flags that are prerequisites of the flag explicitly being evaluated. Sending events for prerequisite flags is required for some LaunchDarkly features, such as [holdouts](/docs/home/holdouts). To find which client-side SDKs support sending events for prerequisite flags, read [Supported features](/docs/sdk#supported-features).
Most server-side SDKs return metadata on flag prerequisites as part of the [all flags](/docs/sdk/features/all-flags) feature. To find which server-side SDKs support including prerequisite information as part of all flags, read [Supported features](/docs/sdk#supported-features).
### Disable SDKs from sending events
You can disable SDKs from sending events for testing purposes. To learn more, read [Manage test data in your production environment](/docs/guides/flags/testing-code#manage-test-data-in-your-production-environment).
##### Disable sending events only for testing purposes
You can disable SDKs from sending events, but we strongly recommend against it outside of testing purposes. Many LaunchDarkly features will not work correctly if they do not regularly receive analytics events.
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs