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
 * [Example API token policy](#example-api-token-policy)
 * [Configure the Contentful integration](#configure-the-contentful-integration)
 * [Install the integration](#install-the-integration)
 * [Connect the integration to LaunchDarkly](#connect-the-integration-to-launchdarkly)
 * [Enable the integration in the Entry Editor](#enable-the-integration-in-the-entry-editor)
 * [Use the Contentful Entry Editor](#use-the-contentful-entry-editor)
 * [Create a new feature flag](#create-a-new-feature-flag)
 * [Map content to an existing flag](#map-content-to-an-existing-flag)
 * [What the LaunchDarkly app stores on entries](#what-the-launchdarkly-app-stores-on-entries)
 * [Permissions and security](#permissions-and-security)
 * [Troubleshooting](#troubleshooting)
 * [The LaunchDarkly panel does not appear](#the-launchdarkly-panel-does-not-appear)
 * [Flags do not appear in the search list](#flags-do-not-appear-in-the-search-list)
 * [Mapped content does not appear as expected](#mapped-content-does-not-appear-as-expected)
 * [API key errors](#api-key-errors)
 * [Network or connection issues](#network-or-connection-issues)
 * [Next steps](#next-steps)
## Overview
This topic explains how to use the LaunchDarkly Contentful integration. The integration connects LaunchDarkly feature flagging with Contentful’s content management platform so that content editors and developers can manage experiments and flag-driven content directly in Contentful.
You can use the Contentful integration to:
 * Create new LaunchDarkly feature flags directly from Contentful
 * Map Contentful entries to specific flag variations
 * Search and select existing flags from your LaunchDarkly project
 * Coordinate feature and content launches across different environments
 * Preview and manage content for each variation directly in Contentful
This integration lets you map Contentful entries to LaunchDarkly flag variations, so you can control which content is displayed to audiences in real time. Editors can create and map flags in Contentful, while developers use LaunchDarkly SDKs to evaluate flags and render the correct content at runtime.
## Prerequisites
To use the Contentful integration, you must have the following:
 * A Contentful account with admin access to a space
 * A LaunchDarkly account with access to API tokens, projects, and environments
 * A LaunchDarkly API access token that includes the `createFlag` and `viewProject` actions, which allow the integration to create and read feature flags. You can find or create API keys in LaunchDarkly under **Account settings** > **API access**.
### Example API token policy
You can use this example JSON policy to create a custom role for the Contentful integration. It grants only the permissions required to create and view flags and projects:
LaunchDarkly custom role JSON policy
```
1
| [
---|--- 
2
| {
3
| "resources": [
4
| "proj/*:env/*:flag/*"
5
| ],
6
| "actions": [
7
| "createFlag"
8
| ],
9
| "effect": "allow"
10
| },
11
| {
12
| "resources": [
13
| "proj/*"
14
| ],
15
| "actions": [
16
| "viewProject"
17
| ],
18
| "effect": "allow"
19
| }
20
| ]
```
## Configure the Contentful integration
You install and configure the integration in Contentful to connect it to your LaunchDarkly project and environment.
### Install the integration
To install the integration in Contentful and add LaunchDarkly flag management to your Contentful space:
 1. In Contentful, navigate to **Apps** > **Marketplace** and search for **LaunchDarkly + Contentful**.
 2. Select the app and click **Install**.
 3. For the app location, use the integration URL provided by your administrator, or use your self-hosted URL if testing locally.
 4. Grant the integration permissions to read and write entries and update content model settings.
 5. After installation, go to **Apps** > **Installed Apps** , then click **Configure** on **LaunchDarkly + Contentful**.
### Connect the integration to LaunchDarkly
Connect the integration to your LaunchDarkly project and environment to start managing flags.
 1. In Contentful, enter your LaunchDarkly API key in the **LaunchDarkly + Contentful** configuration screen.
 * Use a LaunchDarkly API access token that includes the `createFlag` and `viewProject` actions. You can find or create API keys in LaunchDarkly under **Account settings** > **API access**.
 2. After you enter the key, the integration automatically fetches your available LaunchDarkly projects and environments.
 3. Select the project and environment you want to use for flag management.
 4. Click **Save configuration**.
The integration securely stores these settings in Contentful and uses them for all flag-related operations. Your API key is encrypted by Contentful, held in memory only during requests, and never persisted outside your Contentful account.
### Enable the integration in the Entry Editor
The LaunchDarkly configuration screen includes an option to automatically apply the correct Entry Editor settings. After you configure the integration, verify the following settings:
 * The **LaunchDarkly** app is set as the Entry Editor for the **LaunchDarkly Feature Flag** content type.
 * (Optional) The default Contentful editor is removed.
You can also add the LaunchDarkly app to the Sidebar for other content types used as **variations**. Do not add the Sidebar to the LaunchDarkly Feature Flag content model itself.
To add the Sidebar manually:
 1. In Contentful, navigate to **Content model**.
 2. Select the content type you use for variations.
 3. Under **Sidebar** , click **Add app** and select **LaunchDarkly**.
 4. Click **Save**.
## Use the Contentful Entry Editor
The Entry Editor provides two modes for connecting content to LaunchDarkly flags.
### Create a new feature flag
To create a new feature flag in Contentful using the LaunchDarkly app:
 1. Create an entry using the **LaunchDarkly Feature Flag** content type.
 2. In the LaunchDarkly section, select the **Create new flag** button.
 3. Enter a **Name** and verify the auto-generated **Key**.
 4. (Optional) Add a **Description**.
 5. Choose a **Variation type** (boolean, string, number, or JSON).
 6. Define at least two variations, each with a unique name and value.
 7. Click **Create flag in LaunchDarkly**.
 8. Click **Start content mapping** to begin mapping entries to flag variations.
After you create the flag, a success card appears with options to view the flag in LaunchDarkly or start mapping content.
### Map content to an existing flag
To map Contentful entries to an existing LaunchDarkly flag:
 1. Select **Map content to existing flag** in the LaunchDarkly section.
 2. Use the search field to find an existing flag by name or key.
 3. Select the flag to load its variations.
 4. For each variation, click **Select Content** to choose a Contentful entry.
 5. Use **Preview** to see how each variation appears.
 6. Click **Save mapping** to persist the relationships.
The app stores mappings in a consistent data structure on the entry. Each mapping corresponds to a variation index in LaunchDarkly.
### What the LaunchDarkly app stores on entries
LaunchDarkly Contentful integration adds the following fields to entries:
Field | Type | Description 
---|---|--- 
`name` | Text | Flag name 
`key` | Text | Flag key identifier 
`description` | Text | (Optional) Flag description 
`variations` | JSON | Array of variation names and values 
`contentMapping` | JSON | Array of Contentful entry references, one per variation index 
##### Mapping order
The order of entries in the `contentMapping` array must match LaunchDarkly’s variation order. Boolean flags default to `true` and `false` variations.
## Permissions and security
The integration between LaunchDarkly and Contentful maintains strict data handling and access controls and does the following:
 * Uses your configured LaunchDarkly API key to create and read flags
 * Stores only minimal metadata in Contentful entries, including the flag name, key, description, variations, and mapping
 * API keys are encrypted and stored in a LaunchDarkly-managed database. Requests are signed to prevent token exposure.
 * Uses HTTPS for all communication
 * Validates all requests before processing
Editors can create and map flags in Contentful, but cannot edit existing flags or variations. Developers can use LaunchDarkly SDKs to evaluate flags and render the correct content at runtime.
## Troubleshooting
If you encounter issues with LaunchDarkly Contentful integration, try these common solutions.
### The LaunchDarkly panel does not appear
If the LaunchDarkly section does not appear in the Entry Editor:
 * Confirm that you added **LaunchDarkly + Contentful** to the Entry Editor for the content type.
 * Refresh the Contentful web app after saving changes to the content model.
### Flags do not appear in the search list
If flags are missing when mapping content:
 * Verify that your API key has access to the selected project and environment.
 * Check that the flag exists and is active in LaunchDarkly.
 * Ensure the key includes the `createFlag` and `viewProject` actions.
### Mapped content does not appear as expected
If the wrong entry appears for a variation or the mapping seems out of sync:
 * Confirm that the variation order in LaunchDarkly matches the mapping order in Contentful.
 * Verify that all mapped entries are published in Contentful.
 * Review variation names and values to ensure each is unique.
### API key errors
If the integration fails to connect or shows an invalid key error:
 * Re-enter your LaunchDarkly API key in the configuration screen.
 * Verify that the token includes the `createFlag` and `viewProject` actions.
 * Make sure your key is active and has not been revoked in LaunchDarkly.
### Network or connection issues
If the integration fails to load or shows a blank screen:
 * Confirm that the integration server is accessible from Contentful.
 * If testing locally, use a tunneling tool such as [ngrok](https://ngrok.com/docs/what-is-ngrok) to make the server publicly accessible.
 * Check the browser console for error messages.
## Next steps
 * Learn more about [feature flags](/docs/home/flags/create).
 * Read about [experimentation and rollouts](/docs/home/experimentation).
 * Explore other [LaunchDarkly integrations](/docs/integrations).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs