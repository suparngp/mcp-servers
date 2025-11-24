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
 * [Create your manifest](#create-your-manifest)
 * [Fill out your manifest](#fill-out-your-manifest)
 * [Organization and contact information](#organization-and-contact-information)
 * [Descriptions of your integration](#descriptions-of-your-integration)
 * [Icons](#icons)
 * [Use OAuth](#use-oauth)
 * [Form variables and capabilities](#form-variables-and-capabilities)
 * [Example manifest](#example-manifest)
## Overview
This topic explains how to create an integration manifest for your partner integration.
Each integration should contain a manifest that includes basic concepts about your integration and your organization. Your manifest should also instruct LaunchDarkly on how to interact with your integration.
## Create your manifest
Create an empty `manifest.json` file inside your new directory. You will use this file to describe your integration’s details and capabilities.
LaunchDarkly defines the properties of its integration manifests through a [JSON schema](https://github.com/launchdarkly/integration-framework/blob/main/manifest.schema.json). Many integrated development environments (IDEs) can provide you inline help and validation while editing your manifest. You can register the JSON schema in your IDE to enable this kind of help.
If you use [VSCode](https://code.visualstudio.com/), it detects the settings in this repository and applies the schema validation without any additional configuration.
Here is an example in VSCode:
![An example manifest in VSCode](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76616b02a0c75ba04dc74f1de6f6e77ab3e0e9d7b8a1af2c444e51b66790b842/assets/images/__not_from_LD_app_UI/integrations-manifest-vscode.png)
An example manifest in VSCode
## Fill out your manifest
The `manifest.json` file includes information about your organization, your integration, and how it works with LaunchDarkly.
### Organization and contact information
The first part of your manifest should describe your organization, contacts, URLs, and a few items LaunchDarkly needs to list your integration properly.
LaunchDarkly uses most of this information to render your integration card and configuration form in the LaunchDarkly user interface (UI).
Fill out the `name`, `version`, `author`, `supportEmail`, `links`, and `categories` fields.
### Descriptions of your integration
There are two fields in the manifest that describe your integration to LaunchDarkly account members.
The `overview` field is a one-line summary that appears on the **Integrations** list in the LaunchDarkly UI:
![A portion of the integration panel on the "Integrations" list in the LaunchDarkly UI, with the overview called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0d196bc546d2f6e6ff41fe7803c5c3c68f3ec68be486e8674338230cbcd10e14/assets/images/auto/integrations-slack-app-overview.auto.png)
A portion of the integration panel on the "Integrations" list in the LaunchDarkly UI, with the overview called out.
The `description` field is a longer definition that appears when a member clicks **Add integration** from the **Integrations** list in the LaunchDarkly UI:
![An add integration panel in the LaunchDarkly UI, with the manifest.json "description" field displayed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e1fb1421343e0d615d57922dd4227eb57e4fbab019ffb1efa80d639d3397530d/assets/images/auto/integrations-slack-app-description.auto.png)
An add integration panel in the LaunchDarkly UI, with the manifest.json "description" field displayed.
Here are some suggestions for filling out these fields:
 * Start your `overview` with a verb. Describe as succinctly as you can the most important action that members can accomplish if they use your integration.
 * For your `description`, use two or three sentences to describe what your product is or does and how that provides value to someone working in LaunchDarkly.
 * For both fields, use present tense and active voice. Focus on the specific actions that the account member can complete using your integration. When you’re done, read your content out loud. If it doesn’t sound like something a human would say, your content needs to be edited.
The `description` can accept simple [Markdown](https://daringfireball.net/projects/markdown/). The LaunchDarkly UI converts Markdown to HTML. To get the best results, only use simple Markdown, such as links and basic text formatting.
### Icons
The `icons` the manifest describes are in SVG format. LaunchDarkly does not accept other image formats.
We use your organization’s or integration’s logo in the LaunchDarkly UI and in the public integrations listing on [launchdarkly.com/integrations](https://launchdarkly.com/integrations/). SVG files allow your logo to scale nicely on different devices. To ensure your logo appears correctly everywhere we use it, do not include any padding around the image.
The `icon.square` and `icon.horizontal` properties point to relative paths. These paths are relative to your integration’s directory. You can create any directories and files that support your integration.
### Use OAuth
Many integrations in LaunchDarkly use API tokens. However, if your API requires OAuth for authentication, LaunchDarkly can support that as well. To learn more, read [Registering a LaunchDarkly OAuth client](/docs/integrations/partner-integrations/oauth-client-registration).
If your integration requires OAuth, include the `requiresOAuth` field in your manifest and set it to `true`.
### Form variables and capabilities
Form variables and capabilities define the primary interactions that LaunchDarkly and others will have with your integration.
To learn more, read [Using form variables](/docs/integrations/partner-integrations/form-variables) and [Using integration framework capabilities](/docs/integrations/partner-integrations/capabilities).
## Example manifest
To review an example manifest, look through the [`sample-integration` folder](https://github.com/launchdarkly/integration-framework/tree/main/integrations/sample-integration) in the LaunchDarkly `integration-framework` GitHub repository.
Here is an example of part of the `manifest.json` file:
Example manifest.json
```
1
| {
---|--- 
2
| "name": "Sample Integration",
3
| "version": "1.0.0",
4
| "overview": "Short one-liner describing your integration",
5
| "description": "Send flag data to space. Markdown-based description.",
6
| "author": "Example Dot Com",
7
| "supportEmail": "support@example.com",
8
| "links": {
9
| "site": "https://example.com",
10
| "privacyPolicy": "https://example.com/privacy"
11
| },
12
| "categories": ["monitoring"],
13
| "icons": {
14
| "square": "assets/images/square.svg",
15
| "horizontal": "assets/images/horizontal.svg"
16
| },
17
| "requiresOAuth": false
18
| }
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs