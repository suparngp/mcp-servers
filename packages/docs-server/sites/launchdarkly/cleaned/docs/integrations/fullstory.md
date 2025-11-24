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
##### FullStory SDK Requirements
The FullStory integration requires the LaunchDarkly JavaScript SDK version 2.24 or higher, or the React Web SDK version 2.27 or higher.
## Overview
This topic explains how to set up and use the LaunchDarkly FullStory integration. The integration sends LaunchDarkly flag evaluations as FullStory page properties.
FullStory combines analytics with high-fidelity session replay and intelligent diagnostics so you can fix issues impacting your customers’ experience, even if the issues are not reported by customers.
To learn more about the use case for this integration, read [LaunchDarkly + FullStory: Targeted User Observability](https://launchdarkly.com/blog/launchdarkly-and-fullstory-integration/) on the LaunchDarkly blog.
## Set up the integration
The code below can be modified to fit your setup.
Here’s how to get started:
 * Install and [configure the FullStory client](https://help.fullstory.com/hc/en-us/articles/360020623514-Installing-the-FullStory-Script)
 * Use the `setVars` API to send the evaluated flags to [FullStory page properties](https://help.fullstory.com/hc/en-us/articles/1500004101581-FS-setVars-API-Sending-custom-page-data-to-FullStory)
In the example below, `evaluatedSessionFlags` is a two-level map. The first key is the url path. The second key is the flag key. The final values are based on the return value of the feature flag:
Inspector Setup
```
1
| // instantiate the path to flags mapping object outside of the Inspector
---|--- 
2
| const evaluatedSessionFlags: { [path: string]: { [flagKey: string]: unknown } } = {};
3
| 
4
| const fsInspector: LDInspection {
5
| {
6
| type: 'flag-used',
7
| name: 'fullstory-inspector',
8
| method: (key: string, detail: LDEvaluationDetail) => {
9
| 
10
| // FullStory attaches getCurrentSessionURL and setVars to the window object.
11
| // https://help.fullstory.com/hc/en-us/articles/1500004101581-FS-setVars-API-Sending-custom-page-data-to-FullStory
12
| if (window.FS === undefined || typeof window.FS.getCurrentSessionURL !== 'function') {
13
| return;
14
| }
15
| 
16
| const url = window.FS.getCurrentSessionURL(true);
17
| if (url === undefined) {
18
| return;
19
| }
20
| 
21
| evaluatedSessionFlags[url] = {
22
| ...evaluatedSessionFlags[url],
23
| [key]: detail.value,
24
| };
25
| 
26
| const arrayOfFlags = Object.keys(evaluatedSessionFlags[url]).map(
27
| (flagKey) => `${flagKey}=${JSON.stringify(evaluatedSessionFlags[url][flagKey], null, 1)}`,
28
| );
29
| 
30
| if (typeof window.FS.setVars === 'function') {
31
| window.FS.setVars('page', { ldflags: arrayOfFlags }, {integration:"launchdarkly"});
32
| }
33
| },
34
| },
35
| }
36
| const options = { inspectors: [fsInspector] };
37
| const client = LDClient.initialize('client-side-id-123abc', context, options);
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs