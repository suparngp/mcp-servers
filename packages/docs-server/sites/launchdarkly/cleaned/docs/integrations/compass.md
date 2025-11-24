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
 * [Generate a new LaunchDarkly access token](#generate-a-new-launchdarkly-access-token)
 * [Set up the Compass integration](#set-up-the-compass-integration)
 * [Connect Compass components to LaunchDarkly](#connect-compass-components-to-launchdarkly)
 * [View feature flag information for a Compass component](#view-feature-flag-information-for-a-compass-component)
 * [Recent feature flag changes for a connected Compass component](#recent-feature-flag-changes-for-a-connected-compass-component)
 * [All feature flags for a connected Compass component](#all-feature-flags-for-a-connected-compass-component)
 * [Disconnect Compass components from LaunchDarkly](#disconnect-compass-components-from-launchdarkly)
 * [Disconnect your API access token](#disconnect-your-api-access-token)
 * [Remove the Compass integration](#remove-the-compass-integration)
##### The Compass integration is available to customers on select plans
The Compass integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the Compass integration for LaunchDarkly.
The Compass integration for LaunchDarkly pushes relevant feature flag change events to Compass’ component activity timeline. This lets your team better understand how recent changes to feature flags may be impacting component health by viewing feature flag change events alongside other component events, such as deployments and incidents. Additionally, the integration provides a new Compass component tab that contains a complete list of relevant feature flags and their current states.
![The Compass user interface with the LaunchDarkly Compass integration installed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a4b92b43b687adc90a5407e81dd3c4e197fad4a8a0d3fd50e760ca2779e33f6f/assets/images/__third_party/compass-flag-history.png)
The Compass user interface with the LaunchDarkly Compass integration installed.
##### Additional Atlassian integrations are also available
If you use Compass, you may use other Atlassian products. You can also set up integrations for those. To learn more, read about the LaunchDarkly integrations with [Confluence](/docs/integrations/confluence), [Jira Cloud](/docs/integrations/jira), and [Trello](/docs/integrations/trello).
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * Be a Compass administrator on your Atlassian site.
 * Have a personal or service API access token. To learn more, read [API access tokens](/docs/home/account/api).
## Generate a new LaunchDarkly access token
The Compass integration requires a LaunchDarkly personal or service API access token with a role policy that allows the token to perform the `createIntegration`, `deleteIntegration`, and `viewProject` actions.
Here’s how to create an API access token with the appropriate inline policy:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Authorization**.
 3. Click **Create token**. The “Create access token” dialog appears.
 4. Give your token a human-readable **Name** , such as “Compass integration.”
 5. Give your token an “Inline policy” **Role**.
 6. Click the **View JSON** button and specify the following policy in the **Editor** field to allow the token to perform the `createIntegration` and `deleteIntegration` actions on integration resources and the `viewProject` action on project resources:
Compass integration Inline policy
```
1
| [
---|--- 
2
| {
3
| "actions": ["createIntegration", "deleteIntegration"],
4
| "effect": "allow",
5
| "resources": ["integration/*"]
6
| },
7
| {
8
| "resources": ["proj/*"],
9
| "effect": "allow",
10
| "actions": ["viewProject"]
11
| }
12
| ]
```
 7. If you are on an Enterprise LaunchDarkly plan, select **This is a service token**.
![The inline policy for the Compass integration access token.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9adc09401e26c99227c4cfb8ef1fd93cd5c923d39d6b91c76c6474e804932d20/assets/images/auto/compass-access-token-policy.auto.png)
The inline policy for the Compass integration access token.
 1. Click **Save token** and copy the newly created token to your clipboard. You will need it to configure the integration in Compass.
## Set up the Compass integration
The Compass integration is managed from the Atlassian Cloud site. Other than creating an API access token, there are no settings or preferences to configure in LaunchDarkly.
Here’s how to set up your Compass integration:
 1. Navigate to your Atlassian Compass site. For example, `https://mysite.atlassian.net/compass`.
 2. In the top navigation, click **Apps**.
 3. Find **LaunchDarkly** in the list of apps and click **Install**.
 4. After the LaunchDarkly app is installed, click **Configure**.
 5. Click **Allow access**. The “LaunchDarkly is requesting Access” screen appears.
 6. Review the requested permissions, then click **Accept**.
![LaunchDarkly authorization screen for Compass.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0acd101760516d352d44fc33c65a8123fceb68bc3ea347d9a0bd66fc32427420/assets/images/__third_party/compass-ld-integration-auth-dialog.png)
LaunchDarkly authorization screen for Compass.
##### You must authorize the requested permissions for the integration to work
If you click **Cancel** , the integration cannot access your Compass data.
 1. Enter your LaunchDarkly API access token in the **Access token** field.
 2. Click **Submit**.
![LaunchDarkly access token screen for Compass.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ed73f66833e633c051aa6dbe62da0b23afc6b65932453e71cdf3f9025cf8a39d/assets/images/__third_party/compass-ld-integration-access-token.png)
LaunchDarkly access token screen for Compass.
The integration has connected LaunchDarkly and Compass when the **Connected to LaunchDarkly** success message is displayed.
![Successfully connected Compass to LaunchDarkly.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/75cdf49d2a136c208ee8a9b4160550996141f611b565973fb2f355809d1c65ae/assets/images/__third_party/compass-ld-integration-connected.png)
Successfully connected Compass to LaunchDarkly.
## Connect Compass components to LaunchDarkly
Now that you’ve set up the integration, you must connect your LaunchDarkly projects to Compass components to view feature flag data in Compass.
To connect feature flags to a Compass component:
 1. In LaunchDarkly, navigate to the **Flags** list for the project you want to connect to Compass.
 2. From the **Flags** list, open the environment you want to connect to Compass.
 3. (Optional) If you would like to connect only flags with a specified tag, apply a tags filter. To learn more, read [Filter feature flags](/docs/home/flags/list#filter-feature-flags).
 4. Copy the page URL to your clipboard. For example, `https://app.launchdarkly.com/projects/default/flags?env=production&selected-env=production`. The URL contains the project name, environment, and optional tag filter.
 5. Navigate to your Compass site. For example, `https://mysite.atlassian.net/compass`.
 6. Navigate to the Compass component you want to connect to LaunchDarkly.
 7. In the **Other links** section of your Compass component, paste the LaunchDarkly URL as a new link.
 8. Click on the **LaunchDarkly** tab in the left navigation to verify that the component was successfully connected.
![A successfully connected Compass component to LaunchDarkly.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/86cb71698d10b10f62e1ff377389f56defb1c2660333c61db617428f40d5b29d/assets/images/__third_party/compass-ld-integration-component-connected.png)
A successfully connected Compass component to LaunchDarkly.
 1. Repeat the above steps to associate your other LaunchDarkly projects to the applicable Compass components.
## View feature flag information for a Compass component
Once you have connected your Compass components to LaunchDarkly, you can view feature flag information on the component page in Compass.
Here’s how:
 1. Navigate to your Compass site. For example, `https://mysite.atlassian.net/compass`.
 2. Navigate to the Compass component for which you want to view feature flag information.
 3. Click on the **LaunchDarkly** tab in the left navigation.
### Recent feature flag changes for a connected Compass component
You can view a history of recent feature flag changes for the associated LaunchDarkly project on the **Recently updated** subtab.
Here’s how:
 * Click the dot next to each item to view more details about the feature flag change.
 * Click the feature flag name to view the feature flag in LaunchDarkly.
![Recently updated feature flags displayed in Compass.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1c440695e84cd7473e1d85d49ee47928f0800ae8fe51047bdb31ff0eeb1417fb/assets/images/__third_party/compass-ld-integration-recently-updated.png)
Recently updated feature flags displayed in Compass.
### All feature flags for a connected Compass component
You can view a list of all feature flags for the associated LaunchDarkly project on the **All feature flags** subtab.
Here’s how:
 * Use the **Filter by status** dropdown to filter the list of flags displayed in the list.
 * Click the column headings above the list to sort by the **Flag** , **Status** or **Last requested** column.
 * Click the feature flag name to view the feature flag in LaunchDarkly.
![All feature flags displayed in Compass.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a81f043ae891676131676fd90c373f335d2e3db7c43b5306942fe23f137011b5/assets/images/__third_party/compass-ld-integration-all-feature-flags.png)
All feature flags displayed in Compass.
## Disconnect Compass components from LaunchDarkly
The connection between a LaunchDarkly project and a Compass component is stored as a link on the Compass component, as described in the [Connect Compass components to LaunchDarkly](/docs/integrations/compass#connect-compass-components-to-launchdarkly) section. If desired, you can remove this connection on the Compass component page.
Here’s how:
 1. Navigate to your Compass site. For example `https://mysite.atlassian.net/compass`.
 2. Navigate to the Compass component you want to disconnect from LaunchDarkly.
 3. In the **Other links** section of your Compass component, remove the LaunchDarkly link. Verify that the component was successfully disconnected by clicking on the **LaunchDarkly** tab in the left navigation. Feature flag information should no longer display on this tab.
## Disconnect your API access token
The Compass integration stores your LaunchDarkly API access token to read data from the LaunchDarkly API, as described in the [Set up the Compass integration](/docs/integrations/compass#set-up-the-compass-integration) section. If you need to cycle your LaunchDarkly access token, or if you want to connect Compass to a different LaunchDarkly organization, you can disconnect your access token.
Here’s how:
 1. Navigate to your Compass site. For example `https://mysite.atlassian.net/compass`.
 2. In the top navigation, click the **Apps** link.
 3. Find **LaunchDarkly** in the list of apps and click **Configure**.
 4. Click **Disconnect access token**.
 5. You can now provide Compass with a new access token if desired.
## Remove the Compass integration
To remove the Compass integration:
 1. Navigate to your Compass site. For example `https://mysite.atlassian.net/compass`.
 2. In the top navigation, click **Apps**.
 3. Find **LaunchDarkly** in the list of apps and click **Uninstall**.
This removes the Compass integration with LaunchDarkly.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs