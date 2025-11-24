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
 * [Configure LaunchDarkly to work with AppDynamics](#configure-launchdarkly-to-work-with-appdynamics)
 * [Add custom policies to the AppDynamics integration](#add-custom-policies-to-the-appdynamics-integration)
 * [Access LaunchDarkly events in AppDynamics](#access-launchdarkly-events-in-appdynamics)
##### The AppDynamics integration is available to customers on select plans
The AppDynamics integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly AppDynamics integration to view LaunchDarkly events in AppDynamics. [AppDynamics](https://www.appdynamics.com/) is an [application performance management (APM)](https://en.m.wikipedia.org/wiki/Application_performance_management) tool. It allows customers to monitor the operational health of their application and infrastructure.
##### This integration is for AppDynamics APM SaaS customers
This integration is not configured to work with AppDynamic’s End User Monitoring products or on-premises deployments of AppDynamics.
## Prerequisites
To configure the integration successfully, you will need to create an [API Client](https://docs.appdynamics.com/appd/21.x/latest/en/extend-appdynamics/appdynamics-apis/api-clients) with [Create Events permissions](https://docs.appdynamics.com/appd/21.x/latest/en/appdynamics-essentials/account-management/tenant-user-management/create-and-manage-custom-roles) correctly on your AppDynamics account.
## Configure LaunchDarkly to work with AppDynamics
To configure LaunchDarkly to start sending events to AppDynamics:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “AppDynamics.”
 3. Click **Add integration**. The “Create AppDynamics configuration” panel appears.
 4. Give the integration a human-readable **Name**.
 5. Click **Connect to AppDynamics** to authenticate in. A popup window appears.
![The AppDynamics OAuth2 popup window.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f1c6d552f303307ff825288e388a263f4ce2f8c0e79dade0b86da2dcd173305c/assets/images/__third_party/appdynamics-oauth.png)
The AppDynamics OAuth2 popup window.
 1. Enter your **AppDynamics host URL**. The format should resemble `https://example.saas.appdynamics.com`.
 2. Enter your AppDynamics **Client ID**. Your client ID is the name of your newly created API client combined with your account name in the format `<apiClientName>@<accountName>`.
 3. Enter the **Client Secret** you received when you configured your [AppDynamics API client](https://docs.appdynamics.com/appd/21.x/21.5/en/extend-appdynamics/appdynamics-apis/api-clients).
 4. Once you have successfully authenticated, return to the integrations page and enter your AppDynamics **Account name** in the configuration panel.
 5. Input your AppDynamics application ID or **Application Name**. The application name can be found on the “Applications” tab within AppDynamics.
 6. (Optional) Configure a custom policy to control which flag information LaunchDarkly sends to AppDynamics. To learn more, read [Add custom policies to the AppDynamics integration](/docs/integrations/appdynamics#add-custom-policies-to-the-appdynamics-integration).
 7. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 8. Click **Save configuration**. The new integration appears on the Integrations page.
Your AppDynamics application now receives events from LaunchDarkly.
### Add custom policies to the AppDynamics integration
LaunchDarkly sends all flag change events in the production environment to AppDynamics by default. To customize the events LaunchDarkly sends to AppDynamics, use the policy editor. To learn more about creating a policy, read [Example roles and policies](/docs/home/account/roles/example-roles).
![The policy editor.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c0b2176acd24434303f04facd821aed9fd830de45cfaf839ff785576d9e1e6f1/assets/images/auto/policy-editor.auto.png)
The policy editor.
## Access LaunchDarkly events in AppDynamics
To view events, navigate to the “Events” tab within your application dashboard. From there, modify the default event filter so it displays “Custom” events. All LaunchDarkly events are sent with a “Custom Event Type” of “LaunchDarkly” and the following properties can be used to further filter events in AppDynamics:
Property name | Property value 
---|--- 
`kind` | Flag, project, environment, etc. 
`flag_name` | The name of the flag. Sent only with flag events. 
`flag_key` | The flag’s key. Sent only with flag events. 
`project_name` | The resource’s project name. 
`project_key` | The resource’s project key. 
`environment_name` | The resource’s environment name. 
`environment_key` | The resource’s environment key. 
![AppDynamics Custom Event Filter](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6820bbae3ba3c2508539709de7bed83b002668e3610a9f19ccf1b2030c9627ea/assets/images/__third_party/appdynamics-custom-event-filter.png)
AppDynamics Custom Event Filter
You can now view LaunchDarkly events in AppDynamics.
![View LaunchDarkly events in AppDynamics](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3588ab332552f967d99eefc2bbcbde2465e76e110308576fd4c5347d4deeb668/assets/images/__third_party/appdynamics-view-event.png)
View LaunchDarkly events in AppDynamics
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs