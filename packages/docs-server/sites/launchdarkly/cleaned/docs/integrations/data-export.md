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
 * [How Data Export works](#how-data-export-works)
 * [Streaming Data Export](#streaming-data-export)
 * [Streaming Data Export delivery guarantees](#streaming-data-export-delivery-guarantees)
 * [Warehouse Data Export](#warehouse-data-export)
 * [Export event data for flags and environments](#export-event-data-for-flags-and-environments)
 * [Export flag event data](#export-flag-event-data)
 * [About Data Export and Experimentation events](#about-data-export-and-experimentation-events)
 * [Export environment event data](#export-environment-event-data)
##### Data Export is an add-on feature
Data Export is available as an add-on to select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To add Data Export to your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s Data Export feature to export and store flag, context, and Experimentation event data.
Data Export provides a real-time export of raw analytics data, including feature flag requests, analytics events, custom events, Experimentation events, and more. By exporting your data to a location of your choice, you can use your own data warehouse and tools to analyze event data.
![A diagram of Data Export with supported destinations.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8e0aca5bc62a42d4fefce8db22faa408c8dc4a6dc6dbce4b8ab17799ef218c9c/assets/images/__not_from_LD_app_UI/data-export.png)
A diagram of Data Export with supported destinations.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Data Export destinations](/docs/api/data-export-destinations)
## How Data Export works
Data Export works by sending data to one of our supported **destinations**. A destination is an external service which can receive and store the data.
LaunchDarkly supports two kinds of Data Export destinations: streaming and warehouse.
### Streaming Data Export
Streaming Data Export provides real-time delivery of raw events to cloud event streaming platforms like Amazon Kinesis, Google Pub/Sub, or Azure Event Hubs.
Some streaming Data Export destinations have different event formatting schema. If you use mParticle or Segment as your destination, we have specific documentation for their event schema:
 * [mParticle schema reference](/docs/integrations/data-export/mparticle-schema-reference)
 * [Segment schema reference](/docs/integrations/data-export/segment-schema-reference)
To learn more about event formatting, read [Streaming Data Export schema reference](/docs/integrations/data-export/schema-reference).
#### Streaming Data Export delivery guarantees
After LaunchDarkly receives an event from your application, it sends the event to your configured destinations.
LaunchDarkly sends an event to your destinations only once, with some exceptions:
 * In the event of a hardware failure or networking issue, LaunchDarkly may send events multiple times.
 * Additionally, if your configured destination does not acknowledge receipt of the event, LaunchDarkly will retry sending the message five times over a 30-minute period.
### Warehouse Data Export
Warehouse Data Export delivers detailed events, as well as flag and experiment metadata, in scheduled batches to cloud data warehouses like Snowflake. Warehouse Data Export is required for [warehouse native Experimentation](/docs/home/warehouse-native).
## Export event data for flags and environments
##### You must configure your SDKs to send events
To use Data Export, all of your SDKs must be configured to send events. If you have disabled sending events for testing purposes, you must re-enable it. To learn more about the events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events).
After you create a Data Export destination, you can send data to it for individual flags or for all the flags in an environment.
The Data Export feature facilitates live data export and does not backfill historical data. This means that when you activate Data Export, you will begin exporting data only from that point forward.
### Export flag event data
To export data from a specific flag to a destination:
 1. Navigate to the **Flags** list.
 2. Click the name of the flag you wish to export data from.
 3. Click the **three-dot** overflow menu for the environment you want.
![The environment overflow menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e03f37840baff486344b755ece50f181bbc77710c22f6297b195efbdb402d613/assets/images/auto/environment-overflow-menu-flag.auto.png)
The environment overflow menu.
 1. Select **Configuration in environment**. The “Environment configuration” screen appears.
 2. Select the **Send detailed events to data export destinations** checkbox.
 3. Click **Save setting**.
![The Data Export section on a flag's "Environment configuration" screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/994a10c0b6ab1605d291fd56bd7662c9d5784cf49a2e62a1041f15ac2d240abb/assets/images/auto/data-export-detailed-event-info.auto.png)
The Data Export section on a flag's "Environment configuration" screen.
If you have enabled exporting detailed event data at the environment level, the **Send detailed events to data export destinations** checkbox will be checked by default for all new flags. However, checking the box at the environment level does not override existing flag settings. To learn more, read [Export environment event data](/docs/integrations/data-export#export-environment-event-data).
### About Data Export and Experimentation events
If you check a flag’s **Send detailed events to data export destinations** checkbox, then LaunchDarkly exports evaluation events for all contexts that encounter the flag.
If you do not check the **Send detailed events to data export destinations** checkbox, then LaunchDarkly does not export evaluation events, unless you are using the flag in an experiment. If you are using the flag in an experiment, then LaunchDarkly will still export evaluation events for contexts included in the experiment, but no other contexts.
You can tell if an evaluation was part of an experiment from the optional `inExperiment` attribute. Evaluations that were part of an experiment have the `inExperiment` attribute on the evaluation reason set to `true`. To learn more, read [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons).
### Export environment event data
To export data from all flags within an environment to a destination:
 1. Click the project dropdown. The project menu appears:
![The project menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e7170a6ea679fd8c8210aa3660093eb18394effdc9571d713b907cbce33e24c0/assets/images/auto/project-menu-dropdown.auto.png)
The project menu.
 1. Select **Project settings**.
 2. Select **Environments**. The **Environments** list appears.
 3. Click on the **overflow menu** next to the environment you wish to export data from.
 4. Choose **Edit environment**. The “Edit environment” panel appears.
 5. Select the **Send detailed events to data export destinations** checkbox.
 6. Click **Save environment**.
If you have the **Send detailed events to data export destinations** checkbox checked at the environment level, the flag-level **Send detailed events to data export destinations** box will be checked by default for new flags. You can uncheck the box at the flag level to override the environment-level setting.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs