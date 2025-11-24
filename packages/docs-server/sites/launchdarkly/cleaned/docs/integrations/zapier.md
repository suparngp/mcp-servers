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
 * [About LaunchDarkly triggers](#about-launchdarkly-triggers)
 * [Create a Zap triggered by LaunchDarkly change history events](#create-a-zap-triggered-by-launchdarkly-change-history-events)
 * [Use LaunchDarkly actions](#use-launchdarkly-actions)
 * [Create a Zap to toggle a LaunchDarkly flag](#create-a-zap-to-toggle-a-launchdarkly-flag)
##### The Zapier integration is available to customers on select plans
The Zapier integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to set up and use the LaunchDarkly Zapier integration. Zapier provides a platform for setting up automated workflows between different apps using a web interface. Each Zap has a trigger, and actions that proceed from that trigger.
The LaunchDarkly Zapier integration includes several triggers and actions for constructing useful Zaps. You can trigger a Zap on change history events, with advanced filtering for finding the right events to trigger on. You can also toggle a flag, add a user context to a flag, or evaluate a flag as an action in your Zap.
To use the integration, go to [zapier.com](https://zapier.com/), create a Zap, and search for “LaunchDarkly” in the App Event search box.
![Zapier event search for LaunchDarkly](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/56cfbd88c271222cf9fe7c6245c48728acc3fd852948f9c964469b61b03a0d95/assets/images/__third_party/zapier-event-search.png)
Zapier event search for LaunchDarkly
## About LaunchDarkly triggers
You can trigger Zaps based on LaunchDarkly change history events, and can filter which change history events trigger the Zap. For example, you could trigger a Zap when a specific flag is turned on, or when a new team is created, or when an integration is configured.
### Create a Zap triggered by LaunchDarkly change history events
To create a Zap triggered by change history events:
 1. Go to [https://zapier.com](https://zapier.com/) and log in.
 2. Click **Create a Zap** in the top left corner.
 3. Type “LaunchDarkly” in the App Event search box.
 4. Select the type of event you want to trigger your Zap on, for example, “Flag events.”
 5. Follow the Zapier prompts to authenticate with LaunchDarkly and configure the trigger.
 6. (Optional) Add additional functionality to your Zap based on the LaunchDarkly trigger. For example, your Zap could notify you in Slack when certain events happen, or create calendar events for scheduled flag changes.
## Use LaunchDarkly actions
You can also use Zapier to run actions in LaunchDarkly as part of a Zap. Like all Zapier actions, LaunchDarkly actions are part of a pipeline that starts with a trigger. You can use LaunchDarkly actions with any trigger, including a LaunchDarkly trigger or the Zapier schedule trigger. The example in the following section toggles a LaunchDarkly flag, which demonstrates how to use one of the LaunchDarkly actions. Other LaunchDarkly actions follow the same set of steps.
### Create a Zap to toggle a LaunchDarkly flag
To create a Zap that toggles a flag:
 1. Go to [https://zapier.com](https://zapier.com/) and log in.
 2. Click **Create a Zap** in the top left corner.
 3. Select the trigger you want to cause the LaunchDarkly flag to toggle. For example, use the “Schedule trigger” to toggle a flag every year on April 1st.
 4. After you set up the trigger, Zapier displays an App Event search box. Type “LaunchDarkly” in the App Event search box.
 5. Select the “Toggle a Feature Flag” event.
 6. Follow the Zapier prompts to authenticate with LaunchDarkly, and configure the flag you want to toggle.
 7. Click **Test & Continue**.
 8. Turn the Zap on. Your flag will now toggle when the trigger happens.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs