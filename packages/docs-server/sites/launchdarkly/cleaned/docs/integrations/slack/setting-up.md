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
 * [Set up the Slack app](#set-up-the-slack-app)
 * [About Slack app permissions](#about-slack-app-permissions)
 * [Add multiple accounts to the Slack app](#add-multiple-accounts-to-the-slack-app)
 * [Disconnect an account from the Slack app](#disconnect-an-account-from-the-slack-app)
 * [Understand how LaunchDarkly roles impact Slack app authorization](#understand-how-launchdarkly-roles-impact-slack-app-authorization)
## Overview
This topic explains how to set up the LaunchDarkly Slack app in your team’s Slack instance.
## Set up the Slack app
When you call the LaunchDarkly Slack app for the first time you will be prompted to log in to your LaunchDarkly account and authorize the Slack app.
To sign in to the LaunchDarkly Slack app:
 1. Type `/launchdarkly account` in your Slack client’s text bar and press **Enter**. A message appears prompting you to connect your Slack account with LaunchDarkly.
 2. Click **Connect with LaunchDarkly**.
![Signing into the LaunchDarkly Slack App.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e0713b9cf03e91cd206fb0242df7089228652aa98bb028c17d037a3eab5ac222/assets/images/__third_party/slack-ld-connect.png)
Signing into the LaunchDarkly Slack App.
 1. Review the permissions required and click **Authorize**.
![The permissions authorization dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/19c5f0487e2a743723fa567ecfb475c8f61a950fcc22a5040c98471fffda0fc7/assets/images/__third_party/slack-ld-authorize.png)
The permissions authorization dialog.
A confirmation dialog appears in your browser and the Slack app’s username appears in the **Apps** section of your Slack client. You can now use the LaunchDarkly Slack app.
The Slack app configuration also appears in the “Slack App” section of the **Integrations** list.
## About Slack app permissions
The Slack app requires you to grant permission for it to work in your Slack account. The list of permissions shown in the authorization dialog is inclusive of everything the app can do, but not all members will be able to perform all actions using the app.
The things the Slack app can do are limited to what the member can do in LaunchDarkly. It never allows members to take actions beyond what their roles in LaunchDarkly allow.
**The Slack app does not grant additional permissions to LaunchDarkly members.**
For example:
Cody is a LaunchDarkly member with the Reader base role. He authorizes the LaunchDarkly Slack app and uses it to view flag information and subscribe channels to notifications. He cannot toggle the flag’s targeting on or off in LaunchDarkly using the Slack app, because readers are not allowed to perform that action.
Isha is a LaunchDarkly member with the Admin role. She authorizes the LaunchDarkly Slack app and can use it to view flag information, subscribe channels to notifications, and toggle flags on and off, because those are all actions administrators are allowed to perform.
## Add multiple accounts to the Slack app
You can associate multiple LaunchDarkly accounts to your Slack workspace. Individuals can connect their accounts manually by following the instructions in [Set Up the Slack app](/docs/integrations/slack/setting-up#set-up-the-slack-app).
You will be able to interact with just one account at a time. You can check which account you are signed in to using `/launchdarkly account`.
To add more accounts to the Slack app:
 1. Type `/launchdarkly account` in your Slack client’s text bar and press **Enter**.
 2. The account management field appears.
 3. Click **Add an account**.
![An example of an account associated with the Slack app.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4ab1688215591872e06fcaf9ed31744ec6ff854bfc63407972944cec69bf2f7c/assets/images/__third_party/slack-ld-add-account.png)
An example of an account associated with the Slack app.
If you want to add another account, click **Add an account**. You’ll then follow the same process as your first account to authorize.
## Disconnect an account from the Slack app
When you click the drop down for an existing account, clicking logout will remove the account association with your Slack.
If an account is no longer authorized, you can re-authorize the account by clicking on the name of the account. When you click on the name, you will follow the Onboarding process again.
## Understand how LaunchDarkly roles impact Slack app authorization
Connecting your Slack account with your LaunchDarkly account makes two changes. When you complete the OAuth authorization workflow:
 * You allow your Slack and LaunchDarkly accounts to act as a single entity.
 * You automatically create and configure a webhook in LaunchDarkly that sends notifications to your Slack team.
The first item happens for each individual end user. The second item only happens once per team, typically by the first member on the Slack team to authorize the app with LaunchDarkly.
The first person to authorize the LaunchDarkly Slack app must have a role with permissions to create the necessary webhook.
To learn more about member permissions, read [About member roles](/docs/home/account/members#about-member-roles).
![The Slack app, with limited permissions.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/92e90dfdac5f00f4c57bcbd7ed854c2a3aa14f7057474f9d2be22b27c2eecc6d/assets/images/__third_party/slack-ld-reader-authorization.png)
The Slack app, with limited permissions.
For example, if a member with the Reader base role initially authorizes the Slack app, an error appears. When this happens, the member can only use some of the app’s features. They can view and manage flags, but can’t subscribe to notifications.
![The Slack app, displaying a webhook error.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5c439cb25d88706a031e20d3ef58956ff4469351a6a217035d43ab90be13c817/assets/images/__third_party/slack-ld-failed-subscribe.png)
The Slack app, displaying a webhook error.
To remedy this situation, the member with the Reader base role should ask an account member with the Writer base role to authorize the Slack app to communicate with LaunchDarkly. After the Writer-level member authorizes the app, the webhook is created. All subsequent account members to authorize the Slack app will be able to subscribe to notifications.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs