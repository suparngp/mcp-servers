`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Benefits of offline mode](#benefits-of-offline-mode)
 * [Enable offline mode](#enable-offline-mode)
 * [Update flag rules in offline mode](#update-flag-rules-in-offline-mode)
##### Relay Proxy offline mode is available to customers on select plans
Relay Proxy offline mode is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to enable offline mode for the Relay Proxy.
The Relay Proxy can run in two modes:
 * **Online mode** is the default mode for the Relay Proxy. When you run the Relay Proxy in online mode, you can configure your SDKs for either proxy mode or daemon mode.
 * **Offline mode** prevents the Relay Proxy from connecting directly to LaunchDarkly. When you run the Relay Proxy in offline mode, you must configure your SDKs for proxy mode.
## Benefits of offline mode
For most customers, we do not recommend running the Relay Proxy in offline mode. Running the Relay Proxy in offline mode means that any time you make changes to your flag rules, you must re-download the flag rule file, update it on the Relay Proxy’s filesystem, and restart the Relay Proxy. In contrast, running the Relay Proxy in online mode handles these changes automatically.
However, there are benefits to using offline mode in certain circumstances. Enabling offline mode on the Relay Proxy lets you run the Relay Proxy without ever connecting it to LaunchDarkly. Instead of retrieving flag and segment values from LaunchDarkly’s servers, the Relay Proxy gets them from files located on your local host or filesystem.
This allows you to run the Relay Proxy in a highly secure system, such as in your organization’s air-gapped or FedRAMP-compliant system. By using offline mode, you can secure the Relay Proxy away from any external touchpoints. Alternatively, if your primary concern is FedRAMP-compliance, you can also use the LaunchDarkly federal instance. To learn more, read [LaunchDarkly in federal environments](/docs/home/infrastructure/federal).
##### Offline mode does not send events to LaunchDarkly
When the Relay Proxy is in offline mode, it does not send events to LaunchDarkly, and event-driven app features do not indicate new activity. For example, flag statuses and the flag evaluations graph do not update to reflect evaluations from an offline Relay Proxy. To learn more, read the Relay Proxy GitHub repository’s [Events in offline mode](https://github.com/launchdarkly/ld-relay/blob/v8/docs/events.md#events-in-offline-mode).
You should not use a persistent feature store between the Relay Proxy and your application in offline mode.
To run the Relay Proxy in offline mode, you must:
 * Ensure that your deployment is available. For example, if you are [starting the Relay Proxy from a Docker image](/docs/sdk/relay-proxy/deploying#starting-the-relay-proxy-from-a-docker-image), make sure to copy the .tar to the container file system.
 * Configure your SDKs to run in proxy mode. To learn how, read [Configuring SDKs to use different modes](/docs/sdk/relay-proxy/sdk-config#configuring-sdks-to-use-different-modes).
## Enable offline mode
Enabling offline mode is a two-step process.
You must:
 1. Create a Relay Proxy configuration from the [**Relay proxy** page](https://app.launchdarkly.com/settings/relay) under Organization settings and save its unique key.
 2. Configure your Relay Proxy instance to use the unique key from the prior step. You may do so either as a property in your Relay Proxy configuration file or as an environment variable.
##### Save the Relay Proxy's unique key
When you create a new Relay Proxy configuration, LaunchDarkly assigns a unique key to it. You must save the key immediately after you create the Relay Proxy configuration, because the key is only viewable on creation.
Here’s how to create a Relay Proxy configuration in the LaunchDarkly user interface:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Relay proxy**. The “Relay Proxy” page opens.
 3. Click **Create configuration**. The “Create a Relay Proxy configuration” panel appears.
 4. Give the Relay Proxy a human-readable **Name**.
 5. Choose a **Rule** from the menu. This rule determines what content the Relay Proxy receives.
 * “All projects and environments” sends changes about all projects and environments to the Relay Proxy.
 * “Inline policy” allows you to specify which projects and environments you can track events for. To learn more, read [Write an inline policy](/docs/sdk/relay-proxy/automatic-configuration#write-an-inline-policy).
 1. Click **Save configuration**. The Relay Proxy appears on the **Relay proxy** page with its key visible.
 2. Copy and save the key somewhere secure:
![The "Relay proxy" page with a newly created Relay Proxy configuration. The key is displayed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bbb0f7c99d8235b4a9059412739d73fa953abb079d5db00a3d2843b74ae10ccc/assets/images/auto/relay-proxy-key-displayed.auto.png)
The "Relay proxy" page with a newly created Relay Proxy configuration. The key is displayed.
Next, you must download all your flag rules and segments locally and tell the Relay Proxy where to find them. You do this by associating the file containing your flag rules with the Relay Proxy in a configuration file or with an environment variable.
To get your flag rules and make them accessible to the Relay Proxy:
 1. `curl /relay/latest-all`. This generates a file containing all your flag rules.
An example `curl` is below:
CurlCurl, federalCurl, EU
```
$
| curl https://sdk.launchdarkly.com/relay/latest-all \
---|--- 
>
| -H "Authorization: rel-EXAMPLE-RELAY-PROXY-CONFIGURATION-KEY" \
>
| -o EXAMPLE-NAME-OF-OUTPUTTED-FILE.tar.gz
```
 2. Copy that file to your local host.
 3. The next step varies depending on whether you’re using a configuration file or environment variables:
 * If you’re using a **configuration file** , configure it to read the file you saved in step 2. In the file, specify an `OfflineMode` section with the `fileDataSource` key and a value of the file’s path.
 * If you’re using **environment variables** , specify the file with the `FILE_DATA_SOURCE` environment variable.
Configuration fileEnvironment variables
```
$
| [OfflineMode]
---|--- 
>
| fileDataSource = "/path/to/file.tar.gz"
```
 1. Start the Relay Proxy.
From now on, the Relay Proxy will serve flag values based on the contents of the file you downloaded, not by contacting LaunchDarkly for updates.
## Update flag rules in offline mode
After you configure the Relay Proxy to run in offline mode, you do not need to connect to a network to update flag rules. If your flag rules change, you can update the Relay Proxy by re-downloading the flag rules file and updating it on your filesystem.
To update the Relay Proxy in offline mode:
 1. Make a request to `https://sdk.launchdarkly.com/relay/latest-all` to generate a file containing all your flag rules.
 2. Replace the existing file on the Relay Proxy’s filesystem with the newly-generated file. The Relay Proxy automatically detects that the file has changed and reloads it. You do not need to stop and restart the Relay Proxy in order to serve flag values based on the contents of this updated file.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs