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
 * [Configure LaunchDarkly to send flag change events to New Relic One](#configure-launchdarkly-to-send-flag-change-events-to-new-relic-one)
 * [Add custom policies to the New Relic One integration](#add-custom-policies-to-the-new-relic-one-integration)
 * [Access LaunchDarkly events in New Relic One](#access-launchdarkly-events-in-new-relic-one)
##### The New Relic events integration is available to customers on select plans
The New Relic events integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
##### This integration is only available for New Relic One Pro accounts
This integration only works with a New Relic One Pro subscription. Check your subscription details on your New Relic account billing page.
## Overview
This topic explains how to use the LaunchDarkly New Relic One integration to view LaunchDarkly events in New Relic.
LaunchDarkly integrates with New Relic One. LaunchDarkly sends feature flag change events to New Relic One as deployment events. These events appear as new deployments in the [One console’s APM Event log](https://docs.newrelic.com/docs/apm/apm-ui-pages/events/deployments-page-view-impact-your-app-users/).
## Prerequisites
To configure the integration, you must [create a User key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/) in your New Relic One account.
User keys are unique to your New Relic One account. If you delete your New Relic One account, the integration will need to be reconfigured under a different New Relic One user account.
## Configure LaunchDarkly to send flag change events to New Relic One
To configure LaunchDarkly to send events to New Relic One:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “New Relic One.”
 3. Click **Add integration**. The “Create New Relic One configuration” panel appears.
 4. Give the integration a human-readable **Name**.
 5. Paste in your [**New Relic User key**](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/).
 6. Paste in your [**New Relic application ID**](https://docs.newrelic.com/docs/apis/rest-api-v2/get-started/get-app-other-ids-new-relic-one/).
 7. (Optional) If you have an EU Region New Relic account, select the EU option in the **Data Center** menu.
 8. (Optional) Configure a custom policy to control which flag information LaunchDarkly sends to New Relic One. To learn more, read [Add custom policies to the New Relic One integration](/docs/integrations/new-relic/events#add-custom-policies-to-the-new-relic-one-integration).
 9. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 10. Click **Save configuration**.
### Add custom policies to the New Relic One integration
LaunchDarkly sends all flag change events in the production environment to New Relic One by default. To customize the events LaunchDarkly sends to New Relic One, use the policy editor in the configuration panel. To learn more about creating a policy, read [Example roles and policies](/docs/home/account/roles/example-roles).
![The policy editor.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c0b2176acd24434303f04facd821aed9fd830de45cfaf839ff785576d9e1e6f1/assets/images/auto/policy-editor.auto.png)
The policy editor.
## Access LaunchDarkly events in New Relic One
To view LaunchDarkly events in New Relic One, navigate to your application’s APM dashboard, then select the **Event log** tab on your sidebar and filter for “Deployments” link on the sidebar.
Any flag change events in your production environment (default policy) will create a new deployment event. You will be able to view the impact of that flag change within this deployment page.
![Deployments in New Relic One](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8c53af693ee005260ed2e84ab50a65a4a62560a26a4999b51d4a476e7d6030fb/assets/images/__third_party/new-relic-view-events.png)
Deployments in New Relic One
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs