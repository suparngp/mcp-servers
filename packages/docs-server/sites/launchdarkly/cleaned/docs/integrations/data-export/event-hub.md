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
 * [Create a policy and key in Azure Event Hub](#create-a-policy-and-key-in-azure-event-hub)
 * [Create the Event Hubs destination in LaunchDarkly](#create-the-event-hubs-destination-in-launchdarkly)
 * [Test an Azure Event Hubs destination](#test-an-azure-event-hubs-destination)
 * [Enable Data Export for flags and environments](#enable-data-export-for-flags-and-environments)
 * [Delete an Event Hubs destination](#delete-an-event-hubs-destination)
## Overview
This topic explains how to configure and use the Azure Event Hubs Data Export destination. By connecting your LaunchDarkly project to Azure Event Hubs, you can export LaunchDarkly SDK events from flags and environments to an Event Hub of your choosing.
## Prerequisites
In order to use the Azure Event Hubs Data Export destination, you must meet the following prerequisites:
 * You must create a Shared Access Signature Policy in your Azure Event Hubs account at the Event Hub or the Namespace level
 * You must copy the key from this policy. To do this, read [Create a policy and key in Azure Event Hub](/docs/integrations/data-export/event-hub#create-a-policy-and-key-in-azure-event-hub).
## Create a policy and key in Azure Event Hub
Before you enable the Event Hubs destination in LaunchDarkly, you must configure a policy in Azure Event Hubs that lets an Event Hub or Namespace receive events.
Depending on your use case, you can configure a shared access signature policy for an Event Hubs Namespace or for any of its enclosed Event Hubs.
Here’s how to configure a new policy:
 1. Log into Azure and click **Event Hub**.
 2. Choose the **Namespace** where you want LaunchDarkly to export events.
 3. Choose an Event Hub to which you wish to export events.
 4. Click into **Shared Access Policies** and click **Add**. The policy creation panel appears.
 5. Create a new policy with the **Send** permission enabled:
![A new policy with the Send permission enabled, configured in Azure Event Hub.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/20d4751d63424fc9493aefe98b39f064b116465fa22a79e742d00b61634ac725/assets/images/__third_party/azure-eventhub-add-policy.png)
A new policy with the Send permission enabled, configured in Azure Event Hub.
 1. Click **Create**. The new policy appears in the list.
 2. Click to open the policy and copy its primary key:
![The new policy with its keys displayed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/152c4cc1c9585e09f6739370e00f4e5e7896fe9a999fbad783587e97f8d1e583/assets/images/__third_party/azure-eventhub-policy-keys.png)
The new policy with its keys displayed.
Save the key somewhere accessible to you, because you need it to set up the destination successfully.
## Create the Event Hubs destination in LaunchDarkly
After you copy and save the policy key in Event Hub, you can configure the Data Export destination in LaunchDarkly.
To connect the destination to LaunchDarkly:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Azure Event Hubs.”
 3. Click **Add integration**. The “Create a destination” panel appears.
 4. Give your destination a human-readable **Name**.
 5. Choose a LaunchDarkly **Environment** from which you wish to export events to Azure Event Hub.
 6. Enter the **Event Hubs Namespace Name**.
 7. Enter the **Event Hub Name**.
 8. Enter the **Shared Access Signature Policy Name**.
 9. Enter the **Share Access Signature Key**.
 10. Click **Save destination**.
This connects your Azure Event Hub to your LaunchDarkly environment. To send events from specific flags or environments to Event Hub, you must enable Data Export for each flag or environment individually.
## Test an Azure Event Hubs destination
After you save the destination, send a test event to confirm that the destination is configured properly.
To send a test event:
 1. Navigate to the **Integrations** page and find “Azure Event Hubs.”
 2. Click into the “Azure Event Hubs” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you want to test. The “Edit destination” panel appears.
 4. In the “Send a test event” section, click **Send event**.
 5. If you have configured the destination correctly, an event appears in the Azure Event Hubs destination.
## Enable Data Export for flags and environments
After you create a Data Export destination, you must start sending flag or environment event data to it. You can enable Data Export for individual flags, or for all the flags in an environment.
To learn more, read [Export event data for flags and environments](/docs/integrations/data-export#export-event-data-for-flags-and-environments).
## Delete an Event Hubs destination
You can delete a Data Export destination from the **Integrations** screen.
To delete a destination:
 1. Navigate to the **Integrations** page and find “Azure Event Hubs.”
 2. Click into the “Azure Event Hubs” section to display a list of destinations.
 3. Click the **pencil** icon next to the destination you wish to delete. The “Edit destination” panel appears.
 4. Click **Delete destination**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs