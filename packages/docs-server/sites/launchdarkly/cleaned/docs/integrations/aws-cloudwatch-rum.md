`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Integrations](/docs/integrations)
 * [Collaboration tools](/docs/integrations/collaboration)
 * [Data Export](/docs/integrations/data-export)
 * [Edge tools](/docs/integrations/edge)
 * [Environments as a service](/docs/integrations/eaas)
 * [Experimentation and metric integrations](/docs/integrations/experimentation)
 * [IDE connectors](/docs/integrations/ide)
 * [Internal developer platforms](/docs/integrations/idp)
 * [Observability tools](/docs/integrations/observability)
 * [Segments integrations](/docs/integrations/segments)
 * [Workflow management tools](/docs/integrations/workflow)
 * [More integrations](/docs/integrations/more)
 * [Managing integrations](/docs/integrations/managing)
 * [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations)
 * [Building partner integrations](/docs/integrations/partner-integrations)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Set up the integration](#set-up-the-integration)
##### CloudWatch RUM SDK Requirements
The CloudWatch RUM integration requires the JavaScript SDK version 2.24 or higher, or the React Web SDK version 2.29 or higher.
## Overview
This topic explains how to set up and use the LaunchDarkly AWS CloudWatch Real User Monitoring (RUM) integration. With AWS CloudWatch RUM, you can perform real user monitoring to collect and view client-side data about your web application performance from actual user sessions in near real-time.
Read the [send custom events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-custom-events.html) CloudWatch documentation for more information on how to enable custom events for your app monitor.
## Set up the integration
The code below can be modified to fit your setup.
Here’s how to get started:
 * Install and [configure the AWS CloudWatch RUM client](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-get-started.html)
 * Use the `recordEvent` API to send the evaluated flags to [CloudWatch RUM using custom events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM-custom-events.html)
Here is an example:
Inspector Setup
```
1
| inspectors: [
---|--- 
2
| {
3
| type: 'flag-used',
4
| name: 'cloudwatch-rum',
5
| method: (key, detail) => {
6
| const flagEvent = {
7
| flagKey: key,
8
| value: detail.value,
9
| }
10
| if (detail.variationIndex) {
11
| flagEvent['variationIndex'] = detail.variationIndex
12
| }
13
| if (detail.reason) {
14
| flagEvent['reason'] = detail.reason
15
| }
16
| 
17
| awsRum.recordEvent('com.launchdarkly.flag.evaluation', flagEvent)
18
| },
19
| },
20
| ]
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs