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
 * [Create the mParticle destination in LaunchDarkly](#create-the-mparticle-destination-in-launchdarkly)
 * [Test an mParticle destination](#test-an-mparticle-destination)
 * [Example events](#example-events)
 * [Enable Data Export for flags and environments](#enable-data-export-for-flags-and-environments)
 * [Delete an mParticle destination](#delete-an-mparticle-destination)
## Overview
This topic explains how to create and test an mParticle destination for Data Export.
mParticle is a customer data platform that allows you to aggregate your analytics and create customer cohorts.
## Prerequisites
To set up an mParticle destination in LaunchDarkly, you need:
 * Your mParticle server-to-server key
 * Your mParticle server-to-server secret
The key and secret are available in your mParticle account. Copy and save both strings. You’ll need them to connect mParticle to LaunchDarkly.
Here is an image of the mParticle API keys dialog:
![The mParticle API keys dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7168200d6082a16b30789730042f70c1ceb08e55682e6913daa76ef8e6f41a85/assets/images/__third_party/mparticle-api-keys.png)
The mParticle API keys dialog.
## Create the mParticle destination in LaunchDarkly
You can use the LaunchDarkly UI to create and modify destinations for Data Export.
To create an mParticle destination in LaunchDarkly:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “mParticle.”
 3. Click **Add integration.** The “Create a destination” panel appears.
 4. (Optional) Enter a **Name** for the destination.
 5. Select a **Project and environment** for this destination to receive events from.
##### Environment settings are permanent
You cannot change an environment after you create the destination. If you wish to export event data from a different environment, you must set up another destination.
 1. Select an **mParticle Environment**.
 2. Enter your mParticle server-to-server key in the **API key** field.
 3. Enter your mParticle server-to-server secret in the **API secret** field.
 4. Click **Add a mapping**.
 5. Select a **LaunchDarkly Context**.
 6. Select an **mParticle User Identifier**.
##### Choose the correct user identifier for your events
The user identifier you choose must match an identifier you chose to identify users in the mParticle ecosystem.
Every event LaunchDarkly exports has a context key specified by the SDK. The user identifier should correspond to the mParticle user identity your SDK context key represents. For example, if your context key represents a customer ID, you should choose `customer_id` as the user identifier.
To learn more about exported events, read [Streaming Data Export schema reference](/docs/integrations/data-export/schema-reference).
 1. Click **Add mapping**.
 2. Check the checkbox indicating you consent to the Integration Terms and Conditions.
 3. Click **Save destination**.
The mParticle destination appears in the “Your data export destinations” section of the **Integrations** screen.
## Test an mParticle destination
After you save the destination, send a test event to confirm that the destination is configured properly.
To send a test event:
 1. Navigate to the **Integrations** page and find “mParticle.”
 2. Click into the “mParticle” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you want to test. The “Edit destination” panel appears.
 4. In the “Send a test event” section, click **Send event**.
 5. Verify the event appears on the mParticle events live stream.
## Example events
These example events display the structure of the events LaunchDarkly sends to mParticle.
LaunchDarkly sends events in the following formats:
Feature eventClick eventCustom eventPage event
```
1
| {
---|--- 
2
| "user_identities": {
3
| "customer_id": "EXAMPLE-CUSTOMER"
4
| },
5
| "environment": "EXAMPLE-ENVIRONMENT-NAME",
6
| "events": [
7
| {
8
| "event_type": "CUSTOM-EVENT",
9
| "data": {
10
| "source_message_id": "###-##",
11
| "event_name": "EXAMPLE-FEATURE-NAME",
12
| "timestamp_unixtime_ms": 1590697814783,
13
| "custom_event_type": "other",
14
| "custom_attributes": {
15
| "project": "EXAMPLE-PROJECT-NAME",
16
| "environment": "5d4b12345d2a2806bd2cc6eb",
17
| "version": "1",
18
| "key": "flag",
19
| "value": "true",
20
| "flag_version": "42",
21
| "default": "false",
22
| "reason_kind": "FALLTHROUGH",
23
| "prerequisite_of": "PARENT-FLAG",
24
| "event_type": "custom_event"
25
| }
26
| }
27
| }
28
| ]
29
| }
```
## Enable Data Export for flags and environments
After you create a Data Export destination, you must start sending flag or environment event data to it. You can enable Data Export for individual flags, or for all the flags in an environment.
To learn more, read [Export event data for flags and environments](/docs/integrations/data-export#export-event-data-for-flags-and-environments)
## Delete an mParticle destination
You can delete a Data Export destination from the **Integrations** screen.
To delete a destination:
 1. Navigate to the **Integrations** page and find “mParticle.”
 2. Click into the “mParticle” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you wish to delete. The “Edit destination” panel appears.
 4. Click **Delete destination**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs