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
 * [Permissions in LaunchDarkly](#permissions-in-launchdarkly)
 * [Permissions in ServiceNow](#permissions-in-servicenow)
 * [ServiceNow OAuth API endpoint secret](#servicenow-oauth-api-endpoint-secret)
 * [ServiceNow OAuth Client ID](#servicenow-oauth-client-id)
 * [ServiceNow standard change template](#servicenow-standard-change-template)
 * [ServiceNow IP address access](#servicenow-ip-address-access)
 * [Set up the ServiceNow integration in LaunchDarkly](#set-up-the-servicenow-integration-in-launchdarkly)
 * [Configure a LaunchDarkly environment to use ServiceNow for approvals](#configure-a-launchdarkly-environment-to-use-servicenow-for-approvals)
 * [Create a LaunchDarkly workflow in ServiceNow for manual approvals](#create-a-launchdarkly-workflow-in-servicenow-for-manual-approvals)
 * [Create a LaunchDarkly workflow in ServiceNow for automatic approvals](#create-a-launchdarkly-workflow-in-servicenow-for-automatic-approvals)
## Overview
This topic explains how to configure the LaunchDarkly ServiceNow integration for flag approvals.
## Prerequisites
In order to complete this topic, you must meet the following prerequisites:
### Permissions in LaunchDarkly
You must have a LaunchDarkly account with a Writer, Admin, Owner, or a custom role that allows the `createIntegration` action on the `integration` resource.
### Permissions in ServiceNow
You must have an existing ServiceNow account with the **admin** role.
### ServiceNow OAuth API endpoint secret
You must have a secret for an OAuth API endpoint for external clients.
To learn how to create these, search for “Create an OAuth API endpoint for external clients” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version. For example, if your ServiceNow version is Yokohama, read the Yokohama version of [Create OAuth API endpoints for external clients](https://www.servicenow.com/docs/bundle/yokohama-application-development/page/build/pipelines-and-deployments/task/create-oauth-api-endpoints-for-external-clients.html).
### ServiceNow OAuth Client ID
You must have a ServiceNow OAuth Client ID. We recommend using a generic service account to create the ServiceNow Client ID.
To learn how to create these, search for “Create third-party OAuth provider records” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version. For example, if your ServiceNow version is Yokohama, read the Yokohama version of [Create third-party OAuth provider records](https://www.servicenow.com/docs/bundle/yokohama-application-development/page/build/pipelines-and-deployments/task/create-third-party-oauth-provider-records.html).
##### Use a service account to create the ServiceNow Client ID
We recommend using a generic service account to create the ServiceNow Client ID. In ServiceNow change requests created by LaunchDarkly approval requests, the ServiceNow account associated with the OAuth client appears in the **Requested by** field.
The LaunchDarkly member who creates the approval appears in the **Short description** field.
Here’s an example:
![A ServiceNow change request created by LaunchDarkly, with the ServiceNow and LaunchDarkly requestors called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e4abb0e711a98ac1d346edb3fd188603b26aa6bcdfc4e6fd2d10bb4b6fd924f6/assets/images/__third_party/servicenow-change-request-callouts.png)
A ServiceNow change request created by LaunchDarkly, with the ServiceNow and LaunchDarkly requestors called out.
### ServiceNow standard change template
You must have an existing ServiceNow standard change template that you want to use for all proposed changes originating from LaunchDarkly. We recommend creating a dedicated template for LaunchDarkly changes.
To learn how to propose a new standard change template, search for “Propose a standard change template” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version. For example, if your ServiceNow version is Yokohama, read the Yokohama version of [Propose a standard change template](https://www.servicenow.com/docs/bundle/yokohama-it-service-management/page/product/service-operations-workspace/task/propose-standard-change-sow.html).
If you do not use a ServiceNow standard change template, we recommend using the [Custom approvals](/docs/integrations/custom-approvals) integration instead.
### ServiceNow IP address access
If your ServiceNow instance has IP address access control enabled, you must create **inbound** ServiceNow IP access control rules corresponding to the `outboundAddresses` from LaunchDarkly’s [public IP list](/docs/home/infrastructure/ip-list).
To learn how to create IP access control rules, search for “IP Address Access Control” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version. For example, if your ServiceNow version is Yokohama, read the Yokohama version of [IP Address Access Control](https://www.servicenow.com/docs/bundle/yokohama-platform-security/page/administer/login/task/t_AccessControl.html).
## Set up the ServiceNow integration in LaunchDarkly
To use the ServiceNow integration to perform flag approvals, you must first establish an OAuth connection between your LaunchDarkly and ServiceNow accounts.
After you create the connection, you can either:
 * [configure automatic approvals](/docs/integrations/servicenow/setting-up#create-a-launchdarkly-workflow-in-servicenow-for-automatic-approvals), or
 * [configure manual approvals](/docs/integrations/servicenow/setting-up#create-a-launchdarkly-workflow-in-servicenow-for-manual-approvals).
To establish an OAuth connection:
 1. Log in to ServiceNow.
 2. Complete ServiceNow’s instructions for creating an endpoint for external clients, including saving the redirect URL.
 3. Navigate to the LaunchDarkly **Integrations** page and find “ServiceNow.”
 4. Click **Configure**. The integration menu appears.
 5. Click **Connect to ServiceNow**. An OAuth provider registration dialog appears.
 6. Copy the **Redirect URL** to your clipboard.
![LaunchDarkly's ServiceNow OAuth provider registration form.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/aa0afb82c3a36620ace12fea23b0e62c81b426898221d5d1b5783cfe32ea4b15/assets/images/__third_party/servicenow-register-oauth-launchdarkly.png)
LaunchDarkly's ServiceNow OAuth provider registration form.
 1. In ServiceNow, set the **Redirect URL** to the redirect URL saved to your clipboard in step 2. Ensure you are following the directions for your ServiceNow version.
![The ServiceNow external client endpoint registration form with the Redirect URL configured.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/184387eb021c42d4eee5372d0812c052ee45f0f755ea2e8f8423e586e0a5c528/assets/images/__third_party/servicenow-register-oauth-provider.png)
The ServiceNow external client endpoint registration form with the Redirect URL configured.
 1. In LaunchDarkly’s **OAuth provider registration** dialog, enter your ServiceNow host URL. For example, if your ServiceNow instance is hosted at `https://launchdarkly.service-now.com`, enter `https://launchdarkly.service-now.com`.
 2. Enter the **Client ID** and **Client Secret** for the client you created in step 5.
 3. Click **Register OAuth Provider**.
 4. Click **Allow**. ServiceNow may prompt you to log in to your ServiceNow account at this step.
Your LaunchDarkly and ServiceNow accounts are now connected. Next, enable the ServiceNow approvals integration for your LaunchDarkly environment.
## Configure a LaunchDarkly environment to use ServiceNow for approvals
By default, LaunchDarkly’s approvals request feature only creates approval requests in LaunchDarkly. You can change this behavior so LaunchDarkly creates change requests in ServiceNow. To do this, you must update your chosen environment’s approval settings. The ServiceNow approvals integration supports approval requests for feature flag changes only.
Here’s how:
 1. Click the project dropdown. The project menu appears:
![The project menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e7170a6ea679fd8c8210aa3660093eb18394effdc9571d713b907cbce33e24c0/assets/images/auto/project-menu-dropdown.auto.png)
The project menu.
 1. Select **Project settings**. The list of project settings appears.
 2. Click **Approval settings**.
 3. In the “Flag approvals” section, select an environment.
 4. Click **Edit approval setting**. The “Approval settings for [environment]” dialog appears.
 5. Change the **Approval system** from “LaunchDarkly” to “ServiceNow.”
 6. Select the ServiceNow standard change template you wish to utilize for all proposed changes in this environment. All change requests created by LaunchDarkly will include relevant details for the **Short description** , **Justification** , and **Requested by** fields. We recommend choosing a template with all other change request fields pre-populated.
 7. (Optional) Fill in the **Detailed information column name** field with the name of the ServiceNow Change Request column you would like LaunchDarkly to populate with detailed approval request information. This field defaults to `justification` if you do not provide a value.
 8. (Optional) Select the **Require approvals for this environment** checkbox to require approval for flag targeting changes in this environment. If you select this, then you must also choose:
 * Whether to require approval for all flags, or only for flags matching the provided tags. While tags are global across environments, this setting applies only to flags in the current environment.
 * Whether to allow scheduled changes for a flag to be deleted without approval in this environment.
 1. Choose whether to **Automatically apply flag changes in LaunchDarkly when associated external change requests are approved**.
 2. Click **Save changes**.
![LaunchDarkly environment approval settings with ServiceNow configured.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4e2c70734832b4404868e5a7d110ba0fe2c6a2b5adeb4291a6277a97f94f01bc/assets/images/auto/servicenow-environment-approval-settings.auto.png)
LaunchDarkly environment approval settings with ServiceNow configured.
## Create a LaunchDarkly workflow in ServiceNow for manual approvals
You can create your workflow using either of these two ServiceNow workflow creation methods:
 * Flow Designer
 * Workflow Editor
To learn more, search for “Flow Designer” and “Workflow Editor” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the articles for your ServiceNow version.
The screenshots below are from the Flow Designer, but you can create a workflow the same triggers, actions, and conditions using the Workflow Editor if you prefer.
To create a LaunchDarkly approvals workflow in ServiceNow:
 1. Create a new Workflow Trigger for record “Created” on the “Change Request [change_request]” table. To learn how to do this, search for “Create Security Operations workflow triggers” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version.
 2. Set two conditions on your trigger: “State” `is` “New” and “Standard Change Template version,” “Template,” “Name” `is` “LaunchDarkly template.”
![A configured Workflow Trigger in the ServiceNow Flow Designer.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6c73cd282ae8c575ae842e5b3ac3c6c331eb6f732812a538b65ffc37dd3e7dad/assets/images/__third_party/servicenow-workflow-trigger.png)
A configured Workflow Trigger in the ServiceNow Flow Designer.
 1. Add a new “Ask For Approval” Action on your Trigger Change Request Record and set the approval rules.
![A ServiceNow "Ask For Approval" action configuration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bf51266c9980d1f5f53b9bbfb11b659e5a9ea41407f07b97a360a973e61d2d83/assets/images/__third_party/servicenow-manual-approval.png)
A ServiceNow "Ask For Approval" action configuration.
 1. Add an `if` condition that requires Approval State `is` “Approved.”
![A ServiceNow if condition configured for change request approvals.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/defa2f98c222a2d9fef4d02f633e298c4cf9ced0e17588cba8485a4ca2e7d65d/assets/images/__third_party/servicenow-manual-approval-if.png)
A ServiceNow if condition configured for change request approvals.
 1. Add two “Update Change Request Record” Actions as extensions of the `if` condition.
 * Set the first Action to “Update Record” with “State” “Scheduled” on the latest version of the triggering Change Request Record.
 * Set the second Action to “Update Record” with “State” “Implement” on the latest version of the triggering Change Request Record.
##### You must use two update actions
ServiceNow requires change request records to move through states in a certain order, so you must create two separate actions that move the record “State” first to “Scheduled” and then to “Implement.” The record must end in the “Implement” state for LaunchDarkly to process the approval.
![A ServiceNow update change request record action that moves the "State" to "Scheduled."](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a46694785b8e3fc00d66828814df21f0a58b1e74457f521e83f87576cec05f16/assets/images/__third_party/servicenow-if-update-1.png)
A ServiceNow update change request record action that moves the "State" to "Scheduled."
 1. As an extension of the `else` condition, add an “Update Change Request Record” Action that moves the “State” to “Canceled.” LaunchDarkly uses this state to determine that the approval request has been rejected.
![A ServiceNow update change request record action that moves the "State" to "Canceled."](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/255d5b3c05bc0fe3032bd0df53625a3bae1e9c947695a1b01fb9844e0de131f8/assets/images/__third_party/servicenow-else-update.png)
A ServiceNow update change request record action that moves the "State" to "Canceled."
You can now request manual approvals in ServiceNow for flag changes in LaunchDarkly.
![A complete ServiceNow workflow for LaunchDarkly manual flag approvals.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a4771ad733d07645b8efff985d7c30cae27703c61c7450e6e6f7b45d65c99bfa/assets/images/__third_party/servicenow-completed-manual-flow.png)
A complete ServiceNow workflow for LaunchDarkly manual flag approvals.
## Create a LaunchDarkly workflow in ServiceNow for automatic approvals
Automatic approval workflows create a correlating ServiceNow Change Request for any LaunchDarkly flag changes. Automatic approvals are for record-keeping only and no actual approval is requested. Automatic approval workflows resemble manual approval workflows but without the approval Action.
To create an automatic approval workflow:
 1. Create a new Workflow Trigger for record “Created” on the “Change Request [change_request]” table. To learn how to do this, search for “Create Security Operations workflow triggers” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version.
 2. Set two conditions on your trigger:
 * “State” `is` “New”
 * “Standard Change Template version,” “Template,” “Name” `is` “LaunchDarkly auto-approve template”
![A Workflow Trigger in the ServiceNow Flow Designer.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6c73cd282ae8c575ae842e5b3ac3c6c331eb6f732812a538b65ffc37dd3e7dad/assets/images/__third_party/servicenow-workflow-trigger.png)
A Workflow Trigger in the ServiceNow Flow Designer.
 1. Add two “Update Change Request Record” Actions as extensions of the `if` condition.
 2. On the first Action, set the Action to “Update Record” on the latest version of the triggering Change Request Record. Set “State” to “Scheduled.”
 3. On the second Action, set the Action to “Update Record” on the latest version of the triggering Change Request Record. Set “State” to “Implemented.”
##### You must use two update actions
ServiceNow requires change request records to move through states in a certain order, so you must create two separate actions that move the record “State” first to “Scheduled” and then to “Implement.” The record must end in the “Implement” state for LaunchDarkly to be able to process the record.
![A ServiceNow update change request record action that moves the "State" to "Implemented."](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/99480dc3c17cd25e91a2da033e815451095cbccf93b320222b6a23046c4070b2/assets/images/__third_party/servicenow-if-update-2.png)
A ServiceNow update change request record action that moves the "State" to "Implemented."
You can now track your LaunchDarkly flag changes in ServiceNow.
![A completed ServiceNow workflow for LaunchDarkly "automatic" approvals.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8bab764ea81f052e14eab1df06f04889408f68345588f5f36a13b43e57bd8415/assets/images/__third_party/servicenow-automatic-approvals.png)
A completed ServiceNow workflow for LaunchDarkly "automatic" approvals.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs