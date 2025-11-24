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
 * [Using GitHub for notifications](#using-github-for-notifications)
 * [Watching a repository](#watching-a-repository)
 * [Subscribing to a release RSS feed](#subscribing-to-a-release-rss-feed)
 * [Getting notifications in the LaunchDarkly web application](#getting-notifications-in-the-launchdarkly-web-application)
 * [Using package managers for notifications](#using-package-managers-for-notifications)
 * [Updating to a new SDK version](#updating-to-a-new-sdk-version)
 * [Receiving notifications about SDKs nearing end of life](#receiving-notifications-about-sdks-nearing-end-of-life)
## Overview
This topic explains how to set up notifications to learn about version updates and end of life notices for LaunchDarkly’s SDKs. You have several options for receiving notifications about new versions of LaunchDarkly’s SDKs. You can also subscribe to notifications about SDK versions that are approaching their end of life.
## Using GitHub for notifications
All of the LaunchDarkly SDKs have [repositories on GitHub](https://github.com/search?q=topic%3Alaunchdarkly-sdk+org%3Alaunchdarkly&type=Repositories). You can use some of GitHub’s features to stay informed about new versions of LaunchDarkly’s SDKs.
### Watching a repository
For the particular SDK you are interested in, you can “watch” the repository to receive updates when new versions are released. To learn more, read the GitHub documentation on [Configuring your watch settings for an individual repository](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository).
### Subscribing to a release RSS feed
For the particular SDK you are interested in, you can subscribe to the RSS feed for the GitHub releases.
The location of the RSS feed is:
RSS feed
```
$
| # general format
---|--- 
>
| https://github.com/:organization/:repo/releases.atom
>
| 
>
| # example
>
| https://github.com/launchdarkly/python-server-sdk/releases.atom
```
If your team uses Slack as a collaboration tool, you can also subscribe a Slack channel to the release RSS feed. In your Slack channel, type `/feed subscribe <RSS feed>` to subscribe.
Here’s how:
Slack channel subscription
```
$
| # general format
---|--- 
>
| /feed subscribe https://github.com/:organization/:repo/releases.atom
>
| 
>
| # example
>
| /feed subscribe https://github.com/launchdarkly/python-server-sdk/releases.atom
```
## Getting notifications in the LaunchDarkly web application
Within the LaunchDarkly application, you’ll automatically receive notifications when SDK versions are one month away from reaching their end of life and again when they are past end of life. The notifications are based on SDK usage within each LaunchDarkly environment. To learn more, read the full list of [LaunchDarkly’s supported SDK versions](/docs/sdk/concepts/supported-versions).
![SDK version notifications.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2e22d16e6ec432db12cf996523c584b0cb93f0406331a68ad511a65b87be2844/assets/images/__LD_UI_no_test/sdk-concepts-version-notifications.png)
SDK version notifications.
## Using package managers for notifications
The LaunchDarkly SDKs are published through language-specific package managers. For the particular SDK you are interested in, you can subscribe to notifications or to an RSS feed directly through the package manager’s site to receive updates when new versions are released if the package manager supports such a feature. For example, the [Ruby SDK](/docs/sdk/server-side/ruby) is published through [RubyGems](https://rubygems.org/gems/launchdarkly-server-sdk/) which exposes an RSS feed.
## Updating to a new SDK version
When you are ready to update, check the reference page for SDK, then navigate to the migration guide. Alternatively, use the search bar to search for “migration guide.”
In most cases, we provide a migration guide from the previous major version.
## Receiving notifications about SDKs nearing end of life
To receive notifications when SDK versions are approaching their end of life (EOL):
 1. Visit [status.launchdarkly.com](https://status.launchdarkly.com/).
 2. Click **Subscribe to updates**.
 3. Select your notification method and click **Subscribe**.
 4. On the “Choose components” page, check the **SDKs** checkbox. Optionally, check the boxes to subscribe to other status updates. Click **Save**.
 5. Confirm your notification subscription. For example, if you subscribed by email, check your inbox for an email requesting that you confirm your subscription, and follow its instructions.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs