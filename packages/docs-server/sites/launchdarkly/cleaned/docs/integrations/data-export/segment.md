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
 * [Prerequisites](#prerequisites)
 * [Create a Segment destination in LaunchDarkly](#create-a-segment-destination-in-launchdarkly)
 * [Test a Segment destination](#test-a-segment-destination)
 * [Example events](#example-events)
 * [Enable Data Export for flags and environments](#enable-data-export-for-flags-and-environments)
 * [Delete a Segment destination](#delete-a-segment-destination)
## Overview
This topic explains how to create and test a Segment destination for Data Export.
## Prerequisites
There are two prerequisites to configure the Segment integration:
 * You must add the LaunchDarkly Source in Segment
 * You must find the **Write Key** for your Segment account
First, add the LaunchDarkly Source in Segment. To add the source, [read Segment’s documentation](https://segment.com/docs/connections/sources/catalog/cloud-apps/launchdarkly/).
Next, configure the Segment integration in LaunchDarkly. To do this, you need the **Write Key** from your Segment account.
To find the write key:
 1. Log into Segment and navigate to your project.
 2. Navigate to **Sources** and select your LaunchDarkly source.
 3. Select **API Keys** on the Source integration’s menu bar.
 4. Copy the **Write Key** as shown in the text box:
![The API Keys section of Segment's UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/41ac03b28f26a8a9991cf6cfdbc69fd02d30e0e5e5ee7a3e77e8e36177fffef2/assets/images/__third_party/integrations-segment-write-key.png)
The API Keys section of Segment's UI.
## Create a Segment destination in LaunchDarkly
To create the Segment destination:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Segment.”
 3. Click **Add integration.** The “Create a destination” panel appears.
 4. (Optional) Give your integration a human-readable **Name**.
 5. Choose an **Environment** for this integration to apply to.
 6. Enter the Segment **Write key**.
 7. Click **Save destination**. The new integration appears in the list of integrations.
## Test a Segment destination
After you save the destination, send a test event to confirm that the destination is configured properly.
To send a test event:
 1. Navigate to the **Integrations** page and find “Segment.”
 2. Click into the “Segment” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you want to test. The “Edit destination” panel appears.
 4. In the “Send a test event” section, click **Send event**.
 5. Verify the event appears in the Segment **Debugger**.
## Example events
These example events display the structure of the events LaunchDarkly sends to Segment.
LaunchDarkly sends events in the following formats:
Feature event
```
1
| {
---|--- 
2
| "event": "feature",
3
| "integrations": {},
4
| "messageId": "c2f7a2d1-0a1b-456f-8e9a-16756e7a6db5",
5
| "originalTimestamp": "2019-09-13T21:20:18.114Z",
6
| "properties": {
7
| "contextKeys": {
8
| "user": "known-user-key-123abc",
9
| "anonymousUser": "anon-user-key-123abc"
10
| },
11
| "project": "5744c12345c9900708000001",
12
| "environment": "5d4b12345d2a2806bd2cc6eb",
13
| "eventId": "5d7c12345a51a0006e16ae5",
14
| "default": "true",
15
| "flagVersion": 42,
16
| "key": "EXAMPLE-FLAG-KEY",
17
| "prereqOf": "EXAMPLE-PARENT-FLAG",
18
| "reasonKind": "FALLTHROUGH",
19
| "value": "EXAMPLE-FLAG-VALUE",
20
| "variation": 1,
21
| "version": 1
22
| },
23
| "receivedAt": "2019-09-13T21:20:19.406Z",
24
| "sentAt": "2019-09-13T21:20:19.366Z",
25
| "timestamp": "2019-09-13T21:20:18.153Z",
26
| "type": "track",
27
| "userId": "EXAMPLE-USER-ID"
28
| }
```
Click event
```
1
| {
---|--- 
2
| "event": "click",
3
| "integrations": {},
4
| "messageId": "18925338-0a1b-4521-a36a-c8e9839e4593",
5
| "originalTimestamp": "2019-09-13T21:21:43.114Z",
6
| "properties": {
7
| "contextKeys": {
8
| "user": "known-user-key-123abc",
9
| "anonymousUser": "anon-user-key-123abc"
10
| },
11
| "project": "5744c98765c9900708000001",
12
| "environment": "5d4b12345d2a2806bd2cc6eb",
13
| "eventId": "5d7c123a86f26000065862da",
14
| "key": "EXAMPLE-FLAG-KEY",
15
| "selector": "btn",
16
| "url": "http://example.com",
17
| "version": 1
18
| },
19
| "receivedAt": "2019-09-13T21:21:46.415Z",
20
| "sentAt": "2019-09-13T21:21:46.375Z",
21
| "timestamp": "2019-09-13T21:21:43.154Z",
22
| "type": "track",
23
| "userId": "EXAMPLE-USER-ID"
24
| }
```
Custom event
```
1
| {
---|--- 
2
| "event": "custom",
3
| "integrations": {},
4
| "messageId": "d747a382-0a1b-41d5-b9a6-7ae9b93925bc",
5
| "originalTimestamp": "2019-09-13T21:21:58.114Z",
6
| "properties": {
7
| "contextKeys": {
8
| "user": "known-user-key-123abc",
9
| "anonymousUser": "anon-user-key-123abc"
10
| },
11
| "project": "5744c12345c9900708000001",
12
| "environment": "5d4b12345d2a2806bd2cc6eb",
13
| "eventId": "5d7c123452db400061b14dd",
14
| "key": "EXAMPLE-EVENT-KEY",
15
| "version": 1
16
| },
17
| "receivedAt": "2019-09-13T21:22:00.673Z",
18
| "sentAt": "2019-09-13T21:22:00.393Z",
19
| "timestamp": "2019-09-13T21:21:58.393Z",
20
| "type": "track",
21
| "userId": "EXAMPLE-USER-ID"
22
| }
```
Page view event
```
1
| {
---|--- 
2
| "integrations": {},
3
| "messageId": "8c235148-0a1b-4428-a4de-00b90adf2833",
4
| "originalTimestamp": "2019-09-13T21:19:43.114Z",
5
| "properties": {
6
| "contextKeys": {
7
| "user": "known-user-key-123abc",
8
| "anonymousUser": "anon-user-key-123abc"
9
| },
10
| "project": "5744c123459900708000001",
11
| "environment": "5d123454d2a2806bd2cc6eb",
12
| "eventId": "5d7c12345db400061b14c1",
13
| "key": "EXAMPLE-FLAG-KEY",
14
| "url": "http://example.com",
15
| "version": 1
16
| },
17
| "receivedAt": "2019-09-13T21:19:45.371Z",
18
| "sentAt": "2019-09-13T21:19:45.331Z",
19
| "timestamp": "2019-09-13T21:19:43.154Z",
20
| "type": "page",
21
| "userId": "EXAMPLE-USER-ID"
22
| }
```
## Enable Data Export for flags and environments
After you create a Data Export destination, you must start sending flag or environment event data to it. You can enable Data Export for individual flags, or for all the flags in an environment.
To learn more, read [Export event data for flags and environments](/docs/integrations/data-export#export-event-data-for-flags-and-environments).
## Delete a Segment destination
You can delete a Data Export destination from the **Integrations** screen.
To delete a destination:
 1. Navigate to the **Integrations** page and find “Segment.”
 2. Click into the “Segment” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you wish to delete. The “Edit destination” panel appears.
 4. Click **Delete destination**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs