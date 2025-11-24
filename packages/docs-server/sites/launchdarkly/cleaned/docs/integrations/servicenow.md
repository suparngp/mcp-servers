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
 * [Get started](#get-started)
##### The ServiceNow approvals integration is available to customers on select plans who use the SaaS version of ServiceNow
The ServiceNow approvals integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
The ServiceNow approvals integration is only available for SaaS-based ServiceNow products. Your access to the integration depends on what ServiceNow availability model you use. To learn more, read [ServiceNow’s documentation](https://www.servicenow.com/products/it-asset-management/what-is-saas-subscription.html).
##### You cannot use the ServiceNow integration with LaunchDarkly workflows or custom approvals
You cannot use the ServiceNow integration in any environment that uses [workflows](/docs/home/releases/workflows) or [custom approvals](/docs/integrations/custom-approvals). The ServiceNow integration is still available in other environments that don’t use workflows or custom approvals.
## Overview
This topic explains how to configure and use the ServiceNow approvals integration for use with LaunchDarkly approvals.
The ServiceNow approvals integration helps your team comply with company-wide change management policies by embedding LaunchDarkly approvals into your ServiceNow workflows. It bridges LaunchDarkly approval requests with ServiceNow change management workflows.
When you enable this integration, all approval requests created in a LaunchDarkly environment generate corresponding ServiceNow standard change requests. These requests populate with relevant information about the proposed change. LaunchDarkly uses the state of the corresponding standard change request to determine if the proposed change should be acknowledged as “approved” or “declined.”
To learn more about approval workflows, read [Approvals](/docs/home/releases/approvals).
##### The ServiceNow approvals integration uses standard change templates
To use the ServiceNow approvals integration, you must have an existing ServiceNow standard change template that you want to use for all proposed changes originating from LaunchDarkly.
If you have a customized change template, or different workflow within ServiceNow, use the [Custom approvals](/docs/integrations/custom-approvals) integration instead.
## Get started
To use the ServiceNow approvals integration, you must complete the following steps:
 1. [Set up the ServiceNow approvals integration](/docs/integrations/servicenow/setting-up).
 2. [Request approval for your flag changes](/docs/integrations/servicenow/approvals).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs