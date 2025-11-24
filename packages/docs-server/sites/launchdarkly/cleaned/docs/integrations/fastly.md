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
 * [Configure a Fastly KV store for LaunchDarkly](#configure-a-fastly-kv-store-for-launchdarkly)
 * [Create a Fastly integration](#create-a-fastly-integration)
 * [Manage a Fastly integration](#manage-a-fastly-integration)
##### The Fastly integration is available to customers on select plans
The Fastly integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s Fastly integration. This integration enables flag evaluation within [Fastly Compute](https://www.fastly.com/documentation/guides/compute/). The integration writes the latest flag data from the configured environment directly to Fastly Compute in your account. It also sends any change to a flag or segment configuration in your selected environment to Fastly Compute, ensuring your Fastly cache is always up to date.
##### This integration requires LaunchDarkly's Fastly SDK
You must install and configure the Fastly SDK to use this integration. To learn more, read [Fastly SDK reference](/docs/sdk/edge/fastly).
You can use the Fastly integration to bootstrap your application with the latest client-side feature flags. This eliminates the initial remote call to LaunchDarkly, providing zero-latency client-side feature flags with no flash of original content or shift in content layout. The Fastly integration also enables flag evaluations within Fastly Compute. This means you can use your LaunchDarkly flags without an added latency from network requests.
For the Fastly integration to work, you need a Fastly account. Then, you need to:
 * In Fastly, [configure a Fastly KV store for LaunchDarkly](/docs/integrations/fastly#configure-a-fastly-kv-store-for-launchdarkly).
 * In LaunchDarkly, [create a Fastly integration](/docs/integrations/fastly#create-a-fastly-integration).
 * In your application, use LaunchDarkly’s [Fastly edge SDK](/docs/sdk/edge/fastly) to evaluate your feature flags.
This topic also describes how to [manage](/docs/integrations/fastly#manage-a-fastly-integration) your Fastly integration configurations in LaunchDarkly.
## Configure a Fastly KV store for LaunchDarkly
To configure a Fastly KV store for LaunchDarkly:
 1. In Fastly, add a new KV store. We recommend naming this “launchdarkly.”
 2. Connect this KV store with your Fastly Compute service.
 3. Create a new Fastly Automation API Token. Give the token permission to read and write to the new KV store. To learn how to generate this, read Fastly’s documentation on [Authentication tokens](https://www.fastly.com/documentation/reference/api/auth-tokens/).
 4. Create a new Origin host on your Compute Service. We recommend naming this “launchdarkly.”
 5. Configure this to have a host of `events.launchdarkly.com` and a TLS port of 443. This allows the LaunchDarkly Fastly SDK to send events back to LaunchDarkly.
## Create a Fastly integration
To create a new Fastly integration for your environment:
 1. In LaunchDarkly, navigate to the **Integrations** page and find “Fastly.”
 2. Click **Add integration**. The “Create Fastly configuration” panel appears.
 3. Give the integration a human-readable **Name**.
 4. Select a LaunchDarkly **Environment**. You cannot change this after you configure the integration.
 5. In the **KV Store ID** field, enter the ID of the KV store to use for flag data. This is the store you created [above](/docs/integrations/fastly#configure-a-fastly-kv-store-for-launchdarkly).
 6. Enter the **API Token** field, enter a Fastly API token with “Engineer” permissions. This is the API token you created [above](/docs/integrations/fastly#configure-a-fastly-kv-store-for-launchdarkly).
 7. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 8. Click **Save configuration**.
## Manage a Fastly integration
After you have created a Fastly integration, you can change its status, update it, or delete it.
Here’s how:
 1. In LaunchDarkly, navigate to the **Integrations** page and find “Fastly.”
 2. Click the **arrow** menu to display the existing Fastly integrations.
 3. Find your integration and click the **pencil** icon to edit. The “Edit Fastly configuration” panel appears.
Then complete one of the following actions:
 * To change the status of an existing Fastly integration, toggle the **Status** to **Off** or **On**.
 * To update an existing Fastly integration, edit the **Name** , **KV Store ID** , or **API Token**. Then click **Save configuration**.
 * To delete an existing Fastly integration, click **Delete**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs