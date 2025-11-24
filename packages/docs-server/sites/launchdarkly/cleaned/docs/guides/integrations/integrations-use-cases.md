`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Keep your teams informed about flag changes](#keep-your-teams-informed-about-flag-changes)
 * [Prerequisites](#prerequisites)
 * [Chat integrations](#chat-integrations)
 * [Diagnose flag-related performance changes](#diagnose-flag-related-performance-changes)
 * [Prerequisites](#prerequisites-1)
 * [APM tool integrations](#apm-tool-integrations)
 * [Automate application performance management](#automate-application-performance-management)
 * [Prerequisites](#prerequisites-2)
 * [Flag triggers](#flag-triggers)
 * [Conclusion](#conclusion)
## Overview
This guide provides three example use cases showing how LaunchDarkly integrations can solve common problems within your organization. In addition to these, LaunchDarkly provides integrations with integrated development environment (IDE) connectors, workflow management tools, and more. To learn about all of our available integrations, read [Integrations](/docs/integrations).
Three common use cases are:
 * [Keeping your teams informed about flag changes](/docs/guides/integrations/integrations-use-cases#keep-your-teams-informed-about-flag-changes)
 * [Diagnosing flag-related performance changes](/docs/guides/integrations/integrations-use-cases#diagnose-flag-related-performance-changes)
 * [Automating application performance management](/docs/guides/integrations/integrations-use-cases#automate-application-performance-management)
For an overview of available LaunchDarkly integrations, read [About LaunchDarkly integrations](/docs/guides/integrations/using-integrations).
## Keep your teams informed about flag changes
Keeping different teams within your organization informed about the various projects and services you are building, releasing, and supporting can be a challenge. The more projects your organization manages, the harder it is for multiple teams to track what everyone is working on.
LaunchDarkly chat integrations help solve this problem by keeping your teams informed about flag changes in targeted chat channels.
### Prerequisites
To use this guide, you need:
 * A chat integration: either [Microsoft Teams](/docs/integrations/microsoft-teams) or [Slack](/docs/integrations/slack)
### Chat integrations
When someone updates a flag, either directly in LaunchDarkly or through the chat app, the app can send a notification of the change to any channel subscribed to updates for that flag. You can use filters to send notifications to a project channel about a specific subset of flags.
For example, imagine you’re working on a project to update the checkout flow on your website. You can set up project-specific notifications in a project-specific Slack channel.
Here’s how:
 1. In LaunchDarkly, tag all your flags related to the project with `checkout_flow`.
 2. In Slack, create a channel called `#new-checkout-flow`.
 3. Enter `/launchdarkly subscribe [-t <checkout_flow>]` in the text bar.
![A project-specific Slack channel.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/31a30156c97e74ff6a6145f4d92aa43e1f82f24ecda0e0c8817560ed2c8debc8/assets/images/__not_from_LD_app_UI/integrations-use-cases-slack-channel.png)
A project-specific Slack channel.
 1. Click **Send**. A confirmation message appears.
![The add subscription button in Slack.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/66dcbea40e4fd61fca85df921ce1a29c4dabb7bdd7c1971d1e8cab4ba48bbe00/assets/images/__third_party/integrations-use-cases-slack-channel-add-subscription.png)
The add subscription button in Slack.
 1. Click **Add subscription to channel** or adjust your subscription if needed. To learn more about adjusting subscriptions in Slack, read [Manage subscriptions](/docs/integrations/slack/notifications#manage-subscriptions).
Now, any time a change is made to a flag with the `checkout_flow` tag in LaunchDarkly, LaunchDarkly sends a notification to the `#new-checkout-flow` Slack channel.
You can set up multiple chat integrations with different policy filters. For example, in a general channel, you may want to send updates about all flag changes as a review method.
Using required approvals to sign off on any flag changes before they’re made is one way to prevent mistakes. But you may decide that requiring an approval for every single flag change unnecessarily delays deployment. Instead, you can allow flag changes by default and use a `#feature-flag-review` chat channel to quickly review all flag changes as they are made.
You can create a similar process in other apps. To learn how to set up chat integrations with policy filters in Microsoft Teams, read [Setting up the Microsoft Teams integration](/docs/integrations/microsoft-teams/setting-up).
## Diagnose flag-related performance changes
You’re reviewing charts in your application performance management (APM) tool and notice an unusual result. Could the problem be related to a flag change? You can use APM tool integrations to help diagnose if performance changes or issues in your app are related to feature flag changes.
### Prerequisites
To use this guide, you need an APM tool event integration set up with one of the following:
 * [AppDynamics](/docs/integrations/appdynamics)
 * [Datadog](/docs/integrations/datadog/events)
 * [Dynatrace](/docs/integrations/dynatrace/events)
 * [Elastic (ELK) Stack](/docs/integrations/elastic-stack)
 * [Honeycomb](/docs/integrations/honeycomb/events)
 * [New Relic One](/docs/integrations/new-relic/events)
 * [Splunk](/docs/integrations/splunk)
 * [Splunk Observability Cloud](/docs/integrations/splunk-observability/events)
### APM tool integrations
Imagine you monitor your app performance using New Relic One. You notice on the Errors dashboard that you’re receiving an increase in HTTP response code 500 errors.
![The New Relic One Error analytics dashboard.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f22e95b414feff0c92c2c8f5e1e639bc3d55524c34600ef139d89271660c2938/assets/images/__third_party/integrations-use-cases-new-relic-one-errors.png)
The New Relic One Error analytics dashboard.
This is cause for concern. Your team recently started a database migration, and you wonder if the increase in errors is related. Luckily, you planned for potential issues by putting the migration behind a feature flag, and are rolling it out to your end users incrementally rather than all at once.
Flag change events in your production environment create new deployment events in New Relic One, which let you understand the impact of specific flag changes. To find out if the 500 errors started when you turned on the migration flag, you navigate to your Deployments page. As you suspected, the errors began around the time your team toggled on the flag. Your error rate jumped from less than 1% to almost 7%.
![The New Relic One Deployments dashboard.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c39b2c5f2c89761e1765ecc2dc0bbc0e09360720433ebd939413b3f49c8beb10/assets/images/__third_party/integrations-use-cases-new-relic-one-errors-callout.png)
The New Relic One Deployments dashboard.
You toggle targeting off until the issues can be addressed, and your HTTP response code errors return to their normal levels.
You can set up multiple APM tool integrations with different policy filters to monitor different aspects of your app performance.
## Automate application performance management
Imagine you’re releasing a new feature in your app. You have thoroughly tested in production using feature flags, but you know there is the possibility the change could have a negative impact on your application’s performance.
In our [Diagnose flag-related performance changes](/docs/guides/integrations/integrations-use-cases#diagnose-flag-related-performance-changes) example, you were able to confirm that HTTP response code 500 errors appeared unexpectedly as a result of turning on a flag. To mitigate that, you disabled the feature until you could put a fix in place. But what if you didn’t want to manually monitor your app performance, or the error spike happened in the middle of the night?
You can use flag triggers to set up automation that disables a flag when a chosen metric goes above a certain threshold. That way, negative effects from the flag change are mitigated before you can address the root cause.
### Prerequisites
To use this guide, you need an APM tool flag trigger integration set up with one of the following:
 * [Datadog](/docs/integrations/datadog/triggers)
 * [Dynatrace](/docs/integrations/dynatrace/triggers)
 * [Honeycomb](/docs/integrations/honeycomb/triggers)
 * [New Relic One](/docs/integrations/new-relic/triggers)
 * [Splunk Observability Cloud](/docs/integrations/splunk-observability/triggers)
### Flag triggers
In this example, you will automate the process of turning off the flag as described in [Diagnose flag-related performance changes](/docs/guides/integrations/integrations-use-cases#diagnose-flag-related-performance-changes) using New Relic One. Automating a flag toggle change when a certain limit is breached is known as a “circuit breaker.”
For detailed documentation on creating New Relic One notification channels and policies, read New Relic’s [Add or remove notification channels](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-notifications/notification-channels-control-where-send-alerts/#add-channel) and [Create an alert policy](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-policies/create-edit-or-find-alert-policy/#alert-policy-name).
Here is how to set up a circuit breaker to toggle a flag’s targeting off when your HTTP errors reach a 2% threshold in New Relic One:
 1. Create a New Relic One flag trigger on your feature flag that toggles targeting to `off`.
![Flag triggers on the Settings tab of a feature flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b9af19ec4fc19b1b1534ab0c5733d078f698523d6961e5e9ce57a9862b0a0365/assets/images/__third_party/integrations-use-cases-new-relic-trigger.png)
Flag triggers on the Settings tab of a feature flag.
 1. Click **Save trigger**. A confirmation appears with a unique trigger URL.
 2. Copy and save the unique trigger URL. You will need this URL to complete the next step. After you leave this page, the trigger URL will be obscured and you will not be able to view it again.
 3. In New Relic One, configure a notification channel to use the LaunchDarkly trigger you just created. Enter the unique trigger URL into the “Base Url” field.
![The "Channel details" tab of the "Notification channels" screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/10adcdd5e35eff6d8d05627d3e9e1beb1fab28c934c4446e21b28e67506107ba/assets/images/__third_party/integrations-use-cases-new-relic-notification.png)
The "Channel details" tab of the "Notification channels" screen.
 1. Create a policy and add alert conditions to the policy.
![The "Edit condition" section on the "Policies" screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3a4382dd8225c3b524eae62f5e6d10739ebaefc99e03cc100b1f501735d577e9/assets/images/__third_party/integrations-use-cases-new-relic-alert-condition.png)
The "Edit condition" section on the "Policies" screen.
 1. Connect the webhook notification channel to the policy.
![The "Notification channel" tab on the "Policies" screen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3bce661ea85b137235e48a41c2dc7f388fd736757866ac850cbfde36070e301e/assets/images/__third_party/integrations-use-cases-new-relic-policies.png)
The "Notification channel" tab on the "Policies" screen.
Now when your HTTP response code 500 errors rise above a 2% threshold, New Relic One uses the flag trigger to toggle the flag’s targeting off.
To learn more about webhook notification channels, read [Connect a flag trigger to New Relic One](/docs/integrations/new-relic/triggers#connect-a-flag-trigger-to-new-relic-one).
## Conclusion
This guide demonstrates just a few ways LaunchDarkly integrations can solve common problems within your organization. To learn more about all of our integrations available, read [Integrations](/docs/integrations).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs