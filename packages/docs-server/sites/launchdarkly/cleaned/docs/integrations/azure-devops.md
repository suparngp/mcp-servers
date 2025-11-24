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
 * [Set up the Azure extension](#set-up-the-azure-extension)
 * [Give your API access token the required permissions](#give-your-api-access-token-the-required-permissions)
 * [Create a role and add it to an API access token](#create-a-role-and-add-it-to-an-api-access-token)
 * [Add the Writer role to your personal access token](#add-the-writer-role-to-your-personal-access-token)
 * [Configure the Azure extension](#configure-the-azure-extension)
 * [Create the rollout task](#create-the-rollout-task)
 * [Associate a feature flag with a release](#associate-a-feature-flag-with-a-release)
 * [Configure authentication](#configure-authentication)
 * [v3 of the Azure DevOps integration](#v3-of-the-azure-devops-integration)
 * [Pre-v3 versions of the Azure DevOps integration](#pre-v3-versions-of-the-azure-devops-integration)
##### The Azure DevOps integration is available to customers on select plans
The Azure DevOps integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use Azure DevOps integration to control feature flags.
The Azure DevOps integration lets you perform controlled rollouts to manage feature releases. With this integration, you can define a percentage rollout for your feature flags as part of a release task.
##### The Azure DevOps integration supports boolean flags only
This integration supports only boolean flags. To learn more, read [Flag templates](/docs/home/flags/templates).
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * The Azure extension from the [Azure DevOps Marketplace](https://marketplace.visualstudio.com/items?itemName=launchdarkly.launchdarkly-extension). Before you add the extension to any of your Azure DevOps projects, you must first add it to your Azure DevOps organization.
 * If your organization has not installed the extension, click **Get it free** on the Marketplace listing. Then, add the LaunchDarkly extension to your Azure DevOps project so the extension can connect to your LaunchDarkly account.
 * A personal or service API access token. To learn more, read [API access tokens](/docs/home/account/api).
## Set up the Azure extension
To set up the VSCode extension, you must complete the following steps:
 1. Give your API access token the required permissions:
 * You can [create a role with appropriate permissions, then add the role to a personal or service access token](/docs/integrations/azure-devops#create-a-role-and-add-it-to-an-api-access-token), or
 * you can [add the Writer base role to your personal access token](/docs/integrations/azure-devops#add-the-writer-role-to-your-personal-access-token).
 2. [Configure the Azure extension](/docs/integrations/azure-devops#configure-the-azure-extension) with the API access token.
## Give your API access token the required permissions
You can create a role with appropriate permissions then add the role to a personal or service access token, or you can add the Writer base role to your personal access token.
### Create a role and add it to an API access token
###### Expand Create a role and add it to an API access token
##### Service tokens and creating your own roles are available to customers on select plans
Service tokens and creating your own roles are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
To create a role for the API access token:
 1. Click the **gear** icon to view Organization settings.
 2. Click **Roles**.
 3. Click **New role**. The “New role” page appears.
 4. Enter a human-readable **Name** for the role.
 5. Enter a **Key** for the role.
 6. (Optional) Enter a **Description** to explain what the role does.
 7. In the “Edit policy” panel, grant write access to the environments and feature flags relevant to your Azure DevOps projects.
 8. Click **Create role**.
### Add the Writer role to your personal access token
###### Expand Add the Writer role to your personal access token
To add the Writer base role to a personal access token:
 1. Click the **gear** icon to view Organization settings.
 2. Click **Authorization**.
 3. Find the personal access token you want to add permissions to and select “Edit token” from its **overflow menu**. The “Edit” dialog appears.
 4. In the **Role** menu, select “Writer.”
 5. Click **Save token**.
Your personal token now has the Writer base role.
## Configure the Azure extension
To configure the Azure extension:
 1. Navigate to your Azure DevOps project dashboard. Click **Project Settings**.
 2. Navigate to **Pipelines** , then **Service Connections**.
 3. Click **Create service connection** and select **LaunchDarkly**.
 4. Enter your LaunchDarkly API **Access token**.
 5. Enter a **Service connection name**.
 6. (Optional) Enter a **Description**.
 7. Click **Save**.
![The Azure DevOps "New LaunchDarkly service connection" screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3df29aa2b7df6d55753c21a4c46ec6f63de00adc69c4f4195114a55ed2121a53/assets/images/__third_party/azuredevops-add-connection.png)
The Azure DevOps "New LaunchDarkly service connection" screen.
## Create the rollout task
The next step is to add the rollout task to your release definitions.
##### Rollouts only work with the default collection
You cannot associate rollouts with collections that are not the default. If you do, the rollout won’t be able to find the collection.
To find the rollout task:
 1. Navigate to the **Add tasks** dialog in Azure DevOps.
 2. Click into the **Deploy** tab.
 3. Choose **LaunchDarkly Rollout**.
![The LaunchDarkly Rollout task in Azure DevOps.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4b8f4553de618fc17909356b135096dc9532e186a2dfb20447d201460334a432/assets/images/__third_party/azuredevops-ld-rollout.png)
The LaunchDarkly Rollout task in Azure DevOps.
 1. Choose the **Account** to update. This menu contains the service endpoints you configured in [Configure the Azure extension](/docs/integrations/azure-devops##configure-the-azure-extension).
 2. Set a percentage **Rollout** to apply to your feature flags.
 3. Choose the **Flag state**. This controls whether the targeting is on or off on release.
![The task rollout settings.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a7f1fe2118b3202504c6ae3ff7a1fb681850fc3fdaa5392d76b49e7b05ca0cb8/assets/images/__third_party/azuredevops-controlled-rollout.png)
The task rollout settings.
In this example, any feature flags associated with the release are set to be rolled out to 10% of your chosen contexts in the LaunchDarkly environment you select.
## Associate a feature flag with a release
To associate a feature flag with a release:
 1. Navigate to the **Work items** page in Azure DevOps.
 2. Click a work item. The **Details** tab opens.
 3. Select the **LaunchDarkly** tab to view the feature flags associated with the work item:
![The Azure DevOps "Work items" page, with the "LaunchDarkly" tab called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/675ec69242623934b5c276f39b527cd0bc15c282e99ec0917537c86bf4aca48c/assets/images/__third_party/azuredevops-ld-work-items-page.png)
The Azure DevOps "Work items" page, with the "LaunchDarkly" tab called out.
 1. Select a feature flag to associate with a release:
![The list of feature flags on the "LaunchDarkly" tab.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/858a3d2cf4c96c7e44564aeeddd68491e308fa7bea750d3805f5f8ca60c92ad7/assets/images/__third_party/azuredevops-ld-work-items.png)
The list of feature flags on the "LaunchDarkly" tab.
When you release to an environment, the rollout task updates any flag you linked with a work item. The LaunchDarkly section on your release page updates to display all the feature flags affected by this release.
##### Work items must be linked to your release
For the rollout task to succeed, you must link the relevant work items to the release. To learn how, read the Azure Devops documentation on how to [Link work items to objects](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/add-link?view=azure-devops).
## Configure authentication
To ensure the task can access your work items, you must allow Azure DevOps to authenticate with LaunchDarkly. This process differs based on which version of the integration you are using. If you don’t know which version of the integration you are using, you are probably using the v3 version.
### v3 of the Azure DevOps integration
To configure authentication, define some custom variables to pass between Azure DevOps and LaunchDarkly:
 1. Navigate to the **Configuration** tab of the release page in Azure DevOps.
 2. Enter the **launchdarkly-account-name**. This is account name of the Azure DevOps account.
 3. Enter the **launchdarkly-project-name**. This is the project name of the Azure DevOps project.
 4. Enter the **launchdarkly-pat**. This is for the Azure DevOps personal access token that the integration will use to reach out to the Azure DevOps API.
![The v3 variable configuration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/84ef604c5056549b461056ee95d3d282abea377bf0553e0db92f213122868925/assets/images/__third_party/azuredevops-variables.png)
The v3 variable configuration.
### Pre-v3 versions of the Azure DevOps integration
To configure authentication, define some custom variables to pass between Azure DevOps and LaunchDarkly:
 1. Navigate to the **Configuration** tab of the release page in Azure DevOps.
 2. Enter the **accountName**.
 3. Enter the **alternatePassword**.
 4. Enter the **alternateUsername**.
 5. Enter the **projectName**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs