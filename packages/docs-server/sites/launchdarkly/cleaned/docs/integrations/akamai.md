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
 * [Create an Akamai integration](#create-an-akamai-integration)
 * [Manage an Akamai integration](#manage-an-akamai-integration)
##### The Akamai integration is available to customers on select plans
The Akamai integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s Akamai integration. This integration enables flag evaluation within Akamai EdgeWorker functions. The integration writes the latest flag data from the configured environment directly to an Akamai EdgeKV store in your account. It also sends any change to a flag or segment configuration in your selected environment to your Akamai EdgeKV, ensuring your store is always up to date.
##### This integration requires LaunchDarkly's Akamai SDK
You must install and configure the Akamai SDK to use this integration. To learn more, read [Akamai SDK reference](/docs/sdk/edge/akamai).
You can use the Akamai integration to bootstrap your application with the latest client-side feature flags. This eliminates the initial remote call to LaunchDarkly, providing zero-latency client-side feature flags with no flash of original content or shift in content layout. The Akamai integration also enables flag evaluations within Akamai EdgeWorker functions. This means you can use your LaunchDarkly flags without an added latency from network requests.
##### This integration is only required for Akamai EdgeKV
If you are using Akamai’s EdgeWorkers, but not using the Akamai EdgeKV, this integration is not required. However, you still must install and configure the Akamai SDK to read flag data from your Akamai EdgeWorkers. To learn more, read [Akamai SDK reference](/docs/sdk/edge/akamai).
## Create an Akamai integration
For an Akamai integration to work, you need an Akamai account with at least one namespace and group. You must create one integration for each LaunchDarkly environment.
##### Akamai EdgeKV size limits
Akamai EdgeKV enforces value size limits that might be smaller than your LaunchDarkly flag data in a given environment.
To learn more, read about [EdgeKV limits](https://techdocs.akamai.com/edgekv/docs/limits).
To create a new Akamai integration for your environment:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Akamai EdgeWorkers.”
 3. Click **Add integration**. The “Create Akamai EdgeWorkers configuration” panel appears.
 4. Give the integration a human-readable **Name**.
 5. Select a LaunchDarkly **Environment**. You cannot change this after you configure the integration.
 6. In the **Host** field, enter the unique host domain to which LaunchDarkly should send requests. You can find this on the API client details page that’s linked from your Akamai “Identity and Access Management” dashboard. To learn more, read Akamai’s [Create an API client with custom permissions](https://techdocs.akamai.com/developer/docs/create-a-client-with-custom-permissions) documentation.
 7. Select the Akamai **Network** environment that this integration should connect to. You can change this after you configure the integration.
 8. Enter the **EdgeKV namespace** and **EdgeKV group**. These are the identifiers from your Akamai account where you will store LaunchDarkly flag information.
 9. Enter the **Client secret** , **Client token** , and **Access token**. These are authentication credentials that you can generate from your Akamai Control Center. To learn more, read Akamai’s [Create authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation.
 10. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 11. (Optional) Click **Validate connection**. This sends a test request to your Akamai EdgeWorkers using the information provided.
 12. Click **Save configuration**.
## Manage an Akamai integration
After you have created an Akamai integration, you can change its status, test it, or delete it.
Here’s how:
 1. Navigate to the **Integrations** page and find “Akamai EdgeWorkers.”
 2. Click the **arrow** menu to display the existing Akamai EdgeWorkers integrations.
 3. Find your integration and click the **pencil** icon to edit. The “Edit Akamai EdgeWorkers configuration” panel appears.
Then complete one of the following actions:
 * To change the status of an existing Akamai integration, toggle the **Status** to **Off** or **On**.
 * To test an existing Akamai integration, click **Validate connection**. This sends a test request to your Akamai EdgeWorkers using your current configuration.
 * To delete an existing Akamai integration, click **Delete**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs