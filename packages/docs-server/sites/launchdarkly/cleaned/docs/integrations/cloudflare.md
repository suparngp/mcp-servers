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
 * [Create a Cloudflare Worker with the LaunchDarkly Cloudflare SDK](#create-a-cloudflare-worker-with-the-launchdarkly-cloudflare-sdk)
 * [Configure the LaunchDarkly Cloudflare integration](#configure-the-launchdarkly-cloudflare-integration)
 * [Use the Cloudflare integration to bootstrap feature flags](#use-the-cloudflare-integration-to-bootstrap-feature-flags)
 * [Troubleshooting](#troubleshooting)
##### The Cloudflare integration is available to customers on select plans
The Cloudflare integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s Cloudflare integration. This integration enables flag evaluation within Cloudflare Workers by writing the latest flag data from the configured environment directly to your Workers KV. To learn more about Cloudflare Workers KV, read [How KV Works](https://developers.cloudflare.com/workers/learning/how-kv-works).
##### This integration requires LaunchDarkly's Cloudflare SDK
You must install and configure the Cloudflare SDK in your Cloudflare Worker to use this integration. To learn more, read [Cloudflare SDK](/docs/sdk/edge/cloudflare).
You can use the Cloudflare integration to bootstrap your application with the latest client-side feature flags. This eliminates the initial remote call to LaunchDarkly, providing zero-latency client-side feature flags with no flash of original content or shift in content layout. The Cloudflare integration also enables flag evaluations within a Worker.
## Create a Cloudflare Worker with the LaunchDarkly Cloudflare SDK
##### Cloudflare Workers KV size limits
Cloudflare Workers enforce KV size limits that might be smaller than your LaunchDarkly flag data in a given environment.
To learn more, read about [KV limits](https://developers.cloudflare.com/workers/platform/limits#kv-limits).
To create a new Cloudflare Worker project with the LaunchDarkly Cloudflare SDK using the LaunchDarkly Cloudflare Worker template:
 1. Install [Wrangler](https://developers.cloudflare.com/workers/get-started/guide#2-install-the-workers-cli), the Workers CLI.
 2. Authenticate Wrangler:
Console
```
$
| wrangler login
---|--- 
```
To learn more about the `wrangler login` command, read [`login`](https://developers.cloudflare.com/workers/cli-wrangler/commands#login).
 1. Create a new project using the LaunchDarkly Cloudflare Worker template. Replace `my-project` with the name of the project you wish to create:
Console
```
$
| wrangler generate my-project https://github.com/launchdarkly/launchdarkly-cloudflare-worker-template
---|--- 
```
To learn more about the `wrangler generate` command, read [`generate`](https://developers.cloudflare.com/workers/cli-wrangler/commands#generate).
 1. Add your Cloudflare account ID to your `wrangler.toml` file:
wrangler.toml
```
1
| account_id = "<YOUR_CLOUDFLARE_ACCOUNT_ID>"
---|--- 
```
If you do not know your Cloudflare account ID, use the command `wrangler whoami`.
 1. Create a new Cloudflare Workers KV namespace:
Console
```
$
| wrangler kv:namespace create "LD_KV"
---|--- 
```
Wrangler responds with the namespace ID of the newly created namespace.
 1. Add the `nodejs_compat` flag to `wrangler.toml`. This is required because the Cloudflare SDK uses `node:events`, which needs to be enabled:
wrangler.toml
```
1
| compatibility_flags = [ "nodejs_compat" ]
---|--- 
```
To learn more, read [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/#enable-nodejs-with-workers).
 2. Bind your Worker with the new KV namespace by adding the code Wrangler returned in step 5 to the `kv_namespaces` array in your Worker’s `wrangler.toml` file:
wrangler.toml
```
1
| kv_namespaces = [
---|--- 
2
| { binding = "LD_KV", id="<LD_KV NAMESPACE ID>" }
3
| ]
```
 3. (Optional) If you intend to use `wrangler dev` for local development, you can also create a preview namespace:
Console
```
$
| wrangler kv:namespace create "LD_KV" --preview
---|--- 
```
Wrangler responds with the updated IDs for your `kv_namespaces` array. Replace the existing array entry created above with the value returned by Wrangler.
wrangler.toml
```
1
| kv_namespaces = [
---|--- 
2
| {binding = "LD_KV", id="<LD_KV NAMESPACE ID>", preview_id = "<LD_KV NAMESPACE PREVIEW ID>"}
3
| ]
```
Each LaunchDarkly Cloudflare integration only populates one KV namespace. If you are using a preview KV namespace, it will require its own integration. To learn more, read [Configure the LaunchDarkly Cloudflare integration](/docs/integrations/cloudflare#configure-the-launchdarkly-cloudflare-integration).
 1. (Optional) If you set up a preview namespace, you may run your worker locally:
Console
```
$
| wrangler dev
---|--- 
```
To learn more about the `wrangler dev` command, read [`dev`](https://developers.cloudflare.com/workers/cli-wrangler/commands#dev).
 1. Publish your Worker to Cloudflare:
Console
```
$
| wrangler publish
---|--- 
```
To learn more about the `wrangler publish` command, read [`publish`](https://developers.cloudflare.com/workers/cli-wrangler/commands#publish).
Your worker is running, but flag data will not be synced to your namespace until you set up the LaunchDarkly Cloudflare integration. To learn how, read [Configure the LaunchDarkly Cloudflare integration](/docs/integrations/cloudflare#configure-the-launchdarkly-cloudflare-integration).
## Configure the LaunchDarkly Cloudflare integration
For a Cloudflare integration to work, it needs a Cloudflare API token. To create a Cloudflare API token read [Creating API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). Your token needs to have **Account - Workers KV Storage:Edit** permissions.
You can create and manage Cloudflare integrations on the **Integrations** page. To create a new Cloudflare integration for your environment:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Cloudflare.”
 3. Click **Add integration**. A “Create Cloudflare configuration” panel appears.
 4. (Optional) Enter a name for the integration.
 5. Choose an environment from the **Environment** menu.
 6. Enter your Cloudflare **Account ID**. You can find this on the Worker home in Cloudflare, in the right side navigation.
 7. Enter your **KV Namespace** ID.
 8. Enter your API token generated from Cloudflare.
 9. Click **Save configuration**.
You can evaluate flags using the flag data that is set up to write to your Worker KV using the [Cloudflare SDK](/docs/sdk/edge/cloudflare).
## Use the Cloudflare integration to bootstrap feature flags
You can use the LaunchDarkly Cloudflare integration with Workers Sites to serve HTML injected with feature flags for bootstrapping client-side SDKs. To learn more about Workers Sites, read [Cloudflare’s documentation](https://developers.cloudflare.com/workers/platform/sites).
To serve HTML injected with feature flags:
index.js
```
1
| const { getAssetFromKV } = require('@cloudflare/kv-asset-handler')
---|--- 
2
| const { init } = require('@launchdarkly/cloudflare-server-sdk')
3
| 
4
| let ldClient
5
| 
6
| const initLdClient = () => {
7
| if (!ldClient) {
8
| // LD_CLIENT_SIDE_ID and LD_KV are runtime variables that the Workers runtime provides to your code.
9
| // For more information read https://developers.cloudflare.com/workers/platform/environment-variables
10
| ldClient = init(LD_CLIENT_SIDE_ID, LD_KV)
11
| return ldClient.waitForInitialization()
12
| }
13
| 
14
| return Promise.resolve()
15
| }
16
| 
17
| class FlagsStateInjector {
18
| async element(element) {
19
| // fetch all flag values for client-side SDKs as evaluated for an anonymous context
20
| // use a more appropriate context key if needed
21
| const context = { kind: 'user', key: 'context-key-123abc', anonymous: true }
22
| const allFlags = await ldClient.allFlagsState(context)
23
| element.append(`<script>window.ldFlags = ${JSON.stringify(allFlags)}</script>`, { html: true })
24
| }
25
| }
26
| 
27
| addEventListener('fetch', event => {
28
| event.respondWith(handleRequest(event))
29
| })
30
| 
31
| async function handleRequest(event) {
32
| const [response] = await Promise.all([getAssetFromKV(event), initLdClient()])
33
| const acceptHeader = event.request.headers.get('accept')
34
| 
35
| if (acceptHeader && acceptHeader.includes('text/html')) {
36
| return new HTMLRewriter().on('head', new FlagsStateInjector()).transform(response)
37
| }
38
| 
39
| return response
40
| }
```
This uses `HTMLRewriter` to inject a script tag into the head of your document that saves your set of feature flags to `window.ldFlags`. To learn more about `HTMLRewriter`, read [Cloudflare’s documentation](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter).
These flag values can then be used to bootstrap your client-side SDK. For example, if you are using the React Web SDK:
App.js
```
1
| import React from 'react';
---|--- 
2
| import { useFlags, withLDProvider } from 'launchdarkly-react-client-sdk';
3
| 
4
| const App = () => {
5
| ...
6
| };
7
| 
8
| export default withLDProvider({
9
| clientSideID: 'client-side-id-123abc',
10
| options: {
11
| bootstrap: window.ldFlags
12
| }
13
| })(App);
```
To learn more about bootstrapping client-side feature flags from the server, read [Bootstrap using server-rendered content](/docs/guides/flags/static-sites#bootstrap-using-server-rendered-content).
## Troubleshooting
If you encounter a `4xx` error when trying to access the Cloudflare integration, it usually means the request was invalid or access is restricted. To learn how to resolve these errors, read the LaunchDarkly Knowledge Base article [Troubleshooting Cloudflare Integration 4XX error codes](https://support.launchdarkly.com/hc/en-us/articles/29712089258011-Troubleshooting-Cloudflare-Integration-4XX-error-codes).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs