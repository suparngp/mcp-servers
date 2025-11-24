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
 * [Set up the Jira integration](#set-up-the-jira-integration)
 * [Give your API access token the required permissions](#give-your-api-access-token-the-required-permissions)
 * [Create a role and add it to an API access token](#create-a-role-and-add-it-to-an-api-access-token)
 * [Add the Writer role to your personal access token](#add-the-writer-role-to-your-personal-access-token)
 * [Configure the LaunchDarkly integration in Jira](#configure-the-launchdarkly-integration-in-jira)
 * [Create a new feature flag from a Jira issue](#create-a-new-feature-flag-from-a-jira-issue)
 * [Connect an existing feature flag to a Jira issue from LaunchDarkly](#connect-an-existing-feature-flag-to-a-jira-issue-from-launchdarkly)
 * [View a flag’s status in a Jira issue](#view-a-flags-status-in-a-jira-issue)
 * [Using JQL to search for Jira issues with feature flags](#using-jql-to-search-for-jira-issues-with-feature-flags)
 * [Remove a feature flag from a Jira issue](#remove-a-feature-flag-from-a-jira-issue)
##### Attention: EU Customers
Refer to the [EU documentation](/docs/eu-docs/integrations/jira) for instructions on using this integration with LaunchDarkly's European Union (EU) instance.
## Overview
This topic explains how LaunchDarkly’s Jira Cloud integration allows you to link your feature flags to your team’s Jira issues. When you connect a feature flag to a Jira issue, LaunchDarkly automatically creates a Jira flag link. To learn more, read [Flag links](/docs/home/flags/links).
##### This integration is for Jira Cloud only
The LaunchDarkly Jira integration is only for Jira Cloud product offerings. It does not work in Jira Data Center or Jira Server.
When a feature flag is turned on or off or has its targeting rules updated, its associated Jira issue pages display the flag’s current status.
##### Additional Atlassian integrations are also available
If you use Jira Cloud, you may use other Atlassian products. You can also set up integrations for those. To learn more, read about the LaunchDarkly integrations with [Compass](/docs/integrations/compass), [Confluence](/docs/integrations/confluence), and [Trello](/docs/integrations/trello).
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * The "LaunchDarkly for Jira" app from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1219142/launchdarkly-for-jira?hosting=cloud&tab=overview) in your Jira Cloud instance.
 * A personal or service API access token. To learn more, read [API access tokens](/docs/home/account/api).
## Set up the Jira integration
To set up the Jira integration, you must complete the following steps:
 1. Give your API access token the required permissions:
 * You can [create a role with webhook and flag link permissions, then add the role to a personal or service access token](/docs/integrations/jira#create-a-role-and-add-it-to-an-api-access-token), or
 * you can [add the Writer base role to your personal access token](/docs/integrations/jira#add-the-writer-role-to-your-personal-access-token).
 1. [Configure the LaunchDarkly integration in Jira with the API access token](/docs/integrations/jira#configure-the-launchdarkly-integration-in-jira).
This allows LaunchDarkly to communicate with Jira any time you change a flag.
## Give your API access token the required permissions
You can create a role with appropriate permissions then add the role to a personal or service access token, or you can add the Writer base role to your personal access token.
##### You may need to update your access token
If you configured the Jira integration prior to February 15, 2022, you may need to update your access token’s role to include a statement allowing access to `proj/*:env/*:flag/*` resources with the `createFlagLink`, `updateFlagLink`, and `deleteFlagLink` actions.
### Create a role and add it to an API access token
###### Expand Create a role and add it to an API access token
##### Service tokens and creating your own roles are available to customers on select plans
Service tokens and creating your own roles are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
To create a role for the API access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Roles**.
 3. Click **New role**. The “New role” page appears.
 4. Enter a human-readable **Name** for the role.
 5. Enter a **Key** for the role.
 6. (Optional) Enter a **Description** to explain what the role does.
 7. In the
 8. In the “Edit policy” section, click **View JSON** to open the advanced editor.
 9. Enter this policy in the “Editor” field:
Jira policy
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["createWebhook", "deleteWebhook"],
5
| "resources": ["webhook/*"]
6
| },
7
| {
8
| "effect": "allow",
9
| "actions": ["createFlagLink", "updateFlagLink", "deleteFlagLink"],
10
| "resources": ["proj/*:env/*:flag/*"]
11
| },
12
| {
13
| "effect": "allow",
14
| "actions": ["viewProject"],
15
| "resources": ["proj/*"]
16
| }
17
| ]
```
 1. Click **Create role**.
The custom role is now configured.
Here is an image of a role configured to grant access to webhooks and flag links:
![An access token's role configured to grant access to webhooks and flag links.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ccb2e32e115448c9af00ec88c9d8bc7f19cb378c32c8ab5454c0ab7e08d8c22b/assets/images/auto/jira-custom-role.auto.png)
An access token's role configured to grant access to webhooks and flag links. 
This means that the Jira integration will only be able to do the following:
 * Create webhooks: this is needed because the Jira integration creates a webhook to push change events from LaunchDarkly to Jira
 * Delete webhooks: this is used when the Jira integration is uninstalled
 * Create/Update/Delete flag links: the Jira integration can update the [links](/docs/home/flags/links) section of the feature flag to provide a helpful link back to the Jira issue
The Jira integration cannot perform any other actions, including toggling flags. If a member of your organization wants to toggle a flag from Jira, they have to click the URL for the flag in Jira and toggle the flag from the LaunchDarkly UI. At this point they will only be able to perform actions permitted by their role.
To learn more about role policies, read [Creating roles and policies](/docs/home/account/roles/role-create).
Next, add the role to the API token to grant the Jira integration additional permissions.
To add the role to the API token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Authorization**.
 3. Find the API access token you want to add permissions to and select “Edit token” from its **overflow menu**. The “Edit” dialog appears.
 4. In the **Role** menu, select “Custom.”
 5. Check the checkbox next to the role you just created.
 6. Click **Save token**.
The role is applied to the API token.
### Add the Writer role to your personal access token
###### Expand Add the Writer role to your personal access token
To add the Writer base role to a personal access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Authorization**.
 3. Find the personal access token you want to add permissions to and select “Edit token” from its **overflow menu**. The “Edit” dialog appears.
 4. In the **Role** menu, select “Writer.”
 5. Click **Save token**.
Your personal token now has the Writer base role.
## Configure the LaunchDarkly integration in Jira
Use your access token to configure the Jira integration for your LaunchDarkly account.
 1. Navigate to your Jira instance’s app management page, and click the **Configuration** button for the LaunchDarkly app. The “Configure LaunchDarkly Integration” screen appears.
 2. Set your API access token.
 3. Select which environments the app will track for each of your LaunchDarkly projects. By default, the app will track your production environments.
![The Jira configuration screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/cc80663db9ce2aaf19298d28ea46204537518c1d731ee37cded02ea39a281d7b/assets/images/__third_party/jira-configure-ld-integration.png)
The Jira configuration screen.
##### Environment selection
If selected environments are reconfigured after issues have already been associated with flags, the existing connections display the environments they were historically connected to until the next time that flag is updated.
New flag connections display the flag configuration for the updated environment.
After you have set up the LaunchDarkly for Jira app, a “Releases” panel appears when you view issues on your Jira board.
##### Enable the release panel
The Jira issue view, which contains the release panel, is a per-user setting. If it is off, the release panel does not appear. To learn more, read [Jira’s documentation](https://support.atlassian.com/jira-work-management/docs/configure-field-layout-in-the-issue-view/).
Now that the Jira app is configured, you can connect feature flags to Jira issues. If no flags are associated with an existing Jira issue, you can add one with a button. If you already have one or more flags associated with a Jira issue, the rollout status of each connected feature flag on each Jira issue appears.
## Create a new feature flag from a Jira issue
To create a new flag with Jira issues:
 1. Navigate to your Jira issue’s feature flag panel.
 2. In the “Details” section, click **Add feature flag**.
![The "Releases" menu with the "Create feature flag" option called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/44ed0e07765997e1256e00c4ff7c39b806dca076994e419b696a0232839b25e2/assets/images/__third_party/jira-create-feature-flag-callout.png)
The "Releases" menu with the "Create feature flag" option called out.
 1. Select “Create feature flag.” The LaunchDarkly “Create a feature flag” panel appears with the Jira issue pre-populated.
 2. Finish configuring your flag and click **Save flag**.
When you toggle the flag on or off or make any targeting rule changes, those changes will appear in your Jira issue.
## Connect an existing feature flag to a Jira issue from LaunchDarkly
If you have already created a feature flag for your Jira issue, you can add a Jira issue to your existing flag by creating a [custom property](/docs/home/infrastructure/custom-properties) for your flag.
To create a custom property:
 1. Navigate to the **Flags** list and open the flag you wish to add a custom property to.
 2. Click the **three-dot** overflow menu in the right sidebar.
 3. Select **Add custom property**.
 4. Select “Jira issues” as the **Type**.
 5. Enter a list of Jira issue keys in the **Values** field. You can list multiple issues if applicable.
 6. Click **Save**.
## View a flag’s status in a Jira issue
To view a flag’s status in a Jira issue:
 1. Navigate to your Jira issue’s feature flag panel.
 2. In the “Details” section, click on the name of the feature flag. A dialog with a **Feature flags** tab appears:
![The "Feature flags" tab of a Jira issue displaying the flag's information and status.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ea935a7157a6aa5b10f177fa05d64982d872530ce34c9852396dd8261c62a3b4/assets/images/__third_party/jira-issue-flag-status.png)
The "Feature flags" tab of a Jira issue displaying the flag's information and status.
## Using JQL to search for Jira issues with feature flags
You can use JQL to query for Jira issues that are connected to feature flags. To learn more about JQL, read [Atlassian’s documentation](https://support.atlassian.com/jira-work-management/docs/jql-developer-status/).
## Remove a feature flag from a Jira issue
To remove a flag from a Jira issue:
 1. Navigate to the **Flags** list and open the flag you wish to remove an issue from.
 2. In the “Jira issues” section of the right sidebar, click the **x** on the Jira issue custom property you want to remove.
 3. Click **Save**.
##### Adding issues to an existing flag
Your Jira issue must exist before you associate it with your feature flag. If you accidentally added a Jira issue to your flag, delete the custom property, and try connecting your Jira issue again.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs