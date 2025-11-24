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
 * [Use cases for custom approvals](#use-cases-for-custom-approvals)
 * [Set up custom approvals](#set-up-custom-approvals)
 * [Use custom approvals](#use-custom-approvals)
##### The Custom approvals integration is available to customers on select plans
The Custom approvals integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
##### You cannot use custom approvals with LaunchDarkly workflows or the ServiceNow integration
You cannot use custom approvals in any environment that uses [workflows](/docs/home/releases/workflows) or the [ServiceNow integration](/docs/integrations/servicenow). Custom approvals are still available in other environments that don’t use workflows or the ServiceNow integration.
## Overview
This topic describes how to create your own custom approvals integration. Only customers with complex workflow management or approval systems in third-party applications that LaunchDarkly does not integrate with directly are likely to need a custom approvals integration.
## Use cases for custom approvals
LaunchDarkly provides several integrations so that you can use third-party workflow management applications. However, the provided LaunchDarkly integrations are optimized for relatively basic change management workflows in the third-party applications.
For example, LaunchDarkly’s [ServiceNow approvals integration](/docs/integrations/servicenow) embeds [LaunchDarkly approvals](/docs/home/releases/approvals) into your ServiceNow workflows. All approval requests created in a LaunchDarkly environment generate corresponding ServiceNow standard change requests, and LaunchDarkly uses the state of the corresponding standard change request to determine if the proposed change should be acknowledged as “approved” or “declined.”
If you have more complex workflow management processes or approval requirements, you can still set up LaunchDarkly-created approval requests to generate corresponding requests in your system. For example, if you have a customized ServiceNow implementation that does not use standard change requests, you can use a custom approvals integration with LaunchDarkly.
## Set up custom approvals
To set up custom approvals in LaunchDarkly, you must to do the following:
 * [Create and host your own application](/docs/integrations/custom-approvals/custom-app) that serves as an intermediary between LaunchDarkly approvals and your workflow management application
 * [Add a custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config) to link LaunchDarkly to your intermediary application
 * [Configure LaunchDarkly environments to use the custom approvals integration configuration](/docs/integrations/custom-approvals/configure-environments)
After all of these steps are complete, you can use custom approvals from within LaunchDarkly.
## Use custom approvals
After you create your own intermediary application, add a custom approvals integration configuration and configure your chosen LaunchDarkly environments to use the custom integration. This lets members of your organization in LaunchDarkly request approval for flag changes within LaunchDarkly. LaunchDarkly sends these requests to your intermediary application, which can process them or forward them to your workflow management application.
To request approval from within LaunchDarkly:
 1. In LaunchDarkly, navigate to the feature flag that you wish to change. Make sure you are in an environment for which the approval settings are set to your custom approvals integration.
 2. Click **Review and save**. The “Save changes” dialog appears.
 3. Choose one or more reviewers from the **Request approval** menu.
 4. Enter a **Comment** to add details that help your reviewers understand the changes you made.
 5. Click **Request approval**.
The approvers for feature flag changes receive a notification in your workflow management application, where they can view and approve it.
After they approve the request, the member can apply the change in LaunchDarkly.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs