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
 * [Configure the integration](#configure-the-integration)
 * [Use LaunchDarkly with the Release integration](#use-launchdarkly-with-the-release-integration)
 * [The Pre-Deployment step](#the-pre-deployment-step)
 * [The Pre-Delete step](#the-pre-delete-step)
 * [Conclusion](#conclusion)
##### The Release integration is available to customers on select plans
The Release integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Release integration. [Release](https://release.com/) is a product that lets you implement Kubernetes in your cloud and create production-like environments on pull requests or for quality assurance (QA), sales environments, and more.
##### The Release integration is managed by Release
The Release integration was built by and is managed by Release. For questions about the integration or for technical support, [contact Release](https://releasehub.com/).
Release’s LaunchDarkly integration creates an isolated LaunchDarkly environment to use for testing. You can share your feature flag environments with multiple staging or pre-production environments, but this can cause testing and reliability issues similar to the risks of sharing a database between environments.
The Release integration prevents these issues by creating a new LaunchDarkly environment every time you deploy a new Release environment. It deletes the LaunchDarkly environment when you remove the Release environment.
The integration also stores SDK keys, mobile keys, and client IDs as environment variables that your application can access. If you are not using environment variables in your LaunchDarkly project, you must modify your code to do so in order to use this integration.
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * Have a Release account.
 * Have a personal or service API access token. To learn more, read [API access tokens](/docs/home/account/api).
## Configure the integration
To configure the LaunchDarkly integration, you must add it to your Release account and connect it to LaunchDarkly.
To set up the integration:
 1. Log in to your Release account.
 2. Navigate to **Manage Accounts**.
![The Accounts menu with "Manage Accounts" selected.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c07e4594008efd632d5fbb725349d06788c75b3b1737285645a96803bd28bd80/assets/images/__third_party/release-select-manage-accounts.png)
The Accounts menu with "Manage Accounts" selected.
 1. Choose your account.
![A list of available accounts.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f5674be28f98659ec654364bc0dab9d2ccc8a5ae3d4902c77cc27e2c154fb34b/assets/images/__third_party/release-select-account-to-manage.png)
A list of available accounts.
 1. Choose **Integrations** and find “LaunchDarkly” in the “Available Integrations” section.
 2. Click **Setup**. The setup form appears.
![The Integrations menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8bb17ec80f9105b9cb73b5d7ae66711b0705a0b04f137f2519766aac3580c210/assets/images/__third_party/release-manage-integrations.png)
The Integrations menu.
Every field in the setup form is required, and all but one have defaults you can use.
The fields in the setup form are:
 * **Project Key** : This is the key for the project where you wish to create environments. The default value is _default_ , because LaunchDarkly always has a project with key _default_.
 * **Access Token** : This is the API access token for the account under which you would like Release to create environments in LaunchDarkly.
 * **Environment Variables** : The last three form elements define the names of the environment variables where Release stores the API keys from LaunchDarkly. You can change them to anything you like. Release uses these environment variables to store API keys as Kubernetes secrets.
![An example LaunchDarkly configuration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/93d256c2be73c3001d9daee74b51839b8bd949c45d2c1c1de2c5054d39ce3de9/assets/images/__third_party/release-setup-ld-integration.png)
An example LaunchDarkly configuration.
After you save the configuration, Release uses the API access token to connect to your LaunchDarkly account.
## Use LaunchDarkly with the Release integration
The integration can take two actions, both of which are automated and handled by Release.
 * **Pre-Deployment step:** This step adds a task to each of your deployments to create the feature flag environment.
 * **Pre-Delete step:** When you delete an environment, this step deletes the environment in LaunchDarkly.
![A diagram of the environment creation workflow.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/00a35fec959bf7c025c9a2e54347a834222fd88cf7980bb6282651839483078a/assets/images/__not_from_LD_app_UI/release-ld-integration-workflow.png)
A diagram of the environment creation workflow.
### The Pre-Deployment step
The Pre-Deployment step occurs when you first deploy a space or a new configuration. It creates the environment in LaunchDarkly only the first time it runs.
![A completed Pre-Deployment step in Release.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/22755494e045370e306dd928c0f849796ac24a1662fea9621b31c30302a45792/assets/images/__third_party/release-pre-deployment-step.png)
A completed Pre-Deployment step in Release.
After the Pre-Deployment step, the environment variables you specified populate and become available to your containers.
![LaunchDarkly-specific environments as Kubernetes secrets.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/27cef249e69da6958af165c46f0adbacbf3876f2942289da2eeaff6288596230/assets/images/__third_party/release-ld-envs.png)
LaunchDarkly-specific environments as Kubernetes secrets.
You can use these environment variables in your code to access your feature flags.
### The Pre-Delete step
The Pre-Delete step occurs when a you remove a Release environment, either through the UI or by closing or merging a pull request. Removing the Release environment deletes the corresponding LaunchDarkly environment automatically.
## Conclusion
Now that you have successfully installed the integration, the environment variables you defined are available to your app. How you access them depends on the framework or language you are using.
For examples of environment variables in different frameworks, read [Release’s documentation](https://docs.release.com/integrations/integrations-overview/launchdarkly-integration#examples).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs