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
 * [Unfurl flag and segment links](#unfurl-flag-and-segment-links)
 * [Manually link chat messages to a flag](#manually-link-chat-messages-to-a-flag)
## Overview
This topic explains how flag links work in Microsoft Teams. A flag link being shared in any conversation can be unfurled to display a preview of the flag. Flag links being shared in public channels will also be automatically registered within LaunchDarkly. The LaunchDarkly app can also be used to manually link conversations in public channels to a flag.
To use this feature, you must have installed and configured the LaunchDarkly Microsoft Teams app. To learn more, read [Setting up the Microsoft Teams app](/docs/integrations/microsoft-teams/setting-up).
## Unfurl flag and segment links
When a flag or segment link is pasted in a public channel, the LaunchDarkly app unfurls the link to display a preview of the resource:
![Unfurling a flag link in Microsoft Teams.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f0b406da92be10454c2006729840ebb7f9d8c58c54ce4d23cf869f7446c5896f/assets/images/__third_party/teams-ld-unfurl.png)
Unfurling a flag link in Microsoft Teams.
When a flag link is unfurled in Microsoft Teams, LaunchDarkly saves the message on the flag’s **Links** tab. This helps track conversations about flags and provide up-to-date information on the flag’s usage. To learn more, read [Flag links](/docs/home/flags/links).
## Manually link chat messages to a flag
Feature flags can be manually linked to a chat message in a public channel.
To manually link a chat message to a flag:
 1. In Microsoft Teams, navigate to a public channel.
 2. Click the **three-dot** expand icon next to a message and choose **More actions**.
 3. Click **Create flag link**.
![The flag link creation menu in Microsoft Teams.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0dffdda5171fc4734a02d7d89fc5d3496237e3ef83a40d4f812f330051621000/assets/images/__third_party/teams-ld-creating-flag-link.png)
The flag link creation menu in Microsoft Teams.
 4. A modal appears. Select a project by typing the project name into the “Project” field. Click **Select project**.
 5. Select a flag by typing the flag name into the “Feature Flag” field.
 6. Click **Create**.
![The modal to link a chat message to a flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5a76c5cbd2f15f47fc400843b481b9cad58fe4a10e13f3b1feb8761523b8a757/assets/images/__third_party/teams-ld-create-flag-link-modal.png)
The modal to link a chat message to a flag.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs