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
 * [Set up the Segment integration](#set-up-the-segment-integration)
 * [Copy your LaunchDarkly client-side ID](#copy-your-launchdarkly-client-side-id)
 * [Connect Segment to LaunchDarkly](#connect-segment-to-launchdarkly)
 * [Correlate Segment users with LaunchDarkly contexts](#correlate-segment-users-with-launchdarkly-contexts)
## Overview
This topic explains how to configure your existing [Segment](https://segment.com/) account to send events to LaunchDarkly metrics.
Sending Segment events to LaunchDarkly lets you use Segment events as LaunchDarkly metric events.
##### Segment can only send events to custom metrics
Segment can only send events to [custom conversion binary](/docs/home/metrics/custom), [custom conversion count](/docs/home/metrics/custom-count), and [custom numeric metrics](/docs/home/metrics/custom-numeric). You cannot use Segment events with [clicked or tapped](/docs/home/metrics/click) or [page viewed](/docs/home/metrics/pageview) metrics.
After you connect LaunchDarkly and Segment, you will use the existing Segment Event Name as the LaunchDarkly metric event key when you create a custom metric.
Here is an image of a LaunchDarkly custom conversion binary metric with the event key called out:
![A LaunchDarkly custom conversion binary metric with the event key highlighted.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76159f524792fea6b8436f91fdb6bc3d143c644b7572e2890cf6771a8f83cf64/assets/images/auto/experiment-event-key-callout.auto.png)
A LaunchDarkly custom conversion binary metric with the event key highlighted.
Events are specific to one LaunchDarkly environment. To learn more, read [Event keys](/docs/home/metrics/metric-events#event-keys).
## Set up the Segment integration
To set up the integration, you must have access to your Segment and LaunchDarkly accounts. You will need them both to connect them to each other.
### Copy your LaunchDarkly client-side ID
Copy your LaunchDarkly client-side ID by following the instructions at [Copy SDK credentials](/docs/home/account/environment/keys#copy-sdk-credentials).
You will use this client-side ID in the next section.
### Connect Segment to LaunchDarkly
To connect Segment to LaunchDarkly:
 1. Navigate to the Segment app’s **Destinations** page.
 2. Click **Add Destination**.
 3. Find [LaunchDarkly (Actions)](https://segment.com/docs/connections/destinations/catalog/actions-launchdarkly/) in the Destination Catalog.
![The LaunchDarkly \(Actions\) listing in the Segment Destination catalog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d3c4f83b58c42ee0a7bba758203710626d98b5d7e674da9ad7a60ebc0a3ae2c8/assets/images/__third_party/segment-destination-catalog-listing.png)
The LaunchDarkly (Actions) listing in the Segment Destination catalog.
 1. Click **Configure LaunchDarkly (Actions)**.
 2. Choose which Segment **Source** should send data to the LaunchDarkly destination.
 3. Click **Next**.
 4. Fill in the **Destination name** field with the name of your choice.
 5. Click **Save**.
 6. Paste the client-side ID from the previous procedure into the **LaunchDarkly client-side ID** field.
 7. Click **Save Changes**.
 8. Click the **Enable Destination** radio button.
 9. Click **Save Changes**.
![The LaunchDarkly \(Actions\) Basic Settings form in Segment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/88d869fd1de99e02b890e0184538568fc3a35cb0b2def9e6aee73e8f58ce355c/assets/images/__third_party/segment-destination-basic-settings.png)
The LaunchDarkly (Actions) Basic Settings form in Segment.
 1. Navigate to the **Mappings** tab.
 2. Click **New Mapping**.
 3. Click **Track Event**.
 4. The **Edit: Track Event** page guides you through the process of mapping [Segment Track events](https://segment.com/docs/connections/destinations/catalog/actions-launchdarkly/#track-event) to LaunchDarkly metric events. The default settings should be acceptable for most customers.
##### Segment Event Names and LaunchDarkly event keys must match exactly
To use Segments events in LaunchDarkly metrics, the Segment Event Name must be identical to the LaunchDarkly metric event key. To learn how to set the event key when creating a LaunchDarkly metric, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
 1. Click **Save**.
 2. On the **Mappings** tab, click the radio buttons associated with the **Track Event** mapping to begin sending events to LaunchDarkly.
To learn more about track events, read [Segment’s documentation](https://segment.com/docs/connections/spec/track/).
After you map Segment events to LaunchDarkly metric events, events from the source you choose appear as custom metric events in LaunchDarkly.
## Correlate Segment users with LaunchDarkly contexts
LaunchDarkly correlates Segment metric events with LaunchDarkly context keys using the Segment user ID, if it is present. The Segment user ID must match a LaunchDarkly context key. If the Segment event does not contain a Segment user ID, then LaunchDarkly uses the Segment anonymous ID.
If you are using Segment events in a LaunchDarkly experiment:
 * the LaunchDarkly metric must be attached to a flag and the experiment must be recording, and
 * the context must be included in the experiment for the event to be included in the experiment results.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs